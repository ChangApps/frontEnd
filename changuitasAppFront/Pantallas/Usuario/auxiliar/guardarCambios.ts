import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import  API_URL  from '../../../utils/API_URL';
import FormData from 'form-data';

export const guardarCambios = async (
  camposModificados: { [key: string]: any },
  datosOriginales: { [key: string]: any },
  imageUri: string,
  imageUriOriginal: string | null,
  showPasswordFields: boolean,
  navigation: any,
  setMessage: (msg: string) => void,
  setVisible: (visible: boolean) => void
) => {
  const quiereCambiarPassword =
    camposModificados.password ||
    camposModificados.password2 ||
    camposModificados.old_password;

  if (quiereCambiarPassword) {
    if (
      !camposModificados.old_password ||
      !camposModificados.password ||
      !camposModificados.password2
    ) {
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

    const formData = new FormData();

    if (imageUri && imageUri !== imageUriOriginal) {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const fileType = blob.type.split('/')[1] || 'jpg';

      if (Platform.OS === 'web') {
        formData.append('fotoPerfil', blob, `photo.${fileType}`);
      } else {
        formData.append('fotoPerfil', {
          uri: imageUri,
          name: `photo.${fileType}`,
          type: blob.type,
        });
      }
    }

    const datosActualizados: { [key: string]: any } = {};

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

    if (
      Object.keys(datosActualizados).length === 0 &&
      (!imageUri || imageUri === imageUriOriginal)
    ) {
      Alert.alert('Sin cambios', 'No hay campos modificados para guardar.');
      return;
    }

    Object.keys(datosActualizados).forEach(key => {
      const valor = datosActualizados[key];
    
      if (typeof valor === 'object' && key === 'direccion') {
        // Desglosar los subcampos de dirección
        Object.entries(valor).forEach(([subKey, subValor]) => {
          formData.append(`direccion.${subKey}`, subValor);
        });
      } else {
        formData.append(key, valor);
      }
    });

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
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
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

      const translateErrors = (errors: Record<string, any>, parentKey = ''): string => {
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
            message += translateErrors(value, key);
          } else if (typeof value === 'string') {
            message += `${field}: ${translatedErrors[value] || value}\n`;
          }
        }
        return message;
      };

      errorMessage = translateErrors(errorData).trim();
      setMessage(errorMessage);
      setVisible(true);
    } else if (error.message) {
      setMessage(error.message);
      setVisible(true);
    } else {
      setMessage('Ocurrió un error inesperado.');
      setVisible(true);
      Alert.alert('Error', 'Ocurrió un problema con la conexión.');
    }
  }
};
