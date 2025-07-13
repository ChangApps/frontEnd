import Main from './Main';
import Colors from './assets/Colors';
import React from 'react';
import { View, StyleSheet} from 'react-native';

export default function App() {
  return (
    <View style={styles.fondo}>
      <Main/>
    </View>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: Colors.fondo, 
  },
});