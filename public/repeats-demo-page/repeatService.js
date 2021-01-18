
let _repeatService;

class RepeatService {
   constructor(rtfEditor) {
      console.log('creating RepeatService');
      _repeatService = this;
      this._cursorFieldId = 0;
      this._cursorFieldName = '';
      this._cursorFieldData = '';
      this._rtfEditor = rtfEditor;
      this._rtfEditor.TerSetEvent('Action', onEditorAction);
   }

   // Properties

   isCursorInField() {
      return this._cursorFieldId !== 0;
   }


   // Methods

   selectCursorField(selectData, repaint) {
      if (this.isCursorInField()) {
         let result = this._rtfEditor.TerSelectField(selectData, repaint);
         console.log('TerSelectField result: ', result);
      }
   }


   // Private implementation

   updateFieldInfo() {
      this._cursorFieldId = this._rtfEditor.TerGetField(-1, -1, tc.FIELD_NAME);
      if (this.isCursorInField()) {
         this._cursorFieldName = this._rtfEditor.TerGetOutStr('Text');
         this._rtfEditor.TerGetField(-1, -1, tc.FIELD_DATA)
         this._cursorFieldData = this._rtfEditor.TerGetOutStr('Text');
         console.log('RepeatService.updateFieldInfo - _cursorFieldId: ', this._cursorFieldId,
            ', _cursorFieldName: ', this._cursorFieldName,
            ', _cursorFieldData: ', this._cursorFieldData);
      }
   }
   

}

function onEditorAction(obj, actionType, actionId) {   
   if (actionType === 14) {
      // Mouse move, do nothing
      return;
   }

   if (actionType === 4 || actionType === 5) {
      _repeatService.updateFieldInfo();
      return;
   }
}