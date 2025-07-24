import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../../utils/API_URL";
import { AuthContext } from "../../autenticacion/auth";
import { cerrarSesion } from '../../autenticacion/authService';
import EstilosResenias from "./estilos/EstilosResenias";
import { NavBarSuperior } from "../../componentes/NavBarSuperior";
import { NavBarInferior } from "../../componentes/NavBarInferior";
import CustomSnackbar from "../../componentes/CustomSnackbar";
import { SafeAreaView } from 'react-native-safe-area-context';
import PantallaCarga from "../../componentes/PantallaCarga";


const Resenias = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
    const route = useRoute<RouteProp<RootStackParamList, 'Resenias'>>();
    const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
    const [message, setMessage] = useState("");  // Estado para almacenar el mensaje de error o éxito
    const [loading, setLoading] = useState<boolean>(true);
    const [solicitudes, setSolicitudes] = useState([]); //Estado para guardar el arreglo del historial
    const [state, setState] = useContext(AuthContext);

    const logout = async () => {
        try {
            setState({ token: "" });
            await cerrarSesion(); // Simula el proceso de cierre de sesión
            console.log('Sesión cerrada correctamente'); // Log al finalizar el cierre de sesión
        } catch (error: any) {
            console.log('Error en el cierre de sesión:', error.message);
            Alert.alert("Error", error.message);
        } finally {
            console.log("Intentando ir al iniciar sesion ");
            navigation.reset({
                index: 0,
                routes: [{ name: "InicioDeSesion" }],
            });
        }
    };

    const toggleDesplegable = () => {
        setMostrarDesplegable(!mostrarDesplegable);
    };

    useEffect(() => {
        fetchSolicitudesUsuario();
    }, []);  // Solo se ejecuta una vez cuando el componente se monta


    const fetchSolicitudesUsuario = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const userId = route.params.idUsuario;

            if (!accessToken || !userId) {
                throw new Error('No se encontró el token o el ID de usuario');
            }

            const responseSolicitudUsuario = await fetch(`${API_URL}/solicitudes/por-proveedor/${userId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!responseSolicitudUsuario.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            const solicitudData = await responseSolicitudUsuario.json();
            // Filtrar solo los que tienen estado 'F' o 'Finalizado'
            const solicitudFiltrada = solicitudData.filter((item: any) =>
                item.estado === 'F' || item.estado === 'Finalizado'
            );

            if (solicitudFiltrada.length > 0) {
                setSolicitudes(solicitudFiltrada);
            } else {
                setMessage('No hay reseñas disponibles');
                setVisible(true);
            }

        } catch (error: any) {
            setMessage('No hay reseñas disponibles');
            setVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const renderResenia = ({ item }: { item: any }) => (
        <View style={EstilosResenias.reseniaItem}>
            <View style={EstilosResenias.headerResenia}>
                <Text style={EstilosResenias.categoria}>Nombre del servicio: {item.nombreServicio}</Text>
                <Text style={EstilosResenias.categoria}>Calificado por: {item.cliente_nombre}</Text>
                <Text style={EstilosResenias.categoria}>Comentario: {item.comentario}</Text>
                <Text style={EstilosResenias.fecha}>Fecha de Valoración: {item.fechaValoracion}</Text>
            </View>
            <View style={EstilosResenias.rating}>
                <Text style={EstilosResenias.valoracion}>Valoración: {item.valoracion}</Text>
                {/* Dibuja las estrellas basadas en la valoración */}
                {[...Array(5)].map((_, i) => (
                    <Ionicons
                        key={i}
                        name="star"
                        size={16}
                        color={i < item.valoracion ? "FC6A30" : "#CCCCCC"} // Estrella llena o vacía
                    />
                ))}
            </View>
        </View>
    );

    const handleNavigation = (screen: string) => {
        switch (screen) {
            case 'Home':
                navigation.navigate('Home');
                break;
            case 'Historial1':
                navigation.navigate('Historial1');
                break;
            case 'Add':
                navigation.navigate('AgregarServicio1');
                break;
            case 'Notifications':
                // Navegar a notificaciones
                break;
            case 'PerfilUsuario':
                navigation.navigate('PerfilUsuario');
                break;
        }
    };

    return (
        <SafeAreaView edges={['top']} style={EstilosResenias.safeContainer}>
            <View style={EstilosResenias.container}>
                {/* NavBar Superior */}
                <NavBarSuperior
                    titulo="Reseñas"
                    showBackButton={true}
                    onBackPress={() => { navigation.goBack(); }}
                    rightButtonType="menu"
                    onRightPress={() => { toggleDesplegable(); }}
                />

                {/* Menú Desplegable */}
                {mostrarDesplegable && (
                    <View style={EstilosResenias.desplegable}>
                        <TouchableOpacity onPress={logout} style={EstilosResenias.opcionDesplegable}>
                            <Text style={EstilosResenias.textoDesplegable}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {loading ? (
                    <PantallaCarga frase="Cargando reseñas..." />
                ) : message ? (
                    <Text style={EstilosResenias.mensajeVacio}>{message}</Text>
                ) : (
                    <FlatList
                        data={solicitudes}
                        renderItem={renderResenia}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>

            <CustomSnackbar
                visible={visible}
                setVisible={setVisible}
                message={message}
            />

            {/* Barra de navegación inferior */}
            <NavBarInferior
                activeScreen="Resenias" // O el screen activo correspondiente
                onNavigate={handleNavigation}
            />
        </SafeAreaView>
    );
};
export default Resenias;