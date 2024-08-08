const { collection, addDoc } = require('firebase/firestore');
const { db } = require('../../../firebase');

async function seed() {
  try {
    const appointmentsRef = collection(db, 'appointments');

    const sampleData = [
      {
        startDate: '2024-08-10T09:45',
        endDate: '2024-08-10T11:00',
        title: 'Meeting',
      },
      {
        startDate: '2024-08-10T12:00',
        endDate: '2024-08-10T13:30',
        title: 'Go to the gym',
      },
      {
        startDate: '2024-08-11T10:00',
        endDate: '2024-08-11T11:30',
        title: 'Doctor Appointment',
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
