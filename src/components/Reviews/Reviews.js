import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import { AirbnbRating } from 'react-native-elements'
import ReviewsList from './ReviewsList'

const width = Dimensions.get('window').width

const Reviews = () => {
	return (
		<View>
			<View style={styles.reviewHeader}>
				<View style={styles.infoContainer}>
					<Text style={styles.totalCount}>4.0</Text>
					<AirbnbRating
						showRating={false}
						defaultRating={4}
						onFinishRating={console.log}
						isDisabled={true}
						starStyle={styles.star}
					/>
					<Text style={styles.totalReviews}>123 reseñas</Text>
				</View>
				<View>
					<View style={styles.rating}>
						<Text style={styles.ratingLabel}>5</Text>
						<ProgressBar
							progress={0.60}
							color="#FFCC47"
							style={styles.progressBar}
						/>
					</View>
					<View style={styles.rating}>
						<Text style={styles.ratingLabel}>4</Text>
						<ProgressBar
							progress={0.15}
							color="#FFCC47"
							style={styles.progressBar}
						/>
					</View>
					<View style={styles.rating}>
						<Text style={styles.ratingLabel}>3</Text>
						<ProgressBar
							progress={0.10}
							color="#FFCC47"
							style={styles.progressBar}
						/>
					</View>
					<View style={styles.rating}>
						<Text style={styles.ratingLabel}>2</Text>
						<ProgressBar
							progress={0.10}
							color="#FFCC47"
							style={styles.progressBar}
						/>
					</View>
					<View style={styles.rating}>
						<Text style={styles.ratingLabel}>1</Text>
						<ProgressBar
							progress={0.05}
							color="#FFCC47"
							style={styles.progressBar}
						/>
					</View>
				</View>
			</View>
			<ReviewsList />
		</View>
	)
}

export default Reviews

const styles = StyleSheet.create({
	reviewHeader: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
        width: width - 90,
	},
	infoContainer: {
		marginTop: 10,
		display: 'flex',
		justifyContent: 'center',
	},
	totalCount: {
		fontSize: 36,
		color: '#000',
		fontWeight: 'bold',
	},
	star: {
		width: 12,
		height: 12,
		marginHorizontal: 1,
	},
	totalReviews: {
		fontSize: 11,
		textAlign: 'left',
	},
	progressBar: {
		height: 10,
		backgroundColor: '#F5F8FF',
		borderColor: '#BFBFBF',
		borderWidth: 0.5,
		borderRadius: 20,
		width: 120,
	},
	rating: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	ratingLabel: {
		color: '#000',
		marginRight: 10,
	},
})
