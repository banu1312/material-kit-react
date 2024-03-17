/* eslint-disable import/no-extraneous-dependencies */
import { Toaster } from 'sonner';

import Router from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import 'src/global.css';
import ThemeProvider from 'src/theme';

import { AuthProvider } from './api/authContext';
// import AuthContext from './auth';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <AuthProvider>
      <Toaster richColors/>
      <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}
