import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	ScrollView
} from 'react-native'
import LoginImage from '../assets/img/register.svg'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import { useFormik } from 'formik'
import { startRegisterWithEmailAndPassword } from '../actions/auth'
import { useDispatch } from 'react-redux'

const Register = ({ navigation }) => {
	const dispatch = useDispatch();
	const formRegister = useFormik({
		initialValues: {
			displayName: '',
			email: '',
			password: '',
			repeatPassword: '',
		},
	})

	const {email, password, displayName} = formRegister.values

	const handleRegister = (e) =>{
		e.preventDefault();
		dispatch(startRegisterWithEmailAndPassword(email,password, displayName))
	}

	return (
		<SafeAreaView style={styles.mainContainer}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<View style={styles.imageContainer}>
				<LoginImage />
			</View>
			<View style={styles.secondContainer}>
				<Text style={styles.title}>Registrarse</Text>
				<View style={styles.inputSection}>
					<Icon style={styles.icon} name="user" size={20} color="#000" />
					<TextInput
						nativeID="displayName"
						value={formRegister.values.displayName}
						onChangeText={formRegister.handleChange('displayName')}
						style={styles.input}
						placeholder="Nombre"
						placeholderTextColor="#B7C6D9"
					/>
				</View>
				<View style={styles.inputSection}>
					<Icon style={styles.icon} name="at" size={20} color="#000" />
					<TextInput
						nativeID="email"
						value={formRegister.values.email}
						onChangeText={formRegister.handleChange('email')}
						style={styles.input}
						placeholder="Correo"
						placeholderTextColor="#B7C6D9"
					/>
				</View>
				<View style={styles.inputSection}>
					<Icon style={styles.icon} name="lock" size={20} color="#000" />
					<TextInput
						nativeID="password"
						value={formRegister.values.password}
						onChangeText={formRegister.handleChange('password')}
						style={styles.input}
						placeholder="Contraseña"
						placeholderTextColor="#B7C6D9"
					/>
				</View>
				<View style={styles.inputSection}>
					<Icon style={styles.icon} name="lock" size={20} color="#000" />
					<TextInput
						nativeID="repeatPassword"
						value={formRegister.values.repeatPassword}
						onChangeText={formRegister.handleChange('repeatPassword')}
						style={styles.input}
						placeholder="Repetir Contraseña"
						placeholderTextColor="#B7C6D9"
					/>
				</View>
				<TouchableOpacity onPress={ handleRegister } style={styles.btn}>
					<Text style={styles.btnText}>Crear Cuenta</Text>
				</TouchableOpacity>
				<View style={{ marginTop: 10 }}>
					<Text style={{ textAlign: 'center' }}>
						<Text>¿Ya tienes cuenta?</Text>
						<Text
							style={styles.registrate}
							onPress={() => navigation.navigate('Login')}>
							{' '}
							Inicia sesión
						</Text>
					</Text>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default Register

const styles = StyleSheet.create({
	mainContainer: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#FFFFFF',
		height: '100%',
		alignItems: 'center',
		width: '100%'
	},
	imageContainer: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		marginBottom: 10,
		marginTop: 20,
	},
	secondContainer: {
		width: '85%',
	},
	title: {
		fontSize: 30,
		color: '#191B32',
		fontWeight: 'bold',
		marginBottom: 15,
	},
	inputSection: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: '#B7C6D9',
		paddingBottom: 10,
		marginBottom: 25,
	},
	icon: {
		padding: 10,
		color: '#B7C6D9',
	},
	input: {
		flex: 1,
		paddingRight: 10,
		marginBottom: -10,
		paddingBottom: 15,
		color: '#191B32',
		height: 50,
		fontSize: 20,
	},
	btn: {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: '#003C95',
		borderRadius: 10,
		height: 55,
		marginTop: 25,
	},
	btnText: {
		textAlign: 'center',
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 15,
	},
	registrate: {
		color: '#003C95',
	},
	backArrow: {
		marginHorizontal: 30,
		backgroundColor: '#fff',
		paddingTop: 15,
	},
})
