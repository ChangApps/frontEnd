import { Text, View, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import API_URL from '../../utils/API_URL';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import EstilosRegistro from "./estilos/EstilosRegistro";
import { NavBarSuperior } from "../../componentes/NavBarSuperior";
import Colors from "../../assets/Colors";
import Input from "../../componentes/inputs/Input";
import PasswordInput from "../../componentes/inputs/PasswordInput";
import { Button } from "../../componentes/Buttons";
import { useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Registro = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [mostrarConfirmarContraseña, setMostrarConfirmarContraseña] = useState(false);


  // Estados para cada campo
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [calle, setCalle] = useState("");
  const [altura, setAltura] = useState("");
  const [piso, setPiso] = useState("");
  const [nroDepto, setNroDepto] = useState("");
  const [barrio, setBarrio] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error


  // Función para manejar el registro del usuario
  const handleRegistro = async () => {
    if (password !== confirmarPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      setErrorMessage('Las contraseñas no coinciden'); // Actualiza el estado para almacenar el mensaje
      return;
    }

    if (!fechaNacimiento.trim()) {
      Alert.alert('Error', 'El campo de fecha de nacimiento no puede estar vacío.');
      setErrorMessage('El campo de fecha de nacimiento no puede estar vacío.');
      return;
    }

    // Reformatea fecha de nacimiento a 'YYYY-MM-DD'
    const fechaNacimientoFormatoCorrecto = fechaNacimiento.split('/').reverse().join('-');

    const birthDate = new Date(fechaNacimientoFormatoCorrecto);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      Alert.alert('Error', 'Debes tener al menos 18 años para registrarte');
      setErrorMessage('Debes tener al menos 18 años para registrarte');
      return;
    }

    const usuario = {
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      documento: parseInt(documento, 8),
      telefono: parseInt(telefono, 10),
      fotoPerfil: null,
      fechaNacimiento: fechaNacimientoFormatoCorrecto,
      password,
      password2: password, // Usa el mismo valor de `password` para `password2`
      direccion: {
        calle,
        altura: parseInt(altura, 10),
        piso: parseInt(piso, 10),
        nroDepto: parseInt(nroDepto, 10) || null,
        barrio,
      },
    };
    try {
      const response = await fetch(`${API_URL}/validar/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = '';

        // Diccionario para traducir claves y mensajes
        const translations: Record<string, string> = {
          username: 'Nombre de usuario',
          fechaNacimiento: 'Fecha de nacimiento',
          email: 'Correo electrónico',
          documento: 'Documento',
          telefono: 'Teléfono',
          direccion: 'Dirección',
          calle: 'Calle',
          altura: 'Altura',
          password: 'Contraseña',
          password2: 'Repetir contraseña',
        };

        const translatedErrors: Record<string, string> = {
          "This field may not be blank.": "Este campo no puede estar vacío.",
          "This field may not be null.": "Este campo no puede ser vacío.",
          "Date has wrong format. Use one of these formats instead: YYYY-MM-DD.":
            "La fecha tiene un formato incorrecto. Usa el formato YYYY-MM-DD.",
          "A user with that username already exists.":
            "Ya existe un usuario con ese nombre.",
          "Password fields didn’t match.": "Las contraseñas no coinciden.",
          "user with this documento already exists.": "Ya existe un usuario con este documento.",
          "Enter a valid email address.": "Introduce una dirección de correo electrónico válida.",
        };


        // Función para traducir errores, incluyendo estructuras anidadas
        const translateErrors = (
          errors: Record<string, any>,
          parentKey: string = ''
        ): string => {
          let message = '';

          for (const [key, value] of Object.entries(errors)) {
            const field = parentKey
              ? `${translations[parentKey] || parentKey} -> ${translations[key] || key}`
              : translations[key] || key;

            if (Array.isArray(value)) {
              // Si es un array, traducimos cada mensaje
              const messages = value.map(
                (msg: string) => translatedErrors[msg] || msg
              );
              message += `${field}: ${messages.join(', ')}\n`;
            } else if (typeof value === 'object') {
              // Si es un objeto, llamamos recursivamente (Ayudin)
              message += translateErrors(value, key);
            } else {
              // Caso general (no array, no objeto)
              const singleMessage = translatedErrors[value] || value;
              message += `${field}: ${singleMessage}\n`;
            }
          }

          return message;
        };

        // Traducimos los errores
        errorMessage = translateErrors(errorData).trim();

        throw new Error(errorMessage);
      }

      // Si la respuesta es exitosa
      const data = await response.json();
      console.log('Los datos son válidos');
      navigation.navigate('Verificacion1Mail', { datosUsuario: usuario });

    } catch (error: any) {
      const errorMessage = error.message || 'No se pudieron validar los datos.';
      console.error('Error detallado:', error);
      Alert.alert('Error', errorMessage);
      setErrorMessage(errorMessage); // Actualiza el estado con el mensaje
    }
  };

  const { width } = useWindowDimensions();

  return (
    <LinearGradient colors={[Colors.degradeTop, Colors.degradeBottom]} style={EstilosRegistro.degradado}>
      <SafeAreaView edges={['top']} style={EstilosRegistro.safeContainer}>
        <ScrollView>
          <View style={EstilosRegistro.contenedor}>
            <View style={[EstilosRegistro.contenidoResponsivo, width > 600 && EstilosRegistro.contenidoWeb]}>
              {/* NavBar Superior */}
              <NavBarSuperior
                titulo="Crear perfil"
                showBackButton={true}
                onBackPress={() => navigation.goBack()}
                rightButtonType="none"
                paddingHorizontal={5}
              />

              {/* Mensaje de error */}
              {errorMessage && (
                <View style={EstilosRegistro.errorContainer}>
                  <Text style={EstilosRegistro.errorText}>Error: {errorMessage}</Text>
                </View>
              )}

              <View style={EstilosRegistro.formulario}>
                <View style={EstilosRegistro.campo}>
                  <Text style={EstilosRegistro.etiqueta}>Nombre de usuario</Text>
                  <Input
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
                <View style={EstilosRegistro.campo}>
                  <Text style={EstilosRegistro.etiqueta}>Nombre</Text>
                  <Input
                    placeholder="Nombre"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
                <View style={EstilosRegistro.campo}>
                  <Text style={EstilosRegistro.etiqueta}>Apellido</Text>
                  <Input
                    placeholder="Apellido"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
                <View style={EstilosRegistro.campo}>
                  <Text style={EstilosRegistro.etiqueta}>Fecha de nacimiento</Text>
                  <Input
                    placeholder="aaaa-mm-dd"
                    value={fechaNacimiento}
                    onChangeText={setFechaNacimiento}
                  />
                </View>
                <View style={EstilosRegistro.campo}>
                  <Text style={EstilosRegistro.etiqueta}>DNI</Text>
                  <Input
                    placeholder="12345678"
                    value={documento}
                    onChangeText={setDocumento}
                  />
                </View>
                <View style={EstilosRegistro.campo}>
                  <Text style={EstilosRegistro.etiqueta}>Teléfono</Text>
                  <Input
                    placeholder="2901245599"
                    value={telefono}
                    onChangeText={setTelefono}
                  />
                </View>
                <View style={EstilosRegistro.campo}>
                  <Text style={EstilosRegistro.etiqueta}>Calle</Text>
                  <Input
                    placeholder="San Martín"
                    value={calle}
                    onChangeText={setCalle}
                  />
                </View>
                <View style={EstilosRegistro.campo}>
                  <Text style={EstilosRegistro.etiqueta}>Altura</Text>
                  <Input
                    placeholder="456"
                    value={altura}
                    onChangeText={setAltura}
                  />
                </View>
                <View style={EstilosRegistro.campo}>
                  <Text style={EstilosRegistro.etiqueta}>Piso (opcional)</Text>
                  <Input
                    placeholder="1"
                    value={piso}
                    onChangeText={setPiso}
                  />
                </View>
                <View style={EstilosRegistro.campo}>
                  <Text style={EstilosRegistro.etiqueta}>Nro. dpto. (opcional)</Text>
                  <Input
                    placeholder="A"
                    value={nroDepto}
                    onChangeText={setNroDepto}
                  />
                </View>
                <View style={EstilosRegistro.campo}>
                  <Text style={EstilosRegistro.etiqueta}>Barrio</Text>
                  <Input
                    placeholder="Centro"
                    value={barrio}
                    onChangeText={setBarrio}
                  />
                </View>
                <View style={EstilosRegistro.campo}>
                  <Text style={EstilosRegistro.etiqueta}>Correo electrónico</Text>
                  <Input
                    placeholder="changuitas@app.com"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                <View style={EstilosRegistro.campo}>
                  <Text style={EstilosRegistro.etiqueta}>Contraseña</Text>
                  <PasswordInput
                    placeholder="************"
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
                <View style={EstilosRegistro.campo}>
                  <Text style={EstilosRegistro.etiqueta}>Confirmar contraseña</Text>
                  <PasswordInput
                    placeholder="************"
                    value={confirmarPassword}
                    onChangeText={setConfirmarPassword}
                  />
                </View>
                {/* Botón de Registrarse */}
                <Button
                  titulo="Registrarse"
                  onPress={handleRegistro}
                  textSize={20}
                  textColor={Colors.fondo}
                  padding={15}
                  borderRadius={25}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Registro;
