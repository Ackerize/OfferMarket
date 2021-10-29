import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import MultiplePicker from 'react-native-image-crop-picker'
import ImageInput from '../Inputs/ImageInput'
import ImageCard from './ImageCard'
import { ScrollView } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { selectPhoto } from '../../actions/profile'

const ImagePicker = ({ multiple = false }) => {
	const dispatch = useDispatch()
	const { profileImage } = useSelector(state => state.profile)

	const initialState = {
		filePath: profileImage,
		fileUri: null,
		images: [],
	}

	const [imageSelected, setImageSelected] = useState(initialState)

	const chooseOnePicture = () => {
		let options = {
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
			includeBase64: true,
			mediaType: 'photo',
		}
		launchImageLibrary(options, response => {
			if (!response.didCancel && !response.error && !response.customButton) {
				setImageSelected({
					filePath: response.assets[0],
					fileUri: response.assets[0].uri,
					images: [],
				})
				dispatch(selectPhoto(response.assets[0].base64))
			}
		})
	}

	const chooseMultiplePictures = () => {
		MultiplePicker.openPicker({
			multiple: true,
			mediaType: 'photo',
		}).then(images => {
			console.log(images)
			setImageSelected({
				images: [...imageSelected.images, ...images],
			})
		})
	}

	return (
		<>
			{imageSelected.fileUri && !multiple ? (
				<View style={styles.imageContainer}>
					<ImageCard
						source={{ uri: imageSelected.fileUri }}
						onPress={() => {
							setImageSelected(initialState)
							dispatch(selectPhoto(null))
						}}
					/>
					<ImageInput
						label="Cambiar foto"
						type="card"
						onPress={chooseOnePicture}
					/>
				</View>
			) : imageSelected.images.length > 0 && multiple ? (
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.scrollImage}>
					<View style={styles.imageContainer}>
						{imageSelected.images.map((image, index) => (
							<ImageCard
								key={index}
								multiple={true}
								source={{ uri: image.path }}
								onPress={() =>
									setImageSelected({
										...imageSelected,
										images: imageSelected.images.filter(
											(img, i) => i !== index,
										),
									})
								}
							/>
						))}
						<ImageInput
							label="Agregar fotos"
							type="card"
							onPress={chooseMultiplePictures}
						/>
					</View>
				</ScrollView>
			) : (
				<ImageInput
					label={multiple ? 'Agregar fotos' : 'Agregar foto'}
					onPress={multiple ? chooseMultiplePictures : chooseOnePicture}
				/>
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
	scrollImage: {
		height: 180,
	},
})

ImagePicker.propTypes = {
	multiple: PropTypes.bool,
}
