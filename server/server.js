const express = require('express');
const cors = require('cors');
const { put } = require('@vercel/blob');
require('dotenv').config();


const app = express();
app.use(cors());
const PORT = process.env.PORT || 5001;


app.post('/upload-gym', async (req, res) => {
  //  console.log('uploading gym image');
    await put('gym/recent.png', req, { access: 'public', token: process.env.BLOB_READ_WRITE_TOKEN });
});

app.post('/upload-laundry', async (req, res) => {
//console.log('uploading laundry image');
  await put('laundry/recent.png', req, { access: 'public', token: process.env.BLOB_READ_WRITE_TOKEN });
});

app.post('/upload-pool', async (req, res) => {
 // console.log('uploading pool image');
  await put('pool/recent.png', req, { access: 'public', token: process.env.BLOB_READ_WRITE_TOKEN });
});

app.post('/upload-library', async (req, res) => {
 // console.log('uploading library image');
  await put('library/recent.png', req, { access: 'public', token: process.env.BLOB_READ_WRITE_TOKEN });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
