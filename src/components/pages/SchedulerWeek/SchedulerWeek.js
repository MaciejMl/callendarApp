import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

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

  return (
    <Paper>
      <Scheduler data={props.schedulerData} height={660}>
        <ViewState />
        <WeekView
          startDayHour={9}
          endDayHour={19}
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
        />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

export default SchedulerWeek;
