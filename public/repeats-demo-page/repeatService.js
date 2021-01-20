
let _repeatService;

class RepeatService {
   constructor(rtfEditor) {
      console.log('creating RepeatService');
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
         console.log('TerSelectField result: ', result);
      }
   }

   getSelectionCoords() {

   }

   selectRepeatAtCursor() {
      console.log('selectRepeatAtCursor');

      this._rtfEditor.TerLocateField

   }
   
   getRepeatRtf() {
      
   }
   
   getSelectionRtf() {
      let rtf = this._rtfEditor.TerGetRtfSel();
      console.log(rtf);      
   }

   getCursorPos() {
      let cursorPos = -1;
      if (this._rtfEditor.GetTerCursorPos(-1)) {
         cursorPos = this._rtfEditor.TerGetOutInt("Line");
      }
      console.log('cursorPos: ' + cursorPos);
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
         let repeatMatch = /^Repeat(\d+)_/.exec(this._cursorFieldName);
         if (repeatMatch !== null) {
            this._cursorFieldRepeatId = repeatMatch[1];
         }
         this._rtfEditor.TerGetField(-1, -1, tc.FIELD_DATA)
         this._cursorFieldData = this._rtfEditor.TerGetOutStr('Text');
      }
      console.log('RepeatService.updateFieldInfo - _cursorFieldId: ' + this._cursorFieldId +
         ', _cursorFieldName: ' + this._cursorFieldName +
         ', _cursorFieldRepeatId: ' + this._cursorFieldRepeatId +
         ', _cursorFieldData: ' + this._cursorFieldData);
   }
   
   onEditorAction(obj, actionType, actionId) {   
      if (actionType === 14) {
         // Mouse move, do nothing
         return;
      }
   
      if (actionType === 4 || actionType === 5) {
         this.updateFieldInfo();
         return;
      }
   }
}
