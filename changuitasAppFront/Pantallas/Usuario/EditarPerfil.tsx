import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Platform, Modal, TouchableWithoutFeedback, Linking } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../utils/API_URL';;
import axios from 'axios';
import EstilosEditarPerfil from './estilos/EstilosEditarPerfil';
import { cerrarSesion } from '../../autenticacion/authService';
import { AuthContext } from '../../autenticacion/auth';
import { mostrarOpcionesSelectorImagen } from '../../utils/seleccionImagen';
import BarraPestanasPerfil from '../../utils/BarraPestanasPerfil';
import { ImageCropperWeb } from '../../componentes/ImageCropperWeb';
import { guardarCambios } from './auxiliar/guardarCambios';
import MenuDesplegable from '../../componentes/MenuDesplegable';
import CustomModal from '../../componentes/CustomModal';
import estilosModal from '../../componentes/estilosModal';
import EncabezadoPerfil from '../../componentes/perfilesUsuarios/EncabezadoPerfil';
import Input from '../../componentes/inputs/Input';
import PasswordInput from '../../componentes/inputs/PasswordInput';
import { NavBarInferior } from '../../componentes/NavBarInferior';
import CustomSnackbar from '../../componentes/CustomSnackbar';
import { Button } from '../../componentes/Buttons';
import Colors from '../../assets/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { redirectAdmin } from '../../utils/utils';

const EditarPerfil = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [imageUri, setImageUri] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  // Estados para mostrar/ocultar contraseñas
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState('');  // Estado para almacenar el mensaje de error
  const [imageUriOriginal, setImageUriOriginal] = useState<string | null>(null);
  const [cropperVisible, setCropperVisible] = useState<boolean>(false);
  // Estados para mostrar/ocultar secciones
  const [mostrarDatosContacto, setMostrarDatosContacto] = useState(true);
  const [mostrarDireccion, setMostrarDireccion] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const datosOriginales: { [key: string]: any } = {
    first_name: '',
    last_name: '',
    email: '',
    telefono: '',
    direccion: {
      calle: '',
      altura: '',
      nroDepto: '',
      piso: '',
      barrio: '',
    },
  };

  const [camposModificados, setCamposModificados] = useState<{ [key: string]: any }>({
    first_name: '',
    last_name: '',
    email: '',
    telefono: '',
    old_password: '',
    password: '',
    password2: '',
    direccion: {
      calle: '',
      altura: '',
      nroDepto: '',
      piso: '',
      barrio: '',
    }
  });

  const handleImagePress = () => {
    setModalVisible(true); // Mostrar el modal cuando se presiona la imagen
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Cerrar el modal cuando se presiona el botón de cerrar
  };

  const logout = async () => {
    try {
      setState({ token: "" });
      await cerrarSesion(); // Simula el proceso de cierre de sesión
      console.log('Sesión cerrada correctamente'); // Log al finalizar el cierre de sesión
    } catch (error: any) {
      console.log('Error en el cierre de sesión:', error.message);
    } 
  };

  // Función para obtener la foto de perfil desde el backend
  const obtenerFotoPerfil = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!accessToken || !userId) {
        throw new Error('No se encontraron credenciales de usuario');
      }

      const respuesta = await axios.get(`${API_URL}/usuarios/${userId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const uri = respuesta.data.fotoPerfil || 'https://via.placeholder.com/80';
      setImageUri(uri);
      setImageUriOriginal(uri); // Guardar la original para compararla
    } catch (error) {
      console.error('Error al obtener la foto de perfil:', error);
      setMessage('Error: No se pudo cargar la imagen de perfil.');
      setVisible(true); 
    }
  };

  // Llama a obtenerFotoPerfil al montar el componente
  useEffect(() => {
    obtenerFotoPerfil();
  }, []);

  const manejarCambioCampo = (campo: string, valor: any) => {
    if (campo.startsWith('direccion.')) {
      const campoDir = campo.split('.')[1];
      setCamposModificados(prev => ({
        ...prev,
        direccion: {
          ...prev.direccion,
          [campoDir]: valor
        }
      }));
    } else {
      setCamposModificados(prev => ({
        ...prev,
        [campo]: valor
      }));
    }
  };

  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
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
    <TouchableWithoutFeedback onPress={() => {
      if (mostrarDesplegable) setMostrarDesplegable(false); // ocultar el menú
    }}>
      <SafeAreaView edges={['top']} style={EstilosEditarPerfil.safeContainer}>
        <ScrollView contentContainerStyle={EstilosEditarPerfil.scrollContainer}>
          {/* Header con Perfil*/}
          <EncabezadoPerfil onToggleMenu={toggleDesplegable} />
          <MenuDesplegable visible={mostrarDesplegable} usuario={state.usuario} onLogout={logout} onRedirectAdmin={redirectAdmin} />
          <BarraPestanasPerfil />


          {/* Menú Desplegable */}
          <MenuDesplegable
            visible={mostrarDesplegable}
            usuario={state.usuario}
            onLogout={logout}
            onRedirectAdmin={redirectAdmin}
          />

          {/* Sección para cambiar la foto */}
          <View style={EstilosEditarPerfil.seccionFoto}>
            <TouchableOpacity onPress={handleImagePress}>
              <Image
                source={{ uri: imageUri || 'https://via.placeholder.com/80' }}
                style={EstilosEditarPerfil.imagenUsuario}
              />
            </TouchableOpacity>
            {Platform.OS === 'web' ? (
              <>
                <TouchableOpacity
                  onPress={() =>
                    mostrarOpcionesSelectorImagen(setImageUri, setImageFile, setCropperVisible)
                  }
                >
                  <Text style={EstilosEditarPerfil.cambiarFotoTexto}>Cambiar foto</Text>
                </TouchableOpacity>

                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={cropperVisible}
                  onRequestClose={() => setCropperVisible(false)}
                >
                  <View style={EstilosEditarPerfil.modalOverlay}>
                    <View style={EstilosEditarPerfil.modalContent}>
                      <ImageCropperWeb
                        imageUri={imageUri}
                        setImageUri={setImageUri}
                        setCropperVisible={setCropperVisible}
                      />
                    </View>
                  </View>
                </Modal>
              </>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  mostrarOpcionesSelectorImagen(setImageUri, setImageFile, setCropperVisible)
                }
              >
                <Text style={EstilosEditarPerfil.cambiarFotoTexto}>Cambiar foto</Text>
              </TouchableOpacity>
            )}

          </View>


          <CustomModal
            visible={modalVisible}
            onClose={handleCloseModal}
            containerStyle={estilosModal.modalContainer}
          >
            <Image
              source={{ uri: imageUri || 'https://place-hold.it/400x600' }}
              style={estilosModal.imagenModal}
            />
          </CustomModal>


          {/* Formulario de datos personales */}
          <View style={EstilosEditarPerfil.formulario}>


            <TouchableOpacity onPress={() => setMostrarDatosContacto(!mostrarDatosContacto)}>
              <Text style={EstilosEditarPerfil.tituloSeccion}>Datos de Contacto</Text>
            </TouchableOpacity>
            {mostrarDatosContacto && (
              <>
                <Text style={EstilosEditarPerfil.label}>Correo electrónico</Text>
                <Input
                  placeholder=" "
                  value={camposModificados.email || datosOriginales.email || ''}
                  onChangeText={(valor) => manejarCambioCampo('email', valor)}
                />
                <Text style={EstilosEditarPerfil.label}>Teléfono</Text>
                <Input
                  placeholder=" "
                  value={camposModificados.telefono || datosOriginales.telefono || ''}
                  onChangeText={(valor) => manejarCambioCampo('telefono', valor)}
                />
              </>
            )}

            <TouchableOpacity onPress={() => setMostrarDireccion(!mostrarDireccion)}>
              <Text style={EstilosEditarPerfil.tituloSeccion}>Dirección</Text>
            </TouchableOpacity>
            {mostrarDireccion && (
              <>
                <Text style={EstilosEditarPerfil.label}>Calle</Text>
                <Input
                  placeholder=" "
                  value={camposModificados.direccion?.calle || datosOriginales.direccion.calle || ''}
                  onChangeText={(valor) => manejarCambioCampo('direccion.calle', valor)}
                />
                <Text style={EstilosEditarPerfil.label}>Altura</Text>
                <Input
                  placeholder=" "
                  value={camposModificados.direccion?.altura || datosOriginales.direccion.altura || ''}
                  onChangeText={(valor) => manejarCambioCampo('direccion.altura', valor)}
                />
                <Text style={EstilosEditarPerfil.label}>Número de Departamento</Text>
                <Input
                  placeholder=" "
                  value={camposModificados.direccion?.nroDepto || datosOriginales.direccion.nroDepto || ''}
                  onChangeText={(valor) => manejarCambioCampo('direccion.nroDepto', valor)}
                />
                <Text style={EstilosEditarPerfil.label}>Piso</Text>
                <Input
                  placeholder=" "
                  value={camposModificados.direccion?.piso || datosOriginales.direccion.piso || ''}
                  onChangeText={(valor) => manejarCambioCampo('direccion.piso', valor)}
                />
                <Text style={EstilosEditarPerfil.label}>Barrio</Text>
                <Input
                  placeholder=" "
                  value={camposModificados.direccion?.barrio || datosOriginales.direccion.barrio || ''}
                  onChangeText={(valor) => manejarCambioCampo('direccion.barrio', valor)}
                />
              </>
            )}


            <TouchableOpacity onPress={() => setMostrarContrasena(!mostrarContrasena)}>

              {/* Botón para mostrar/ocultar campos de contraseña */}
              <TouchableOpacity
                style={EstilosEditarPerfil.botonCambiarPassword}
                onPress={() => setShowPasswordFields(!showPasswordFields)}
              >
                <Text style={[EstilosEditarPerfil.tituloSeccion, { alignSelf: 'flex-start' }]}>
                  {showPasswordFields ? 'Cancelar cambio de contraseña' : 'Cambiar contraseña'}
                </Text>
              </TouchableOpacity>

              {/* Campos de contraseña */}
              {showPasswordFields && (
                <>
                  <Text style={EstilosEditarPerfil.label}>Contraseña actual</Text>

                  <PasswordInput
                    placeholder=" "
                    value={camposModificados.old_password}
                    onChangeText={(valor) => manejarCambioCampo('old_password', valor)}
                  />

                  <Text style={EstilosEditarPerfil.label}>Nueva contraseña</Text>

                  <PasswordInput
                    placeholder=" "
                    value={camposModificados.password}
                    onChangeText={(valor) => manejarCambioCampo('password', valor)}
                  />


                  <Text style={EstilosEditarPerfil.label}>Confirmar nueva contraseña</Text>

                  <PasswordInput
                    placeholder=" "
                    value={camposModificados.password2}
                    onChangeText={(valor) => manejarCambioCampo('password2', valor)}
                  />

                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Botón de Guardar Cambios*/}
          {/* Condición para mostrar el botón solo si el Snackbar no está visible */}
          {!visible && (
            <View style={{ alignItems: 'center'}}>
            <Button
              titulo="Guardar Cambios"
              onPress={() =>
                guardarCambios(
                  camposModificados,
                  datosOriginales,
                  imageUri,
                  imageUriOriginal,
                  showPasswordFields,
                  navigation,
                  setMessage,
                  setVisible
                )
              }
              backgroundColor={Colors.naranja}
              textColor={Colors.negro}
              textSize={16}
              padding={12}
              borderRadius={50}
              width="80%"
            />
            </View>
          )}

          {/* CustomSnackbar */}
          <CustomSnackbar
            visible={visible}
            setVisible={setVisible}
            message={message}
          />
        </ScrollView>
        {/* Barra de navegación inferior */}
        <NavBarInferior
          activeScreen="EditarPerfil" // O el screen activo correspondiente
          onNavigate={handleNavigation}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default EditarPerfil;