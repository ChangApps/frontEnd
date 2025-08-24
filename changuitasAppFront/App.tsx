import Main from './Main';
import Colors from './assets/Colors';
import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(Colors.fondo);
    NavigationBar.setButtonStyleAsync('light'); 
  }, []);

  return (
    <View style={styles.fondo}>
      <StatusBar 
        barStyle="light-content"   // iconos claros (wifi, batería, hora)
        backgroundColor={Colors.fondo} // fondo de la barra
      />
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