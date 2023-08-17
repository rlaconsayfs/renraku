import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import BadgeIcon from '@mui/icons-material/Badge';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import Skeleton from '@mui/material/Skeleton';

const ContactsEditSkeleton = () => {
  return (
    <Box sx={{ m: 3 }}>
      <Box sx={{ mb: 3 }}></Box>
      <Box component='form' autoComplete='off' noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2
              }}>
              <Skeleton variant='rounded' width={'10%'} height={50} />
              <Skeleton variant='rounded' width={'90%'} height={50} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <Skeleton variant='rounded' width={'100%'} height={50} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2
              }}>
              <Skeleton variant='rounded' width={'10%'} height={50} />
              <Skeleton variant='rounded' width={'90%'} height={50} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <Skeleton variant='rounded' width={'100%'} height={50} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2
              }}>
              <Skeleton variant='rounded' width={'10%'} height={50} />
              <Skeleton variant='rounded' width={'90%'} height={50} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <Skeleton variant='rounded' width={'100%'} height={50} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2
              }}>
              <Skeleton variant='rounded' width={'10%'} height={50} />
              <Skeleton variant='rounded' width={'90%'} height={50} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <Skeleton variant='rounded' width={'100%'} height={50} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <Skeleton variant='rounded' width={'100%'} height={50} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <Skeleton variant='rounded' width={'100%'} height={50} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactsEditSkeleton;
