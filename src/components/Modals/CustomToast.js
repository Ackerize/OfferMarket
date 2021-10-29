import React from 'react';
import { Image } from 'react-native';
import Tick from '../../assets/toast/tick.png';
import Warning from '../../assets/toast/warning.png';
import Close from '../../assets/toast/close.png';
import Toast from './Toast';

export function showToast(type, title, text) {
	const color =
		type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#f39c12';
	const image = type === 'success' ? Tick : type === 'error' ? Close : Warning;
	Toast.show({
		title,
		text,
		color,
		timing: 2000,
		icon: (
			<Image
				source={image}
				style={{ width: 25, height: 25 }}
				resizeMode="contain"
			/>
		),
	});
}
