import React, { useEffect, useState } from 'react';
import stringAvatar from '../../../assets/avatarColorizer';
import { stringToColor } from '../../../assets/avatarColorizer';
import { generateAvatarUrl } from '../../../assets/getDicebearAvatar';

import Avatar from '@mui/material/Avatar';

const ContactAvatar = ({ contact, size }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const url = await generateAvatarUrl(contact);
        setAvatarUrl(url);
      } catch (error) {
        setAvatarUrl(null);
      }
    };

    fetchAvatar();
  }, [contact]);

  return avatarUrl ? (
    <Avatar
      sx={{
        mr: 2,
        bgcolor: `${stringToColor(`${contact.firstName} ${contact.lastName}`)}`,
        ...(size && { width: size, height: size })
      }}
      src={avatarUrl}
      alt={`${contact.firstName} ${contact.lastName}`}
    />
  ) : (
    <Avatar {...stringAvatar(`${contact.firstName} ${contact.lastName}`)} />
  );
};

export default ContactAvatar;
