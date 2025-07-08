import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navegacion/AppNavigator';

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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  if (!visible) return null;

  return (
    <View style={styles.desplegable}>
      {usuario?.is_staff && (
        <TouchableOpacity style={styles.opcionDesplegable} onPress={onRedirectAdmin}>
          <Text style={styles.textoDesplegable}>Admin</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.opcionDesplegable} onPress={() => navigation.navigate('PantallaAyuda')}>
        <Text style={styles.textoDesplegable}>Ayuda</Text>
      </TouchableOpacity>
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
    right: 18,
    width: 160,
    backgroundColor: '#191a2e',
    borderRadius: 16,
    paddingVertical: 10,
    elevation: 5,
    zIndex: 10,
  },
  opcionDesplegable: {
    backgroundColor: '#2a2b45',
    marginVertical: 4,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    elevation: 2,
  },
  textoDesplegable: {
    fontSize: 16,
    color: 'white',
  },
});

export default MenuDesplegable;