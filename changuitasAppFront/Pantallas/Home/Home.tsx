import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, FlatList, TextInput, Platform, Alert } from 'react-native';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import { cerrarSesion } from '../../autenticacion/authService';
import EstilosHome from './estilos/EstilosHome';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../autenticacion/auth';
import MenuDesplegable from '../../componentes/MenuDesplegable';
import { NavBarInferior } from '../../componentes/NavBarInferior';
import { verificarSolicitudesAceptadas, verificarTrabajosPendientes } from '../../services/notificacionesService';
import { obtenerCategorias } from '../../services/categoriaService';
import { SolicitudHistorial, Solicitud, Proveedor } from '../../types/interfaces';
import { fetchUHistorial } from '../../services/historialService';
import ResultadoListSimple from '../../componentes/ResultadoListSimple';
import Colors from '../../assets/Colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import ModalBuscar from '../../componentes/ModalBuscar';
import API_URL from '../../utils/API_URL';
import { redirectAdmin } from '../../utils/utils'
import { SafeAreaView } from 'react-native-safe-area-context';
import PantallaCarga from '../../componentes/PantallaCarga';
import { NavBarSuperior } from '../../componentes/NavBarSuperior';
import CustomSnackbar from '../../componentes/CustomSnackbar';

const PantallaHome = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [trabajoActual, setTrabajoActual] = useState<any | null>(null);
  const [trabajosNotificados, setTrabajosNotificados] = useState<any[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([]);
  const [personasContratadas, setPersonasContratadas] = useState<
    { id: number; nombre: string; oficio: string }[]
  >([]);
  const [historial, setHistorial] = useState<SolicitudHistorial[]>([]);
  const [solicitudesInfo, setSolicitudesInfo] = useState<Solicitud[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [mostrarModalBuscar, setMostrarModalBuscar] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [cargandoContenido, setCargandoContenido] = useState(true);
  const [idCategoriaSeleccionada, setIdCategoriaSeleccionada] = useState<number | null>(null);
  const [cargandoPerfil, setCargandoPerfil] = useState(false);
  const [idUsuario, setIdUsuario] = useState<number | null>(null);

  const handleBuscar = async () => {
    if (!textoBusqueda.trim()) {

    if (Platform.OS === 'web') {
        alert('Por favor, ingresa un término de búsqueda antes de continuar.');
      } else {
        Alert.alert(
          'Error', 
          'Por favor, ingresa un término de búsqueda antes de continuar.',
          [{ text: 'Aceptar' }]
        );
      }
    return;
  }
    console.log("Buscando por:", textoBusqueda);
    try {
      const storedToken = await AsyncStorage.getItem('accessToken');
      const res = await fetch(`${API_URL}/buscar-usuario/?q=${encodeURIComponent(textoBusqueda)}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

        if (res.status === 204) {
          console.log("No se encontraron resultados.");
          navigation.navigate('ResultadosBusqueda', {
          proveedores: [],
          error: 'No se encontraron resultados para tu búsqueda.',
          busquedaGeneral: false
        });
          setTextoBusqueda('');
          return;
        }

    if (!res.ok) console.log('Error al obtener los datos');

      const data = await res.json();
      console.log('Datos obtenidos:', data);
      setTextoBusqueda('');
      if (!data || data.length === 0) {
        navigation.navigate('ResultadosBusqueda', {
          proveedores: [],
          error: 'No se encontraron resultados para tu búsqueda.',
          busquedaGeneral: false
        });
      } else {
        navigation.navigate('ResultadosBusqueda', {
          proveedores: data,
          busquedaGeneral: true
        });
      }
    } catch (error) {
      console.log('Error al obtener los datos:', error);
      setTextoBusqueda('');
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
        navigation.navigate('Notificaciones');
        break;
      case 'PerfilUsuario':
        navigation.navigate('PerfilUsuario');
        break;
    }
  };

  const handlePerfilPress = () => {
    setCargandoPerfil(true);
  };

  const toggleDesplegable = () => setMostrarDesplegable(!mostrarDesplegable);

  const logout = async () => {
    try {
      setState({ token: '' });
      await cerrarSesion();
    } catch (error: any) {
      console.log('Error en el cierre de sesión:', error.message);
    }
  };

  const fetchUsuarioLogueado = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('accessToken');
    if (!userId || !token) return logout();
    await verificarTrabajosPendientes(userId, token, setTrabajosNotificados);
    await verificarSolicitudesAceptadas(userId, token, setTrabajosNotificados);
  };
useFocusEffect(
  useCallback(() => {
    const init = async () => {
      try {
        setCargandoContenido(true); 
        const storedToken = await AsyncStorage.getItem('accessToken');
        const userId = await AsyncStorage.getItem('userId');
        setIdUsuario(userId ? parseInt(userId) : null);
        if (!storedToken) {
          console.log('No se encontró token');
          return;
        }

        console.log("El stored token es: ", storedToken);

        await Promise.all([
          obtenerCategorias().then(setCategorias),
          fetchUsuarioLogueado(),
          fetchUHistorial(setHistorial, setSolicitudesInfo, setProveedores, setPersonasContratadas),
        ]);

      } catch (err) {
        console.log("Error en init:", err);
      } finally {
        setCargandoContenido(false);
        setCargandoPerfil(false); // ← Finaliza carga después de todo
      }
    };

    init();
  }, [])
);

  useEffect(() => {
    if (!snackbarVisible && trabajosNotificados.length > 0 && !trabajoActual) {
      const siguiente = trabajosNotificados[0];
      setTrabajoActual(siguiente);
      setTrabajosNotificados((prev) => prev.slice(1));
      setSnackbarVisible(true);
    }
  }, [trabajosNotificados, snackbarVisible, trabajoActual]);

  if (cargandoContenido) return <PantallaCarga />;
  if (cargandoPerfil) return <PantallaCarga frase="Cargando perfil proveedor..." />;

    const iconosCategorias: Record<string,{ lib: 'Ionicons' | 'MaterialIcons'; name: string }> = {
      'Hogar': { lib: 'Ionicons', name: 'home' },
      'Belleza': { lib: 'Ionicons', name: 'cut' },
      'Limpieza': { lib: 'MaterialIcons', name: 'cleaning-services' },
      'Cuidado de personas': { lib: 'Ionicons', name: 'people' },
      'Control de plagas': { lib: 'Ionicons', name: 'bug' },
      'Jardineria': { lib: 'MaterialIcons', name: 'grass' },
      'Mascotas': { lib: 'Ionicons', name: 'paw' },
      'Mudanza': { lib: 'Ionicons', name: 'cube' },
      'Educación': { lib: 'Ionicons', name: 'school' },
      'Servicios de invierno': { lib: 'Ionicons', name: 'snow' },
    };

  return (
    <TouchableWithoutFeedback onPress={() => setMostrarDesplegable(false)}>
      <SafeAreaView style={EstilosHome.safeContainer}>
        <View style={[EstilosHome.contenidoResponsivo, width > 600 && EstilosHome.contenidoWeb]} />

        <ModalBuscar visible={mostrarModalBuscar} onClose={() => setMostrarModalBuscar(false)} categoriaId={idCategoriaSeleccionada} />

        {/* Encabezado */}
        <NavBarSuperior
          titulo="ChangApp"
          showBackButton={false}
          rightButtonType="menu"
          onRightPress={toggleDesplegable}
          titleAlign="center"
          paddingHorizontal={16}
          iconSize={24}
          navbarHeight={56}
        />

        <MenuDesplegable
          visible={mostrarDesplegable}
          usuario={state.usuario}
          onLogout={logout}
          onRedirectAdmin={redirectAdmin}
        />

        {cargandoContenido ? (
          <PantallaCarga />
        ) : (
          <>
            <FlatList
              ListHeaderComponent={
                <>
                  {/* Buscador */}
                  <View style={EstilosHome.barraBusqueda}>
                    <TextInput
                      style={EstilosHome.inputBusqueda}
                      placeholder="Buscar..."
                      placeholderTextColor="#ccc"
                      value={textoBusqueda}
                      onChangeText={setTextoBusqueda}
                    />
                    <TouchableOpacity style={EstilosHome.botonFiltro} onPress={handleBuscar}>
                      <FontAwesome6 name="magnifying-glass" size={20} color="black" />
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
                      estiloAvatar={EstilosHome.avatarPlaceholder}
                      estiloNombre={EstilosHome.nombrePersona}
                      onPerfilPress={handlePerfilPress}
                    />
                  )}

                  <Text style={EstilosHome.subtituloSeccion}>Categorías</Text>
                </>
              }
              data={categorias}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginHorizontal: 16,
              }}
              renderItem={({ item }) => {
                const icono =
                  iconosCategorias[item.nombre] || { lib: 'Ionicons', name: 'image' };

                return (
                  <TouchableOpacity
                    style={EstilosHome.cardCategoria}
                    onPress={() => {
                      setIdCategoriaSeleccionada(item.id);
                      setMostrarModalBuscar(true);
                    }}
                  >
                    {icono.lib === 'Ionicons' && (
                      <Ionicons
                        name={icono.name as React.ComponentProps<typeof Ionicons>['name']}
                        size={20}
                        color={Colors.naranja}
                      />
                    )}
                    {icono.lib === 'MaterialIcons' && (
                      <MaterialIcons
                        name={icono.name as React.ComponentProps<typeof MaterialIcons>['name']}
                        size={20}
                        color={Colors.naranja}
                      />
                    )}
                    <Text style={EstilosHome.textoCategoria}>{item.nombre}</Text>
                  </TouchableOpacity>
                );
              }}
              contentContainerStyle={EstilosHome.scrollContenido}
            />

       {/* Snackbar */}
        <CustomSnackbar
          visible={snackbarVisible}
          setVisible={setSnackbarVisible}
          message={
            trabajoActual
              ? trabajoActual.cliente === idUsuario
                ? // Si el cliente es el usuario actual
                  (trabajoActual.estado === 'PA'
                    ? `${trabajoActual.proveedor_nombre} aceptó tu solicitud de ${trabajoActual.nombreServicio}`
                    : `Tu solicitud para ${trabajoActual.nombreServicio} fue aceptada`)
                : // Si el cliente NO es el usuario actual
                  (trabajoActual.estado === 'PA'
                    ? `${trabajoActual.cliente_nombre} solicitó tu servicio de ${trabajoActual.nombreServicio}`
                    : `La solicitud que mandaste para ${trabajoActual.nombreServicio} fue aceptada`)
              : 'Mensaje por defecto'
              }
              actionLabel="Tocá para ver"
              onActionPress={() =>
                navigation.navigate(
                  trabajoActual?.cliente === idUsuario ? 'Historial1' : 'Historial2'
                )
              }
            />

            {/* NavBar Inferior */}
            <NavBarInferior
              activeScreen="Home" // O el screen activo correspondiente
              onNavigate={handleNavigation}
            />
          </>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PantallaHome;