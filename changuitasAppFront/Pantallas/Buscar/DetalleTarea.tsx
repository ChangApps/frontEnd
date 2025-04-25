import React, { useContext, useEffect, useState} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image,Alert, TouchableWithoutFeedback, Modal } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import {cerrarSesion} from '../../autenticacion/authService';
import { AuthContext } from '../../autenticacion/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../auxiliares/API_URL';
import { Snackbar } from 'react-native-paper';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';
import EstilosDetalleTarea from './estilos/EstilosDetalleTarea';

const DetalleTarea = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
 // const [state,setState] = useContext(AuthContext);
  const [nombreServicio, setNombreServicio] = useState('');
  const route = useRoute<RouteProp<RootStackParamList, 'DetalleTarea'>>();
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState("");  // Estado para almacenar el mensaje de error o éxito
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
  });
  const [idSolicitud, setidSolicitud] = useState(""); 
  const [fechaSolicitud, setfechaSolicitud] = useState(""); 
  const [estado, setEstado] = useState(""); 
  const [valoracion, setValoracion] = useState(null); 

  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };
  const handleImagePress = () => {
    setModalVisible(true); // Mostrar el modal cuando se presiona la imagen
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Cerrar el modal cuando se presiona el botón de cerrar
  };
  
  useEffect(() => {
    fetchUsuario();
    fetchDatosSolicitud();
  }, []);  // Solo se ejecuta una vez cuando el componente se monta


  const fetchDatosSolicitud = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No se encontró el token de acceso');
      }
  
  //    console.log("ROute params de id solicitud: ",idSolicitud);
      const idDatosSolicitud = route.params.idSolicitud;

      const responsDatosSolicitud = await fetch(`${API_URL}/solicitudes/${idDatosSolicitud}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!responsDatosSolicitud.ok) {
        throw new Error('Error al obtener los datos de la solicitud');
      }
  
      const dataSolicitud = await responsDatosSolicitud.json();
      setfechaSolicitud(dataSolicitud.fechaSolicitud);
      setNombreServicio(dataSolicitud.nombreServicio);
      setEstado(dataSolicitud.estado);
      setValoracion(dataSolicitud.valoracion);
    } catch (error) {
      console.error('Error al cargar los datos de la solicitud', error);
    }
  };
 
  const fetchUsuario = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No se encontró el token de acceso');
      }
  
      const userId = route.params.id;
      setidSolicitud(route.params.idSolicitud);

  //    console.log("iD DE SOLICITUD RECIBIDO: ",route.params.idSolicitud);

      const responseUsuario = await fetch(`${API_URL}/usuarios/${userId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!responseUsuario.ok) {
        throw new Error('Error al obtener el usuario');
      }
  
      const dataUsuario = await responseUsuario.json();
    //  console.log("Data usuario: ",dataUsuario);
      setUsuario({
        nombre: dataUsuario.first_name || 'Nombre no disponible',
        apellido: dataUsuario.last_name || 'Apellido no disponible'
      });
      setImageUri(dataUsuario.fotoPerfil);
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  };

  const cancelarSolicitud = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) throw new Error('No se encontró el token de acceso');

      const idSolicitud = route.params.idSolicitud;

      const response = await fetch(`${API_URL}/solicitudes/${idSolicitud}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          estado: "C",
          fechaValoracion: new Date().toISOString().split('T')[0], // Sirviria como fecha de cancelacion
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
  const logout = async () => {
    try {
  //    setState({ token: "" });
      await cerrarSesion(); // Simula el proceso de cierre de sesión
      console.log('Sesión cerrada correctamente'); // Log al finalizar el cierre de sesión
    }  catch (error: any) {
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

  const serviceData = {
    servicio: nombreServicio,
    fecha: fechaSolicitud, // obtenerFechaActual(),
    puntaje: (valoracion && valoracion > 0) ? valoracion : 'Aun no asignado',
    estado: estado === 'F' ? 'Finalizado' 
    : estado === 'C' ? 'Cancelado' 
    : estado === 'I' ? 'Iniciado' 
    : estado,
  };

  return (
    <SafeAreaView style={ EstilosDetalleTarea.contenedor}>
      {/* Encabezado con opciones de menú */}
      <View style={ EstilosDetalleTarea.encabezado}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={ EstilosDetalleTarea.textoEncabezado}>Detalle de la tarea</Text>
        <TouchableOpacity onPress={toggleDesplegable}>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Menú Desplegable */}
      {mostrarDesplegable && (
        <View style={ EstilosDetalleTarea.desplegable}>
          <TouchableOpacity onPress={logout} style={ EstilosDetalleTarea.opcionDesplegable}>
            <Text style={ EstilosDetalleTarea.textoDesplegable}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Información del Usuario */}
      <View style={ EstilosDetalleTarea.seccionUsuario}>
      <Image source={{ uri: imageUri || undefined }}style={ EstilosDetalleTarea.imagenUsuario} />
      <Text style={ EstilosDetalleTarea.nombreCompleto}>{usuario.nombre} {usuario.apellido}</Text>
      </View>

      {/* Datos Personales */}
      <Text style={ EstilosDetalleTarea.tituloDatosPersonales}>DATOS DE LA TAREA</Text>
      <View style={ EstilosDetalleTarea.datosPersonales}>
        <Text style={ EstilosDetalleTarea.infoUsuario}>Servicio: {serviceData.servicio}</Text>
        <Text style={ EstilosDetalleTarea.infoUsuario}>Fecha: {serviceData.fecha}</Text>
        <Text style={ EstilosDetalleTarea.infoUsuario}>Puntaje: {serviceData.puntaje}</Text>
        <Text style={ EstilosDetalleTarea.infoUsuario}>Estado: {serviceData.estado}</Text>
      </View>

         {/* Snackbar para mostrar mensajes */}
         <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={4000} // 4 segundos
          style={{
            marginLeft: -30, 
            alignSelf: "center", 
            width: "90%", 
          }}
        >
          {message}
        </Snackbar>

        <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={ EstilosDetalleTarea.modalContainer}>
            <Image 
              source={{ uri: imageUri || 'https://via.placeholder.com/80' }} 
              style={ EstilosDetalleTarea.imagenModal} 
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Botones */}
      {!(serviceData.estado === 'F' || serviceData.estado === 'C' || serviceData.estado === 'Finalizado' || serviceData.estado === 'Cancelado') && (
  <View style={ EstilosDetalleTarea.buttonContainer}>
        <TouchableOpacity 
          style={ EstilosDetalleTarea.nextButton} 
          onPress={() => navigation.navigate('CalificarTarea', { idSolicitud })}
        >
          <Text style={ EstilosDetalleTarea.nextButtonText}>Finalizar changuita</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={ EstilosDetalleTarea.prevButton} 
          onPress={cancelarSolicitud}
        >
          <Text style={ EstilosDetalleTarea.prevButtonText}>Cancelar changuita</Text>
        </TouchableOpacity>
      </View>
    )}
      {/* Barra de navegación inferior */}
      <BarraNavegacionInferior/>
    </SafeAreaView>
  );
};
export default DetalleTarea;
