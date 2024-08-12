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
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';

const SchedulerMonth = (props) => {
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

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='pl'>
      <Paper>
        <Scheduler data={props.schedulerData} height={660} locale={'pl'}>
          <ViewState currentDate={props.currentDate} />
          <EditingState onCommitChanges={props.onCommitChanges} />
          <IntegratedEditing />
          <MonthView />
          <AllDayPanel messages={allDayMessages} />
          <ConfirmationDialog messages={confirmationDialogMessages} />
          <Appointments />
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
                  label='Wybierz datę i godzinę'
                  value={dateValue}
                  onChange={(newValue) =>
                    props.onValueChange(newValue.toDate())
                  }
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
};

export default SchedulerMonth;
