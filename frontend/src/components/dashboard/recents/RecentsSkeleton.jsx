import React from 'react';

import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

const RecentsSkeleton = () => {
  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        <Skeleton variant='rounded' animation='wave' width='100%' height={200} />
        <Skeleton variant='rounded' animation='wave' width='100%' height={200} />
        <Skeleton variant='rounded' animation='wave' width='100%' height={200} />
      </Box>
    </>
  );
};

export default RecentsSkeleton;
