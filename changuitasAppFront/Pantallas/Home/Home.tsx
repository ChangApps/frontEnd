import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView,  TouchableOpacity, TouchableWithoutFeedback, Linking, useWindowDimensions,  FlatList, ScrollView, TextInput} from 'react-native';
import { Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import {cerrarSesion} from '../../autenticacion/authService';
import { renovarToken } from '../../autenticacion/authService';
import EstilosHome from './estilos/EstilosHome';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';
import API_URL from '../../auxiliares/API_URL';
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from '../../autenticacion/auth';
import MenuDesplegable from '../../auxiliares/MenuDesplegable';
import { Snackbar } from 'react-native-paper';

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

  const redirectAdmin = () => {
    Linking.openURL('http://127.0.0.1:8000/admin/');
  };

 const capitalizarPrimeraLetra = (texto: string): string => {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
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

  const personasContratadas = [
    { id: 1, nombre: 'Juan Perez', oficio: 'Plomero' },
    { id: 2, nombre: 'Ana López', oficio: 'Electricista' },
    { id: 3, nombre: 'Carlos Díaz', oficio: 'Pintor' },
  ];

const obtenerCategorias = async () => {
  try {
     const storedToken = await AsyncStorage.getItem('accessToken');
    const res = await fetch(`${API_URL}/categorias/`, {
       headers: {
          Authorization: `Bearer ${storedToken}`,
        },
    });
    console.log("Obteniendo categorias");

    if (!res.ok) throw new Error('Error al obtener las categorías');
    const data = await res.json();

    const categoriasFormateadas = data.map((cat: any) => ({
      id: cat.id,
      nombre: capitalizarPrimeraLetra(cat.nombre),
    }));

    setCategorias(categoriasFormateadas);
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
};

  const guardarTrabajosNotificados = async (ids: string[]) => {
    await AsyncStorage.setItem('trabajosNotificados', JSON.stringify(ids));
  };

  const obtenerTrabajosNotificados = async (): Promise<string[]> => {
    const data = await AsyncStorage.getItem('trabajosNotificados');
    return data ? JSON.parse(data) : [];
  };

  const verificarTrabajosPendientes = async (userId: string, token: string) => {
    const res = await fetch(`${API_URL}/historial/proveedor/${userId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!Array.isArray(data)) return;

    const yaNotificados = await obtenerTrabajosNotificados();
    const nuevos = data.filter(
      (s: any) => s.estado === 'PA' && !yaNotificados.includes(String(s.id))
    );
    if (nuevos.length) {
      await guardarTrabajosNotificados([...yaNotificados, ...nuevos.map((s) => String(s.id))]);
      setTrabajosNotificados(nuevos);
    }
  };

  const guardarTrabajosNotificadosCliente = async (ids: string[]) => {
    await AsyncStorage.setItem('solicitudesAceptadasNotificadas', JSON.stringify(ids));
  };

  const obtenerTrabajosNotificadosCliente = async (): Promise<string[]> => {
    const data = await AsyncStorage.getItem('solicitudesAceptadasNotificadas');
    return data ? JSON.parse(data) : [];
  };

  const verificarSolicitudesAceptadas = async (userId: string, token: string) => {
    const res = await fetch(`${API_URL}/historial/cliente/${userId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!Array.isArray(data)) return;

    const yaNotificados = await obtenerTrabajosNotificadosCliente();
    const nuevos = data.filter(
      (s: any) => s.estado === 'I' && !yaNotificados.includes(String(s.id))
    );
    if (nuevos.length) {
      await guardarTrabajosNotificadosCliente([
        ...yaNotificados,
        ...nuevos.map((s) => String(s.id)),
      ]);
      setTrabajosNotificados((prev) => [...prev, ...nuevos]);
    }
  };

  const fetchUsuarioLogueado = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('accessToken');
    if (!userId || !token) return logout();
    await verificarTrabajosPendientes(userId, token);
    await verificarSolicitudesAceptadas(userId, token);
  };

  useEffect(() => {
    const init = async () => {
      const storedToken = await AsyncStorage.getItem('accessToken');
      if (storedToken) {
        console.log(storedToken);
        setAccessToken(storedToken);
        await fetchUsuarioLogueado();
         await obtenerCategorias();
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
          <Text style={EstilosHome.subtituloSeccion}>Ultimas personas contratadas</Text>
          <FlatList
            horizontal
            data={personasContratadas}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingLeft: 16 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={EstilosHome.cardPersona}>
                <View style={EstilosHome.avatarPlaceholder} />
                <Text style={EstilosHome.nombrePersona}>{item.nombre}</Text>
                <Text style={EstilosHome.oficioPersona}>{item.oficio}</Text>
              </View>
            )}
          />

          {/* Categorías */}
          <Text style={EstilosHome.subtituloSeccion}>Categorías</Text>
          <FlatList
            data={categorias}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={EstilosHome.cardCategoria}>
                <Ionicons name="image" size={20} color="#FF6A00" />
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

        <BarraNavegacionInferior />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PantallaHome;