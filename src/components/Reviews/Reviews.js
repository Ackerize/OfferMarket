import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { AirbnbRating } from 'react-native-elements';
import ReviewsList from './ReviewsList';
import axios from 'axios';
import { API_HOST } from '../../utils/constants';
import Spinner from '../Spinner';
import Alert from '../Alert';

const width = Dimensions.get('window').width;

const Reviews = ({ profile }) => {
	const { rating, totalReviews, user } = profile;

	const [reviews, setReviews] = useState(null);
	const [ratings, setRatings] = useState(null);

	useEffect(() => {
		axios
			.get(`${API_HOST}/reviews/${user}`)
			.then(({ data }) => {
				const { reviews: dataReviews } = data;

				const total = dataReviews.length;

				const aux = {
					0: 0,
					1: 0,
					2: 0,
					3: 0,
					4: 0,
					5: 0,
				};

				dataReviews.forEach(element => {
					console.log(element.rating);
					aux[element.rating] += 1;
				});

				for (let index = 0; index <= 5; index++) {
					aux[index] = aux[index] / total;
				}

				setRatings(aux);
				setReviews(dataReviews);
			})
			.catch(err => console.log(err));
	}, []);

	if (!ratings || !reviews) return <Spinner />;

	if(reviews.length === 0) return <Alert>No hay reseñas aún</Alert>

	return (
		<View>
			<View style={styles.reviewHeader}>
				<View style={styles.infoContainer}>
					<Text style={styles.totalCount}>{rating}</Text>
					<AirbnbRating
						showRating={false}
						defaultRating={4}
						onFinishRating={console.log}
						isDisabled={true}
						starStyle={styles.star}
					/>
					<Text style={styles.totalReviews}>
						{totalReviews === 1
							? `${totalReviews} reseña`
							: `${totalReviews} reseñas`}
					</Text>
				</View>
				<View>
					{Object.keys(ratings)
						.reverse()
						.map((rating, index) => {
							return (
								<View style={styles.rating} key={index}>
									<Text style={styles.ratingLabel}>{rating}</Text>
									<ProgressBar
										progress={ratings[rating]}
										color="#FFCC47"
										style={styles.progressBar}
									/>
								</View>
							);
						})}
				</View>
			</View>
			<ReviewsList reviews={reviews} />
		</View>
	);
};

export default Reviews;

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
});
