import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableWithoutFeedback,
	Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ImageModal from 'react-native-image-modal';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 2);

const CarouselProduct = props => {
	const { images } = props;
	return (
		<Carousel
			layout={'default'}
			data={images}
			renderItem={item => <RenderItem data={item} />}
			sliderWidth={width}
			itemWidth={ITEM_WIDTH}
			firstItem={0}
			inactiveSlideOpacity={1}
			inactiveSlideScale={1}
			pagingEnabled
		/>
	);
};

const RenderItem = props => {
	const { data } = props;
	const { url } = data.item;
	return (
		<TouchableWithoutFeedback>
			<View>
				<ImageModal
					resizeMode="contain"
					modalImageResizeMode="contain"
					imageBackgroundColor="#fff"
					style={styles.image}
					source={{ uri: url }}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default CarouselProduct;

const styles = StyleSheet.create({
	image: {
		width: 350,
		height: 220,
		borderRadius: 20,
	},
});
