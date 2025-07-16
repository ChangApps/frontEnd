// COMPONENTE: ModalCancelarChanguita.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './Buttons';
import Colors from '../assets/Colors';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (motivo: string) => void;
  motivoSeleccionado: string;
  setMotivoSeleccionado: (motivo: string) => void;
  rol: 'cliente' | 'trabajador' | null;
}

const ModalCancelarChanguita: React.FC<Props> = ({
  visible,
  onClose,
  onConfirm,
  motivoSeleccionado,
  setMotivoSeleccionado,
  rol,
}) => {
  const motivosTrabajador = [
    'No puedo asistir',
    'Problemas personales',
    'No me siento capacitado',
    'Otra razón',
  ];

  const motivosCliente = [
    'Ya no necesito el servicio',
    'Encontré otro trabajador',
    'Problemas con la aplicación',
    'Otra razón',
  ];

  const motivosCancelacion = rol === 'trabajador' ? motivosTrabajador : motivosCliente;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '90%', backgroundColor: Colors.fondo, borderRadius: 12, padding: 20}}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15, color:"white"}}>
            ¿Por qué querés cancelar la changuita?
          </Text>

          {motivosCancelacion.map((motivo, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setMotivoSeleccionado(motivo)}
              style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}
            >
              <Ionicons
                name={motivoSeleccionado === motivo ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={Colors.naranja}
                style={{ marginRight: 10 }}
              />
              <Text style={{ fontSize: 16, color:"white" }}>{motivo}</Text>
            </TouchableOpacity>
          ))}

          <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
             <Button
              titulo="Cancelar"
              onPress={onClose}
              backgroundColor= "transparent"
              textColor={Colors.naranja}
              textSize={14}
              padding={10}
              borderRadius={20}
              borderWidth={1}
              borderColor={Colors.naranja}
              width="40%"
            />

            <Button
              titulo="Confirmar"
              onPress={() => {
                if (motivoSeleccionado) {
                  onConfirm(motivoSeleccionado);
                }
              }}
              backgroundColor={motivoSeleccionado ? Colors.naranja : "#CCCCCC"}
              textColor="#fff"
              textSize={14}
              padding={10}
              borderRadius={20}
              width="40%"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCancelarChanguita;
