import React from 'react'
import { StyleSheet, View, SafeAreaView, Text } from 'react-native'
import { useSelector } from 'react-redux'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import ImagePicker from '../components/ImagePickers/ImagePicker'
import Input from '../components/Inputs/Input'
import LocationInput from '../components/Inputs/LocationInput'
import SaveButton from '../components/SaveButton'

const ProfileForm = ({ navigation, route }) => {
	const { screen } = route

	const { name } = useSelector(state => state.auth)

	return (
		<SafeAreaView style={styles.mainContainer}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<View style={styles.formContainer}>
				<ImagePicker />
				<Input label="Nombre: " value={name} />
				<Input label="Número de teléfono: " />
				<View style={styles.container}>
					<Text style={styles.label}>Ubicación: </Text>
					<LocationInput onPress={() => console.log('UBICACIÓN')} />
				</View>
				<SaveButton
					onPress={() => navigation.navigate(screen || 'Home')}
					text="Guardar"
				/>
			</View>
		</SafeAreaView>
	)
}

export default ProfileForm

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: 'white',
		width: '100%',
		height: '100%',
	},
	formContainer: {
		paddingHorizontal: 25,
		marginTop: 15,
	},
	container: {
		marginVertical: 15,
	},
	label: {
		fontSize: 16,
		color: '#000000',
		marginBottom: 10,
	},
})
