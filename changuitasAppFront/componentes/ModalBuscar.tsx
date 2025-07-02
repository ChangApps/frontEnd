import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import CustomModal from './CustomModal'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import EstilosModalBuscar from './EstilosModalBuscar';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ModalBuscar = ({ visible, onClose }: Props) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  
  const categorias = ['Electricista', 'Plomero', 'Carpintería', 'Pintor', 'Albañil', 'Zinguería', 'Gomería', 'Electrodomésticos', 'Calderista'];
  const horarios = ['Mañana', 'Tarde', 'Noche'];

  return (
    <CustomModal visible={visible} onClose={onClose}>
      <View style={EstilosModalBuscar.modalContainer}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <TouchableOpacity
        style={EstilosModalBuscar.botonCerrar}
        onPress={() => {
          onClose(); 
        }}
      >
        <View style={EstilosModalBuscar.cuadroIcono}>
          <AntDesign name="closesquareo" size={24} color="white" />
        </View>
      </TouchableOpacity>

          <Text style={EstilosModalBuscar.tituloSeccion}>Seleccione Categoría:</Text>
          <Text style={EstilosModalBuscar.subtitulo}>HOGAR</Text>
          <View style={EstilosModalBuscar.grid}>
            {categorias.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  EstilosModalBuscar.opcion,
                  categoriaSeleccionada === cat && EstilosModalBuscar.opcionSeleccionada
                ]}
                onPress={() => setCategoriaSeleccionada(cat)}
              >
                <Text style={EstilosModalBuscar.textoOpcion}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={EstilosModalBuscar.tituloRango}>Seleccione Rango Horario:</Text>
          <Text style={EstilosModalBuscar.subtitulo}>HORARIO</Text>
          <View style={EstilosModalBuscar.grid}>
            {horarios.map((horario) => (
              <TouchableOpacity
                key={horario}
                style={[
                  EstilosModalBuscar.opcion,
                  horarioSeleccionado === horario && EstilosModalBuscar.opcionSeleccionada
                ]}
                onPress={() => setHorarioSeleccionado(horario)}
              >
                <Text style={EstilosModalBuscar.textoOpcion}>{horario}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={EstilosModalBuscar.botonesFiltrado}>
            <TouchableOpacity
                style={[EstilosModalBuscar.botonFiltrado, EstilosModalBuscar.eliminar]}
                onPress={() => {
                setCategoriaSeleccionada('');
                setHorarioSeleccionado('');
                }}
            >
                <Text style={EstilosModalBuscar.textoEliminar}>Eliminar Filtros</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[EstilosModalBuscar.botonFiltrado, EstilosModalBuscar.aplicar]}
                onPress={() => {
                // Lógica de filtrado
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
