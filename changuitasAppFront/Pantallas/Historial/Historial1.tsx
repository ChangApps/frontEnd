import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import { cerrarSesion } from '../../autenticacion/authService';
import { AuthContext } from '../../autenticacion/auth';
import API_URL from '../../utils/API_URL';
import EstilosHistorial1 from './estilos/EstilosHistorial1';
import MenuDesplegable from '../../componentes/MenuDesplegable';
import ResultadoList from '../../componentes/ResultadoList';
import { NavBarSuperior } from '../../componentes/NavBarSuperior';
import CustomSnackbar from '../../componentes/CustomSnackbar';
import { NavBarInferior } from '../../componentes/NavBarInferior';
import { SafeAreaView } from 'react-native-safe-area-context';
import { redirectAdmin } from '../../utils/utils';

const Historial1 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState("");  // Estado para almacenar el mensaje de error o éxito
  const [loading, setLoading] = useState<boolean>(true);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  // Estado para almacenar los datos de los proveedores del response
  const [historial, setHistorial] = useState<SolicitudHistorial[]>([]);
  const [solicitudesInfo, setSolicitudesInfo] = useState<Solicitud[]>([]); //Estado para guardar las solicitudes 

  interface Solicitud {
    proveedorId: number;
    idSolicitud: number;
    fechaSolicitud: string;
  }
  interface Direccion {
    calle: string;
    altura: number;
    piso: number | null;
    nroDepto: number | null;
    barrio: string;
  }

  interface Proveedor {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    documento: number;
    telefono: number;
    fotoPerfil: string;
    fechaNacimiento: string;
    direccion: Direccion;
    cantServiciosContratados: number | null;
    cantServiciosTrabajados: number | null;
    puntaje: number | null;
    bloqueados: number[];
    is_verified: boolean;
  }

  interface SolicitudHistorial {
    id: number;
    comentario: string | null;
    fechaSolicitud: string;
    fechaTrabajo: string;
    fechaValoracion: string | null;
    valoracion: number | null;
    proveedorServicio: number;
    cliente: number;
    notificacion: any;
    estado: "PA" | "I" | "F" | "C";
    proveedor_id: number;
    nombreServicio: string;
    cliente_nombre: string;
  }

  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  useEffect(() => {
    const obtenerDatosAsyncStorage = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');

        // Verificar si se obtiene el userId
        if (userId) {
          setUserId(userId);
        }
      } catch (error) {
        console.log("Error al obtener los datos de AsyncStorage:", error);
      }
    };

    obtenerDatosAsyncStorage();
    fetchUHistorial();
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

  const logout = async () => {
    try {
      setState({ token: "" });
      await cerrarSesion(); // Simula el proceso de cierre de sesión
      console.log('Sesión cerrada correctamente'); // Log al finalizar el cierre de sesión
    } catch (error) {
      console.log('Error en el cierre de sesión:', error);
      setMessage("Error en el cierre de sesión");
      setVisible(true);
    }
  };

  const fetchUHistorial = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!accessToken || !userId) {
        throw new Error('No se encontró el token o el ID de usuario');
      }

      const responseHistorial = await fetch(`${API_URL}/historial/cliente/${userId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      // Manejo especial para 404
      if (responseHistorial.status === 404) {
        console.log("No se encontraron registros de historial (404)");
        setHistorial([]);
        setSolicitudesInfo([]);
        return; // Salir de la función sin mostrar error
      }

      if (!responseHistorial.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const historialData = await responseHistorial.json();
      if (historialData.length > 0) {
        setHistorial(historialData);

        // Extraer los proveedores y la información de solicitudes
        const solicitudesData = historialData.map((item: any) => ({
          proveedorId: item.proveedor_id,
          idSolicitud: item.id,
          fechaSolicitud: item.fechaSolicitud
        }));

        setSolicitudesInfo(solicitudesData);

        // Obtener datos de los proveedores
        const proveedores = solicitudesData.map((item: any) => item.proveedorId);
        await fetchMultipleProveedoresData(proveedores);
      } 
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error al cargar datos de la solicitud:', error.message);
      } else {
        console.log('Error desconocido:', error);
      }
    }
  };


  const fetchMultipleProveedoresData = async (proveedorIds: number[]) => {
    try {
      console.log("Adentro del fetch multiple proveedores data");
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No se encontró el token de acceso');
      }

      if (proveedorIds.length === 0) {
        throw new Error('No hay proveedores disponibles');
      }

      // Realizamos las solicitudes en paralelo usando Promise.all
      const proveedoresDataPromises = proveedorIds.map(idDelproveedor => {
        return fetch(`${API_URL}/usuarios/${idDelproveedor}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
      });

      // Esperamos todas las respuestas
      const proveedorResponses = await Promise.all(proveedoresDataPromises);

      // Comprobamos si alguna de las respuestas no fue exitosa
      for (let i = 0; i < proveedorResponses.length; i++) {
        if (!proveedorResponses[i].ok) {
          throw new Error(`Error al obtener el proveedor con ID ${proveedorIds[i]}: ${proveedorResponses[i].status}`);
        }
      }

      // Procesamos las respuestas en paralelo
      const proveedoresData = await Promise.all(proveedorResponses.map(response => response.json()));

      console.log('Respuesta exitosa: Datos de los proveedores recibidos:', proveedoresData);

      // Actualiza el estado con los datos de los proveedores
      setProveedores(proveedoresData);

    } catch (error) {
      console.log('Error al cargar datos de los proveedores:', error);
      setMessage('No se pudo cargar los datos de los proveedores');
      setVisible(true);
    } finally {
      setLoading(false); // Cuando termina el fetch de proveedores, se desactiva la carga
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

    const historialOrdenado = [...historial].sort((a, b) => {
      if (!a.fechaSolicitud) return 1;
      if (!b.fechaSolicitud) return -1;
      const fechaA = new Date(a.fechaSolicitud);
      const fechaB = new Date(b.fechaSolicitud);
      return fechaB.getTime() - fechaA.getTime(); // más reciente primero
    });

  return (
    <TouchableWithoutFeedback onPress={() => {
      if (mostrarDesplegable) setMostrarDesplegable(false); // ocultar el menú
    }}>
      <SafeAreaView style={EstilosHistorial1.safeContainer}>
        {/* NavBar Superior */}
        <NavBarSuperior
          titulo="Historial"
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
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

        {/* Barra de pestañas */}
        <View style={EstilosHistorial1.pasosWrapper}>
          <TouchableOpacity style={EstilosHistorial1.pasoActivo} onPress={() => navigation.navigate('Historial1')}>
            <Text style={EstilosHistorial1.pasoTextoActivo}>Servicios contratados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={EstilosHistorial1.pasoInactivo} onPress={() => navigation.navigate('Historial2')}>
            <Text style={EstilosHistorial1.pasoTextoInactivo}>Mis trabajos</Text>
          </TouchableOpacity>
        </View>

        <ResultadoList
          historial={historialOrdenado}
          usuarios={proveedores}
          navigation={navigation}
          claveUsuario="proveedor_id"
          mensajeVacio="No haz contratado ningún trabajo"
        />

        <CustomSnackbar
          visible={visible}
          setVisible={setVisible}
          message={message}
        />

        {/* Barra de navegación inferior */}
        <NavBarInferior
          activeScreen="Historial1" // O el screen activo correspondiente
          onNavigate={handleNavigation}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Historial1;