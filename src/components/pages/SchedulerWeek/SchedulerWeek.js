import moment from 'moment';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
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

const SchedulerWeek = (props) => {
  const PREFIX = 'Demo';

  const classes = {
    todayCell: `${PREFIX}-todayCell`,
    weekendCell: `${PREFIX}-weekendCell`,
    today: `${PREFIX}-today`,
    weekend: `${PREFIX}-weekend`,
  };

  const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(
    ({ theme }) => ({
      [`&.${classes.todayCell}`]: {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.14),
        },
        '&:focus': {
          backgroundColor: alpha(theme.palette.primary.main, 0.16),
        },
      },
      [`&.${classes.weekendCell}`]: {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
        '&:hover': {
          backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
        },
        '&:focus': {
          backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
        },
      },
    })
  );

  const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(
    ({ theme }) => ({
      [`&.${classes.today}`]: {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
      },
      [`&.${classes.weekend}`]: {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06),
      },
    })
  );

  const TimeTableCell = (timeTableProps) => {
    const { startDate } = timeTableProps;
    const date = new Date(startDate);

    if (date.getDate() === new Date().getDate()) {
      return (
        <StyledWeekViewTimeTableCell
          {...timeTableProps}
          className={classes.todayCell}
        />
      );
    }
    if (date.getDay() === 0 || date.getDay() === 6) {
      return (
        <StyledWeekViewTimeTableCell
          {...timeTableProps}
          className={classes.weekendCell}
        />
      );
    }
    return <StyledWeekViewTimeTableCell {...timeTableProps} />;
  };

  const DayScaleCell = (dayScaleProps) => {
    const { startDate, today } = dayScaleProps;

    if (today) {
      return (
        <StyledWeekViewDayScaleCell
          {...dayScaleProps}
          className={classes.today}
        />
      );
    }
    if (startDate.getDay() === 0 || startDate.getDay() === 6) {
      return (
        <StyledWeekViewDayScaleCell
          {...dayScaleProps}
          className={classes.weekend}
        />
      );
    }
    return <StyledWeekViewDayScaleCell {...dayScaleProps} />;
  };

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
          <ViewState />
          <EditingState onCommitChanges={props.onCommitChanges} />
          <IntegratedEditing />
          <WeekView
            startDayHour={9}
            endDayHour={19}
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />
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

export default SchedulerWeek;
