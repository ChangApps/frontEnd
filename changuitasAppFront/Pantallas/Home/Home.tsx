import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView,  TouchableOpacity, TouchableWithoutFeedback, Linking, useWindowDimensions,  FlatList, ScrollView, TextInput} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import {cerrarSesion} from '../../autenticacion/authService';
import { renovarToken } from '../../autenticacion/authService';
import EstilosHome from './estilos/EstilosHome';
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from '../../autenticacion/auth';
import MenuDesplegable from '../../auxiliares/MenuDesplegable';
import { Snackbar } from 'react-native-paper';
import { NavBarInferior } from '../../componentes/NavBarInferior';
import { verificarSolicitudesAceptadas, verificarTrabajosPendientes } from '../../services/notificacionesService';
import{ obtenerCategorias } from '../../services/categoriaService';
import { SolicitudHistorial, Solicitud, Proveedor } from '../../types/interfaces';
import { fetchUHistorial } from '../../services/historialService';
import ResultadoListSimple from '../../componentes/ResultadoListSimple';
import Colors from '../../assets/Colors';

const PantallaHome = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [trabajoActual, setTrabajoActual] = useState<any | null>(null);
  const [trabajosNotificados, setTrabajosNotificados] = useState<any[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([]);
  const [personasContratadas, setPersonasContratadas] = useState<
  { id: number; nombre: string; oficio: string }[]
>([]);
  const [historial, setHistorial] = useState<SolicitudHistorial[]>([]);
  const [solicitudesInfo, setSolicitudesInfo] = useState<Solicitud[]>([]); //Estado para guardar las solicitudes 
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [visible, setVisible] = useState(false);  
  const [message, setMessage] = useState(""); 
  
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

  const redirectAdmin = () => {
    Linking.openURL('http://127.0.0.1:8000/admin/');
  };

  const toggleDesplegable = () => setMostrarDesplegable(!mostrarDesplegable);

  const logout = async () => {
    try {
      setState({ token: '' });
      await cerrarSesion();
    } catch (error: any) {
      console.log('Error en el cierre de sesión:', error.message);
    } finally {
      navigation.reset({
        index: 0,
        routes: [{ name: 'InicioDeSesion' }],
      });
    }
  };

  const onDismissSnackbar = () => {
    setSnackbarVisible(false);
    setTimeout(() => {
      setTrabajoActual(null);
    }, 300);
  };

  const fetchUsuarioLogueado = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('accessToken');
    if (!userId || !token) return logout();
  await verificarTrabajosPendientes(userId,token, setTrabajosNotificados);
  await verificarSolicitudesAceptadas(userId, token, setTrabajosNotificados);
  };

  useEffect(() => {
    const init = async () => {
      const storedToken = await AsyncStorage.getItem('accessToken');
      if (storedToken) {
        console.log(storedToken);
        setAccessToken(storedToken);
        await fetchUsuarioLogueado();
        await fetchUHistorial(setHistorial, setSolicitudesInfo, setProveedores, setPersonasContratadas);
       const resultado = await obtenerCategorias(); 
      setCategorias(resultado);
      }
    };
    init();

    const interval = setInterval(async () => {
      try {
        const nuevoToken = await renovarToken();
        if (nuevoToken) {
          setAccessToken(nuevoToken);
          await AsyncStorage.setItem('accessToken', nuevoToken);
        } else {
          logout();
        }
      } catch (err) {
        const error = err as AxiosError;
        console.error("Error al renovar token:", error.message);
        logout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!snackbarVisible && trabajosNotificados.length > 0 && !trabajoActual) {
      const siguiente = trabajosNotificados[0];
      setTrabajoActual(siguiente);
      setTrabajosNotificados((prev) => prev.slice(1));
      setSnackbarVisible(true);
    }
  }, [trabajosNotificados, snackbarVisible, trabajoActual]);

  return (
    <TouchableWithoutFeedback onPress={() => setMostrarDesplegable(false)}>
      <SafeAreaView style={EstilosHome.contenedor}>
        <View style={[EstilosHome.contenidoResponsivo, width > 600 && EstilosHome.contenidoWeb]} />

        {/* Encabezado */}
        <View style={EstilosHome.encabezado}>
          <Text style={EstilosHome.textoInicio}>ChangApp</Text>
          <TouchableOpacity onPress={toggleDesplegable}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#F2F2F2" />
          </TouchableOpacity>
        </View>

        <MenuDesplegable
          visible={mostrarDesplegable}
          usuario={state.usuario}
          onLogout={logout}
          onRedirectAdmin={redirectAdmin}
        />

        <ScrollView contentContainerStyle={EstilosHome.scrollContenido}>
          {/* Buscador */}
          <View style={EstilosHome.barraBusqueda}>
            <TextInput
              style={EstilosHome.inputBusqueda}
              placeholder="Buscar..."
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={EstilosHome.botonFiltro}>
              <Ionicons name="options" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Últimas personas */}
       <Text style={EstilosHome.subtituloSeccion}>Últimas personas contratadas</Text>
            {personasContratadas.length === 0 ? (
        <Text style={EstilosHome.mensajeVacio}>No se encontraron personas contratadas.</Text>
      ) : (
          <ResultadoListSimple
          historial={historial}
          usuarios={proveedores}
          navigation={navigation}
          claveUsuario="proveedor_id"
          estiloCard={EstilosHome.cardPersona}
          estiloAvatar={EstilosHome.avatarPlaceholder
          }
          estiloNombre={EstilosHome.nombrePersona}
        />
      )}

          {/* Categorías */}
          <Text style={EstilosHome.subtituloSeccion}>Categorías</Text>
          <FlatList
            data={categorias}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={EstilosHome.cardCategoria}>
               <Ionicons name="image" size={20} color={Colors.naranja} />
                <Text style={EstilosHome.textoCategoria}>{item.nombre}</Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>

        {/* Snackbar */}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackbar}
          duration={Snackbar.DURATION_SHORT}
          action={{
            label: 'Tocá para ver',
            onPress: () => {
              setSnackbarVisible(false);
              navigation.navigate('Historial2');
            },
          }}
          style={{
            position: 'absolute',
            top: -150,
            left: 0,
            right: 0,
            zIndex: 100000,
          }}
        >
          {trabajoActual && (
            <Text style={{ color: 'white' }}>
              {trabajoActual.estado === 'PA'
                ? `${trabajoActual.cliente_nombre} solicitó tu servicio de ${trabajoActual.nombreServicio}`
                : `La solicitud que mandaste para ${trabajoActual.nombreServicio} fue aceptada`}
            </Text>
          )}
        </Snackbar>

          {/* NavBar Inferior */}
                 <NavBarInferior
                   activeScreen="Home" // O el screen activo correspondiente
                   onNavigate={handleNavigation}
                 />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PantallaHome;