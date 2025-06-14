import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  usuario: Usuario | null;
  onLogout: () => void;
  onRedirectAdmin: () => void;
}

interface Usuario {
  is_staff?: boolean;
}

const MenuDesplegable: React.FC<Props> = ({
  visible,
  usuario,
  onLogout,
  onRedirectAdmin,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.desplegable}>
      {usuario?.is_staff && (
        <TouchableOpacity style={styles.opcionDesplegable} onPress={onRedirectAdmin}>
          <Text style={styles.textoDesplegable}>Admin</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.opcionDesplegable} onPress={onLogout}>
        <Text style={styles.textoDesplegable}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  desplegable: {
    position: 'absolute',
    top: 70,
    right: 20,
    width: 150,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    zIndex: 10,
  },
  opcionDesplegable: {
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  textoDesplegable: {
    fontSize: 16,
    color: '#333333',
  },
});

export default MenuDesplegable;