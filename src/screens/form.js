import React, {useState} from 'react';
import {Text, StyleSheet, SafeAreaView, TextInput, View} from 'react-native';



const Form = ({ navigation }) => {
  const [value, setValue] = useState(0);
  return (
    <SafeAreaView>
      <Text> Agregar Producto </Text>
      <View>
        <TextInput placeholder="Nombre" />
        <TextInput placeholder="Marca" />
        <TextInput placeholder="Descripcion" />
        
        <TextInput placeholder="Category" />
        <TextInput placeholder="Condición" />
        <TextInput placeholder="Locación" />
        
        
      </View>
      </SafeAreaView>
  );
};

export default Form;