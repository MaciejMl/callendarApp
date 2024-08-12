import SchedulerDay from '../SchedulerDay/SchedulerDay';
import SchedulerWeek from '../SchedulerWeek/SchedulerWeek';
import SchedulerMonth from '../SchedulerMonth/SchedulerMonth';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { useState, useEffect, useCallback } from 'react';
import { db } from '../../../firebase';
import ExternalViewSwitcher from '../../features/ExternalViewSwitcher/ExternalViewSwitcher';
import moment from 'moment';
import 'moment/locale/pl';

moment.locale('pl');

const Home = () => {
  const [schedulerData, setSchedulerData] = useState([]);
  const [currentViewName, setCurrentViewName] = useState('Week');
  const currentDate = new Date();

  useEffect(() => {
    const fetchData = async () => {
      const dataFromDB = await getDocs(collection(db, 'appointments'));
      const appointments = dataFromDB.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        startDate: new Date(doc.data().startDate),
        endDate: new Date(doc.data().endDate),
      }));
      setSchedulerData(appointments);
    };

    fetchData();
  }, []);
  const handleViewNameChange = (e) => setCurrentViewName(e.target.value);

  const commitChanges = useCallback(
    async ({ added, changed, deleted }) => {
      let newData = [...schedulerData];

      if (added) {
        if (!added.title || !added.startDate || !added.endDate) {
          alert('Wszystkie pola muszą być wypełnione!');
          return;
        }

        if (new Date(added.startDate) >= new Date(added.endDate)) {
          alert('Data rozpoczęcia musi być wcześniejsza niż data zakończenia!');
          return;
        }

        try {
          const newAppointmentRef = await addDoc(
            collection(db, 'appointments'),
            {
              ...added,
              startDate: moment(added.startDate).format('YYYY-MM-DDTHH:mm:ss'),
              endDate: moment(added.endDate).format('YYYY-MM-DDTHH:mm:ss'),
            }
          );
          newData = [...newData, { id: newAppointmentRef.id, ...added }];
        } catch (error) {
          alert('Wystąpił błąd podczas zapisywania wydarzenia!');
          console.error('Error adding document: ', error);
        }
      }

      if (changed) {
        for (const id in changed) {
          const change = changed[id];
          console.log(change);
          if (!change.title || !change.startDate || !change.endDate) {
            alert('Wszystkie pola muszą być na nowo wypełnione!');
            return;
          }

          if (new Date(change.startDate) >= new Date(change.endDate)) {
            alert(
              'Data rozpoczęcia musi być wcześniejsza niż data zakończenia!'
            );
            return;
          }

          try {
            const appointmentDoc = doc(db, 'appointments', id);
            await updateDoc(appointmentDoc, {
              ...change,
              startDate: moment(change.startDate).format('YYYY-MM-DDTHH:mm:ss'),
              endDate: moment(change.endDate).format('YYYY-MM-DDTHH:mm:ss'),
            });

            newData = newData.map((appointment) =>
              appointment.id === id
                ? {
                    ...appointment,
                    ...change,
                    startDate: moment(change.startDate).format(
                      'YYYY-MM-DDTHH:mm:ss'
                    ),
                    endDate: moment(change.endDate).format(
                      'YYYY-MM-DDTHH:mm:ss'
                    ),
                  }
                : appointment
            );
          } catch (error) {
            alert('Wystąpił błąd podczas edytowania wydarzenia!');
            console.error('Error updating document: ', error);
          }
        }
      }

      if (deleted !== undefined) {
        try {
          await deleteDoc(doc(db, 'appointments', deleted));
          newData = newData.filter((appointment) => appointment.id !== deleted);
        } catch (error) {
          alert('Wystąpił błąd podczas usuwania wydarzenia!');
          console.error('Error deleting document: ', error);
        }
      }
      setSchedulerData(newData);
    },
    [schedulerData]
  );

  return (
    <div>
      <h1>My callendar App</h1>
      <ExternalViewSwitcher
        currentViewName={currentViewName}
        onChange={handleViewNameChange}
      />
      {currentViewName === 'Day' && (
        <SchedulerDay
          schedulerData={schedulerData}
          currentDate={currentDate}
          onCommitChanges={commitChanges}
        />
      )}
      {currentViewName === 'Week' && (
        <SchedulerWeek
          schedulerData={schedulerData}
          currentDate={currentDate}
          onCommitChanges={commitChanges}
        />
      )}
      {currentViewName === 'Month' && (
        <SchedulerMonth
          schedulerData={schedulerData}
          currentDate={currentDate}
          onCommitChanges={commitChanges}
        />
      )}
    </div>
  );
};

export default Home;
