import React, { useEffect, useState } from 'react';
import stringAvatar from '../../../assets/avatarColorizer';
import { stringToColor } from '../../../assets/avatarColorizer';
import { generateAvatarUrl } from '../../../assets/getDicebearAvatar';
import Avatar from '@mui/material/Avatar';

const ContactAvatar = ({ user }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const url = await generateAvatarUrl(user);
        setAvatarUrl(url);
      } catch (error) {
        setAvatarUrl(null);
      }
    };

    fetchAvatar();
  }, [user]);

  return avatarUrl ? (
    <Avatar
      sx={{
        mr: 2,
        bgcolor: `${stringToColor(`${user.firstName} ${user.lastName}`)}`
      }}
      src={avatarUrl}
      alt={`${user.firstName} ${user.lastName}`}
    />
  ) : (
    <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)} />
  );
};

export default ContactAvatar;
