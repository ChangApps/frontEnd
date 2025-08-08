// COMPONENTE: AccionesTarea.tsx (basado fielmente en tu archivo inicial de DetalleTarea.tsx)
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from '../Buttons';
import Colors from '../../assets/Colors';
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
      {rol === 'trabajador' && (estado === 'PA' || estado === 'Pendiente de Aceptación') && (
        <View style={estilos.buttonContainer}>
          <Button
            titulo="Aceptar changuita"
            onPress={aceptarChanguita}
            backgroundColor={Colors.naranja}
            textColor={Colors.fondo}
            width={estilos.nextButton.width} 
            padding={estilos.nextButton.padding}
            borderRadius={estilos.nextButton.borderRadius}
          />

          <Button
            titulo="Cancelar changuita"
            onPress={() => setMostrarModal(true)}
            backgroundColor={Colors.fondo} 
            textColor={estilos.prevButtonText.color} 
            borderColor={estilos.prevButton.borderColor } 
            borderWidth={estilos.prevButton.borderWidth} 
            width={estilos.prevButton.width}
            padding={estilos.prevButton.padding15}
            borderRadius={estilos.prevButton.borderRadius}
          />
        </View>
      )}

      {rol === 'trabajador' && (estado === 'I'  || estado === 'Iniciado')  && (
        <View style={estilos.buttonContainer}>
          <Button
            titulo="Cancelar changuita"
            onPress={() => setMostrarModal(true)}
            backgroundColor={Colors.fondo}
            textColor={estilos.prevButtonText.color}
            borderColor={estilos.prevButton.borderColor}
            borderWidth={estilos.prevButton.borderWidth}
            width={estilos.prevButton.width}
            padding={estilos.prevButton.padding15}
            borderRadius={estilos.prevButton.borderRadius}
          />
        </View>
      )}

{rol === 'cliente' && !['F', 'C', 'Finalizado', 'Cancelado'].includes(estado) && (
  <View style={estilos.buttonContainer}>
    {!['PA', 'Pendiente de Aceptación'].includes(estado) && (
      <>
        <Button
          titulo="Finalizar changuita"
          onPress={finalizarSolicitud}
          backgroundColor={Colors.naranja}
          textColor={Colors.fondo}
          width={estilos.nextButton.width}
          padding={estilos.nextButton.padding}
          borderRadius={estilos.nextButton?.borderRadius}
        />
      </>
    )}
          <Button
            titulo="Cancelar changuita"
            onPress={() => setMostrarModal(true)}
            backgroundColor={Colors.fondo}
            textColor={estilos.prevButtonText.color}
            borderColor={estilos.prevButton.borderColor}
            borderWidth={estilos.prevButton.borderWidth}
            width={estilos.prevButton.width}
            padding={estilos.prevButton.padding15}
            borderRadius={estilos.prevButton.borderRadius}
          />
        </View>
      )}
    </>
  );
};

export default AccionesTarea;
