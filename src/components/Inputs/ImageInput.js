import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import ImageIcon from '../../assets/img/add-image.svg'
import PropTypes from 'prop-types'

const ImageInput = ({ label, onPress, type = 'empty' }) => {
	const conditionContainer = type === 'card' ? styles.cardSelect : {}
	const conditionLabel = type === 'card' ? styles.cardLabel : {}
	const labelText = label.replace(' ', '\n')
	return (
		<TouchableRipple
			style={[styles.select, conditionContainer]}
			borderless
			onPress={onPress}>
			<View style={[styles.container, conditionContainer]}>
				<ImageIcon width={40} height={40} fill="#000" />
				<Text style={[styles.label, conditionLabel]}>{labelText}</Text>
			</View>
		</TouchableRipple>
	)
}

export default ImageInput

const styles = StyleSheet.create({
	select: {
		borderColor: '#E6E6E6',
		borderWidth: 2,
		borderRadius: 10,
		paddingVertical: 6,
		paddingHorizontal: 15,
	},
	cardSelect: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
		height: 150,
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 125,
	},
	label: {
		fontSize: 16,
		marginLeft: 15,
		color: '#000',
	},
	cardLabel: {
		marginLeft: 0,
		fontSize: 14,
		textAlign: 'center',
		marginTop: 10,
	},
})

ImageInput.propTypes = {
	label: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	type: PropTypes.string,
}
