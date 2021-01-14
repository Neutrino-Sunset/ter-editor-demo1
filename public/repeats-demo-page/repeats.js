let example1 = document.getElementById('example1');
let example2 = document.getElementById('example2');
let editorContainer = document.getElementById('editorContainer');
let editorData = document.getElementById('editorData');

example1.value = String.raw`Heading1    Heading2\par
{\*\ignorethis [<REPEAT.FROM>][<IF>Table1.FIELD1]}
{\field{\*\fldinst MERGEFIELD fieldname}{\fldrslt [%Table1.FIELD2%]}}
 {\field{\*\fldinst MERGEFIELD fieldname}{\fldrslt [%Table1.FIELD3%]}}`;

example2.value = String.raw`Heading1    Heading2\par
{\v [<REPEAT.FROM>][<IF>Table1.FIELD1]}
{\field{\*\fldinst MERGEFIELD fieldname}{\fldrslt [%Table1.FIELD2%]}}
 {\field{\*\fldinst MERGEFIELD fieldname}{\fldrslt [%Table1.FIELD3%]}}`;

window.tg.ResourceUrl = '/assets';
let editor = TerInit('editorCanvas');

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

function insertRtf(example) {
   let toInsert = String.raw`{\rtf1 ${example.value}}`;
   editor.InsertRtfBuf(toInsert, -1, 0, true);
   updateOutput();
}

function clearData() {
   editor.SetData('');
   updateOutput();
}

