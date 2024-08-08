import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { collection, getDocs } from 'firebase/firestore';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { db } from '../../../firebase';
import { useState, useEffect } from 'react';

const Callendar = () => {
  const [schedulerData, setSchedulerData] = useState([]);
  const currentDate = '2024-08-10';

  useEffect(() => {
    const fetchData = async () => {
      const dataFromDB = await getDocs(collection(db, 'appointments'));
      const appointments = dataFromDB.docs.map((doc) => doc.data());
      setSchedulerData(appointments);
    };

    fetchData();
  }, []);

  return (
    <Paper>
      <Scheduler data={schedulerData}>
        <ViewState currentDate={currentDate} />
        <DayView startDayHour={9} endDayHour={14} />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

export default Callendar;
