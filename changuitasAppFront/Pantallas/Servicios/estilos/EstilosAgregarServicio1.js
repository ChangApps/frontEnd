import { StyleSheet } from 'react-native';

const EstilosAgregarServicio1 = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      marginTop: 40,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#197278',
      padding: 15,
    },
    backButton: {
      marginRight: 10,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },
    scrollContainer: {
      paddingHorizontal: 20,
      paddingBottom: 80,
    },
    categoryTitle: {
      fontSize: 16,
      color: '#197278',
      fontWeight: '600',
      marginTop: 20,
    },
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    optionText: {
      fontSize: 16,
      color: 'black',
      marginLeft: 8,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 20,
    },
    nextButton: {
      backgroundColor: '#197278',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 50,
    },
    nextButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    cancelButton: {
      borderWidth: 1,
      borderColor: '#197278',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 50,
    },
    cancelButtonText: {
      color: '#197278',
      fontSize: 16,
      fontWeight: 'bold',
    },
    barraNavegacion: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 60,
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    iconoNavegacion: {
      alignItems: 'center',
    },
    textoNavegacion: {
      fontSize: 12,
      color: 'gray',
    },
  });

export default EstilosAgregarServicio1;