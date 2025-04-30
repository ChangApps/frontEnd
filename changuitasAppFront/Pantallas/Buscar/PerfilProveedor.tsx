import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ActivityIndicator, Linking,Alert, Modal, TouchableWithoutFeedback, Pressable, ScrollView, Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from '../../auxiliares/API_URL';
import {cerrarSesion} from '../../autenticacion/authService';
import { AuthContext } from '../../autenticacion/auth';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';
import EstilosPerfilProveedor from './estilos/EstilosPerfilProveedor';

const PerfilProveedor = () => {

  interface Direccion {
    calle: string;
    altura: number;
    piso: number | null;
    nroDepto: number | null;
    barrio: string;
  }

  interface Usuario {
    username: string;
    first_name: string;
    last_name: string;
    fechaNacimiento: string;
    email: string;
    telefono: string;
    direccion: Direccion;
    fotoPerfil: string | null;
  }

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [isMounted, setIsMounted] = useState(true)
  const route = useRoute<RouteProp<RootStackParamList, 'PerfilProveedor'>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
 // const [state,setState] = useContext(AuthContext);
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [reseniasUserId, setreseniasUserId] = useState<any[]>([]); 
  const [IdproveedorServicio, setIdProveedorServicio] = useState(null);
  const [idNotificacionCreada, setIdNotificacionCreada] = useState(null);
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState("");  // Estado para almacenar el mensaje de error o éxito

  const obtenerFechaActual = () => {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');  // Mes debe ser de 2 dígitos
    const dia = fecha.getDate().toString().padStart(2, '0');  // Día debe ser de 2 dígitos
    return `${anio}-${mes}-${dia}`;  // Formato 'YYYY-MM-DD'
  };
 
  const handleImagePress = () => {
    setModalVisible(true); // Mostrar el modal cuando se presiona la imagen
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Cerrar el modal cuando se presiona el botón de cerrar
  };
  
  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };



  useEffect(() => {
    const obtenerDatosAsyncStorage = async () => {
      try {
        const usuarioId = await AsyncStorage.getItem('userId');   

        if (usuarioId) {
          const userIdNumerico = parseInt(usuarioId, 10); //Hay que convertilo a integer sino es un string 
          setUserId(userIdNumerico);  
          console.log("Perfil de otro ID del usuario obtenido:", userIdNumerico);
        }
      } catch (error) {
        console.error("Error al obtener los datos de AsyncStorage:", error);
      }
    };

    obtenerDatosAsyncStorage();
  }, []);  

  // Este useEffect se ejecuta cuando userId cambie
  useEffect(() => {
    if (userId !== null) {
      console.log("userId actualizado:", userId);
    }
  }, [userId]); // Se ejecuta cuando userId cambia

  // Crear el objeto de datos con la información obtenida
  const data = {
    comentario: null, 
    fechaSolicitud: obtenerFechaActual(),
    fechaTrabajo: obtenerFechaActual(),  
    fechaValoracion: null,
    valoracion: null,
    proveedorServicio:IdproveedorServicio, 
    cliente: userId,
    notificacion: null,
    estado:"I",
  };
 

  const fetchNotificacion = async () => {
    try {
      // Obtiene el token de acceso desde AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('Token obtenido de AsyncStorage:', accessToken);
  
      if (!accessToken) {
        throw new Error('No se encontró el token de acceso');
      }
  
      // Obtener la fecha y hora actual en formato UTC
      const fechaActual = new Date();
      const fechaHoraUTC = fechaActual.toISOString(); // Formato "YYYY-MM-DDTHH:mm:ss.sssZ"
  
      // Se crea el objeto de datos para la notificación
      const dataNotificacion = {
        fechaHora: fechaHoraUTC,
        mensaje: "Se ha iniciado una nueva solicitud",
        tipoSistema: true,
        Usuario: userId,
      };
  
      console.log("Datos de notificación a enviar:", dataNotificacion);
  
      // Realizamos la solicitud al backend para crear la notificación
      const responseNotificacion = await fetch(`${API_URL}/notificacion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(dataNotificacion),
      });
  
      console.log('Response status (NOTIFICACION):', responseNotificacion.status);
  
      if (!responseNotificacion.ok) {
        throw new Error(`Error al crear la notificación: ${responseNotificacion.status}`);
      }
  
      // Procesar la respuesta del servidor
      const responseData = await responseNotificacion.json();
      console.log('Datos de la notificación recibidos:', responseData);

          // Extraer el ID de la notificación creada
       const notificacionId = responseData.id;
      console.log('ID de la notificación creada:', notificacionId);

      return notificacionId; // Retornar el ID de la notificación
      
    } catch (error) {
      console.error('Error al crear la notificación:', error);
      setMessage("Error. al crear la notificacion.");
      setVisible(true);
    }
  };

//Agregar errores al snackbar 
  const iniciarChanguita = async () => {
    try {
      console.log("data a enviar:", data);  
  
      const accessToken = await AsyncStorage.getItem('accessToken');
  
      if (!accessToken) {
        Alert.alert("Error", "No hay token de autenticación.");
        return;
      }
  
      const response = await fetch(`${API_URL}/solicitudes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),  
      });
  
      const responseJson = await response.json();  
  
      console.log("Respuesta del servidor:", responseJson);  // Respuesta de la API
  
      if (response.ok) {
        Alert.alert("Éxito", "Proveedor servicio creado con éxito.");

       const idSolicitud = responseJson.id 
       const id = Array.isArray(route.params.id) ? String(route.params.id[0]) : String(route.params.id);
        navigation.navigate('DetalleTarea', { id,idSolicitud});

      } else {
        Alert.alert("Error", responseJson.error || "No se pudo enviar la solicitud.");
        setMessage("Error. al enviar la solicitud.");
        setVisible(true);
      }
    } catch (error) {
      setMessage("Error. al enviar la solicitud.");
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

  // Mostrar los datos pasados desde la pantalla anterior
  useEffect(() => {
    // Verificar si el componente sigue montado
    setIsMounted(true);

    if (route.params?.id) {
      console.log('ID obtenido:', route.params.id);
    } else {
      console.log('No se encontraron id.');
    }
    fetchUsuario();
    fetchProveedorServicio();

    return () => {
      // Cuando el componente se desmonte, poner el flag a false
      setIsMounted(false);
    };

  }, [route.params]);

  //Habria que ver para buscar el servicio es correspondiente al que se busca no lo solo agarrar el primero
  const fetchProveedorServicio = async () => {
    if (!isMounted) return;
    try {
      // Obtén el token de acceso desde AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('Token obtenido de AsyncStorage:', accessToken);
  
      if (!accessToken) {
        throw new Error('No se encontró el token de acceso');
      }
  
      const proveedorId = route.params.id; //solo para usar en esta funcion
      setreseniasUserId(route.params.id); //para pasar a resenias 

     const idServicioString = await AsyncStorage.getItem('idServicio'); 
     const servicioIdentificador =  idServicioString ? parseInt(idServicioString, 10) : null;

      // Realiza la solicitud al backend para obtener los ProveedorServicio
      console.log("Datos a enviar en fetchProveedor:",proveedorId," y ",servicioIdentificador);
      const responseProveedor = await fetch(`${API_URL}/proveedores-servicios/usuario/${proveedorId}/${ servicioIdentificador}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      console.log('Response status (ProveedorServicio):', responseProveedor.status);
  
      if (!responseProveedor.ok) {
        throw new Error(`Error al obtener el ProveedorServicio: ${responseProveedor.status}`);
      }
  
      // Procesa los datos del proveedor de servicio
      const dataProveedor = await responseProveedor.json();
      const proveedor = Array.isArray(dataProveedor) ? dataProveedor[0] : dataProveedor;
      setIdProveedorServicio(proveedor?.id);
    } catch (error) {
      setMessage("Error. al enviar la solicitud.");
      setVisible(true);
    }
  };


  const fetchUsuario = async () => {
    if (!isMounted) return;
    try {
      // Obtén el token de acceso desde AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');
      //console.log('Token obtenido de AsyncStorage:', accessToken);
  
      if (!accessToken) {
        throw new Error('No se encontró el token de acceso');
      }
  
      const proveedorId = route.params.id;
      console.log('fetchUsuario: ID del usuario extraído:', proveedorId);
  
      // Se realiza la solicitud para obtener los datos del usuario
      const responseUsuario = await fetch(`${API_URL}/usuarios/${proveedorId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!responseUsuario.ok) {
        throw new Error(`Error al obtener el usuario: ${responseUsuario.status}`);
      }
  
      // Procesa los datos del usuario
      const dataUsuario: Usuario = await responseUsuario.json();
      console.log('Datos del usuario recibidos:', dataUsuario); // Verifica los datos del usuario
      setUsuario(dataUsuario);
      setImageUri(dataUsuario.fotoPerfil || 'https://via.placeholder.com/80');
  
    } catch (error: any) {
      console.error('Error al cargar los datos del usuario:', error); // Detalles del error
      setError('No se pudo cargar el perfil del usuario');
      setMessage("Error. No se pudo cargar el perfil.");
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };


  // Función para manejar el enlace de WhatsApp
  const handleChat = () => {
    const phoneNumber = usuario?.telefono;
    let whatsappLink = "";
  
    if (Platform.OS === "web") {
      whatsappLink = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
    } else {
      whatsappLink = `https://wa.me/${phoneNumber}`;
    }
  
    Linking.openURL(whatsappLink).catch((err) =>
      console.error("Error al abrir WhatsApp", err)
    );
  };

  // Mostrar la vista de carga o error
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  const bloquearUsuario = async (idUsuario: number) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/bloquear/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ usuario_id: idUsuario }),
      });
  
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        Alert.alert("Éxito", "Usuario bloqueado con éxito.");
        navigation.navigate('Home'); 
      } else {
        Alert.alert("Error", data.error || "No se pudo bloquear al usuario.");
      }
    } catch (error) {
      console.error("Error al bloquear usuario:", error);
      setMessage("Error. al bloquear el usuario.");
      setVisible(true);
    }
  };

  return (
    <SafeAreaView style={EstilosPerfilProveedor.contenedor}>
       <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }} keyboardShouldPersistTaps="handled">
      {/* Encabezado con opciones de menú */}
      <View style={EstilosPerfilProveedor.encabezado}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={EstilosPerfilProveedor.textoEncabezado}>Perfil de {usuario?.first_name}</Text>
        <TouchableOpacity onPress={toggleDesplegable}>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

            {/* Menú Desplegable */}
            {mostrarDesplegable && (
        <View style={EstilosPerfilProveedor.desplegable}>
          <TouchableOpacity onPress={logout} style={EstilosPerfilProveedor.opcionDesplegable}>
            <Text style={EstilosPerfilProveedor.textoDesplegable}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}


{/* Información del Usuario */}
<View style={EstilosPerfilProveedor.seccionUsuario}>
  <Pressable onPress={handleImagePress}>
    <Image source={{ uri: imageUri || undefined }} style={EstilosPerfilProveedor.imagenModal} />
  </Pressable>
  <Text style={EstilosPerfilProveedor.nombreCompleto}>{usuario?.first_name} {usuario?.last_name}</Text>
</View>

<Modal
  visible={modalVisible}
  animationType="fade"
  transparent={true}
  onRequestClose={handleCloseModal}
>
  <TouchableWithoutFeedback onPress={handleCloseModal}>
    <View style={EstilosPerfilProveedor.modalContainer}>
      <Image 
        source={{ uri: imageUri || 'https://via.placeholder.com/80' }} 
        style={EstilosPerfilProveedor.imagenModal} 
      />
    </View>
  </TouchableWithoutFeedback>
</Modal>

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

      {/* Botones */}
      <View style={EstilosPerfilProveedor.buttonContainer}>
      <TouchableOpacity style={EstilosPerfilProveedor.nextButton} onPress={iniciarChanguita}>
          <Text style={EstilosPerfilProveedor.nextButtonText}>Iniciar changuita</Text>
        </TouchableOpacity>
        <TouchableOpacity style={EstilosPerfilProveedor.prevButton} onPress={handleChat}>
          <Text style={EstilosPerfilProveedor.prevButtonText}>Chatear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={EstilosPerfilProveedor.prevButton} onPress={() => bloquearUsuario(Number(route.params.id))}>
          <Text style={EstilosPerfilProveedor.prevButtonText}>Bloquear</Text>
        </TouchableOpacity>
      </View>

      {/* Datos adicionales */}
      <View style={EstilosPerfilProveedor.datosExtras}>
        <View style={EstilosPerfilProveedor.datoItem}>
        <Text style={EstilosPerfilProveedor.datoNumero}>{(usuario as any)?.cantServiciosContratados ?? 0}</Text>
          <Text style={EstilosPerfilProveedor.datoLabel}>Contrató</Text>
        </View>
        <View style={EstilosPerfilProveedor.datoItem}>
        <Text style={EstilosPerfilProveedor.datoNumero}>{(usuario as any)?.cantServiciosTrabajados ?? 0}</Text>
          <Text style={EstilosPerfilProveedor.datoLabel}>Trabajó</Text>
        </View>

         {/* Puntaje con botón para abrir las reseñas */}
        <TouchableOpacity 
                  onPress={() => {
                    navigation.navigate("Resenias", { idUsuario: reseniasUserId });
                  }}
                >
                <View style={EstilosPerfilProveedor.datoItem}>
                <Text style={EstilosPerfilProveedor.datoNumero}>{(usuario as any)?.puntaje ?? 0}</Text>
                  <Text style={EstilosPerfilProveedor.datoLabel}>Puntaje</Text>
                </View>
                </TouchableOpacity>
      </View>

      {/* Datos Personales */}
      <Text style={EstilosPerfilProveedor.tituloDatosPersonales}>DATOS PERSONALES</Text>
      <View style={EstilosPerfilProveedor.datosPersonales}>
        <Text style={EstilosPerfilProveedor.infoUsuario}>Nombre: {usuario?.first_name}</Text>
        <Text style={EstilosPerfilProveedor.infoUsuario}>Apellido: {usuario?.last_name}</Text>
        <Text style={EstilosPerfilProveedor.infoUsuario}>Fecha de Nacimiento: {usuario?.fechaNacimiento}</Text>
        <Text style={EstilosPerfilProveedor.infoUsuario}>Correo Electronico: {usuario?.email}</Text>
        <Text style={EstilosPerfilProveedor.infoUsuario}>Telefono: {usuario?.telefono}</Text>
        <Text style={EstilosPerfilProveedor.infoUsuario}>Direccion: {usuario?.direccion?.calle}</Text>
      </View>

      {/* Barra de navegación inferior */}
       <BarraNavegacionInferior/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PerfilProveedor;

