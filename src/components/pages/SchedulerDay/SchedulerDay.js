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
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import 'moment/locale/pl';

const allDayMessages = {
  allDay: 'Cały dzień',
};

const appointmentFormMessages = {
  detailsLabel: 'Szczegóły',
  titleLabel: 'Tytuł',
  allDayLabel: 'Cały dzień',
  repeatLabel: 'Powtarzaj',
  moreInformationLabel: 'Więcej informacji',
  notesLabel: 'Notatki',
  discardButton: 'Odrzuć',
  commitCommand: 'Zapisz',
  deleteButton: 'Usuń',
};

const confirmationDialogMessages = {
  discardButton: 'Odrzuć',
  cancelButton: 'Anuluj',
  confirmButton: 'Zapisz',
  deleteButton: 'Usuń',
  confirmDeleteMessage: 'Czy na pewno chcesz usunąć to wydarzenie?',
  confirmCancelMessage: 'Anulować niezapisane zmiany?',
};

moment.locale('pl');

const SchedulerDay = ({ schedulerData, currentDate, onCommitChanges }) => (
  <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='pl'>
    <Paper>
      <Scheduler data={schedulerData} height={660} locale='pl'>
        <ViewState currentDate={currentDate} />
        <EditingState onCommitChanges={onCommitChanges} />
        <IntegratedEditing />
        <DayView startDayHour={9} endDayHour={19} displayName='Dzień' />
        <ConfirmationDialog messages={confirmationDialogMessages} />
        <Appointments />
        <AllDayPanel messages={allDayMessages} />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm
          messages={appointmentFormMessages}
          textFieldComponent={(props) => (
            <TextField {...props} variant='outlined' fullWidth />
          )}
          dateEditorComponent={(props) => {
            const dateValue = props.value ? moment(props.value) : null;

            return (
              <DateTimePicker
                label='Wybierz datę i czas'
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
