import { StyleSheet } from 'react-native';

const EstiloOverlay = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "transparent", // o "rgba(0,0,0,0.1)" si querés oscurecer
        zIndex: 1,
      },
});

export default EstiloOverlay;