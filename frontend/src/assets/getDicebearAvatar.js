export const generateAvatarUrl = async (details) => {
  let { gender, firstName, lastName } = details;
  firstName = firstName.toLowerCase();
  lastName = lastName.toLowerCase();
  gender = gender.toLowerCase();

  const avatarUrl = `https://avatars.dicebear.com/api/${gender}/${firstName}${lastName}.svg`;

  try {
    const response = await fetch(avatarUrl);

    if (response.status === 200) {
      return avatarUrl;
    }
    return null;
  } catch (error) {
    return null;
  }
};
