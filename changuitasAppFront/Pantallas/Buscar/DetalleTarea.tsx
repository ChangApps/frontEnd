import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
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
  const [rol, setRol] = useState<'cliente' | 'trabajador' | null>(null);
  const [mostrarModalCancelar, setMostrarModalCancelar] = useState(false);
  const [idSolicitud, setIdSolicitud] = useState('');
  const [motivoSeleccionado, setMotivoSeleccionado] = useState('');

  const motivosCancelacion = [
    'No puedo asistir',
    'Tuve un inconveniente personal',
    'El cliente no responde',
    'Cambio de planes',
    'Otro motivo',
  ];

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
      
      if(data.estado === 'PA') {
      setEstado('Pendiente Aceptacion');
      }

      setPuntaje(data.valoracion > 0 ? data.valoracion : 'Aun no asignado');

      const userId = await AsyncStorage.getItem('userId');
      setRol(userId === data.cliente.toString() ? 'cliente' : 'trabajador');
    } catch (err) {
      console.error(err);
    }
  };

  const aceptarChanguita = async () => {
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
      fetchDatosSolicitud();
    } catch {
      setMessage('Error al aceptar changuita');
      setVisible(true);
    }
  };

  const cancelarChanguita = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      await fetch(`${API_URL}/cancelar-changuita/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ solicitud_id: idSolicitud })
      });
      navigation.navigate('Home');
    } catch {
      setMessage('Error al cancelar la changuita.');
      setVisible(true);
    }
  };

  const finalizarChanguita = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      await fetch(`${API_URL}/finalizar-changuita/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'user/json'
        },
        body: JSON.stringify({ solicitud_id: idSolicitud })
      });
      navigation.navigate('CalificarTarea', { idSolicitud });
    } catch {
      setMessage('Error al finalizar la changuita.');
      setVisible(true);
    }
  };

  const logout = async () => {
    try {
      setState({ token: '' });
      await cerrarSesion();
    } finally {
      navigation.reset({ index: 0, routes: [{ name: 'InicioDeSesion' }] });
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

return (
  <SafeAreaView style={EstilosDetalleTarea.contenedor}>
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={EstilosDetalleTarea.encabezado}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={EstilosDetalleTarea.textoEncabezado}>
            Detalle de la tarea
          </Text>
          <TouchableOpacity onPress={logout}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

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
          puntaje={puntaje}
          estado={estado}
          estilos={EstilosDetalleTarea}
        />

        <AccionesTarea
          rol={rol}
          estado={estado}
          aceptarChanguita={aceptarChanguita}
          setMostrarModal={setMostrarModalCancelar}
          finalizarSolicitud={finalizarChanguita}
          estilos={EstilosDetalleTarea}
        />

        <ModalCancelarChanguita
          visible={mostrarModalCancelar}
          onClose={() => setMostrarModalCancelar(false)}
          onConfirm={(motivo) => {
            console.log('Changuita cancelada por:', motivo);
            cancelarChanguita();
            setMostrarModalCancelar(false);
            setMotivoSeleccionado('');
          }}
          motivoSeleccionado={motivoSeleccionado}
          setMotivoSeleccionado={setMotivoSeleccionado}
          motivosCancelacion={motivosCancelacion}
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
  );
};

export default DetalleTarea;