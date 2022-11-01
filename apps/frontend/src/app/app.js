import NxWelcome from './nx-welcome';
import { useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { getAuthDataFromLS, removeUser } from './utils/auth';

export function App() {
  useEffect(() => {
    const auth = getAuthDataFromLS();

    if (!auth || !auth.accessToken || !auth.refreshToken) {
      removeUser();
      return;
    }
    // здесь необходимо передавать данные об авторизации юзера
    setAuth(true);
    setUser(auth.user)
  }, []);
  return (
    <>
      <NxWelcome title="frontend" />
      <div />

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </>
  );
}
export default App;
