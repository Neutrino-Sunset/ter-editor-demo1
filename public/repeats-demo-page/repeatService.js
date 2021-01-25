
let _repeatService;

class RepeatService {

   #logEnabled = true;

   constructor(rtfEditor) {
      this.log('creating RepeatService');
      _repeatService = this;
      this._cursorFieldId = 0;
      this._cursorFieldName = '';
      this._cursorFieldData = '';
      this._cursorFieldRepeatId = 0;
      this._rtfEditor = rtfEditor;
      this._rtfEditor.TerSetEvent('Action', (obj, action, actionId) => this.onEditorAction(obj, action, actionId));
   }

   // Properties

   get isCursorInField() {
      return this._cursorFieldId !== 0;
   }

   get isCursorInRepeatField() {
      return this._cursorFieldRepeatId !== 0;
   }


   // Methods

   selectFieldAtCursor(selectData, repaint) {
      if (this.isCursorInField) {
         let result = this._rtfEditor.TerSelectField(selectData, repaint);
         this.log('TerSelectField result: ', result);
      }
   }

   getSelectionCoords() {
      this.log('RepeatService.getSelectionCoords');
      let result = this._rtfEditor.TerGetSelection();
      if (result) {
         let begLine = this._rtfEditor.TerGetOutInt('BegLine');
         let begCol = this._rtfEditor.TerGetOutInt('BegCol');
         let endLine = this._rtfEditor.TerGetOutInt('EndLine');
         let endCol = this._rtfEditor.TerGetOutInt('EndCol');
         this.log(`begLine: ${begLine}, begCol: ${begCol}, endLine: ${endLine}, endCol: ${endCol}`);
         let selStart = this._rtfEditor.TerRowColToAbs(begLine, begCol);
         let selEnd = this._rtfEditor.TerRowColToAbs(endLine, endCol);
         this.log(`selection - start: ${selStart}, end: ${selEnd}`);
         return { selStart, selEnd };
      } else {
         this.log(`TerGetSelection failed, result: ${result}`);
      }
   }

   selectRepeatAtCursor() {
      this.log('RepeatService.selectRepeatAtCursor');

      if (!this.isCursorInRepeatField) {
         this.log('repeat field not selected')
         return;
      }

      if (!/Repeat\d{3}_Header/.test(this._cursorFieldName)) {
         this.log('not a repeat header');
         return;
      }

      // TODO select repeat header and remember start position.
      this.selectFieldAtCursor(true, false);
      let selection = this.getSelectionCoords();
      this.log(selection);
      let repeatStart = selection.selStart;
      let repeatEnd;

      let repeatFieldId = 'Repeat' + this._cursorFieldRepeatId + '_';
      this.log(`searching for next repeat field named '${repeatFieldId}'`);

      while (this._rtfEditor.TerLocateField(tc.TER_NEXT, repeatFieldId, false, false))
      {
         this.updateFieldInfo();
         this.log(`repeat field located - name: ${this._cursorFieldName}`);
         this.selectFieldAtCursor(true, false);
         selection = this.getSelectionCoords();
         this.log(`repeat field coords - start: ${selection.selStart}, end: ${selection.selEnd}`);
         repeatEnd = selection.selEnd;
      }

      this.log(`repeat coords - start: ${repeatStart}, end: ${repeatEnd}`);

      this.selectText(repeatStart, repeatEnd, true);

      // this.log(`TerLocateField result: ${result}`);
      // this.updateFieldInfo();
   }

   deleteRepeatAtCursor() {
      this.selectRepeatAtCursor();
      this._rtfEditor.TerDeleteBlock(true);
   }
   
   getSelectionRtf() {
      let rtf = this._rtfEditor.TerGetRtfSel();
      this.log(rtf);      
   }

   getCursorPos() {
      let cursorPos = -1;
      if (this._rtfEditor.GetTerCursorPos(-1)) {
         cursorPos = this._rtfEditor.TerGetOutInt("Line");
      }
      this.log('cursorPos: ' + cursorPos);
      return cursorPos;
   }

   selectText(startPos, endPos, repaint) {
      this._rtfEditor.SelectTerText(startPos, -1, endPos, -1, repaint);
   }


   // Private implementation

   resetState() {
      this._cursorFieldId = 0;
      this._cursorFieldName = '';
      this._cursorFieldRepeatId  = 0;
      this._cursorFieldData = '';
   }

   updateFieldInfo() {
      this.resetState();
      this._cursorFieldId = this._rtfEditor.TerGetField(-1, -1, tc.FIELD_NAME);
      if (this.isCursorInField) {
         this._cursorFieldName = this._rtfEditor.TerGetOutStr('Text');
         let repeatMatch = /^Repeat(\d{3})_/.exec(this._cursorFieldName);
         if (repeatMatch !== null) {
            this._cursorFieldRepeatId = repeatMatch[1];
         }
         this._rtfEditor.TerGetField(-1, -1, tc.FIELD_DATA)
         this._cursorFieldData = this._rtfEditor.TerGetOutStr('Text');
      }
      this.log('RepeatService.updateFieldInfo - _cursorFieldId: ' + this._cursorFieldId +
         ', _cursorFieldName: ' + this._cursorFieldName +
         ', _cursorFieldRepeatId: ' + this._cursorFieldRepeatId +
         ', _cursorFieldData: ' + this._cursorFieldData);
   }

   /**
    * Converts a repeatId integer into the zero padded string of length 3.
    */
   repeatIdToStr(repeatId) {
      let repeatIdStr = repeatId.toString();
      while (repeatIdStr.length < 3) {
         repetIdStr = "0" + num;
      }
      return repeatIdStr;
   }

   log(...args) {
      if (this.#logEnabled) {
         console.log(...args);
      }
   }
   
   onEditorAction(obj, actionType, actionId) {   
      if (actionType === 14) {
         // Mouse move, do nothing
         return;
      }
   
      if (actionType === 4 || actionType === 5) {
         this.updateFieldInfo();

         if (this.isCursorInRepeatField) {
            this.selectFieldAtCursor(true, true);
         }
         return;
      }
   }
}
