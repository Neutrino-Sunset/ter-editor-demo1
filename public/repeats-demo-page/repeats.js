//import { helper1 } from '../assets/repeatHelpers.js';
//import { snippets } from './rtfSnippets.js'


let snippetDropdown = document.getElementById('snippet-dropdown');
let snippetView = document.getElementById('snippet-view');
let editorContainer = document.getElementById('editor-container');
let editorData = document.getElementById('editor-data');

window.tg.ResourceUrl = '/assets';
let editor = TerInit('editor-canvas');
editor.TerSetEvent('Action', onEditorAction);

snippets.forEach(snippet => {
   let newOption = document.createElement('option');
   newOption.innerText = snippet.name;
   newOption.value = snippet.value;
   snippetDropdown.appendChild(newOption);
});
snippetDropdown.addEventListener('change', (e) => {
   console.log(e);
   snippetView.value = e.target.value;
});
snippetView.value = snippetDropdown.value = snippets[0].value;

window.onresize = function() {
   let editorContainerWidth = editorContainer.clientWidth;
   let editorContainerHeight = editorContainer.clientHeight;
   let editorWidth = editor.width;
   let editorHeight = editor.height;

   if (editorWidth !== editorContainerWidth || editorHeight !== editorContainerHeight) {
      editor.TerApplySize(editorContainerWidth, editorContainerHeight);
      editor.TerRepaint(true);
   }
};
window.onresize();

function updateOutput() {
   editorData.innerText = editor.GetData();
}

function openRtf() {
   let toLoad = snippetView.value;
   editor.SetData(toLoad);
   updateOutput();
}

function insertRtf() {
   let toInsert = String.raw`{\rtf1 ${snippetView.value}}`;
   editor.InsertRtfBuf(toInsert, -1, 0, true);
   updateOutput();
}

function clearData() {
   editor.SetData('');
   updateOutput();
}

function selectDataField() {
   let result = editor.TerSelectField(false, false);
   console.log('SelectDataField result: ', result);
}

function onEditorAction(obj, actionType, actionId) {
   if (actionType === 14) {
      // Mouse move, do nothing
      return;
   }
   
   if (actionType === 4 || actionType === 5) {
      // Mouse click or key press.
      // console.log('Mouse click or button press');
      let getFieldResult = editor.TerGetField(-1, -1, tc.FIELD_DATA);
      console.log('getField: ' + getFieldResult);
      if (getFieldResult !== 0) {
         let getOutStrResult = editor.TerGetOutStr('Text');
         console.log('getOutStr: ' + getOutStrResult);
         editor.TerSelectField(true, true);
      }
      return;
   }
   // console.log(`onAction, actionType: ${actionType}, actionId: ${actionId}`);
   //helper1();
}

