import AppNavigator from './navegacion/AppNavigator'; 
import { AuthProvider } from './autenticacion/auth';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}