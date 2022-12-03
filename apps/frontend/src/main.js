import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { Provider } from 'react-redux';
// import store from './store/store';
import { store, persistor } from './store';

import App from './app/app';
import { PersistGate } from 'reduxjs-toolkit-persist/es/integration/react';
import { CircularProgress } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<CircularProgress />} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
