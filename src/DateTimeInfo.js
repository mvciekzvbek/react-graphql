import React from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

const DateTimeInfo = (props) => {
  const { data } = props;
  return (
    <Typography variant="body1">
      {moment(data).format('MMM Do YYYY, k:mm')}
    </Typography>
  );
};

export default DateTimeInfo;
