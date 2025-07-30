// pantallas/Notificaciones.tsx
import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
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
      obtenerNotificaciones();
  }, []);

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
      } catch (error: any) {
        console.log('Error en el cierre de sesión:', error.message);
      }
    };

  const renderNotificacion = ({ item }: { item: Notificacion }) => (
    <View style={styles.card}>
      <Text style={styles.mensaje}>{item.mensaje}</Text>
      <Text style={styles.fecha}>
        {new Date(item.fechahora_creada).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => setMostrarDesplegable(false)}>
        <SafeAreaView style={styles.container}>
        <NavBarSuperior
            titulo="Notificaciones"
            showBackButton={true}
            onBackPress={() => navigation.goBack()}
            rightButtonType="menu"
            onRightPress={toggleDesplegable}
        />
        <MenuDesplegable
            visible={mostrarDesplegable}
            usuario={state.usuario}
            onLogout={logout}
            onRedirectAdmin={redirectAdmin}
        />
        {cargandoContenido ? (
            <PantallaCarga />
        ) : notificaciones.length === 0 ? (
            <Text style={styles.vacio}>No tenés notificaciones.</Text>
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  lista: {
    padding: 16,
  },
  card: {
    backgroundColor: "#eee",
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
  },
  mensaje: {
    fontSize: 16,
  },
  fecha: {
    marginTop: 6,
    fontSize: 12,
    color: "#666",
  },
  vacio: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#777",
  },
});

export default Notificaciones;
