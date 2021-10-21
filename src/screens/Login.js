import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
} from 'react-native'
import LoginImage from '../assets/img/login.svg'
import Google from '../assets/img/google.svg'
import Facebook from '../assets/img/facebook.svg'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { startGoogleLogin, startLoginEmailPassword } from '../actions/auth'
import { ScrollView } from 'react-native'

const Login = ({ navigation }) => {

	const dispatch = useDispatch();

	const loginForm = useFormik({
		initialValues:{
			email: "",
			password: ""
		},
	})

	const { email,password } = loginForm.values

	const handleNormalLogin = (e) =>{
		e.preventDefault()
		console.log('hola');
		dispatch(startLoginEmailPassword(email, password))
	}

	const handleGoogleLogin = () =>{
		dispatch(startGoogleLogin())
	}
	const state = useSelector(state => state)
	console.log(state);
	return (
		<SafeAreaView style={styles.mainContainer}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<View style={styles.imageContainer}>
				<LoginImage />
			</View>
			<View style={styles.secondContainer}>
				<Text style={styles.title}>Iniciar sesión</Text>
				<View style={styles.inputSection}>
					<Icon style={styles.icon} name="at" size={20} color="#000" />
					<TextInput
						nativeID="email"
						value={loginForm.values.email}
						onChangeText={loginForm.handleChange('email')}
						style={styles.input}
						placeholder="Correo"
						placeholderTextColor="#B7C6D9"
						sa
					/>
				</View>
				<View style={styles.inputSection}>
					<Icon style={styles.icon} name="lock" size={20} color="#000" />
					<TextInput
						nativeID="password"
						value={loginForm.values.password}
						onChangeText={loginForm.handleChange('password')}
						style={styles.input}
						placeholder="Contraseña"
						placeholderTextColor="#B7C6D9"
					/>
				</View>
				<TouchableOpacity onPress={handleNormalLogin} style={styles.btn}>
					<Text style={styles.btnText}>Iniciar sesión</Text>
				</TouchableOpacity>
				<View style={styles.containerLines}>
					<View style={styles.line} />
					<Text style={styles.oLetter}>O</Text>
					<View style={styles.line} />
				</View>
				<View style={styles.socialContainer}>
					<TouchableOpacity onPress={handleGoogleLogin} style={styles.btnSocial}>
						<Google />
					</TouchableOpacity>
					<View style={styles.btnSocial}>
						<Facebook />
					</View>
				</View>
				<View>
					<Text style={{ textAlign: 'center' }}>
						<Text>¿No tienes cuenta?</Text>
						<Text
							style={styles.registrate}
							onPress={() => navigation.navigate('Register')}>
							{' '}
							Regístrate
						</Text>
					</Text>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default Login

const styles = StyleSheet.create({
	mainContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		height: '100%',
		alignItems: 'center',
	},
	imageContainer: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		marginBottom: 30,
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
	},
	btnText: {
		textAlign: 'center',
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 15,
	},
	containerLines: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15,
	},
	line: {
		height: 1,
		backgroundColor: '#B7C6D9',
		width: '45%',
	},
	oLetter: {
		color: '#B7C6D9',
		paddingLeft: 10,
		paddingRight: 10,
	},
	socialContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginTop: 25,
		marginBottom: 25,
	},
	btnSocial: {
		borderColor: '#B7C6D9',
		borderRadius: 10,
		borderWidth: 1,
		paddingLeft: 25,
		paddingRight: 25,
		paddingTop: 4,
		paddingBottom: 4,
	},
	registrate: {
		color: '#003C95',
	},
})
