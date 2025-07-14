import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import CustomModal from './CustomModal';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../utils/API_URL';
import EstilosModalBuscar from './EstilosModalBuscar';

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
  const horarios = ['Mañana', 'Tarde', 'Noche'];

  // Cargar subcategorías al cambiar categoriaId o al abrir el modal
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
                onPress={() => setSubcategoriaSeleccionada(sub.id)}
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
                if (onAplicarFiltros) {
                  onAplicarFiltros(subcategoriaSeleccionada, horarioSeleccionado);
                }
                onClose();
              }}
            >
              <Text style={EstilosModalBuscar.textoAplicar}>Aplicar Filtrado</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </CustomModal>
  );
};

export default ModalBuscar;
