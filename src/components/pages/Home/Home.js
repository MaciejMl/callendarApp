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
      console.log('Changes received:', { added, changed, deleted });

      let newData = [...schedulerData];

      if (added) {
        const newAppointmentRef = await addDoc(collection(db, 'appointments'), {
          ...added,
          startDate: moment(added.startDate).toISOString(),
          endDate: moment(added.endDate).toISOString(),
        });
        newData = [...newData, { id: newAppointmentRef.id, ...added }];
      }

      if (changed) {
        newData = newData.map((appointment) =>
          changed[appointment.id]
            ? {
                ...appointment,
                ...changed[appointment.id],
                startDate: moment(
                  changed[appointment.id].startDate
                ).toISOString(),
                endDate: moment(changed[appointment.id].endDate).toISOString(),
              }
            : appointment
        );
        for (const id in changed) {
          const appointmentDoc = doc(db, 'appointments', id);
          await updateDoc(appointmentDoc, {
            ...changed[id],
            startDate: moment(changed[id].startDate).toISOString(),
            endDate: moment(changed[id].endDate).toISOString(),
          });
        }
      }

      if (deleted !== undefined) {
        newData = newData.filter((appointment) => appointment.id !== deleted);
        await deleteDoc(doc(db, 'appointments', deleted));
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
