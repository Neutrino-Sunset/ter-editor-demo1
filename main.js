const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));


/*app.get('/', (req, res) => {
  res.send('Hello World!')
});*/

// This endpoint can receive a file posted by a form.
// The html form element must specify content type 'multipart/form-data'.
// The file is uploaded to a temporary file on the server and the form request object received by
// the server contains the original name of the file and the path to the uploaded temporary file.
app.post('/forms-testing/form1.html', (req, res) => {
  console.log(req.body);
  let form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    for (const file of Object.entries(files)) {
      console.log(file);
    }
  });
  res.send('I got the form!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
