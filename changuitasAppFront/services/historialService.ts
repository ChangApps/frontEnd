import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../utils/API_URL';
import { Solicitud, SolicitudHistorial, Proveedor } from '../types/interfaces';

interface PersonaContratada {
  id: number;
  nombre: string;
  oficio: string;
}

export const fetchMultipleProveedoresData = async (
  proveedorIds: number[],
  accessToken: string
): Promise<Proveedor[]> => {
  try {
    if (!accessToken) throw new Error('No se encontró el token de acceso');
    if (proveedorIds.length === 0) throw new Error('No hay proveedores disponibles');

    const proveedoresDataPromises = proveedorIds.map(id =>
      fetch(`${API_URL}/usuarios/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      })
    );

    const proveedorResponses = await Promise.all(proveedoresDataPromises);
    const proveedoresData = await Promise.all(proveedorResponses.map(res => res.json()));
    return proveedoresData;
  } catch (error) {
    console.log('Error al cargar proveedores:', error);
    return [];
  }
};

export const fetchUHistorial = async (
  setHistorial: (data: SolicitudHistorial[]) => void,
  setSolicitudesInfo: (data: Solicitud[]) => void,
  setProveedores: (data: Proveedor[]) => void,
  setPersonasContratadas: (data: PersonaContratada[]) => void
): Promise<void> => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const userId = await AsyncStorage.getItem('userId');

    if (!accessToken || !userId) {
      throw new Error('No se encontró el token o el ID de usuario');
    }

    const responseHistorial = await fetch(`${API_URL}/historial/cliente/${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (responseHistorial.status === 404) {
      console.log("No se encontraron registros de historial (404)");
      setHistorial([]);
      setSolicitudesInfo([]);
      setPersonasContratadas([]);
      return;
    }

    if (!responseHistorial.ok) throw new Error('Error en la respuesta del servidor');

    const historialData = await responseHistorial.json();

    if (!Array.isArray(historialData)) {
      setHistorial([]);
      setSolicitudesInfo([]);
      setPersonasContratadas([]);
      return;
    }

    if (historialData.length === 0) {
      throw new Error('El historial está vacío');
    }

    setHistorial(historialData);

    const solicitudesData: Solicitud[] = historialData.map((item) => ({
      proveedorId: item.proveedor_id,
      idSolicitud: item.id,
      fechaSolicitud: item.fechaSolicitud,
    }));

    setSolicitudesInfo(solicitudesData);

    const proveedoresIds = solicitudesData.map((item) => item.proveedorId);
    const proveedoresData = await fetchMultipleProveedoresData(proveedoresIds, accessToken);

    setProveedores(proveedoresData);

    const personas = historialData
      .slice(-5)
      .map((item) => {
        const proveedor = proveedoresData.find((p) => p.id === item.proveedor_id);
        if (!proveedor) return null;
        return {
          id: proveedor.id,
          nombre: `${proveedor.first_name} ${proveedor.last_name}`,
          oficio: item.nombreServicio,
        };
      })
      .filter((p): p is PersonaContratada => p !== null);

    setPersonasContratadas(personas);
  } catch (error) {
    console.log('Error al cargar historial:', error);
  }
};
