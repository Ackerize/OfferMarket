import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'

const ImageCard = ({ source, onPress }) => {
	return (
		<View>
			<Image source={source} style={styles.image} />
			<TouchableRipple style={styles.closeBtn} borderless onPress={onPress}>
				<Icon name="close" size={22} color="#FFFFFF" />
			</TouchableRipple>
		</View>
	)
}

export default ImageCard

const styles = StyleSheet.create({
	image: {
        borderColor: '#E6E6E6',
		borderWidth: 2,
        borderRadius: 10,
		width: 150,
		height: 150,
		marginHorizontal: 3,
		resizeMode: 'cover',
	},
	closeBtn: {
		borderRadius: 100,
		position: 'absolute',
		right: -10,
		top: -13,
		backgroundColor: '#070B59',
		padding: 3,
		elevation: 5,
	},
})

ImageCard.propTypes = {
    source: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
}
