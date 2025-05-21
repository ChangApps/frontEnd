import { AuthProvider } from "./autenticacion/auth";
import AppNavigator from "./navegacion/AppNavigator"; 


export default function Main() {
    return (
            <AuthProvider>
                <AppNavigator />
            </AuthProvider>
    );
}
