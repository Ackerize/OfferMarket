import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import ImagePicker from '../components/ImagePickers/ImagePicker'
import Input from '../components/Inputs/Input'
import Select from '../components/Inputs/Select'
import SaveButton from '../components/SaveButton'
import { categories } from '../utils/category'

const ProductForm = ({ navigation }) => {
	const categoriesData = categories.map(category => ({
		id: category.id,
		value: category.name,
	}))

	const conditionData = [{ id: 1, value: 'Nuevo' }, { id: 2, value: 'Usado' }]
	return (
		<SafeAreaView style={styles.mainContainer}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<ScrollView style={styles.formContainer}>
				<View style={{ paddingBottom: 50 }}>
					<ImagePicker multiple={true} />
					<Input label="Nombre: " />
					<Input label="Marca: " />
					<Input label="Descripción: " />
					<Input label="Precio: " type="numeric" />
					<Select
						label="Categoría: "
						placeholder="Selecciona una categoría"
						data={categoriesData}
					/>
					<Select
						label="Condición: "
						placeholder="Selecciona la condición"
						data={conditionData}
					/>
					<SaveButton text="Guardar" onPress={() => navigation.goBack()} />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default ProductForm

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: 'white',
		width: '100%',
		height: '100%',
	},
	formContainer: {
		paddingHorizontal: 25,
		marginTop: 30,
	},
})
