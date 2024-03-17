/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, my: 1 }}>
      <Box sx={{ width: '60%', color: '#045B86' }}>
        <LinearProgress sx={{ height: 15, borderRadius: 2 }} color='inherit' variant="determinate" {...props} />
      </Box>
      <Box sx={{ color: '#045B86' }}>
        <Typography variant="body2" color="text.inherit">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
function LinearProgressWithoutLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, my: 1 }}>
      <Box sx={{ width: '90%', color: '#045B86' }}>
        <LinearProgress sx={{ height: 15, borderRadius: 2 }} color='inherit' variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};



export function ProgressBar({ values }) {
  const calculatePercentage = () => {
    const { terkini, target } = values;
    return (terkini / target) * 100;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={calculatePercentage()} />
    </Box>
  );
}
export function ProgressBarNonPercent({ values }) {
  const calculatePercentage = () => {
    const { terkini, target } = values;
    return (terkini / target) * 100;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithoutLabel value={calculatePercentage()} />
    </Box>
  );
}
