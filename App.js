import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Formulario from './Components/Formulario';
import Clima from './Components/Clima';

const App = () => {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: '',
  });
  const {ciudad, pais} = busqueda;
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };
  const mostrarAlerta = () => {
    Alert.alert('Error', 'No hay resultados, intenta con otra ciudad o pais', [
      {text: 'Ok'},
    ]);
  };
  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const apId = '6b6f68ae83305a319f8c1264fa9efb2f';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apId}`;
        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          guardarResultado(resultado);
          guardarConsultar(false);
        } catch (error) {
          mostrarAlerta();
        }
      }
    };
    consultarClima();
  }, [consultar]);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={styles.app}>
          <View style={styles.contenido}>
            <Clima resultado={resultado} />
            <Formulario
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'rgb(71,149,212)',
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
