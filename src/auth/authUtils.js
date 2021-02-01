export const userIsLoggedIn = () => {
  const user = localStorage.getItem('authData');

  console.log(user)
  return !!user;
};