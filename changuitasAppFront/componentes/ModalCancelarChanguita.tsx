// COMPONENTE: ModalCancelarChanguita.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (motivo: string) => void;
  motivoSeleccionado: string;
  setMotivoSeleccionado: (motivo: string) => void;
  motivosCancelacion: string[];
}

const ModalCancelarChanguita: React.FC<Props> = ({
  visible,
  onClose,
  onConfirm,
  motivoSeleccionado,
  setMotivoSeleccionado,
  motivosCancelacion,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '90%', backgroundColor: '#fff', borderRadius: 12, padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15 }}>
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
                color="#197278"
                style={{ marginRight: 10 }}
              />
              <Text style={{ fontSize: 16 }}>{motivo}</Text>
            </TouchableOpacity>
          ))}

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
            <TouchableOpacity onPress={onClose} style={{ marginRight: 15 }}>
              <Text style={{ color: '#888' }}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!motivoSeleccionado}
              onPress={() => onConfirm(motivoSeleccionado)}
            >
              <Text style={{ color: motivoSeleccionado ? '#2E7D32' : '#ccc', fontWeight: 'bold' }}>
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCancelarChanguita;
