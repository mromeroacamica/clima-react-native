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
  const [bgcolor, guardarBgcolor] = useState('rgb(71,149,212)');
  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };
  const mostrarAlerta = () => {
    Alert.alert('Error', 'No hay resultados, intenta con otra ciudad o pais', [
      {text: 'Ok'},
    ]);
  };
  const bgColorApp = {
    backgroundColor: bgcolor,
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
          //modifica colores de fondo basado en temp
          const kelvin = 273.15;
          const {main} = resultado;
          const actual = main.temp - kelvin;
          console.log(actual);
          if (actual < 10) {
            guardarBgcolor('rgb(105,108,149)');
          } else if (actual >= 10 && actual < 25) {
            guardarBgcolor('rgb(71,149,212)');
          } else {
            guardarBgcolor('rgb(178,28,61)');
          }
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
        <View style={[styles.app, bgColorApp]}>
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
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
