// COMPONENTE: AccionesTarea.tsx (basado fielmente en tu archivo inicial de DetalleTarea.tsx)
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  rol: 'cliente' | 'trabajador' | null;
  estado: string;
  aceptarChanguita: () => void;
  setMostrarModal: (visible: boolean) => void;
  finalizarSolicitud: () => void;
  estilos: any;
}

const AccionesTarea: React.FC<Props> = ({
  rol,
  estado,
  aceptarChanguita,
  setMostrarModal,
  finalizarSolicitud,
  estilos,
}) => {
  return (
    <>
      {rol === 'trabajador' && estado === 'PA' && (
        <View style={estilos.buttonContainer}>
          <TouchableOpacity
            style={estilos.nextButton}
            onPress={aceptarChanguita}
          >
            <Text style={estilos.nextButtonText}>Aceptar changuita</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={estilos.prevButton}
            onPress={() => setMostrarModal(true)}
          >
            <Text style={estilos.prevButtonText}>Cancelar changuita</Text>
          </TouchableOpacity>
        </View>
      )}

      {rol === 'trabajador' && estado === 'I' && (
        <View style={estilos.buttonContainer}>
          <TouchableOpacity
            style={estilos.prevButton}
            onPress={() => setMostrarModal(true)}
          >
            <Text style={estilos.prevButtonText}>Cancelar changuita</Text>
          </TouchableOpacity>
        </View>
      )}

      {rol === 'cliente' && !['F', 'C', 'Finalizado', 'Cancelado'].includes(estado) && (
        <View style={estilos.buttonContainer}>
          {estado !== 'PA' && estado !== 'Pendiente Aceptacion' && (
            <TouchableOpacity
              style={estilos.nextButton}
              onPress={finalizarSolicitud}
            >
              <Text style={estilos.nextButtonText}>Finalizar changuita</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={estilos.prevButton}
            onPress={() => setMostrarModal(true)}
          >
            <Text style={estilos.prevButtonText}>Cancelar changuita</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default AccionesTarea;
