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
  const [state,setState] = useContext(AuthContext);
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
  const [rol, setRol] = useState<'cliente' | 'trabajador' | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false); //para el cancelar changuita
  const [motivoSeleccionado, setMotivoSeleccionado] = useState('');

const motivosCancelacion = [
  'No puedo asistir',
  'Tuve un inconveniente personal',
  'El cliente no responde',
  'Cambio de planes',
  'Otro motivo',
];


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
    console.log("Id de solicitud recibido: ",route.params.idSolicitud);
    fetchUsuario();
    fetchDatosSolicitud();
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

  useEffect(() => {
  console.log("Rol actualizado:", rol);
    console.log("Render - rol:", rol, "estado:", estado);

}, [rol]);

  const aceptarChanguita = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) throw new Error('No se encontró el token');
  
      console.log("ID de solicitud: ",idSolicitud);
      const response = await fetch(`${API_URL}/aceptar-changuita/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          solicitud_id: idSolicitud 
        })
      });
  
      if (!response.ok) throw new Error('No se pudo aceptar la changuita');
  
    await fetchDatosSolicitud();
      setMessage('¡Changuita aceptada!');
      setVisible(true);
    } catch (error: any) {
      console.error('Error al aceptar changuita:', error.message);
      setMessage('Error al aceptar changuita');
      setVisible(true);
    }
  };
  
  const fetchDatosSolicitud = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No se encontró el token de acceso');
      }
  
      const idDatosSolicitud = route.params.idSolicitud;
      const responsDatosSolicitud = await fetch(`${API_URL}/solicitudes/${idDatosSolicitud}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!responsDatosSolicitud.ok) {
        const errorData = await responsDatosSolicitud.json();
        console.error('Error del servidor:', errorData);
        throw new Error(`Error al obtener los datos de la solicitud: ${errorData.detail || 'Respuesta no válida'}`);
      }
  
      const dataSolicitud = await responsDatosSolicitud.json();
      setfechaSolicitud(dataSolicitud.fechaSolicitud);
      setNombreServicio(dataSolicitud.nombreServicio);
      setEstado(dataSolicitud.estado);
      setValoracion(dataSolicitud.valoracion);

      const userId = await AsyncStorage.getItem('userId');
      console.log("Comparando:");
      console.log("userId (string):", userId);
      console.log("dataSolicitud.cliente (number):", dataSolicitud.cliente);
      console.log("dataSolicitud.cliente.toString():", dataSolicitud.cliente.toString());
      console.log("Resultado comparación (cliente):", userId === dataSolicitud.cliente.toString());
    
      if (userId === dataSolicitud.cliente.toString()) {
        console.log("Soy el CLIENTE");
        setRol('cliente');
        return;
      }
      if (userId === dataSolicitud.proveedor_id.toString()) {
        console.log("Soy el TRABAJADOR");
        setRol('trabajador');
        return;
      }
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

      const response = await fetch(`${API_URL}/finalizar-changuita/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          solicitud_id:idSolicitud
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
     setState({ token: "" });
      await cerrarSesion(); // Simula el proceso de cierre de sesión
      console.log('Sesión cerrada correctamente'); // Log al finalizar el cierre de sesión
    }  catch (error: any) {
        console.log('Error en el cierre de sesión:', error.message);
        setMessage("Error en el cierre de sesion");
        setVisible(true);
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
    fecha: fechaSolicitud, 
    puntaje: (valoracion && valoracion > 0) ? valoracion : 'Aun no asignado',
    estado: estado === 'F' ? 'Finalizado' 
    : estado === 'C' ? 'Cancelado' 
    : estado === 'I' ? 'Iniciado' 
    : estado === 'PA' ? 'Pendiente Aceptacion'
    : estado,
  };

  return (
    <SafeAreaView style={ EstilosDetalleTarea.contenedor}>
      {/* Encabezado con opciones de menú */}
      <View style={ EstilosDetalleTarea.encabezado}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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

<Modal
  transparent={true}
  visible={mostrarModal}
  animationType="fade"
  onRequestClose={() => setMostrarModal(false)}
>
  <View style={{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <View style={{
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
    }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15 }}>
        ¿Por qué querés cancelar la changuita?
      </Text>

      {motivosCancelacion.map((motivo, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setMotivoSeleccionado(motivo)}
          style={{
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons
            name={motivoSeleccionado === motivo ? 'radio-button-on' : 'radio-button-off'}
            size={20}
            color="#197278"
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 16 }}>{motivo}</Text>
        </TouchableOpacity>
      ))}

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
        <TouchableOpacity onPress={() => setMostrarModal(false)} style={{ marginRight: 15 }}>
          <Text style={{ color: '#888' }}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!motivoSeleccionado}
          onPress={() => {
            // Enviar motivo al backend o manejar acción
            console.log('Changuita cancelada por:', motivoSeleccionado);
            cancelarSolicitud();
            setMostrarModal(false);
            setMotivoSeleccionado('');
          }}
        >
          <Text style={{
            color: motivoSeleccionado ? '#b00020' : '#ccc',
            fontWeight: 'bold'
          }}>
            Confirmar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>



{/* Botón si el estado es PA y sos trabajador */}
{rol === 'trabajador' && estado === 'PA' && (
  <View style={EstilosDetalleTarea.buttonContainer}>
    <TouchableOpacity 
      style={EstilosDetalleTarea.prevButton} 
   onPress={() => setMostrarModal(true)}
    >
      <Text style={EstilosDetalleTarea.prevButtonText}>Cancelar changuita</Text>
    </TouchableOpacity>
  </View>
)}

{/* Botón si el estado es Iniciado y sos trabajador */}
{rol === 'trabajador' && estado === 'I' && (
  <View style={EstilosDetalleTarea.buttonContainer}>
    <TouchableOpacity 
      style={EstilosDetalleTarea.prevButton} 
    onPress={() => setMostrarModal(true)}
    >
      <Text style={EstilosDetalleTarea.prevButtonText}>Cancelar changuita</Text>
    </TouchableOpacity>
  </View>
)}


{/* Finalizar y cancelar, visible solo si no es PA y no está finalizada ni cancelada */}
{rol === 'cliente' && !(estado === 'F' || estado === 'C' || estado === 'Finalizado' || estado === 'Cancelado' || estado === 'Pendiente Aceptacion') && (
  <View style={ EstilosDetalleTarea.buttonContainer}>
    <TouchableOpacity 
      style={ EstilosDetalleTarea.nextButton} 
      onPress={() => navigation.navigate('CalificarTarea', { idSolicitud })}
    >
      <Text style={ EstilosDetalleTarea.nextButtonText}>Finalizar changuita</Text>
    </TouchableOpacity>
    <TouchableOpacity 
      style={ EstilosDetalleTarea.prevButton} 
     onPress={() => setMostrarModal(true)}
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