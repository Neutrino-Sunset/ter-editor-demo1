
snippets = [
   {
      name: `Data field with 'ignore command' group`,
      value: String.raw`Heading1    Heading2\par
{\*\ignorethis [<REPEAT.FROM>][<IF>Table1.FIELD1]}
{\field{\*\fldinst MERGEFIELD fieldname}{\fldrslt [%Table1.FIELD2%]}}
 {\field{\*\fldinst MERGEFIELD fieldname}{\fldrslt [%Table1.FIELD3%]}}`
   },
   {
      name: 'Data field with invisible group',
      value: String.raw`Heading1    Heading2\par
{\v [<REPEAT.FROM>][<IF>Table1.FIELD1]}
{\field{\*\fldinst MERGEFIELD fieldname}{\fldrslt [%Table1.FIELD2%]}}
 {\field{\*\fldinst MERGEFIELD fieldname}{\fldrslt [%Table1.FIELD3%]}}`
   },
   {
      name: 'Something else',
      value: String.raw`Blah blah blah`
   },
   {
      name: 'Something else',
      value: String.raw`QA are the best!!!`
   },
];
