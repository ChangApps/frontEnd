import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import CustomModal from './CustomModal';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../utils/API_URL';
import EstilosModalBuscar from './EstilosModalBuscar';
import axios from 'axios';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navegacion/AppNavigator';
import CustomSnackbar from './CustomSnackbar';

interface Categoria {
  id: number;
  nombre: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  categoriaId: number | null;
  onAplicarFiltros?: (subcategoriaId: number | null, horario: string) => void;
}

const ModalBuscar = ({ visible, onClose, categoriaId, onAplicarFiltros }: Props) => {
  const [subcategorias, setSubcategorias] = useState<Categoria[]>([]);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState<number | null>(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string>('');
  const [nombreServicio, setnombreServicio] = useState<string>('');
  const [providers, setProviders] = useState([]);
  const horarios = ['Madrugada', 'Mañana', 'Tarde', 'Noche'];
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [snackbarVisible, setsnackbarVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleBuscar = async () => {
  try { 
    const accessToken = await AsyncStorage.getItem('accessToken');
    const userId = await AsyncStorage.getItem('userId');

    if (!accessToken) {
      throw new Error('No se encontró el token de acceso. Por favor, inicia sesión.');
    }

    const params = new URLSearchParams();
    params.append('nombre_servicio', nombreServicio);

    let desdeHora = '';
    let hastaHora = '';

    switch (horarioSeleccionado) {
      case 'Madrugada':
        desdeHora = '00:00:00';
        hastaHora = '07:59:59';
        break;
      case 'Mañana':
        desdeHora = '08:00:00';
        hastaHora = '12:00:00';
        break;
      case 'Tarde':
        desdeHora = '12:05:00';
        hastaHora = '18:00:00';
        break;
      case 'Noche':
        desdeHora = '18:05:00';
        hastaHora = '23:59:59';
        break;
      default:
        break;
    }

    if (desdeHora && hastaHora) {
      const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
      diasSemana.forEach(dia => {
        params.append('dias[]', dia);
        params.append('desde_horas[]', desdeHora);
        params.append('hasta_horas[]', hastaHora);
      });
    }

    const response = await axios.get(`${API_URL}/buscar-proveedores/?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const todosLosProveedores = response.data.proveedores || [];

    if (!userId) throw new Error('No se encontró el ID del usuario.');

    const proveedoresFiltrados = todosLosProveedores.filter(
      (proveedor: any) => proveedor.id !== parseInt(userId)
    );

    if (proveedoresFiltrados.length > 0) {
      setProviders(proveedoresFiltrados);
      console.log('Proveedores encontrados:', proveedoresFiltrados);
      navigation.navigate('ResultadosBusqueda', { proveedores: proveedoresFiltrados, busquedaGeneral: false});
    } else {
      navigation.navigate('ResultadosBusqueda', {
        proveedores: [],
        error: 'No se encontraron proveedores para el servicio solicitado.',
        busquedaGeneral: false
      });
    }

  } catch (error: any) {
    const mensajeError = error?.response?.data?.message;
    navigation.navigate('ResultadosBusqueda', {
      proveedores: [],
      error: mensajeError || 'Error al buscar proveedores.',
      busquedaGeneral: false
    });
  } 
};

  useEffect(() => {
    const obtenerSubcategorias = async () => {
      if (!categoriaId) return;
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const res = await fetch(`${API_URL}/categorias/${categoriaId}/subcategorias/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) console.log('Error al obtener subcategorías');

        const data = await res.json();
        setSubcategorias(data);
      } catch (error) {
        console.log('Error al obtener subcategorías:', error);
        setSubcategorias([]);
      }
    };

    if (visible) {
      obtenerSubcategorias();
      setSubcategoriaSeleccionada(null); // resetea al abrir
      setHorarioSeleccionado('');
    }
  }, [categoriaId, visible]);

  return (
    <CustomModal visible={visible} onClose={onClose}>
      <View style={EstilosModalBuscar.modalContainer}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <TouchableOpacity style={EstilosModalBuscar.botonCerrar} onPress={onClose}>
            <View style={EstilosModalBuscar.cuadroIcono}>
              <AntDesign name="closesquareo" size={24} color="white" />
            </View>
          </TouchableOpacity>

          <Text style={EstilosModalBuscar.tituloSeccion}>Seleccione Subcategoría</Text>
          <View style={EstilosModalBuscar.grid}>
            {subcategorias.map((sub) => (
              <TouchableOpacity
                key={sub.id}
                style={[
                  EstilosModalBuscar.opcion,
                  subcategoriaSeleccionada === sub.id && EstilosModalBuscar.opcionSeleccionada
                ]}
               onPress={() => {
                  setSubcategoriaSeleccionada(sub.id);
                  setnombreServicio(sub.nombre);
                }}
              >
                <Text style={EstilosModalBuscar.textoOpcion}>{sub.nombre}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={EstilosModalBuscar.tituloRango}>Seleccione Rango Horario</Text>
          <View style={EstilosModalBuscar.grid}>
            {horarios.map((h) => (
              <TouchableOpacity
                key={h}
                style={[
                  EstilosModalBuscar.opcion,
                  horarioSeleccionado === h && EstilosModalBuscar.opcionSeleccionada
                ]}
                onPress={() => setHorarioSeleccionado(h)}
              >
                <Text style={EstilosModalBuscar.textoOpcion}>{h}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={EstilosModalBuscar.botonesFiltrado}>
            <TouchableOpacity
              style={[EstilosModalBuscar.botonFiltrado, EstilosModalBuscar.eliminar]}
              onPress={() => {
                setSubcategoriaSeleccionada(null);
                setHorarioSeleccionado('');
              }}
            >
              <Text style={EstilosModalBuscar.textoEliminar}>Eliminar Filtros</Text>
            </TouchableOpacity>

        <TouchableOpacity
              style={[EstilosModalBuscar.botonFiltrado, EstilosModalBuscar.aplicar]}
              onPress={() => {
                if (!subcategoriaSeleccionada || !horarioSeleccionado) {
                  setMessage("Debe aplicar todos los filtros para buscar");
                  setsnackbarVisible(true); 
                  return; // Salir sin hacer nada más
                }
                handleBuscar(); 
                onClose();     
              }}
            >
              <Text style={EstilosModalBuscar.textoAplicar}>Aplicar Filtrado</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
       <CustomSnackbar visible={snackbarVisible} setVisible={setsnackbarVisible} message={message}/>
    </CustomModal>
  );
};

export default ModalBuscar;
