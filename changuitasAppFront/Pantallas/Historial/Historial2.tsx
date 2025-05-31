import React, { useContext, useState, useEffect} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Alert, FlatList } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Snackbar } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import {cerrarSesion} from '../../autenticacion/authService';
import { AuthContext } from '../../autenticacion/auth';
import API_URL from '../../auxiliares/API_URL';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';
import EstilosHistorial2 from './estilos/EstilosHistorial2';

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
    estadoSolicitud: 'F' | 'C';
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
    estado: string;
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
    <SafeAreaView style={EstilosHistorial2.contenedor}>
      {/* Encabezado con opciones de menú */}
      <View style={EstilosHistorial2.encabezado}>
        <Text style={EstilosHistorial2.textoEncabezado}>Historial</Text>
        <TouchableOpacity onPress={toggleDesplegable}>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

        {/* Menú Desplegable */}
       {mostrarDesplegable && (
        <View style={EstilosHistorial2.desplegable}>
          <TouchableOpacity onPress={logout} style={EstilosHistorial2.opcionDesplegable}>
            <Text style={EstilosHistorial2.textoDesplegable}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}
         
         {/* Barra de pestañas */}
         <View style={EstilosHistorial2.barraPestanas}>
        <TouchableOpacity style={EstilosHistorial2.pestanaInactiva} onPress={() => navigation.navigate('Historial1')}>
          <Text style={EstilosHistorial2.textoPestanaInactiva}>Servicios contratados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={EstilosHistorial2.pestanaActiva} onPress={() => navigation.navigate('Historial2')}>
          <Text style={EstilosHistorial2.textoPestanaActiva}>Mis trabajos</Text>
        </TouchableOpacity>
      </View>

            {/* Elemento de resultado */}
 <FlatList
  data={historial}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => {
    const cliente = clientes.find(c => c.id === item.cliente);
    const puntaje = cliente?.puntaje ? Math.round(cliente.puntaje) : 0;

    const esEstadoCritico = item.estado === 'F' || item.estado === 'C';

    const estadoLegible = {
      'PA': 'Pendiente de Aceptación',
      'I': 'Iniciado',
      'F': 'Finalizado',
      'C': 'Cancelado',
    }[item.estado] || item.estado;

    return (
      <View style={EstilosHistorial2.resultItem}>
        <Image
          style={EstilosHistorial2.image}
          source={{ uri: cliente?.fotoPerfil || 'https://via.placeholder.com/100' }}
        />
        <View style={EstilosHistorial2.resultDetails}>

          {/* Nombre + Estado en una línea */}
          <View style={EstilosHistorial2.nombreConEstadoContainer}>
            <Text style={EstilosHistorial2.name}>
              {`${cliente?.first_name || 'Nombre'} ${cliente?.last_name || ''}`}
            </Text>

            {esEstadoCritico ? (
              <View style={EstilosHistorial2.estadoCriticoContainer}>
                <Text style={EstilosHistorial2.estadoCriticoText}>{estadoLegible}</Text>
              </View>
            ) : (
              <Text style={EstilosHistorial2.estadoNormal}>{estadoLegible}</Text>
            )}
          </View>

          <Text style={EstilosHistorial2.fecha}>
            Fecha: {item.fechaSolicitud}
          </Text>

          <View style={EstilosHistorial2.ratingStars}>
            {Array.from({ length: 5 }, (_, i) => (
              <Ionicons
                key={i}
                name="star"
                size={16}
                color={i < puntaje ? "black" : "#CCCCCC"}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetalleTarea', {
              id: cliente?.id?.toString() || 'No disponible',
              idSolicitud: item.id.toString()
            });
          }}
          style={EstilosHistorial2.arrowButton}
        >
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    );
  }}
  ListEmptyComponent={
    <View style={EstilosHistorial2.noResultsContainer}>
      <Image
        source={require('./estilos/service.png')}
        style={EstilosHistorial2.noResultsImage}
        resizeMode="contain"
      />
      <Text style={EstilosHistorial2.mensajeNoUsuarios}>No haz realizado ningún trabajo.</Text>
    </View>
  }
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
  );
};
export default Historial2;