import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

async function uploadFile() {
  try {
    const form = new FormData();
    form.append('title', 'Test Paper');
    form.append('class', '10');
    form.append('subject', 'Physics');
    form.append('year', '2023');
    form.append('phase', 'Phase 1');
    form.append('file', fs.createReadStream('./test.pdf'));

    const response = await axios.post('http://localhost:3000/api/question-papers', form, {
      headers: {
        ...form.getHeaders()
      }
    });

    console.log('Upload successful:', response.data);
  } catch (error) {
    console.error('Upload failed:', error.response ? error.response.data : error.message);
  }
}

uploadFile();