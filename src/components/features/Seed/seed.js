const { collection, addDoc } = require('firebase/firestore');
const { db } = require('../../../firebase');

async function seed() {
  try {
    const appointmentsRef = collection(db, 'appointments');

    const sampleData = [
      {
        startDate: '2024-08-10T12:00',
        endDate: '2024-08-10T13:30',
        title: 'Go to the gym',
      },
      {
        startDate: '2024-08-12T12:00',
        endDate: '2024-08-12T13:30',
        title: 'Go to the park',
      },
      {
        startDate: '2024-08-10T13:00',
        endDate: '2024-08-13T13:30',
        title: 'Visit friends',
      },
    ];

    for (const appointment of sampleData) {
      await addDoc(appointmentsRef, appointment);
    }

    console.log('Sample data added successfully!');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

seed();
