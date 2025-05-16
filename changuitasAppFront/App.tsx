import { AuthProvider } from './autenticacion/auth';
import AppNavigator from './navegacion/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
    <AppNavigator />
  </AuthProvider>
  );
}
