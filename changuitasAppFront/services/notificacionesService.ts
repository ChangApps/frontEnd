import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL  from '../utils/API_URL';

export const guardarTrabajosNotificados = async (ids: string[]) => {
  await AsyncStorage.setItem('trabajosNotificados', JSON.stringify(ids));
};

export const obtenerTrabajosNotificados = async (): Promise<string[]> => {
  const data = await AsyncStorage.getItem('trabajosNotificados');
  return data ? JSON.parse(data) : [];
};
export const verificarTrabajosPendientes = async (
  userId: string,
  token: string,
  setTrabajosNotificados: Function
) => {
  try {
    const res = await fetch(`${API_URL}/historial/proveedor/${userId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
  
    // Verificamos que sea un array antes de usar filter,sino tira un error
    if (!Array.isArray(data)) {
      return;
    }

    const yaNotificados = await obtenerTrabajosNotificados();
    const nuevos = data.filter(
      (s: any) => s.estado === 'PA' && !yaNotificados.includes(String(s.id))
    );

    if (nuevos.length) {
      await guardarTrabajosNotificados([
        ...yaNotificados,
        ...nuevos.map((s: any) => String(s.id)),
      ]);
      setTrabajosNotificados(nuevos);
    }
  } catch (error) {
    console.error("Error al verificar trabajos pendientes:", error);
  }
};

// Lo mismo para cliente
export const guardarTrabajosNotificadosCliente = async (ids: string[]) => {
  await AsyncStorage.setItem('solicitudesAceptadasNotificadas', JSON.stringify(ids));
};

export const obtenerTrabajosNotificadosCliente = async (): Promise<string[]> => {
  const data = await AsyncStorage.getItem('solicitudesAceptadasNotificadas');
  return data ? JSON.parse(data) : [];
};

export const verificarSolicitudesAceptadas = async (
  userId: string,
  token: string,
  setTrabajosNotificados: Function
) => {
  const res = await fetch(`${API_URL}/historial/cliente/${userId}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
 const data = await res.json();

if (!Array.isArray(data)) {
  console.log("Respuesta inesperada del servidor en verificarSolicitudesAceptadas:", data);
  return;
}

const nuevos = data.filter(
  (s: any) => s.estado === 'I' && !yaNotificados.includes(String(s.id))
);

  const yaNotificados = await obtenerTrabajosNotificadosCliente();
 // const nuevos = data.filter((s: any) => s.estado === 'I' && !yaNotificados.includes(String(s.id)));

  if (nuevos.length) {
    await guardarTrabajosNotificadosCliente([...yaNotificados, ...nuevos.map((s: any) => String(s.id))]);
    setTrabajosNotificados((prev: any[]) => [...prev, ...nuevos]);
  }
};
