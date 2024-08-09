import SchedulerDay from '../SchedulerDay/SchedulerDay';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import SchedulerWeek from '../SchedulerWeek/SchedulerWeek';
import SchedulerMonth from '../SchedulerMonth/SchedulerMonth';
import ExternalViewSwitcher from '../../features/ExternalViewSwitcher/ExternalViewSwitcher';

const Home = () => {
  const [schedulerData, setSchedulerData] = useState([]);
  const [currentViewName, setCurrentViewName] = useState('Week');
  const currentDate = '2024-08-10';

  useEffect(() => {
    const fetchData = async () => {
      const dataFromDB = await getDocs(collection(db, 'appointments'));
      const appointments = dataFromDB.docs.map((doc) => doc.data());
      setSchedulerData(appointments);
    };

    fetchData();
  }, []);

  const handleViewNameChange = (e) => setCurrentViewName(e.target.value);

  return (
    <div>
      <h1>My callendar App</h1>
      <ExternalViewSwitcher
        currentViewName={currentViewName}
        onChange={handleViewNameChange}
      />
      {currentViewName === 'Day' && (
        <SchedulerDay schedulerData={schedulerData} currentDate={currentDate} />
      )}
      {currentViewName === 'Week' && (
        <SchedulerWeek
          schedulerData={schedulerData}
          currentDate={currentDate}
        />
      )}
      {currentViewName === 'Month' && (
        <SchedulerMonth
          schedulerData={schedulerData}
          currentDate={currentDate}
        />
      )}
    </div>
  );
};

export default Home;
