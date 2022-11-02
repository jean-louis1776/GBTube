// import { setAuth, setUser } from '/context/auth';
//
// export const removeUser = () => {
//   localStorage.removeItem('token');
//   setAuth(false);
//   setUser({});
// };
//
// export const getAuthDataFromLS = () => {
//   try {
//     const lSData = JSON.parse(localStorage.getItem('token'));
//
//     if (!lSData) {
//       removeUser();
//       return;
//     }
//
//     return lSData;
//   } catch (error) {
//     removeUser();
//   }
// };
