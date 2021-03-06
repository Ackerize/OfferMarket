import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import ImagePicker from '../components/ImagePickers/ImagePicker';
import Input from '../components/Inputs/Input';
import LocationInput from '../components/Inputs/LocationInput';
import SaveButton from '../components/Buttons/SaveButton';
import { Formik } from 'formik';
import { validateProfileForm } from '../utils/utils';
import { fileUpload } from '../utils/fileUpload';
import { createNewProfile, updateProfile } from '../api/profiles';
import { updateHasProfile } from '../actions/auth';
import { showToast } from '../components/Modals/CustomToast';
import { clear, selectLocation } from '../actions/profile';
import { finishLoading, startLoading } from '../actions/ui';
import Popup from '../components/Modals/Popup';

const ProfileForm = ({ navigation, route }) => {
	const profile = route?.params?.profile;
	const [profileInfo, setProfileInfo] = useState({});

	const dispatch = useDispatch();
	const {
		auth,
		profile: { location, profileImage },
		ui: { loading },
	} = useSelector(state => state);
	const { name, uid, email } = auth;
	const { name: city } = location;

	useEffect(() => {
		if (profile) {
			dispatch(selectLocation({ ...profile.location }));
			setProfileInfo(profile);
		}
	}, []);

	const initialValues = profile
		? {
				name: profile.name,
				user: profile.user,
				phone: profile.phone,
				photo: profile.photo,
				location: profile.location,
		  }
		: {
				name,
				user: uid,
				email,
				phone: '',
				photo: null,
				location,
		  };

	const onSubmit = async values => {
		if (!loading) {
			try {
				values = { ...values, photo: profileImage, location: location };
				const isValid = validateProfileForm(values);
				const source = 'data:image/jpg;base64,' + profileImage;
				if (isValid) {
					dispatch(startLoading());
					const fileUrl = await fileUpload(source);

					const { error, message } = await createNewProfile({
						...values,
						photo: fileUrl,
					});

					if (!error) {
						dispatch(updateHasProfile());
						showToast('success', 'Perfil creado', message);
						navigation.navigate('Home');
						dispatch(clear());
					} else {
						showToast('error', '??Oh no!', message);
					}
					dispatch(finishLoading());
				}
			} catch ({ message }) {
				showToast('error', '??Oh no!', message);
			}
		}
	};

	const onUpdate = async values => {
		if (profileImage || profileInfo.photo) {
			if (!loading) {
				try {
					let source;
					let fileUrl;
					dispatch(startLoading());

					const isValid = validateProfileForm(values);

					if (profileImage) {
						source = 'data:image/jpg;base64,' + profileImage;
						fileUrl = await fileUpload(source);
					} else {
						fileUrl = profileInfo.photo;
					}

					const { error, message } = await updateProfile(
						{
							...values,
							photo: fileUrl,
							location,
						},
						uid,
					);
					if (!error) {
						showToast('success', 'Perfil actualizado', message);
						navigation.goBack();
						dispatch(clear());
					} else {
						showToast('error', '??Oh no!', message);
					}
					dispatch(finishLoading());
				} catch ({ message }) {
					showToast('error', '??Oh no!', message);
					dispatch(finishLoading());
				}
			}
		} else {
			Popup.show({
				type: 'Danger',
				title: '??Oh no!',
				textBody: 'Debes seleccionar una imagen',
				buttontext: 'Aceptar',
				callback: () => Popup.hide(),
			});
		}
	};

	return (
		<SafeAreaView style={styles.mainContainer}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<Formik
				initialValues={initialValues}
				onSubmit={profile ? onUpdate : onSubmit}>
				{({ handleChange, handleBlur, handleSubmit, values }) => (
					<View style={styles.formContainer}>
						<ImagePicker
							urlImage={initialValues.photo}
							onUpdate={setProfileInfo}
						/>
						<Input
							label="Nombre: "
							value={values.name}
							onChangeText={handleChange('name')}
							onBlur={handleBlur('name')}
						/>
						<Input
							label="N??mero de tel??fono: "
							type="numeric"
							value={values.phone}
							onChangeText={handleChange('phone')}
							onBlur={handleBlur('phone')}
						/>
						<View style={styles.container}>
							<Text style={styles.label}>Ubicaci??n: </Text>
							<LocationInput
								actualLocation={city}
								onPress={() => navigation.navigate('SearchLocation')}
							/>
						</View>
						<SaveButton
							onPress={handleSubmit}
							text="Guardar"
							loading={loading}
						/>
					</View>
				)}
			</Formik>
		</SafeAreaView>
	);
};

export default ProfileForm;

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: 'white',
		width: '100%',
		height: '100%',
	},
	formContainer: {
		paddingHorizontal: 25,
		marginTop: 15,
	},
	container: {
		marginVertical: 15,
	},
	label: {
		fontSize: 16,
		color: '#000000',
		marginBottom: 10,
	},
});
