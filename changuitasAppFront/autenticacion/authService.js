import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../utils/API_URL';

/**
 * Inicia sesión con el nombre de usuario y contraseña proporcionados.
 * @param {string} username 
 * @param {string} password 
 * @returns {Object} Respuesta de la API con los tokens de autenticación.
 */
export const handleLogin = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Almacena tokens y userId
        await AsyncStorage.setItem('accessToken', data.access); // data.access es el token de acceso
        await AsyncStorage.setItem('refreshToken', data.refresh); // data.refresh es el token de refresco
        await AsyncStorage.setItem('userId', data.id.toString()); // data.id es el id del usuario
  
        console.log('Tokens y userId almacenados correctamente');
        return data;
      } else {
        const data = await response.json();
        throw new Error(data.detail || 'Nombre de usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en handleLogin:', error.message);
      throw error;
    }
  };

/**
 * Cierra la sesión del usuario actual.
 * @param {function} navigation 
 * @returns {void}
 */
export const cerrarSesion = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No se encontró el refresh token');

    const response = await fetch(`${API_URL}/logout/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (response.ok) {
      console.log('Sesión cerrada correctamente');
      
      await AsyncStorage.clear();
    } else {
      const errorData = await response.json();
      console.error('Error al cerrar sesión:', errorData);
      throw new Error(errorData.detail || 'Error al cerrar sesión');
    }
  } catch (error) {
    console.error('Error al realizar la solicitud de logout:', error);
    await AsyncStorage.clear();
    throw error;
  }
};


/**
 * Renueva el token de acceso usando el token de actualización.
 * @returns {string|null} Nuevo token de acceso o null si falla.
 */
export const renovarToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No se encontró el token de actualización');

    const response = await fetch(`${API_URL}/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem('accessToken', data.access); // Almacena el nuevo token
      return data.access;
    } else {
      const errorData = await response.json();
      console.error('Error al renovar el token:', errorData);
      return null;
    }
  } catch (error) {
    console.error('Error al intentar renovar el token:', error);
    return null;
  }
}; 