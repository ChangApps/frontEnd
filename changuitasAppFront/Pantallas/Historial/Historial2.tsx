import React, { useContext, useState, useEffect} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Alert, FlatList, Linking, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Snackbar } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import {cerrarSesion} from '../../autenticacion/authService';
import { AuthContext } from '../../autenticacion/auth';
import API_URL from '../../utils/API_URL';
import BarraNavegacionInferior from '../../utils/BarraNavegacionInferior';
import EstilosHistorial2 from './estilos/EstilosHistorial2';
import MenuDesplegable from '../../componentes/MenuDesplegable';
import ResultadoList from '../../componentes/ResultadoList';
import { NavBarSuperior } from '../../componentes/NavBarSuperior';

const Historial2 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [state,setState] = useContext(AuthContext);
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

  const redirectAdmin = () => {
    Linking.openURL('http://127.0.0.1:8000/admin/');
  };

  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

useEffect(() => {
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

  obtenerDatosAsyncStorage();
  fetchUHistorial();
}, []);  // Solo se ejecuta una vez cuando el componente se monta

 const logout = async () => {
    try {
      setState({ token: "" });
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
console.log("Solicitudes procesadas:", solicitudesData);

setSolicitudesInfo(solicitudesData);

// Obtener los proveedores relacionados con las solicitudes
const clientes = solicitudesData.map((item: any) => item.clienteId);
await fetchMultipleClientesData(clientes);
    } else {
      throw new Error('El historial está vacío');
    }
  } catch (error:any) {
    console.error('Error al cargar datos del usuario (historial):', error.message);
  } finally {
    setLoading(false);
  }
};

// Función que obtiene los datos de los proveedores
const fetchMultipleClientesData = async (clienteIds: number[]) => {
  try {
    console.log("Adentro del fetch multiple clientes data");
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
    console.log("Clientes recibidos:", clientesData);
    setClientes(clientesData); // Suponiendo que usás setClientes

  } catch (error: any) {
    console.error("Error al cargar datos de clientes:", error.message);
    setMessage("No se pudo cargar los datos de los clientes");
    setVisible(true);
  } finally {
    setLoading(false);
  }
};

  return (
    <TouchableWithoutFeedback onPress={() => {
          if (mostrarDesplegable) setMostrarDesplegable(false); // ocultar el menú
    }}>
    <SafeAreaView style={EstilosHistorial2.contenedor}>
      {/* NavBar Superior */}
                          <NavBarSuperior
                            titulo="Historial"
                            showBackButton={false}
                            onBackPress={() => navigation.goBack()}
                            rightButtonType="none"
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
              historial={historial}
              usuarios={clientes}
              navigation={navigation}
              claveUsuario="cliente"
              mensajeVacio="No haz realizado ningún trabajo."
            />

<Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}  // Ocultar el Snackbar cuando se cierre
        duration={Snackbar.DURATION_SHORT}    // Podemos intercalar entre  DURATION_LONG o DURATION_SHORT
        style={{
          position: 'absolute',
          top: -150,
          left: 0,
          right: 0,
          zIndex: 100000, 
          marginRight: 50,
        }}
      >
        {message}
      </Snackbar>
      {/* Barra de navegación inferior */}
      <BarraNavegacionInferior/>
    </SafeAreaView>
  </TouchableWithoutFeedback>
  );
};
export default Historial2;