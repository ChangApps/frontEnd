import { SafeAreaView,Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import API_URL from '../../auxiliares/API_URL';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import EstilosRegistro from "./estilos/EstilosRegistro";

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
  
  return (
    <LinearGradient colors={['#1A202B', '#1A202B']} style={EstilosRegistro.degradado}>
      <SafeAreaView style={EstilosRegistro.areaSegura}>
        <ScrollView>
          <View style={EstilosRegistro.contenedor}>
            <View style={EstilosRegistro.encabezado}>
              <TouchableOpacity style={EstilosRegistro.botonAtras} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={EstilosRegistro.titulo}>Crear perfil</Text>
            </View>

              {/* Mensaje de error */}
          {errorMessage && (
            <View style={EstilosRegistro.errorContainer}>
              <Text style={EstilosRegistro.errorText}>Error: {errorMessage}</Text>
            </View>
          )}

            <View style={EstilosRegistro.formulario}>
              <View style={EstilosRegistro.campo}>
                <Text style={EstilosRegistro.etiqueta}>Nombre de usuario</Text>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#B3B3B3"
                  style={EstilosRegistro.entradaTexto}
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              <View style={EstilosRegistro.campo}>
                <Text style={EstilosRegistro.etiqueta}>Nombre</Text>
                <TextInput
                  placeholder="Nombre"
                  placeholderTextColor="#B3B3B3"
                  style={EstilosRegistro.entradaTexto}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              <View style={EstilosRegistro.campo}>
                <Text style={EstilosRegistro.etiqueta}>Apellido</Text>
                <TextInput
                  placeholder="Apellido"
                  placeholderTextColor="#B3B3B3"
                  style={EstilosRegistro.entradaTexto}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
              <View style={EstilosRegistro.campo}>
                <Text style={EstilosRegistro.etiqueta}>Fecha de nacimiento</Text>
                <TextInput
                  placeholder="aaaa-mm-dd"
                  placeholderTextColor="#B3B3B3"
                  style={EstilosRegistro.entradaTexto}
                  value={fechaNacimiento}
                  onChangeText={setFechaNacimiento}
                />
              </View>
              <View style={EstilosRegistro.campo}>
                <Text style={EstilosRegistro.etiqueta}>DNI</Text>
                <TextInput
                  placeholder="12345678"
                  placeholderTextColor="#B3B3B3"
                  style={EstilosRegistro.entradaTexto}
                  value={documento}
                  onChangeText={setDocumento}
                  keyboardType="numeric"
                />
              </View>
              <View style={EstilosRegistro.campo}>
                <Text style={EstilosRegistro.etiqueta}>Teléfono</Text>
                <TextInput
                  placeholder="2901245599"
                  placeholderTextColor="#B3B3B3"
                  style={EstilosRegistro.entradaTexto}
                  value={telefono}
                  onChangeText={setTelefono}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={EstilosRegistro.campo}>
                <Text style={EstilosRegistro.etiqueta}>Calle</Text>
                <TextInput
                  placeholder="San Martín"
                  placeholderTextColor="#B3B3B3"
                  style={EstilosRegistro.entradaTexto}
                  value={calle}
                  onChangeText={setCalle}
                />
              </View>
              <View style={EstilosRegistro.campo}>
                <Text style={EstilosRegistro.etiqueta}>Altura</Text>
                <TextInput
                  placeholder="456"
                  placeholderTextColor="#B3B3B3"
                  style={EstilosRegistro.entradaTexto}
                  value={altura}
                  onChangeText={setAltura}
                  keyboardType="numeric"
                />
              </View>
              <View style={EstilosRegistro.campo}>
                <Text style={EstilosRegistro.etiqueta}>Piso (opcional)</Text>
                <TextInput
                  placeholder="1"
                  placeholderTextColor="#B3B3B3"
                  style={EstilosRegistro.entradaTexto}
                  value={piso}
                  onChangeText={setPiso}
                  keyboardType="numeric"
                />
              </View>
              <View style={EstilosRegistro.campo}>
                <Text style={EstilosRegistro.etiqueta}>Nro. dpto. (opcional)</Text>
                <TextInput
                  placeholder="A"
                  placeholderTextColor="#B3B3B3"
                  style={EstilosRegistro.entradaTexto}
                  value={nroDepto}
                  onChangeText={setNroDepto}
                />
              </View>
              <View style={EstilosRegistro.campo}>
                <Text style={EstilosRegistro.etiqueta}>Barrio</Text>
                <TextInput
                  placeholder="Centro"
                  placeholderTextColor="#B3B3B3"
                  style={EstilosRegistro.entradaTexto}
                  value={barrio}
                  onChangeText={setBarrio}
                />
              </View>
              <View style={EstilosRegistro.campo}>
                <Text style={EstilosRegistro.etiqueta}>Correo electrónico</Text>
                <TextInput
                  placeholder="changuitas@app.com"
                  placeholderTextColor="#B3B3B3"
                  style={EstilosRegistro.entradaTexto}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={EstilosRegistro.campo}>
                <Text style={EstilosRegistro.etiqueta}>Contraseña</Text>
                <View style={EstilosRegistro.contenedorContraseña}>
                  <TextInput
                    placeholder="************"
                    placeholderTextColor="#B3B3B3"
                    style={EstilosRegistro.entradaContraseña}
                    secureTextEntry={!mostrarContraseña}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setMostrarContraseña(!mostrarContraseña)}>
                    <Ionicons name={mostrarContraseña ? "eye-outline" : "eye-off-outline"} size={24} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={EstilosRegistro.campo}>
                <Text style={EstilosRegistro.etiqueta}>Confirmar contraseña</Text>
                <View style={EstilosRegistro.contenedorContraseña}>
                  <TextInput
                    placeholder="************"
                    placeholderTextColor="#B3B3B3"
                    style={EstilosRegistro.entradaContraseña}
                    secureTextEntry={!mostrarConfirmarContraseña}
                    value={confirmarPassword}
                    onChangeText={setConfirmarPassword}
                  />
                  <TouchableOpacity onPress={() => setMostrarConfirmarContraseña(!mostrarConfirmarContraseña)}>
                    <Ionicons name={mostrarConfirmarContraseña ? "eye-outline" : "eye-off-outline"} size={24} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={handleRegistro}>
              <LinearGradient
                colors={['#FFAE17', '#FFAE17']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={EstilosRegistro.botonDegradado}
              >
                <Text style={EstilosRegistro.textoBotonRegistro}>Registrarse</Text>
              </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Registro;
