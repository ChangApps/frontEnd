import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomModal from './CustomModal';
import EstilosModalBuscar from './EstilosModalBuscar';

interface Servicio {
  id: number;
  nombreServicio: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  servicios: Servicio[];
  onSeleccionar: (servicio: Servicio) => void;
}

const ModalSeleccionarServicio = ({ visible, onClose, servicios, onSeleccionar }: Props) => {
  return (
    <CustomModal visible={visible} onClose={onClose}>
      <View style={EstilosModalBuscar.modalContainer}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <TouchableOpacity
            style={EstilosModalBuscar.botonCerrar}
            onPress={onClose}
          >
            <View style={EstilosModalBuscar.cuadroIcono}>
              <AntDesign name="closesquareo" size={24} color="white" />
            </View>
          </TouchableOpacity>

          <Text style={EstilosModalBuscar.tituloSeccion}>Seleccione un servicio:</Text>
          <Text style={EstilosModalBuscar.subtitulo}>SERVICIOS DISPONIBLES</Text>

          <View style={EstilosModalBuscar.grid}>
            {servicios.map((servicio) => (
              <TouchableOpacity
                key={servicio.id}
                style={EstilosModalBuscar.opcion}
                onPress={() => onSeleccionar(servicio)}
              >
                <Text style={EstilosModalBuscar.textoOpcion}>{servicio.nombreServicio}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </CustomModal>
  );
};

export default ModalSeleccionarServicio;
