import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL  from '../utils/API_URL';
import { capitalizarPrimeraLetra } from '../utils/utils';


export const obtenerCategorias = async (): Promise<{ id: number; nombre: string }[]> => {
  try {
    console.log('Cargando categorías...');
    const storedToken = await AsyncStorage.getItem('accessToken');
    const res = await fetch(`${API_URL}/categorias/`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });

    if (!res.ok) throw new Error('Error al obtener las categorías');
    const data = await res.json();

    // Filtramos solo las categorías de nivel superior (sin padre)
    const categoriasFormateadas = data
      .filter((cat: any) => cat.categoria_padre === null)
      .map((cat: any) => ({
        id: cat.id,
        nombre: capitalizarPrimeraLetra(cat.nombre),
      }));

    return categoriasFormateadas;
  } catch (error) {
    console.log('Error al cargar categorías:', error);
    return [];
  }
};