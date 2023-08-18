export const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name) => {
  const names = name.split(' ');

  const firstNameInitial = names[0][0].toUpperCase();
  const lastNameInitial =
    names.length > 1 ? names[names.length - 1][0].toUpperCase() : '';

  return {
    sx: {
      mr: 2,
      bgcolor: stringToColor(name)
    },
    children: `${firstNameInitial}${lastNameInitial}`
  };
};

export default stringAvatar;
