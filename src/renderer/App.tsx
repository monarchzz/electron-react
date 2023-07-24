import { MantineProvider } from '@mantine/core';
import './App.css';
import 'tailwindcss/tailwind.css';
import { Provider } from 'urql';
import Router from './routes/Router';
import { AuthProvider } from './services/context/auth/AuthProvider';
import client from './services/graphql/client';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Provider value={client}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </Provider>
    </MantineProvider>
  );
}
