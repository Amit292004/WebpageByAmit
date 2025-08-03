import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

async function uploadNote() {
  try {
    const form = new FormData();
    form.append('title', 'Test Note');
    form.append('description', 'This is a test note');
    form.append('class', '10');
    form.append('subject', 'Physics');
    form.append('file', fs.createReadStream('./test.pdf'));

    const response = await axios.post('http://localhost:3000/api/notes', form, {
      headers: {
        ...form.getHeaders()
      }
    });

    console.log('Note upload successful:', response.data);
  } catch (error) {
    console.error('Note upload failed:', error.response ? error.response.data : error.message);
  }
}

uploadNote();