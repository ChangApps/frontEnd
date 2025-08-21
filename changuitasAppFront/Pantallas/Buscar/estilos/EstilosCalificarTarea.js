import { StyleSheet, Platform } from 'react-native';
import Colors from '../../../assets/Colors';

/*
Usa getStyles(width) para devolver estilos dinámicos dependiendo del ancho de pantalla y si es web o móvil.
Ajusta márgenes, paddings y tamaños para mejorar la experiencia en escritorios, tablets y móviles.
Está optimizado para que el contenido tenga un diseño bueno en cualquier dispositivo.
*/

  export default function getStyles(width) {
    const isLargeScreen = width >= 768; // tablet/escritorio
    const isWeb = Platform.OS === 'web';

    return StyleSheet.create({
      safeContainer: {
        flex: 1,
        backgroundColor: Colors.fondo,
      },
      container: {
        flex: 1,
        backgroundColor: Colors.fondo,
      },
      scrollContainer: {
        flex: 1,
      },
      scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
      },
      content: {
        flex: 1,
        paddingHorizontal: isWeb && isLargeScreen ? 250 : 20,
        paddingTop: isWeb ? 20 : 30,
        justifyContent: 'flex-start',
      },
      label: {
        fontSize: 20,
        color: Colors.blancoTexto,
        marginBottom: isWeb && isLargeScreen ? 15 : 30,
        fontWeight: '500',
      },
      rating: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: isWeb && isLargeScreen ? 10 : 30,
        paddingVertical: 10,
      },
      star: {
        marginHorizontal: isWeb && isLargeScreen ? 20 : 10,
      },
      textInput: {
        backgroundColor: Colors.blancoOscuroTexto,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: Colors.naranja,
        padding: 15,
        minHeight: isWeb && isLargeScreen ? 160 : 200,
        fontSize: 20,
        color: Colors.negro,
        marginBottom: 30,
        textAlignVertical: 'top',
      },
      buttonContainer: {
        paddingHorizontal: isWeb && isLargeScreen ? 80 : 30,
        marginTop: 'auto',
        marginBottom: isWeb && isLargeScreen ? 15 : 60,
      },
    });
  }