import { Box, LinearProgress, Skeleton } from '@mui/material';
import React from 'react';

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
                alignItems: { xs: 'center', md: 'flex-start' }
              }}>
              <Skeleton variant='rounded' width={210} height={60}/>
              <Skeleton variant='rounded' width={210} height={60}/>
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
                justifyContent: 'flex-start'
              }}>
              <Skeleton variant='rounded' width={210} height={60} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'flex-start'
              }}>
              <Skeleton variant='rounded' width={210} height={60}/>
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
                justifyContent: 'flex-start'
              }}>
              <Skeleton variant='rounded' width={210} height={60} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'flex-start'
              }}>
              <Skeleton variant='rounded' width={210} height={60}/>
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
                justifyContent: 'flex-start'
              }}>
              <Skeleton variant='rounded' width={210} height={60} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'flex-start'
              }}>
              <Skeleton variant='rounded' width={210} height={60}/>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactDetailsSkeleton;