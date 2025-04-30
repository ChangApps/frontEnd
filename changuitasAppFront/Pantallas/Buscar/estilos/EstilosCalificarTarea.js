import { StyleSheet } from 'react-native';

const EstilosCalificarTarea = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#ffffff',
    },
    encabezado: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: 'white',
      marginTop: 50,
    },
    textoEncabezado: {
      fontSize: 24,
      fontWeight: '600',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 20,
    },
    moreIcon: {
      position: 'absolute',
      top: 20,
      right: 20,
    },
    label: {
      fontSize: 16,
      color: '#333333',
      marginTop: 20,
      marginBottom: 10,
    },
    starsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    rating: {
      flexDirection: 'row',
      marginTop: 5,
    },
    textInput: {
      height: 150,
      borderWidth: 1,
      borderColor: '#b3cccc',
      borderRadius: 10,
      padding: 15,
      backgroundColor: '#f5f5f5',
      fontSize: 16,
      color: '#333333',
    },
    submitButton: {
      backgroundColor: '#91C9C0',
      paddingVertical: 12,
      borderRadius: 25,
      alignItems: 'center',
      marginTop: 20,
    },
    submitButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '600',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 20,
    },
    prevButton: {
      borderWidth: 1,
      borderColor: '#197278',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 50,
    },
    prevButtonText: {
      color: '#197278',
      fontSize: 16,
      fontWeight: 'bold',
    },
    nextButton: {
      backgroundColor: '#197278',
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 50,
    },
    nextButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  


export default EstilosCalificarTarea;
