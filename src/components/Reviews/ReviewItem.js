import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Avatar } from 'react-native-paper'
import avatarImg from '../../assets/img/person.jpg'
import { AirbnbRating } from 'react-native-elements'

const width = Dimensions.get('window').width

const ReviewItem = () => {
	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<Avatar.Image size={40} source={avatarImg} />
				<View style={styles.info}>
					<Text style={styles.name}>Pedro Gomez</Text>
					<View style={styles.ratingDate}>
						<AirbnbRating
							showRating={false}
							defaultRating={4}
							onFinishRating={console.log}
							isDisabled={true}
							starStyle={styles.star}
						/>
						<Text style={styles.date}>19/09/2021</Text>
					</View>
				</View>
			</View>
			<Text style={styles.comment}>
				Muy buen servicio. Recomendado.
			</Text>
			<View style={styles.line} />
		</View>
	)
}

export default ReviewItem

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
        paddingHorizontal: 16,
        width: width - 32,
	},
	infoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 10,
	},
	info: {
		marginLeft: 15,
	},
	star: {
		width: 12,
		height: 12,
		marginHorizontal: 1,
	},
	date: {
		color: '#72717E',
		fontSize: 11,
		marginLeft: 10,
	},
	name: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#060948',
	},
	ratingDate: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 2,
	},
	line: {
		height: 1,
		width: '95%',
		backgroundColor: '#DCE5EE',
		marginTop: 5,
		marginBottom: 5,
	},
	comment: {
		color: '#9D9D9D',
		paddingVertical: 5,
        textAlign: 'justify',
	},
})
