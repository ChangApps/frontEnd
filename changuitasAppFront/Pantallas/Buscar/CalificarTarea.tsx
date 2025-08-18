import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, Linking, TouchableWithoutFeedback, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import styles from './estilos/EstilosCalificarTarea';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import CustomSnackbar from '../../componentes/CustomSnackbar';
import PantallaCarga from '../../componentes/PantallaCarga';
import { redirectAdmin } from '../../utils/utils';
import getStyles from './estilos/EstilosCalificarTarea';

const CalificarTarea = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CalificarTarea'>>();

  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [cargando, setCargando] = useState(false);

  // Estados para el menú desplegable
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [state, setState] = useContext(AuthContext)

  useEffect(() => {
    console.log("CalificarTarea: ID DE SOLICITUD RECIBIDO:", route.params.idSolicitud);
  }, [route.params.idSolicitud]);

  const actualizarSolicitud = async () => {
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
          comentario: comentario.trim() === '' ? 'Sin comentarios' : comentario.trim(),
          valoracion: calificacion,
        }),
      });

      if (!response.ok) {
        let errorMsg = 'Error al actualizar la solicitud';
        try {
          const errorData = await response.json();
          if (errorData && errorData.error) errorMsg = errorData.error;
        } catch (e) {}
        throw new Error(errorMsg);
      }

      setCargando(false);
      //Arreglar esto (ver como se puede mejorar)
      setMessage('¡Changuita calificada exitosamente!');
      setVisible(true);
        setTimeout(() => {
        navigation.navigate('Home');
      }, 2000); // 2 segundos para que se vea el mensaje
    } catch (error) {
      setCargando(false);
      console.log('Error al actualizar la solicitud:', error);
      setMessage('Error al actualizar la solicitud.');
      setVisible(true);
    }
  };

    const finalizarChanguita = async () => {
      if (calificacion === 0) {
        setMessage('Error, debe completar la calificación antes de continuar.');
        setVisible(true);
        return;
      }

      setCargando(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');
        await fetch(`${API_URL}/finalizar-changuita/`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ solicitud_id:  route.params.idSolicitud })
        });
        actualizarSolicitud(); // Llamar a la función para actualizar la solicitud, si todo sale bien
      } catch {
        setMessage('Error al finalizar la changuita.');
        setVisible(true);
        setCargando(false);
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
        navigation.navigate('Notificaciones');
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
    } catch (error) {
      console.log('Error en el cierre de sesión:', error);
      setMessage('Error al cerrar sesión');
      setVisible(true);
    } 
  };

  const startSize = Platform.OS === 'web' ? 40 : 30;
    const { width } = useWindowDimensions();
  const styles = getStyles(width);
  
  return (
    <SafeAreaView style={styles.safeContainer}>
      {cargando ? (
        <PantallaCarga frase="Procesando..."/>
      ) : (
        <TouchableWithoutFeedback onPress={() => {
          if (mostrarDesplegable) setMostrarDesplegable(false); // ocultar el menú
        }}>
          <View style={styles.container}>
            {/* NavBar Superior */}
            <NavBarSuperior
              titulo="Calificar tarea"
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
                        color={i < calificacion ? "#FFD700" : Colors.blancoTexto}
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
                    onPress={finalizarChanguita}
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
              activeScreen="CalificarTarea"
              onNavigate={handleNavigation}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      {/* CustomSnackbar */}
      <CustomSnackbar
        visible={visible}
        setVisible={setVisible}
        message={message}
      />
    </SafeAreaView>
  );
};

export default CalificarTarea;