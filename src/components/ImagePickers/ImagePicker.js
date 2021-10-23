import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import ImageInput from '../Inputs/ImageInput'
import ImageCard from './ImageCard'

const ImagePicker = () => {
	const initialState = {
		filePath: null,
		fileUri: null,
	}
	const [imageSelected, setImageSelected] = useState(initialState)

	const chooseFile = () => {
		let options = {
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		}
		launchImageLibrary(options, response => {
			if (!response.didCancel || !response.error || !response.customButton) {
				setImageSelected({
					filePath: response.assets[0],
					fileUri: response.assets[0].uri,
				})
			}
		})
	}

	return (
		<>
			{imageSelected.fileUri ? (
				<View style={styles.imageContainer}>
					<ImageCard
						source={{ uri: imageSelected.fileUri }}
						onPress={() => setImageSelected(initialState)}
					/>
					<ImageInput label="Cambiar foto" type="card" onPress={chooseFile} />
				</View>
			) : (
				<ImageInput label="Agregar foto" onPress={chooseFile} />
			)}
		</>
	)
}

export default ImagePicker

const styles = StyleSheet.create({
	imageContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
})
