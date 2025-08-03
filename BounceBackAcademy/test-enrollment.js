import fetch from 'node-fetch';

async function testEnrollment() {
  try {
    const enrollmentData = {
      name: 'Test Student',
      class: 'Class 10',
      phone: '1234567890',
      whatsapp: '1234567890',
      address: 'Test Address, Test City, Test State'
    };

    const response = await fetch('http://localhost:3000/api/enrollments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(enrollmentData)
    });

    const data = await response.json();
    console.log('Enrollment response:', data);
  } catch (error) {
    console.error('Error testing enrollment:', error);
  }
}

testEnrollment();