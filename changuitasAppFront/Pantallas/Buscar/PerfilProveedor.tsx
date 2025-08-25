import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Linking, Modal, TouchableWithoutFeedback, Pressable, ScrollView, Platform, ImageStyle } from 'react-native';
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from '../../utils/API_URL';
import { cerrarSesion } from '../../autenticacion/authService';
import { AuthContext } from '../../autenticacion/auth';
import EstilosPerfilProveedor from './estilos/EstilosPerfilProveedor';
import MenuDesplegable from '../../componentes/MenuDesplegable';
import { NavBarInferior } from '../../componentes/NavBarInferior';
import { Button } from '../../componentes/Buttons';
import { COLORES_APP, FUENTES, DIMENSIONES } from '../../componentes/estilosCompartidosPerfilesUsuarios';
import { Direccion, ServicioArreglado } from '../../types/interfaces';
import { redirectAdmin } from '../../utils/utils';
import CustomSnackbar from '../../componentes/CustomSnackbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavBarSuperior } from '../../componentes/NavBarSuperior';
import PantallaCarga from '../../componentes/PantallaCarga';
import EstiloOverlay from '../../componentes/estiloOverlayMenuDesplegable';
import Colors from '../../assets/Colors';


const PerfilProveedor = () => {

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
  const [state, setState] = useContext(AuthContext);
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [reseniasUserId, setreseniasUserId] = useState<number | null>(null);
  const [IdproveedorServicio, setIdProveedorServicio] = useState(null);
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState("");  // Estado para almacenar el mensaje de error o éxito
  const [cargando, setCargando] = useState(false); //para las pantallas de cargas
  const [DataServicio, setDataServicio] = useState<ServicioArreglado | null>(null);

  const formatearFecha = (fecha: string): string => {
    const [año, mes, dia] = fecha.split("-");
    return `${dia}/${mes}/${año}`;
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

  const logout = async () => {
    try {
      setState({ token: "" });
      await cerrarSesion(); // Simula el proceso de cierre de sesión
      console.log('Sesión cerrada correctamente'); // Log al finalizar el cierre de sesión
    } catch (error) {
      console.error('Error en el cierre de sesión:', error);
      setMessage("Error en el cierre de sesion");
      setVisible(true);
    }
  };

  useEffect(() => {
    const obtenerDatosAsyncStorage = async () => {
      try {
        const usuarioId = await AsyncStorage.getItem('userId');

        if (usuarioId) {
          const userIdNumerico = parseInt(usuarioId, 10); //Hay que convertilo a integer sino es un string 
          setUserId(userIdNumerico);
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


  //Agregar errores al snackbar 
  const iniciarChanguita = async () => {
    setCargando(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        setMessage("Error");
        setVisible(true);
        setCargando(false);
        return;
      }
      const response = await fetch(`${API_URL}/iniciar-changuita/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          proveedorServicio: IdproveedorServicio,
        }),
      });

      const responseJson = await response.json();

      if (response.ok) {
        console.log("Éxito", "Proveedor servicio creado con éxito.");

        const idSolicitud = responseJson.id_solicitud;
        const id = Array.isArray(route.params.id) ? String(route.params.id[0]) : String(route.params.id);
        setCargando(false);
        navigation.navigate('DetalleTarea', { id, idSolicitud });

      } else {
        const errorMsg = responseJson.error || "No se pudo enviar la solicitud.";
        setMessage(errorMsg);
        setVisible(true);
        setCargando(false);
      }
    } catch (error) {
      console.error("Error inesperado al iniciar changuita:", error);
      setMessage("Ocurrió un error al enviar la solicitud.");
      setVisible(true);
      setCargando(false);
    }
  };

  // Mostrar los datos pasados desde la pantalla anterior
  useEffect(() => {
    // Verificar si el componente sigue montado
    setIsMounted(true);

    if (route.params?.id) {
      //console.log('ID obtenido:', route.params.id);
    } else {
      console.error('No se encontraron id.');
    }
    fetchUsuario();
    fetchProveedorServicio();
    fetchDatosServicio();

    return () => {
      // Cuando el componente se desmonte, poner el flag a false
      setIsMounted(false);
    };

  }, [route.params]);

  //Busca el servicio es correspondiente al que se busca no lo solo agarrar el primero
  const fetchProveedorServicio = async () => {
    if (!isMounted) return;
    try {
      // Obtén el token de acceso desde AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('No se encontró el token de acceso');
      }

      const proveedorId = route.params.id; //solo para usar en esta funcion
      const idServicio = route.params.servicio; // ID del servicio pasado desde la navegación
      setreseniasUserId(proveedorId);
      const responseProveedor = await fetch(`${API_URL}/proveedores-servicios/usuario/${proveedorId}/${idServicio}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!responseProveedor.ok) {
        throw new Error(`Error al obtener el ProveedorServicio: ${responseProveedor.status}`);
      }

      // Procesa los datos del proveedor de servicio
      const dataProveedor = await responseProveedor.json();
      const proveedor = Array.isArray(dataProveedor) ? dataProveedor[0] : dataProveedor;
      setIdProveedorServicio(proveedor?.id);
    } catch (error) {
      console.error('Error al cargar los datos del proveedor de servicio:', error);
    }
  };


  const fetchDatosServicio = async () => {
    if (!isMounted) return;
    try {
      // Obtén el token de acceso desde AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('No se encontró el token de acceso');
      }
      console.log("Haciendo fetch del servicio");
      const idServicio = route.params.servicio;
      // Se realiza la solicitud para obtener los datos del servicio
      const responseServicio = await fetch(`${API_URL}/servicios/${idServicio}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!responseServicio.ok) {
        console.error(`Error al obtener los datos del servicio: ${responseServicio.status}`);
      }

      const servicioDat: ServicioArreglado = await responseServicio.json();
      setDataServicio(servicioDat);

    } catch (error) {
      console.error('Error al cargar los datos del servicio:', error);
      setMessage("Error. No se pudo cargar el perfil.");
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsuario = async () => {
    if (!isMounted) return;
    try {
      // Obtén el token de acceso desde AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('No se encontró el token de acceso');
      }

      const proveedorId = route.params.id;

      // Se realiza la solicitud para obtener los datos del usuario
      const responseUsuario = await fetch(`${API_URL}/usuarios/${proveedorId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!responseUsuario.ok) {
        console.error(`Error al obtener el usuario: ${responseUsuario.status}`);
      }

      // Procesa los datos del usuario
      const dataUsuario: Usuario = await responseUsuario.json();
      setUsuario(dataUsuario);
      setImageUri(dataUsuario.fotoPerfil || 'https://via.placeholder.com/80');

    } catch (error: any) {
      console.error('Error al cargar los datos del usuario:', error); // Detalles del error
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
    return <PantallaCarga frase="Cargando perfil proveedor..." />;
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

      if (response.ok) {
        setMessage("Usuario bloqueado correctamente.");
        setVisible(true);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        setMessage("No se pudo bloquear al usuario.");
        setVisible(true);
      }
    } catch (error) {
      console.error("Error al bloquear usuario:", error);
      setMessage("Error. al bloquear el usuario.");
      setVisible(true);
    }
  };

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

  if (cargando) {
    return <PantallaCarga frase="Procesando..." />;
  }

  return (
    <SafeAreaView style={EstilosPerfilProveedor.safeContainer}>
      {/* Encabezado con opciones de menú */}
      <NavBarSuperior
        titulo="Perfil Proveedor"
        showBackButton={true}
        onBackPress={() => { navigation.goBack(); }}
        rightButtonType="menu"
        onRightPress={() => { toggleDesplegable(); }}
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

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }} keyboardShouldPersistTaps="handled">
        {/* Información del Usuario */}
        <View style={EstilosPerfilProveedor.seccionUsuario}>
          <Pressable onPress={handleImagePress}>
            <Image source={{ uri: imageUri || undefined }} style={EstilosPerfilProveedor.imagenUsuarioChica as ImageStyle} />
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
                style={EstilosPerfilProveedor.imagenModal as ImageStyle}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>


        {/* Botones */}
        <View style={EstilosPerfilProveedor.buttonContainer}>
          <Button
            titulo="Iniciar changuita"
            onPress={iniciarChanguita}
            backgroundColor={COLORES_APP.primario}
            textColor="String"
            textSize={FUENTES.normal}
            padding={12}
            borderRadius={DIMENSIONES.borderRadius}
            width="30%"
          />

          <Button
            titulo="Chatear"
            onPress={handleChat}
            backgroundColor="transparent"
            borderColor={COLORES_APP.primario}
            borderWidth={1}
            textColor={COLORES_APP.primario}
            textSize={FUENTES.normal}
            padding={12}
            borderRadius={DIMENSIONES.borderRadius}
            width="25%"
            showIcon
            iconSet="FontAwesome"
            iconName="whatsapp"
            iconSize={20}
            iconColor={COLORES_APP.primario}
          />

          <Button
            titulo="Bloquear"
            onPress={() => bloquearUsuario(Number(route.params.id))}
            backgroundColor="transparent"
            borderColor={COLORES_APP.primario}
            borderWidth={1}
            textColor={COLORES_APP.primario}
            textSize={FUENTES.normal}
            padding={12}
            borderRadius={DIMENSIONES.borderRadius}
            width="25%"
          />
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

        {/* Datos del servicio */}
        <Text style={[EstilosPerfilProveedor.tituloDatosPersonales, { fontWeight: 'bold' }]}>DATOS DEL SERVICIO</Text>
        <View style={EstilosPerfilProveedor.datosPersonales}>
          <View style={EstilosPerfilProveedor.infoBox}>
            <Text style={EstilosPerfilProveedor.infoUsuario}>
              <Text style={{ fontWeight: 'bold', color: Colors.naranja }}>
                Nombre del servicio:
              </Text>{" "}
              <Text >
                {DataServicio?.nombreServicio}
              </Text>
            </Text>
          </View>
          <View style={EstilosPerfilProveedor.infoBox}>
            <Text style={EstilosPerfilProveedor.infoUsuario}>
              <Text style={{ fontWeight: 'bold', color: Colors.naranja }}>
                Descripción:
              </Text>{" "}
              <Text>
               {DataServicio?.descripcion}
               </Text>
            </Text>
          </View>
          <View style={EstilosPerfilProveedor.infoBox}>
            <Text style={[EstilosPerfilProveedor.infoUsuario, { fontWeight: 'bold', marginTop: 8 }]}>
              <Text style={{ fontWeight: 'bold', color: Colors.naranja }}>
                Horarios:
              </Text>{" "}
            </Text>
            {DataServicio?.dias?.map((dia, index) => (
              <Text key={index} style={EstilosPerfilProveedor.infoUsuario}>
                {dia.dia}: {dia.desdeHora} - {dia.hastaHora}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
      
        {/* Snackbar para mostrar mensajes */}
        <CustomSnackbar visible={visible} setVisible={setVisible} message={message} />
      {/* Barra de navegación inferior */}
      <NavBarInferior
        activeScreen="PerfilProveedor" // O el screen activo correspondiente
        onNavigate={handleNavigation}
      />
    </SafeAreaView>
  );
};

export default PerfilProveedor;