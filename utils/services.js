export const sanitizeUser = (user) => {
  const {
    _id,
    username,
    mobileNo,
    email,
    profileImageURL,
    enableNotifications,
  } = user;
  return {
    _id,
    username,
    mobileNo,
    email,
    profileImageURL,
    enableNotifications,
  };
};
