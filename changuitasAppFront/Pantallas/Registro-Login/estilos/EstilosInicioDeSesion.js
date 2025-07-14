import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

/*
import { Platform} from "react-native";

 Platform.OS == "web" o Platform.OS =="android"
 Tambien se puede usar platform para que dado en un determinado dispositivo tenga tal estilo
 */
const EstilosInicioDeSesion = StyleSheet.create({
    areaSegura: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      degradado: {
      flex: 1,
      },
      contenedor: {
        width: "90%",
        padding: 20,
        justifyContent: "center",
      },
      contenedorWeb: {
        maxWidth: 500,
      },
      encabezado: {
        alignItems: "center",
        marginBottom: 30,
      },
      titulo: {
        fontSize: 28,
        color: Colors.blancoTexto,
        fontWeight: "bold",
      },
      errorContainer: {
        backgroundColor: Colors.blancoTexto,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
      },
      errorText: {
        color: Colors.errorTexto,
        fontSize: 14,
        textAlign: "center",
      },
      contenedorEntrada: {
        marginBottom: 20,
      },
      textoRegistrarse: {
        fontSize: 16,
        color: Colors.naranja,
        textDecorationLine: "underline",
        textAlign: "center",
        marginVertical: 8,
      },
    });
    export default EstilosInicioDeSesion;