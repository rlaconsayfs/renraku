import React from 'react';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const ContactDetailsSkeleton = () => {
  return (
    <Box sx={{ m: 3 }}>
      <Box sx={{ m: 3 }}>
        <Box sx={{ mt: 5 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: { xs: 5, md: 6 },
              mb: { xs: 3, md: 5 }
            }}>
            <Box>
              <Skeleton variant='circular' width={320} height={320} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: { xs: 2, md: 3 }
              }}>
              <Skeleton variant='rounded' width={210} height={30} />
              <Skeleton variant='rounded' width={300} height={60} />
              <Skeleton variant='rounded' width={210} height={30} />
              <Skeleton variant='rounded' width={300} height={60} />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: { xs: 2, md: 15 },
              mb: { xs: 3, md: 4 }
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'flex-start',
                gap: { xs: 2, md: 3 }
              }}>
              <Skeleton variant='rounded' width={210} height={30} />
              <Skeleton variant='rounded' width={300} height={60} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'flex-start',
                gap: { xs: 2, md: 3 }
              }}>
              <Skeleton variant='rounded' width={210} height={30} />
              <Skeleton variant='rounded' width={300} height={60} />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: { xs: 2, md: 15 },
              mb: { xs: 3, md: 4 }
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'flex-start',
                gap: { xs: 2, md: 3 }
              }}>
              <Skeleton variant='rounded' width={210} height={30} />
              <Skeleton variant='rounded' width={300} height={60} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'flex-start',
                gap: { xs: 2, md: 3 }
              }}>
              <Skeleton variant='rounded' width={210} height={30} />
              <Skeleton variant='rounded' width={300} height={60} />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: { xs: 2, md: 15 },
              mb: { xs: 3, md: 4 }
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'flex-start',
                gap: { xs: 2, md: 3 }
              }}>
              <Skeleton variant='rounded' width={210} height={30} />
              <Skeleton variant='rounded' width={300} height={60} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactDetailsSkeleton;
