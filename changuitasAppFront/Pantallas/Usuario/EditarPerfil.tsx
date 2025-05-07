import React, { useState,useEffect, useContext } from 'react';
import { View, Text, SafeAreaView,TouchableOpacity, TextInput, Image, Alert, ScrollView, Platform, Modal, TouchableWithoutFeedback} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../auxiliares/API_URL';;
import axios from 'axios';
import FormData from 'form-data';
import { Snackbar } from 'react-native-paper';
import EstilosEditarPerfil from './estilos/EstilosEditarPerfil';
import {cerrarSesion} from '../../autenticacion/authService';
import { AuthContext } from '../../autenticacion/auth';
import { mostrarOpcionesSelectorImagen } from '../../auxiliares/seleccionImagen';
import BarraPestanasPerfil from '../../auxiliares/BarraPestanasPerfil';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';

const EditarPerfil = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
 //Estado para el cerrarSesion
 const [mostrarDesplegable, setMostrarDesplegable] = useState(false);

  // Estado para la foto de perfil
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  //const [state,setState] = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

    // Estados para mostrar/ocultar contraseñas
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error
   const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
   const [message, setMessage] = useState('');  // Estado para almacenar el mensaje de error
   const [imageUriOriginal, setImageUriOriginal] = useState<string | null>(null);


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
   //    setState({ token: "" });
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
      Alert.alert('Error', 'No se pudo cargar la imagen de perfil.');
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

  // Función para guardar cambios
  const guardarCambios = async () => {
    
    // Verificar si el usuario realmente quiere cambiar la contraseña
    const quiereCambiarPassword = 
    camposModificados.password || 
    camposModificados.password2 || 
    camposModificados.old_password;
    

    // Si el usuario quiere cambiar la contraseña, validar que todos los campos estén llenos
    if (quiereCambiarPassword) {
      if (!camposModificados.old_password || !camposModificados.password || !camposModificados.password2) {
        setMessage('Por favor, complete todos los campos de contraseña.');
        setVisible(true);
        return;
      }
  
      if (camposModificados.password !== camposModificados.password2) {
        setMessage('Las contraseñas nuevas no coinciden.');
        setVisible(true);
        return;
      }
    }


    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');
  
      if (!accessToken || !userId) {
        throw new Error('No se encontraron credenciales de usuario');
      }
  
    // Crear FormData para enviar tanto los datos como la imagen
    const formData = new FormData();

    if (imageUri && imageUri !== imageUriOriginal) {
      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const fileType = blob.type.split('/')[1] || 'jpg';
    
        if (Platform.OS === "web") {
          formData.append('fotoPerfil', blob, `photo.${fileType}`);
        } else {
          formData.append('fotoPerfil', {
            uri: imageUri,
            name: `photo.${fileType}`,
            type: blob.type,
          });
        }
      } catch (error) {
        console.error('Error al procesar la imagen:', error);
        Alert.alert('Error', 'No se pudo procesar la imagen seleccionada.');
        return;
      }
    }
        // Filtrar los campos que han sido modificados
    const datosActualizados: { [key: string]: any } = {}; // Permitir claves dinámicas

    Object.keys(camposModificados).forEach((campo) => {
    if (typeof camposModificados[campo] === 'object') {
        const subCampos: { [key: string]: any } = {};

        Object.keys(camposModificados[campo]).forEach((subCampo) => {
        if (camposModificados[campo][subCampo] !== datosOriginales[campo]?.[subCampo]) {
            subCampos[subCampo] = camposModificados[campo][subCampo];
        }
        });

        if (Object.keys(subCampos).length > 0) {
        datosActualizados[campo] = subCampos;
        }

    } else if (
        camposModificados[campo] !== datosOriginales[campo] &&
        campo !== 'password2'
    ) {
        if (showPasswordFields && (campo === 'password' || campo === 'old_password')) {
        if (camposModificados[campo]) {
            datosActualizados[campo] = camposModificados[campo];
        }
        } else if (campo !== 'password' && campo !== 'old_password') {
        datosActualizados[campo] = camposModificados[campo];
        }
    }
    });
      // Validar contraseñas si se están cambiando
      if (showPasswordFields) {
        if (camposModificados.password !== camposModificados.password2) {
          if (Platform.OS === 'web') {
            // Lanza un error específico para que se capture en el bloque catch
            throw new Error('Las contraseñas nuevas no coinciden');
          } else {
            Alert.alert('Error', 'Las contraseñas nuevas no coinciden');
          }
          return;
        }
      
        if (!camposModificados.old_password) {
          if (Platform.OS === 'web') {
            // Lanza un error específico para que se capture en el bloque catch
            throw new Error('Debe ingresar la contraseña actual');
          } else {
            Alert.alert('Error', 'Debe ingresar la contraseña actual');
          }
          return;
        }
      }
      

      // Si no hay cambios y no hay nueva imagen, no enviar la solicitud
      if (
        Object.keys(datosActualizados).length === 0 &&
        (!imageUri || imageUri === imageUriOriginal)
      ) {
        Alert.alert('Sin cambios', 'No hay campos modificados para guardar.');
        return;
      }
  
    // Agregar los datos actualizados al FormData
    Object.keys(datosActualizados).forEach(key => {
      if (typeof datosActualizados[key] === 'object') {
        formData.append(key, JSON.stringify(datosActualizados[key]));
      } else {
        formData.append(key, datosActualizados[key]);
      }
    });


    // Realizar la solicitud PATCH al backend usando FormData
    const response = await axios.patch(`${API_URL}/usuarios/${userId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      Alert.alert('Éxito', 'Datos actualizados correctamente.');
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'No se pudieron guardar los cambios.');
    }
}  catch (error: any) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
      const errorData = error.response.data;
      let errorMessage = '';

      const translations: { [key: string]: string } = {
        email: 'Correo electrónico',
        telefono: 'Teléfono',
        direccion: 'Dirección',
        calle: 'Calle',
        altura: 'Altura',
        password: 'Contraseña',
        password2: 'Repetir contraseña',
        old_password: 'Contraseña anterior',
      };
  
      const translatedErrors: { [key: string]: string } = {
        "Enter a valid email address.": "Introduce una dirección de correo electrónico válida.",
        "A valid integer is required.": "Introduce un valor válido.",
        "A valid string is required.": "Introduce un valor válido.",
      };

      const translateErrors = (
        errors: Record<string, unknown>,
        parentKey: string = ''
      ): string => {
        let message = '';
        for (const [key, value] of Object.entries(errors)) {
          const field = parentKey
            ? `${translations[parentKey] || parentKey} -> ${translations[key] || key}`
            : translations[key] || key;
  
          if (Array.isArray(value)) {
            const messages = value.map((msg) =>
              typeof msg === 'string' ? translatedErrors[msg] || msg : ''
            );
            message += `${field}: ${messages.join(', ')}\n`;
          } else if (typeof value === 'object' && value !== null) {
            message += translateErrors(value as Record<string, unknown>, key);
          } else if (typeof value === 'string') {
            const singleMessage = translatedErrors[value] || value;
            message += `${field}: ${singleMessage}\n`;
          }
        }
        return message;
      };
      errorMessage = translateErrors(errorData).trim();
      setMessage(errorMessage);
      setVisible(true);
    } else if (error.message) {
      // Mensaje de error específico
      setMessage(error.message);
      setVisible(true);
    } else {
      // Error inesperado o sin detalles específicos
      setMessage('Ocurrió un error inesperado.');
      setVisible(true);
      Alert.alert('Error', 'Ocurrió un problema con la conexión.');
    }
    };
  };



  return (
    <TouchableWithoutFeedback onPress={() => {
      if (mostrarDesplegable) setMostrarDesplegable(false); // ocultar el menú
    }}>
      <SafeAreaView style={EstilosEditarPerfil.contenedor}>
        <ScrollView contentContainerStyle={EstilosEditarPerfil.scrollContainer}>
          {/* Header con Perfil*/}
          <View style={EstilosEditarPerfil.header}>
            <Text style={EstilosEditarPerfil.textoEncabezado}>Perfil</Text>
            <TouchableOpacity onPress={toggleDesplegable}>
              <Ionicons name="ellipsis-horizontal" size={24} color="black" />
            </TouchableOpacity>
          </View>

      
              {/* Menú Desplegable */}
              {mostrarDesplegable && (
            <View style={EstilosEditarPerfil.desplegable}>
              <TouchableOpacity onPress={logout} style={EstilosEditarPerfil.opcionDesplegable}>
                <Text style={EstilosEditarPerfil.textoDesplegable}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          )}


        {/* Barra de pestañas */}
          <BarraPestanasPerfil/>
          {/* Sección para cambiar la foto */}
          <View style={EstilosEditarPerfil.seccionFoto}>
          <TouchableOpacity onPress={handleImagePress}>
              <Image 
                source={{ uri: imageUri || 'https://via.placeholder.com/80' }} 
                style={EstilosEditarPerfil.imagenUsuario} 
              />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => mostrarOpcionesSelectorImagen(setImageUri, setImageFile)}>
                <Text style={EstilosEditarPerfil.cambiarFotoTexto}>Cambiar foto</Text>
              </TouchableOpacity>
            </View>

            <Modal
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={handleCloseModal}
          >
            <TouchableWithoutFeedback onPress={handleCloseModal}>
              <View style={EstilosEditarPerfil.modalContainer}>
                <Image 
                  source={{ uri: imageUri || 'https://via.placeholder.com/80' }} 
                  style={EstilosEditarPerfil.imagenModal} 
                />
              </View>
            </TouchableWithoutFeedback>
          </Modal>


              {/* Formulario de datos personales */}
              <View style={EstilosEditarPerfil.formulario}>
              <Text style={EstilosEditarPerfil.label}>Correo electrónico</Text>
              <TextInput
                style={EstilosEditarPerfil.input}
                value={camposModificados.email || datosOriginales.email || ''}
                onChangeText={(valor) => manejarCambioCampo('email', valor)}
              />

              <Text style={EstilosEditarPerfil.label}>Teléfono</Text>
              <TextInput
                style={EstilosEditarPerfil.input}
                value={camposModificados.telefono || datosOriginales.telefono || ''}
                onChangeText={(valor) => manejarCambioCampo('telefono', valor)}
              />

              <Text style={EstilosEditarPerfil.label}>Calle</Text>
              <TextInput
                style={EstilosEditarPerfil.input}
                value={camposModificados.direccion?.calle || datosOriginales.direccion.calle || ''}
                onChangeText={(valor) => manejarCambioCampo('direccion.calle', valor)}
              />

              <Text style={EstilosEditarPerfil.label}>Altura</Text>
              <TextInput
                style={EstilosEditarPerfil.input}
                value={camposModificados.direccion?.altura || datosOriginales.direccion.altura || ''}
                onChangeText={(valor) => manejarCambioCampo('direccion.altura', valor)}
              />

              <Text style={EstilosEditarPerfil.label}>Número de Departamento</Text>
              <TextInput
                style={EstilosEditarPerfil.input}
                value={camposModificados.direccion?.nroDepto || datosOriginales.direccion.nroDepto || ''}
                onChangeText={(valor) => manejarCambioCampo('direccion.nroDepto', valor)}
              />

              <Text style={EstilosEditarPerfil.label}>Piso</Text>
              <TextInput
                style={EstilosEditarPerfil.input}
                value={camposModificados.direccion?.piso || datosOriginales.direccion.piso || ''}
                onChangeText={(valor) => manejarCambioCampo('direccion.piso', valor)}
              />

              <Text style={EstilosEditarPerfil.label}>Barrio</Text>
              <TextInput
                style={EstilosEditarPerfil.input}
                value={camposModificados.direccion?.barrio || datosOriginales.direccion.barrio || ''}
                onChangeText={(valor) => manejarCambioCampo('direccion.barrio', valor)}
              />


              {/* Botón para mostrar/ocultar campos de contraseña */}
              <TouchableOpacity 
                style={EstilosEditarPerfil.botonCambiarPassword}
                onPress={() => setShowPasswordFields(!showPasswordFields)}
              >
                <Text style={EstilosEditarPerfil.textoCambiarPassword}>
                  {showPasswordFields ? 'Cancelar cambio de contraseña' : 'Cambiar contraseña'}
                </Text>
              </TouchableOpacity>

              {/* Campos de contraseña */}
              {showPasswordFields && (
              <>
                <Text style={EstilosEditarPerfil.label}>Contraseña actual</Text>
                <View style={EstilosEditarPerfil.contenedorEntradaContrasena}>
                  <TextInput
                    style={EstilosEditarPerfil.inputContrasena}
                    secureTextEntry={!showOldPassword}
                    value={camposModificados.old_password}
                    onChangeText={(valor) => manejarCambioCampo('old_password', valor)}
                  />
                  <TouchableOpacity 
                    style={EstilosEditarPerfil.iconoOjo}
                    onPress={() => setShowOldPassword(!showOldPassword)}
                  >
                    <Ionicons 
                      name={showOldPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                </View>

                <Text style={EstilosEditarPerfil.label}>Nueva contraseña</Text>
                <View style={EstilosEditarPerfil.contenedorEntradaContrasena}>
                  <TextInput
                    style={EstilosEditarPerfil.inputContrasena}
                    secureTextEntry={!showNewPassword}
                    value={camposModificados.password}
                    onChangeText={(valor) => manejarCambioCampo('password', valor)}
                  />
                  <TouchableOpacity 
                    style={EstilosEditarPerfil.iconoOjo}
                    onPress={() => setShowNewPassword(!showNewPassword)}
                  >
                    <Ionicons 
                      name={showNewPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                </View>

                <Text style={EstilosEditarPerfil.label}>Confirmar nueva contraseña</Text>
                <View style={EstilosEditarPerfil.contenedorEntradaContrasena}>
                  <TextInput
                    style={EstilosEditarPerfil.inputContrasena}
                    secureTextEntry={!showConfirmPassword}
                    value={camposModificados.password2}
                    onChangeText={(valor) => manejarCambioCampo('password2', valor)}
                  />
                  <TouchableOpacity 
                    style={EstilosEditarPerfil.iconoOjo}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons 
                      name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
        </View>
          
          
          {/* Botón de Guardar Cambios*/}
        {/* Condición para mostrar el botón solo si el Snackbar no está visible */}
          {!visible && (
            <TouchableOpacity onPress={guardarCambios} style={EstilosEditarPerfil.botonGuardarCambios}>
              <Text style={EstilosEditarPerfil.textoBotonGuardar}>Guardar Cambios</Text>
            </TouchableOpacity>
          )} 

          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}  // Ocultar el Snackbar cuando se cierre
            duration={Snackbar.DURATION_SHORT}    // Podemos intercalar entre  DURATION_LONG o DURATION_SHORT
            style={{
              position: 'absolute',
              top: -150,
              left: 0,
              right: 0,
              zIndex: 100000,  // Alto para asegurarse de que esté encima de otros elementos
            }}
          >
            {message}
          </Snackbar>
          </ScrollView>
          {/* Barra de navegación inferior */}
          <BarraNavegacionInferior/>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      );
    };

export default EditarPerfil;
