import React, { useContext, useState, useEffect} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Alert, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Snackbar } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import {cerrarSesion} from '../../autenticacion/authService';
import { AuthContext } from '../../autenticacion/auth';
import API_URL from '../../auxiliares/API_URL';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';
import EstilosHistorial1 from './estilos/EstilosHistorial1';

const Historial1 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [state,setState] = useContext(AuthContext);
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

      // Verificar si se obtiene el userId
      if (userId) {
        setUserId(userId);
      }
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
    } else {
      throw new Error('El historial está vacío');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al cargar datos de la solicitud:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    setMessage('No se pudo cargar el historial');
    setVisible(true);
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

    } catch (error:any) {
      console.error('Error al cargar datos de los proveedores:', error.message);
      setMessage('No se pudo cargar los datos de los proveedores');
      setVisible(true);
    } finally {
      setLoading(false); // Cuando termina el fetch de proveedores, se desactiva la carga
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={() => {
      if (mostrarDesplegable) setMostrarDesplegable(false); // ocultar el menú
    }}>
      <SafeAreaView style={EstilosHistorial1.contenedor}>
        {/* Encabezado con opciones de menú */}
        <View style={EstilosHistorial1.encabezado}>
          <Text style={EstilosHistorial1.textoEncabezado}>Historial</Text>
          <TouchableOpacity onPress={toggleDesplegable}>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Menú Desplegable */}
        {mostrarDesplegable && (
          <View style={EstilosHistorial1.desplegable}>
            <TouchableOpacity onPress={logout} style={EstilosHistorial1.opcionDesplegable}>
              <Text style={EstilosHistorial1.textoDesplegable}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        )}

          {/* Barra de pestañas */}
          <View style={EstilosHistorial1.barraPestanas}>
          <TouchableOpacity style={EstilosHistorial1.pestanaActiva} onPress={() => navigation.navigate('Historial1')}>
            <Text style={EstilosHistorial1.textoPestanaActiva}>Servicios contratados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={EstilosHistorial1.pestanaInactiva} onPress={() => navigation.navigate('Historial2')}>
            <Text style={EstilosHistorial1.textoPestanaInactiva}>Mis trabajos</Text>
          </TouchableOpacity>
        </View>


        <FlatList
    data={historial}
    keyExtractor={(item) => item.id.toString()} // id de la solicitud
    renderItem={({ item }) => {
      const proveedor = proveedores.find(p => p.id === item.proveedor_id);
      const puntaje = proveedor?.puntaje ? Math.round(proveedor.puntaje) : 0;
      return (
        <View style={EstilosHistorial1.resultItem}>
          <Image
            style={EstilosHistorial1.image}
            source={{ uri: proveedor?.fotoPerfil || 'https://via.placeholder.com/100' }}
          />
          <View style={EstilosHistorial1.resultDetails}>
            <Text style={EstilosHistorial1.name}>
              {`${proveedor?.first_name || 'Nombre'} ${proveedor?.last_name || ''}`}
            </Text>

            <Text style={EstilosHistorial1.fecha}>
              Fecha: {item.fechaSolicitud}
            </Text>

            <View style={EstilosHistorial1.ratingStars}>
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
              console.log("Botón presionado");
              navigation.navigate('DetalleTarea', {
                id: proveedor?.id.toString() || 'No disponible',
                idSolicitud: item.id.toString()
              });
            }}
            style={EstilosHistorial1.arrowButton}
          >
            <Ionicons name="chevron-forward" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      );
    }}
    ListEmptyComponent={
      <View style={EstilosHistorial1.noResultsContainer}>
        <Image
          source={require('./estilos/service.png')}
          style={EstilosHistorial1.noResultsImage}
          resizeMode="contain"
        />
        <Text style={EstilosHistorial1.mensajeNoUsuarios}>No haz realizado ningún trabajo.</Text>
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
    </TouchableWithoutFeedback>
  );
};

export default Historial1;