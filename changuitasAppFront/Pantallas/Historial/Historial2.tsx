import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import { cerrarSesion } from '../../autenticacion/authService';
import { AuthContext } from '../../autenticacion/auth';
import API_URL from '../../utils/API_URL';
import EstilosHistorial2 from './estilos/EstilosHistorial2';
import MenuDesplegable from '../../componentes/MenuDesplegable';
import ResultadoList from '../../componentes/ResultadoList';
import { NavBarSuperior } from '../../componentes/NavBarSuperior';
import CustomSnackbar from '../../componentes/CustomSnackbar';
import { NavBarInferior } from '../../componentes/NavBarInferior';
import { SafeAreaView } from 'react-native-safe-area-context';
import { redirectAdmin } from '../../utils/utils';
import PantallaCarga from '../../componentes/PantallaCarga';

const Historial2 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState("");  // Estado para almacenar el mensaje de error o éxito
  const [loading, setLoading] = useState<boolean>(true);
  const [historial, setHistorial] = useState<SolicitudHistorial[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);  // Estado para almacenar los datos de los proveedores del response
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

  interface Cliente {
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
    estado: 'F' | 'C';
    proveedor_id: number;
    nombreServicio: string;
    cliente_nombre: string;
  }

  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

    const obtenerDatosAsyncStorage = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (!userId || !accessToken) {
          throw new Error('No se encontraron el userId o el accessToken');
        }

        setUserId(userId); // Si existe, actualiza el estado
      } catch (error) {
        console.error("Error al obtener los datos de AsyncStorage:", error);
      }
    };

    useEffect(() => {
      const obtenerDatos = async () => {
        setLoading(true); // Activar pantalla de carga
        await obtenerDatosAsyncStorage();
        await fetchUHistorial();
        setLoading(false); // Desactivar cuando todo termine
      };
      obtenerDatos();
    }, []);

  const logout = async () => {
    try {
      setState({ token: "" });
      await cerrarSesion(); // Simula el proceso de cierre de sesión
      console.log('Sesión cerrada correctamente'); // Log al finalizar el cierre de sesión
    } catch (error) {
      console.error('Error en el cierre de sesión:', error);
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

      const responseHistorial = await fetch(`${API_URL}/historial/proveedor/${userId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      // Manejo especial para 404
      if (responseHistorial.status === 404) {
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

        /*
        // Filtrar las solicitudes con estado 'F' o 'C' antes de continuar
        const solicitudesFiltradas = historialData.filter((item:any) => 
        item.estado === 'F' || item.estado === 'C' // Filtramos por estado
        );
        */
        const solicitudesData = historialData.map((item: any) => ({
          clienteId: item.cliente,
          idSolicitud: item.id,
          fechaSolicitud: item.fechaSolicitud,
          estadoSolicitud: item.estado
        }));

        setSolicitudesInfo(solicitudesData);

        // Obtener los proveedores relacionados con las solicitudes
        const clientes = solicitudesData.map((item: any) => item.clienteId);
        await fetchMultipleClientesData(clientes);
      }
    } catch (error) {
      console.error('Error al cargar datos del usuario (historial):', error);
    } finally {
      setLoading(false);
    }
  };

  // Función que obtiene los datos de los proveedores
  const fetchMultipleClientesData = async (clienteIds: number[]) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) throw new Error('No se encontró el token de acceso');

      if (clienteIds.length === 0) throw new Error('No hay clientes disponibles');

      const clientesDataPromises = clienteIds.map(id =>
        fetch(`${API_URL}/usuarios/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        })
      );

      const clienteResponses = await Promise.all(clientesDataPromises);
      for (let i = 0; i < clienteResponses.length; i++) {
        if (!clienteResponses[i].ok) {
          throw new Error(`Error al obtener cliente con ID ${clienteIds[i]}: ${clienteResponses[i].status}`);
        }
      }

      const clientesData = await Promise.all(clienteResponses.map(r => r.json()));
      setClientes(clientesData);

    } catch (error) {
      console.error("Error al cargar datos de clientes:", error);
      setMessage("No se pudo cargar los datos de los clientes");
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

   if (loading) {
    return <PantallaCarga frase="Cargando historial..." />;
  }

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
      <SafeAreaView style={EstilosHistorial2.safeContainer}>
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
        <View style={EstilosHistorial2.pasosWrapper}>
          <TouchableOpacity style={EstilosHistorial2.pasoInactivo} onPress={() => navigation.navigate('Historial1')}>
            <Text style={EstilosHistorial2.pasoTextoInactivo}>Servicios contratados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={EstilosHistorial2.pasoActivo} onPress={() => navigation.navigate('Historial2')}>
            <Text style={EstilosHistorial2.pasoTextoActivo}>Mis trabajos</Text>
          </TouchableOpacity>
        </View>

        {/* Elemento de resultado */}
        <ResultadoList
          historial={historialOrdenado}
          usuarios={clientes}
          navigation={navigation}
          claveUsuario="cliente"
          mensajeVacio="No haz realizado ningún trabajo"
        />

        <CustomSnackbar
          visible={visible}
          setVisible={setVisible}
          message={message}
        />

        {/* Barra de navegación inferior */}
        <NavBarInferior
          activeScreen="Historial2" // O el screen activo correspondiente
          onNavigate={handleNavigation}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default Historial2;