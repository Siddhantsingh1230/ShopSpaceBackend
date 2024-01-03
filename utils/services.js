export const sanitizeUser = (user) => {
  const {
    _id,
    username,
    mobileNo,
    email,
    profileImageURL,
    enableNotifications,
    role,
  } = user;
  return {
    _id,
    username,
    mobileNo,
    email,
    profileImageURL,
    enableNotifications,
    role,
  };
};
