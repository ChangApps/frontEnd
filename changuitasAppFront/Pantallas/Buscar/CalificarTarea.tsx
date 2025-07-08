import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Linking, Alert, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import API_URL from '../../utils/API_URL';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import { NavBarSuperior } from '../../componentes/NavBarSuperior';
import { Button } from '../../componentes/Buttons';
import { NavBarInferior } from '../../componentes/NavBarInferior';
import Colors from '../../assets/Colors';
import { AuthContext } from '../../autenticacion/auth';
import { cerrarSesion } from '../../autenticacion/authService';
import MenuDesplegable from '../../componentes/MenuDesplegable';

const CalificarTarea = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CalificarTarea'>>();

  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  // Estados para el menú desplegable
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [state, setState] = useContext(AuthContext)

  useEffect(() => {
    console.log("CalificarTarea: ID DE SOLICITUD RECIBIDO:", route.params.idSolicitud);
  }, [route.params.idSolicitud]);

  const actualizarSolicitud = async () => {
    if (calificacion === 0 || comentario.trim() === "") {
      setMessage('Error, Debe completar la calificación y el comentario antes de continuar.');
      setVisible(true);
      return;
    }

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) throw new Error('No se encontró el token de acceso');

      const idSolicitud = route.params.idSolicitud;

      const response = await fetch(`${API_URL}/valorar-changuita/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          solicitud_id: idSolicitud,
          comentario,
          valoracion: calificacion,
        }),
      });

      if (!response.ok) throw new Error('Error al actualizar la solicitud');

      console.log("Solicitud actualizada correctamente");
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al actualizar la solicitud:', error);
      setMessage('Error al actualizar la solicitud.');
      setVisible(true);
    }
  };

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

  // Función para alternar el menú desplegable
  const toggleDesplegable = () => { setMostrarDesplegable(!mostrarDesplegable); };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      setState({ token: "" });
      await cerrarSesion();
      console.log('Sesión cerrada correctamente');
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

  // Función para redirigir al admin
  const redirectAdmin = () => {
    Linking.openURL('http://127.0.0.1:8000/admin/');
  };

  const titleSizeNavbarSuperior = Platform.OS === 'web' ? 35 : 25;

  const startSize = Platform.OS === 'web' ? 40 : 30;

  return (
    <SafeAreaView edges={['top']} style={styles.safeContainer}>
      <TouchableWithoutFeedback onPress={() => {
        if (mostrarDesplegable) setMostrarDesplegable(false); // ocultar el menú
      }}>
        <View style={styles.container}>
          {/* NavBar Superior */}
          <NavBarSuperior
            titulo="Calificar tarea"
            titleSize={titleSizeNavbarSuperior}
            showBackButton={true}
            onBackPress={() => { navigation.goBack(); }}
            rightButtonType="menu"
            onRightPress={() => { toggleDesplegable(); }}
          />

          {/* Menú Desplegable */}
          <MenuDesplegable
            visible={mostrarDesplegable}
            usuario={state.usuario}
            onLogout={logout}
            onRedirectAdmin={redirectAdmin}
          />

          {/* Contenido Principal con ScrollView */}
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Contenido Principal */}
            <View style={styles.content}>
              {/* Calificación */}
              <Text style={styles.label}>Puntúe el trabajo realizado:</Text>
              <View style={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <TouchableOpacity key={i} onPress={() => setCalificacion(i + 1)}>
                    <Ionicons
                      name={i < calificacion ? "star" : "star-outline"}
                      size={startSize}
                      color={i < calificacion ? "#FFD700"     // estrellas marcadas en amarillo
                        : Colors.blancoTexto  // contorno blanco en las vacías
                      }
                      style={styles.star}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Comentario */}
              <Text style={styles.label}>Escriba más detalles (Opcional):</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Descripción"
                placeholderTextColor="#999999"
                multiline
                textAlignVertical="top"
                value={comentario}
                onChangeText={setComentario}
              />

              {/* Botón Calificar */}
              <View style={styles.buttonContainer}>
                <Button
                  titulo="Calificar"
                  onPress={actualizarSolicitud}
                  backgroundColor={Colors.naranja}
                  textColor={Colors.fondo}
                  textSize={20}
                  borderRadius={25}
                  padding={15}
                />
              </View>
            </View>
          </ScrollView>

          {/* NavBar Inferior */}
          <NavBarInferior
            activeScreen="CalificarTarea" // O el screen activo correspondiente
            onNavigate={handleNavigation}
          />

          {/* Snackbar para errores */}
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={Snackbar.DURATION_SHORT}
            style={styles.snackbar}
          >
            {message}
          </Snackbar>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

  let paddingHorizontalContenido = 250;//50
  if (Platform.OS == "android") {
    paddingHorizontalContenido = 20
  }

  let espacioStart = 20
  if (Platform.OS == "android") {
    espacioStart = 10
  }

  let cajaDescripcionSize = 160
  if (Platform.OS == "android") {
    cajaDescripcionSize = 200
  }

  let paddingTopContenedor = 20
  if (Platform.OS == "android") {
    paddingTopContenedor = 30
  }

  let paddingHorizontalBoton = 80
  if (Platform.OS == "android") {
    paddingHorizontalBoton = 30
  }

  let paddingVerticalBoton = 15
  if (Platform.OS == "android") {
    paddingVerticalBoton = 60
  }

  let marginStart = 15
  if (Platform.OS == "android") {
    marginStart = 30
  }

  let marginBox = 10
  if (Platform.OS == "android") {
    marginBox = 30
  }

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20, // Espaciado adicional al final
  },
  content: {
    flex: 1,
    paddingHorizontal: paddingHorizontalContenido,
    paddingTop: paddingTopContenedor,
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 20,
    color: Colors.blancoTexto,
    marginBottom: marginStart,
    fontWeight: '500',
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: marginBox,
    paddingVertical: 10,
  },
  star: {
    marginHorizontal: espacioStart,
  },
  textInput: {
    backgroundColor: Colors.blancoOscuroTexto,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: Colors.naranja,
    padding: 15,
    minHeight: cajaDescripcionSize,
    fontSize: 20,
    color: Colors.negro,
    marginBottom: 30,
    textAlignVertical: 'top',

  },
  buttonContainer: {
    paddingHorizontal: paddingHorizontalBoton, 
    marginTop: 'auto',
    marginBottom: paddingVerticalBoton,
  },
  snackbar: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    zIndex: 100000,
  },
});

export default CalificarTarea;