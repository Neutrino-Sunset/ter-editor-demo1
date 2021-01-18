
snippets = [
   {
      name: 'Appointments Repeat',
      value: String.raw`{\field{\*\fldinst MERGEFIELD Repeat1_Header}{\fldrslt [<REPEAT>AllOfficesHeld]}}\par
Name    QuickRef   Position    Appointed\par
{\field{\*\fldinst MERGEFIELD Repeat1_Begin}{\fldrslt [<REPEAT.FROM>][<IF>Person.CHANGEINPERSON]}}
{\field{\*\fldinst MERGEFIELD Repeat1_Column1}{\fldrslt [%Person.SORTNAME%] }}
{\field{\*\fldinst MERGEFIELD Repeat1_Column2}{\fldrslt [%Officer.PERSONQR%] }}
{\field{\*\fldinst MERGEFIELD Repeat1_Column3}{\fldrslt [%Officer.Position.OFFPOSNAME%] }}
{\field{\*\fldinst MERGEFIELD Repeat1_Column4}{\fldrslt [%Officer.EVENTDATE%] }}\par
{\field{\*\fldinst MERGEFIELD Repeat1_End}{\fldrslt [<ENDIF>][<REPEAT.AGAIN>][<REPEAT.END>]}}`
   },
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
      value: String.raw`QA are the best!!!`
   },
];
