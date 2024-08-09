import SchedulerDay from '../SchedulerDay/SchedulerDay';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import SchedulerWeek from '../SchedulerWeek/SchedulerWeek';
import SchedulerMonth from '../SchedulerMonth/SchedulerMonth';

const Home = () => {
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
  console.log(schedulerData);
  return (
    <div>
      <h1>My callendar App</h1>
      <SchedulerDay schedulerData={schedulerData} currentDate={currentDate} />
      <SchedulerWeek schedulerData={schedulerData} currentDate={currentDate} />
      <SchedulerMonth schedulerData={schedulerData} currentDate={currentDate} />
    </div>
  );
};

export default Home;
