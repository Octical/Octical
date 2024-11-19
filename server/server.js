const express = require('express');
const cors = require('cors');
const { put } = require('@vercel/blob');
require('dotenv').config();


const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;


app.post('/upload', async (req, res) => {
    // Upload the image to the Blob Storage
    // We should let it so that we can get a path in the req so that we dont have to hardcode it
    await put('gym/recent.png', req, { access: 'public', token: process.env.BLOB_READ_WRITE_TOKEN });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
