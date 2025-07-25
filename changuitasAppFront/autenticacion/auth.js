import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { renovarToken,cerrarSesion } from "../autenticacion/authService"; 

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    token: "",
    usuario: null,
  });

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      try {
        const data = await AsyncStorage.getItem("@auth");
        if (data) {
          const parsed = JSON.parse(data);
          if (parsed?.token) {
            setState({ token: parsed.token, usuario: parsed.usuario });
          }
        }
      } catch (e) {
        console.log("Error al cargar datos del almacenamiento", e);
      }
    };

    loadFromAsyncStorage();
  }, []);

  // Renueva el token automáticamente cada 60 segundos
  useEffect(() => {
    if (!state.token || !state.usuario) return; // No hacer nada si no hay sesión activa
    const interval = setInterval(async () => {
      try {
        const nuevoToken = await renovarToken(); 
        if (nuevoToken) {
          const nuevoEstado = {
            ...state,
            token: nuevoToken,
          };
          setState(nuevoEstado);
          await AsyncStorage.setItem("@auth", JSON.stringify(nuevoEstado));
        } else {
          logout(); // Si no hay token nuevo, cerrar sesión
        }
      } catch (err) {
        console.log("Error al renovar token:", err);
        logout();
      }
    }, 60000); // Cada 60 segundos

    return () => clearInterval(interval);
  }, [state]); // Escuchamos cambios en el token actual
  

  const logout = async () => {
    try {
      setState({ token: '' });
      await cerrarSesion();
    } catch (error) {
      console.log('Error en el cierre de sesión:', error.message);
    } 
  };

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
