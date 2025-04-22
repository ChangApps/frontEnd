import { StyleSheet } from 'react-native';

/*
import { Platform} from "react-native";

 Platform.OS == "web" o Platform.OS =="android"
 Tambien se puede usar platform para que dado en un determinado dispositivo tenga tal estilo
 */
const EstilosInicioDeSesion = StyleSheet.create({
    areaSegura: {
        flex: 1,
        backgroundColor: "#B7B7B7",
        alignItems: "center",
        justifyContent: "center",
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
        color: "#fff",
        fontWeight: "bold",
      },
      errorContainer: {
        backgroundColor: "#F8D7DA",
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
      },
      errorText: {
        color: "#A94442",
        fontSize: 14,
        textAlign: "center",
      },
      contenedorEntrada: {
        marginBottom: 20,
      },
      etiqueta: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 8,
      },
      entrada: {
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: 15,
        fontSize: 16,
        marginBottom: 20,
      },
      contenedorEntradaContrasena: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
      },
      entradaContrasena: {
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: 15,
        fontSize: 16,
        flex: 1,
      },
      iconoOjo: {
        position: "absolute",
        right: 15,
      },
      degradadoBoton: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
      },
      textoBoton: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
      },
      textoPie: {
        color: "#fff",
        textAlign: "center",
        marginTop: 30,
        paddingHorizontal: 20,
        fontSize: 12,
      },
      textoRegistrarse: {
        fontSize: 14,
        color: "#197278",
        textDecorationLine: "underline",
        textAlign: "center",
        marginVertical: 8,
      },
    });
    export default EstilosInicioDeSesion;