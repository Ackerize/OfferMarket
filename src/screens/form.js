import React from 'react';
import {Text, StyleSheet, SafeAreaView, TextInput, View} from 'react-native';


const Form = ({  }) => {

  return (
    <SafeAreaView>
      <Text style={styles.titleText} > Agregar Producto </Text>
      <View>
        <TextInput style={styles.input} placeholder="Nombre" />
        <TextInput style={styles.input} placeholder="Marca" />
        <TextInput style={styles.input} placeholder="Descripcion" />
        
        <TextInput style={styles.input} placeholder="Category" />
        <TextInput style={styles.input} placeholder="Condición" />
        <TextInput style={styles.input} placeholder="Locación" />
      
      </View>
      </SafeAreaView>
  );
};

export default Form;


const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
	container: {
		backgroundColor: '#fff',
		height: '100%',
	},
	imgContainer: {
		width: 50,
		height: 50,
		marginTop: -20,
		marginLeft: 10,
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	input: {
		height: 40,
		width: '90%',
		borderRadius: 10,
		fontSize: 18,
		alignSelf: 'center',
		marginTop: 10,
	},
	notificationContainer: {
		position: 'relative',
		width: 60,
		height: 60,
		alignSelf: 'flex-end',
		marginBottom: 40,
		marginRight: 20,
		marginTop: 20,
	},
	notification: {
		height: 50,
		color: '#fff',
		width: 50,
		borderRadius: 10,
		fontSize: 18,
		backgroundColor: '#fff',
		borderColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	notificationText: {
		position: 'absolute',
		borderRadius: 100,
		backgroundColor: '#060948',
		fontWeight: 'bold',
		color: '#fff',
		height: 28,
		width: 28,
		textAlign: 'center',
		textAlignVertical: 'center',
		elevation: 6,
		right: -10,
		top: -10,
	},
	categories: {
		marginTop: 20,
		marginBottom: 50,
	},

	categoryList: {
		marginTop: 5,
		marginBottom: 15,
		marginHorizontal: 20,
	},
	category: {
		marginHorizontal: 5,
		fontSize: 16,
		borderWidth: 1,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		backgroundColor: '#fff',
		borderColor: '#E6E6E6',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	categorySelec: {
		backgroundColor: '#003C95',
		color: '#fff',
	},
})
