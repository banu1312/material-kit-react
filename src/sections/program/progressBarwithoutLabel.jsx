/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import * as React from 'react';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function LinearProgressWithoutLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, my: 1 }}>
      <Box sx={{ width: '80%', color: '#045B86' }}>
        <LinearProgress sx={{ height: 15, borderRadius: 2 }} color='inherit' variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

export default function ProgressBarNonPercent({ values }) {
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
