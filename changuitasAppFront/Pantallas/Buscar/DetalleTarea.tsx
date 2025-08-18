import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView, Linking, Platform, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EstilosDetalleTarea from './estilos/EstilosDetalleTarea';
import API_URL from '../../utils/API_URL';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import { cerrarSesion } from '../../autenticacion/authService';
import { AuthContext } from '../../autenticacion/auth';
import ImagenConModal from '../../componentes/perfilesUsuarios/ImagenConModal';
import DatosTareaCompactos from '../../componentes/perfilesUsuarios/DatosTareaCompactos';
import AccionesTarea from '../../componentes/perfilesUsuarios/AccionesTarea';
import ImagenPerfilUsuario from '../../componentes/perfilesUsuarios/ImagenPerfilUsuario';
import ModalCancelarChanguita from '../../componentes/ModalCancelarChanguita';
import CustomSnackbar from '../../componentes/CustomSnackbar';
import { NavBarInferior } from '../../componentes/NavBarInferior';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavBarSuperior } from '../../componentes/NavBarSuperior';
import MenuDesplegable from '../../componentes/MenuDesplegable';
import PantallaCarga from '../../componentes/PantallaCarga';
import { redirectAdmin } from '../../utils/utils';

const DetalleTarea = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'DetalleTarea'>>();
  const [state, setState] = useContext(AuthContext);

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [fecha, setFecha] = useState('');
  const [servicio, setServicio] = useState('');
  const [estado, setEstado] = useState('');
  const [puntaje, setPuntaje] = useState<string | number>('Aun no asignado');
  const [comentario, setComentario] = useState('');
  const [fechaValoracion, setFechaValoracion] = useState('');
  const [rol, setRol] = useState<'cliente' | 'trabajador' | null>(null);
  const [mostrarModalCancelar, setMostrarModalCancelar] = useState(false);
  const [idSolicitud, setIdSolicitud] = useState('');
  const [motivoSeleccionado, setMotivoSeleccionado] = useState('');
  // Estados para el menú desplegable
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [cargando, setCargando] = useState(false);

  interface Usuario {
    username: string;
    first_name: string;
    last_name: string;
    fechaNacimiento: string;
    email: string;
    telefono: string;
    fotoPerfil: string | null;
    is_staff: boolean;
  }

  useEffect(() => {
    fetchUsuario();
    fetchDatosSolicitud();
  }, []);

  const fetchUsuario = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const userId = route.params.id;
      setIdSolicitud(route.params.idSolicitud);

      const res = await fetch(`${API_URL}/usuarios/${userId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      setUsuario(data);
      setImageUri(data.fotoPerfil || 'https://via.placeholder.com/80');
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDatosSolicitud = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await fetch(`${API_URL}/solicitudes/${route.params.idSolicitud}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      setFecha(data.fechaSolicitud);
      setServicio(data.nombreServicio);
      setEstado(data.estado_display);
      setPuntaje(data.valoracion > 0 ? data.valoracion : 'Aun no asignado');
      setComentario(data.comentario||'Sin comentarios');
       const fecha = data.fechaValoracion;
        if (fecha) {
          const [año, mes, dia] = fecha.split('-');
          setFechaValoracion(`${dia}/${mes}/${año}`);
        } else {
          setFechaValoracion('No disponible');
        }
      const userId = await AsyncStorage.getItem('userId');
      const rolCalculado = userId === data.cliente.toString() ? 'cliente' : 'trabajador';
      setRol(rolCalculado);
    } catch (err) {
      console.error(err);
    }
  };

  const aceptarChanguita = async () => {
    setCargando(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await fetch(`${API_URL}/aceptar-changuita/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ solicitud_id: idSolicitud })
      });

      if (!res.ok) throw new Error();
      setMessage('¡Changuita aceptada!');
      setVisible(true);
      await fetchDatosSolicitud();
    } catch {
      setMessage('Error al aceptar changuita');
      setVisible(true);
    } finally {
      setCargando(false);
    }
  };


  const cancelarChanguita = async (motivo:string) => {
    setCargando(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      await fetch(`${API_URL}/cancelar-changuita/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          solicitud_id: idSolicitud,
          motivo,
        })
      });
      setCargando(false);
      navigation.navigate('Home');
    } catch {
      setMessage('Error al cancelar la changuita.');
      setVisible(true);
      setCargando(false);
    }
  };

  const logout = async () => {
    try {
      setState({ token: '' });
      await cerrarSesion();
    } catch (error) {
      setMessage('Error al cerrar sesión');
      setVisible(true);
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

  // Función para alternar el menú desplegable
  const toggleDesplegable = () => { setMostrarDesplegable(!mostrarDesplegable); };

  if (cargando) {
    return <PantallaCarga frase="Procesando..." />;
  }
  
  return (
    <TouchableWithoutFeedback onPress={() => setMostrarDesplegable(false)}>
      <SafeAreaView style={EstilosDetalleTarea.safeContainer}>
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            keyboardShouldPersistTaps="handled"
          >
            <NavBarSuperior
              titulo="Detalle de la tarea"
              showBackButton={true}
              onBackPress={() => { navigation.goBack(); }}
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

            <View style={EstilosDetalleTarea.seccionUsuario}>
              <ImagenPerfilUsuario
                imageUri={imageUri}
                modalVisible={modalVisible}
                onImagePress={() => setModalVisible(true)}
                onCloseModal={() => setModalVisible(false)}
              />
              <Text style={EstilosDetalleTarea.nombreCompleto}>
                {usuario?.username}
              </Text>
            </View>

            <ImagenConModal
              uri={imageUri}
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              estiloImagen={EstilosDetalleTarea.imagenModal}
            />

           <DatosTareaCompactos
              servicio={servicio}
              fecha={fecha}
              fechaValoracion={fechaValoracion}
              puntaje={puntaje}
              estado={estado}
              comentario={comentario}
              estilos={EstilosDetalleTarea}
            />
            <AccionesTarea
              rol={rol}
              estado={estado}
              aceptarChanguita={aceptarChanguita}
              setMostrarModal={setMostrarModalCancelar}
              finalizarSolicitud={() =>
                  navigation.navigate('CalificarTarea', { idSolicitud })
                }
              estilos={EstilosDetalleTarea}
            />

              <ModalCancelarChanguita
                visible={mostrarModalCancelar}
                onClose={() => setMostrarModalCancelar(false)}
                onConfirm={async(motivo) => {
                  await cancelarChanguita(motivo);
                  setMostrarModalCancelar(false);
                  setMotivoSeleccionado('');
                }}
                motivoSeleccionado={motivoSeleccionado}
                setMotivoSeleccionado={setMotivoSeleccionado}
                rol={rol}
              />
            </ScrollView>

          <NavBarInferior
            activeScreen="DetalleTarea"
            onNavigate={handleNavigation}
          />
        </View>

        {/* Snackbar*/}
        <CustomSnackbar
          visible={visible}
          setVisible={setVisible}
          message={message}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default DetalleTarea;