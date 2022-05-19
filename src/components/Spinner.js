import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import { ActivityIndicator } from 'react-native-paper';

const Spinner = () => {
	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<ActivityIndicator animating={true} size="large" color='#FF7D68' />
		</SafeAreaView>
	);
};

export default Spinner;

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
	},
});
