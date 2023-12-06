require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.any(), (req, res) => {
  let file = req.files[0];
  res.status(200).json(
    {
      "name": file.originalname,
      "type": file.mimetype,
      "size": file.size
    }
  );
});

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
