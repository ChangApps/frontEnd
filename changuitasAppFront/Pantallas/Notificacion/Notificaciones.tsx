// pantallas/Notificaciones.tsx
import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavBarSuperior } from "../../componentes/NavBarSuperior";
import PantallaCarga from "../../componentes/PantallaCarga";
import API_URL from "../../utils/API_URL";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navegacion/AppNavigator";
import { NavBarInferior } from "../../componentes/NavBarInferior";
import CustomSnackbar from "../../componentes/CustomSnackbar";
import Colors from "../../assets/Colors";
import { cerrarSesion } from '../../autenticacion/authService';
import { AuthContext } from "../../autenticacion/auth";
import { redirectAdmin } from '../../utils/utils'
import MenuDesplegable from "../../componentes/MenuDesplegable";
import EstiloOverlay from "../../componentes/estiloOverlayMenuDesplegable";

export interface Notificacion {
  id: number;
  titulo: string;
  mensaje: string;
  leido: boolean;
  fechahora_creada: string;
}

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [cargandoContenido, setCargandoContenido] = useState(true);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState<boolean>(true);

  const obtenerNotificaciones = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) return;
      const response = await fetch(`${API_URL}/notificaciones-por-usuario/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        setMessage("No se pudieron obtener las notificaciones");
        setVisible(true);
      }
      const data = await response.json();
      setNotificaciones(data);
      setCargandoContenido(false);
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
    } finally {
      setCargandoContenido(false);
    }
  };

  useEffect(() => {
      setLoading(true);
      obtenerNotificaciones();
      setLoading(false);
    }, []);

  const handleNavigation = (screen: string) => {
  switch (screen) {
    case 'Home':
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      break;
    case 'Historial1':
      navigation.navigate('Historial1');
      break;
    case 'Add':
      navigation.navigate('AgregarServicio1');
      break;
    case 'Notifications':
      navigation.navigate('Notificaciones');
      break;
    case 'PerfilUsuario':
      navigation.navigate('PerfilUsuario');
      break;
  }
};

  const toggleDesplegable = () => setMostrarDesplegable(!mostrarDesplegable);

  const logout = async () => {
      try {
        setState({ token: '' });
        await cerrarSesion();
      } catch (error) {
        console.error('Error en el cierre de sesión:');
        setMessage('No se pudo cerrar la sesion');
        setVisible(true);
      }
    };

    if (loading) {
    return <PantallaCarga frase="Cargando historial..." />;
  }

  const renderNotificacion = ({ item }: { item: Notificacion }) => (
    <View style={styles.card}>
      <Text style={styles.mensaje}>{item.mensaje}</Text>
      <Text style={styles.fecha}>
        {new Date(item.fechahora_creada).toLocaleString()}
      </Text>
    </View>
  );

  return (
        <SafeAreaView style={styles.container}>
        <NavBarSuperior
            titulo="Notificaciones"
            showBackButton={true}
            onBackPress={() => navigation.goBack()}
            rightButtonType="menu"
            onRightPress={toggleDesplegable}
        />
        {/* Overlay transparente cuando el menú está abierto para que al tocar la pantalla se cierre el menú */}
        {mostrarDesplegable && (
          <TouchableWithoutFeedback onPress={() => setMostrarDesplegable(false)}>
            <View style={EstiloOverlay.overlay} />
          </TouchableWithoutFeedback>
        )}

        <MenuDesplegable
          visible={mostrarDesplegable}
          usuario={state.usuario}
          onLogout={logout}
          onRedirectAdmin={redirectAdmin}
        />
      {cargandoContenido ? (
              <PantallaCarga />
            ) : notificaciones.length === 0 ? (
              <View style={styles.vacioContainer}>
                <Image
                  source={require('../Usuario/estilos/no-results.png')}
                  style={styles.vacioImagen}
                  resizeMode="contain"
                />
                <Text style={styles.vacioTexto}>
                  No tenés notificaciones.
                </Text>
              </View>
            ) : (
              <FlatList
                data={notificaciones}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderNotificacion}
                contentContainerStyle={styles.lista}
              />
            )}
        <NavBarInferior
            activeScreen="Notificaciones"
            onNavigate={handleNavigation}
        />
        <CustomSnackbar
            visible={visible}
            setVisible={setVisible}
            message={message}
        />
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  lista: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 80, // espacio para el navbar 
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // para Android
  },
  mensaje: {
    fontSize: 16,
    color: "#333",
  },
  fecha: {
    marginTop: 6,
    fontSize: 13,
    color: "#888",
  },
  vacioContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  vacioImagen: {
    width: 160,
    height: 160,
    marginBottom: 20,
    opacity: 0.9,
  },
  vacioTexto: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    lineHeight: 22,
  },
});
export default Notificaciones;
