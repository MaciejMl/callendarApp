import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

const SchedulerMonth = (props) => {
  return (
    <Paper>
      <Scheduler data={props.schedulerData}>
        <ViewState currentDate={props.currentDate} />
        <MonthView />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

export default SchedulerMonth;
