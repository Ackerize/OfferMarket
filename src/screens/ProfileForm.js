import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import ImagePicker from '../components/ImagePickers/ImagePicker';
import Input from '../components/Inputs/Input';
import LocationInput from '../components/Inputs/LocationInput';
import SaveButton from '../components/SaveButton';
import { Formik } from 'formik';
import { validateProfileForm } from '../utils/utils';
import { fileUpload } from '../utils/fileUpload';
import { createNewProfile } from '../api/profiles';
import { updateHasProfile } from '../actions/auth';
import { showToast } from '../components/Modals/CustomToast';
import { clear } from '../actions/profile';

const ProfileForm = ({ navigation, route }) => {
	const { screen } = route;

	const dispatch = useDispatch();
	const {
		auth,
		profile: { location, profileImage },
	} = useSelector(state => state);
	const { name, uid, email } = auth;
	const { name: city } = location;

	return (
		<SafeAreaView style={styles.mainContainer}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<Formik
				initialValues={{
					name,
					user: uid,
					email,
					phone: '',
					photo: null,
					location,
				}}
				onSubmit={async values => {
					values = { ...values, photo: profileImage, location: location };
					const isValid = validateProfileForm(values);
					const source = 'data:image/jpg;base64,' + profileImage;
					if (isValid) {
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
							showToast('error', '¡Oh no!', message);
						}
					}
				}}>
				{({ handleChange, handleBlur, handleSubmit, values }) => (
					<View style={styles.formContainer}>
						<ImagePicker />
						<Input
							label="Nombre: "
							value={values.name}
							onChangeText={handleChange('name')}
							onBlur={handleBlur('name')}
						/>
						<Input
							label="Número de teléfono: "
							type="numeric"
							value={values.phone}
							onChangeText={handleChange('phone')}
							onBlur={handleBlur('phone')}
						/>
						<View style={styles.container}>
							<Text style={styles.label}>Ubicación: </Text>
							<LocationInput
								actualLocation={city}
								onPress={() => navigation.navigate('SearchLocation')}
							/>
						</View>
						<SaveButton
							onPress={() => {
								handleSubmit();

								/*navigation.navigate(screen || 'Home')*/
							}}
							text="Guardar"
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
