import React from 'react';
import { StyleSheet, View } from 'react-native';
import ReviewItem from './ReviewItem';
import PropTypes from 'prop-types';

const ReviewsList = ({ reviews }) => {
	return (
		<View style={styles.container}>
			{reviews.map((review) => (
				<ReviewItem key={review._id} review={review} />
			))}
		</View>
	);
};

export default ReviewsList;

const styles = StyleSheet.create({
	container: {
		paddingBottom: 100,
	},
});

ReviewsList.propTypes = {
    reviews: PropTypes.array.isRequired,
}
