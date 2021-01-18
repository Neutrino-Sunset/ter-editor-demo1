
let snippetDropdown = document.getElementById('snippet-dropdown');
let snippetView = document.getElementById('snippet-view');
let editorContainer = document.getElementById('editor-container');
// let editorData = document.getElementById('editor-data');

window.tg.ResourceUrl = '/assets';
let editor = TerInit('editor-canvas');
let rs = new RepeatService(editor);

snippets.forEach(snippet => {
   let newOption = document.createElement('option');
   newOption.innerText = snippet.name;
   newOption.value = snippet.value;
   snippetDropdown.appendChild(newOption);
});
snippetDropdown.onchange = function(e) {
   console.log(e);
   snippetView.value = e.target.value;
}
snippetView.value = snippetDropdown.value = snippets[0].value;

let timeoutId = 0;
function throttle(callback, delay) {
   if (timeoutId) {
      window.clearTimeout(timeoutId);
   }
   timeoutId = window.setTimeout(callback, delay);
};

function resize() {
   let editorContainerWidth = editorContainer.clientWidth;
   let editorContainerHeight = editorContainer.clientHeight;
   let editorWidth = editor.width;
   let editorHeight = editor.height;

   if (editorWidth !== editorContainerWidth || editorHeight !== editorContainerHeight) {
      editor.TerApplySize(editorContainerWidth, editorContainerHeight);
      editor.TerRepaint(true);
   }
};
window.onresize = function() {
   throttle(resize, 50);
};
resize();

function updateOutput() {
   let rtf = editor.GetData();
   console.log(rtf);
   // editorData.innerText = rtf;
}

function loadRtf() {
   let toLoad = String.raw`{\rtf1 ${snippetView.value}}`;
   console.log(toLoad);
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
   rs.selectCursorField(true, true);
}


