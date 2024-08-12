import moment from 'moment';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';

const SchedulerDay = ({ schedulerData, currentDate, onCommitChanges }) => (
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <Paper>
      <Scheduler data={schedulerData} height={660}>
        <ViewState currentDate={currentDate} />
        <EditingState onCommitChanges={onCommitChanges} />
        <IntegratedEditing />
        <DayView startDayHour={9} endDayHour={19} />
        <ConfirmationDialog />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm
          textFieldComponent={(props) => (
            <TextField {...props} variant='outlined' fullWidth />
          )}
          dateEditorComponent={(props) => {
            const dateValue = props.value ? moment(props.value) : null;

            return (
              <DateTimePicker
                label='Choose Date and Time'
                value={dateValue}
                onChange={(newValue) => props.onValueChange(newValue.toDate())}
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    fullWidth: true,
                  },
                }}
              />
            );
          }}
        />
      </Scheduler>
    </Paper>
  </LocalizationProvider>
);

export default SchedulerDay;
