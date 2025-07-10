import { StyleSheet, Platform } from 'react-native';
import Colors from '../../../assets/Colors';

const styles = StyleSheet.create({
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
    paddingHorizontal: Platform.OS === 'web' ? 250 : 20,
    paddingTop: Platform.OS === 'web' ? 20 : 30,
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 20,
    color: Colors.blancoTexto,
    marginBottom: Platform.OS === 'web' ? 15 : 30,
    fontWeight: '500',
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'web' ? 10 : 30,
    paddingVertical: 10,
  },
  star: {
    marginHorizontal: Platform.OS === 'web' ? 20 : 10,
  },
  textInput: {
    backgroundColor: Colors.blancoOscuroTexto,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: Colors.naranja,
    padding: 15,
    minHeight: Platform.OS === 'web' ? 160 : 200,
    fontSize: 20,
    color: Colors.negro,
    marginBottom: 30,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    paddingHorizontal: Platform.OS === 'web' ? 80 : 30,
    marginTop: 'auto',
    marginBottom: Platform.OS === 'web' ? 15 : 60,
  },
  snackbar: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    zIndex: 100000,
  },
});

export default styles;
