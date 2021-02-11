import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

const Formulario = ({busqueda, guardarBusqueda}) => {
  const {pais, ciudad} = busqueda;
  const [animacionboton] = useState(new Animated.Value(1));

  const animacionEntrada = () => {
    Animated.spring(animacionboton, {
      toValue: 0.75,
    }).start();
  };
  const animacionSalida = () => {
    Animated.spring(animacionboton, {
      toValue: 1,
      friction: 4,
      tension: 30,
    }).start();
  };
  const estiloAnimacion = {
    transform: [{scale: animacionboton}],
  };
  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
            value={ciudad}
            placeholder="Ciudad"
            placeholderTextColor="#666"
            style={styles.input}
            onChangeText={(ciudad) => guardarBusqueda({...busqueda, ciudad})}
          />
        </View>
        <View>
          <Picker
            selectedValue={pais}
            style={styles.selector}
            onValueChange={(pais) => guardarBusqueda({...busqueda, pais})}>
            <Picker.Item
              label="---Seleccione un país---"
              value=""></Picker.Item>
            <Picker.Item label="Estados Unidos" value="US"></Picker.Item>
            <Picker.Item label="Argentina" value="AR"></Picker.Item>
            <Picker.Item label="Colombia" value="CO"></Picker.Item>
            <Picker.Item label="Costa Rica" value="CR"></Picker.Item>
            <Picker.Item label="España" value="ES"></Picker.Item>
            <Picker.Item label="Peru" value="PE"></Picker.Item>
            <Picker.Item label="Mexico" value="MX"></Picker.Item>
          </Picker>
        </View>
        <TouchableWithoutFeedback
          onPressIn={() => animacionEntrada()}
          onPressOut={() => animacionSalida()}>
          <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
            <Text style={styles.textoBuscar}>Buscar Clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  selector: {
    height: 120,
    backgroundColor: '#fff',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 18,
  },
});

export default Formulario;
