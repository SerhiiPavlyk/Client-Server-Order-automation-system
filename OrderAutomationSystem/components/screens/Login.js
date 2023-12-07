import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import Toast from 'react-native-toast-message';
import { TouchableOpacity, View } from 'react-native';
import { users } from '../../config/firebaseConfig';
import { CustomButton, CustomButtonOutline } from '../ui/CustomButton';

const Login = ({ navigation, route }) => {
	const { setIsLoggedIn, setUserId, setIsAdmin, setIsUkrainian, isUkrainian } = route.params;

	const [usersData, setUsersData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isAuth, setIsAuth] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isEnglish, setIsEnglish] = useState(!isUkrainian);

	const handleLoginPress = async () => {
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (emailPattern.test(email.trim()) && password.trim().length >= 4) {
			setIsLoading(true);
			const user = usersData.find((item) => item.email === email && item.password === password);
			if (user) {
				setIsLoading(false);
				setIsLoggedIn(true);
				setUserId(user.id);
				saveData(email, password, user.id, user.isAdmin);
				setIsAdmin(user.isAdmin);
				Toast.show({
					type: 'success',
					text1: isUkrainian ? 'Успішно!' : 'Successfully!',
					text2: isUkrainian ? 'Вхід успішний!' : 'Successfully login!',
				});
			}
			else {
				Toast.show({
					type: 'error',
					text1: isUkrainian ? 'Помилка!' : 'Error!',
					text2: isUkrainian ? 'Неправильно введенні дані!' : 'Invalid email or password!',
				});
				setIsLoading(false);
			}
				
		} else {
			Toast.show({
				type: 'error',
				text1: isUkrainian ? 'Помилка!' : 'Error!',
				text2: isUkrainian ? 'Неправильно введенні дані!' : 'Invalid email or password!',
			});
			setIsLoading(false);
		}
	};

	const handleGuestLoginPress = async () => {
		setIsLoading(true);
		const user = usersData.find((item) => item.email === 'guest@guest.com' && item.password === 'guest');
		if (user) {
			setIsLoading(false);
			setIsLoggedIn(true);
			setUserId(user.id);
			saveData(email, password, user.id, user.isAdmin);
			setIsAdmin(user.isAdmin);
			Toast.show({
				type: 'success',
				text1: isUkrainian ? 'Успішно!' : 'Successfully!',
				text2: isUkrainian ? 'Складайте замовлення!' : 'Let`s make order!',
			});
		} else {
			setIsAuth(false);
			Toast.show({
				type: 'info',
				text1: isUkrainian ? 'Інформація!' : 'Info',
				text2: isUkrainian ? "Поганий зв'язок!" : 'Bad request!',
			});
		}
	};

	const saveData = async (email, password, id, isAdmin) => {
		try {
			await AsyncStorage.setItem('user', JSON.stringify({ email, password, id, isAdmin }));
		} catch (error) {
			console.error('Помилка збереження даних: ', error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				await users
					.getAll()
					.then((res) => {
						setUsersData(res);
						setIsLoading(false);
					})
					.catch((err) => console.log(err));
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, [isAuth]);

	if (isLoading) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</SafeAreaView>
		);
	}


	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}>
			{isAuth ? (
				<SafeAreaView style={styles.container}>
					<Text style={styles.textOrder}>{isEnglish ? 'Welcome!' : 'Вітаємо!'}</Text>

					<CustomButton title={isEnglish ? 'Make order' : 'Зробити замовлення'} onPress={handleGuestLoginPress} />
					<View style={styles.languages}>
						<TouchableOpacity
							style={!isEnglish ? styles.buttonActive : styles.button}
							onPress={() => {
								setIsEnglish(false);
								setIsUkrainian(true);
							}}>
							<Text style={styles.buttonText}>Укр</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={isEnglish ? styles.buttonActive : styles.button}
							onPress={() => {
								setIsEnglish(true);
								setIsUkrainian(false);
							}}>
							<Text style={styles.buttonText}>Eng</Text>
						</TouchableOpacity>
					</View>
					<CustomButtonOutline title="Admin" onPress={() => setIsAuth(false)} backgroundColor = "#23C9FF"/>
				</SafeAreaView>
			) : (
				<SafeAreaView style={styles.container}>
					<Text style={styles.text}>{isEnglish ? 'Enter email:' : 'Введіть пошту:'}</Text>
					<TextInput style={styles.input} placeholder="example@email.com" onChangeText={(val) => setEmail(val)} />
					<Text style={styles.text}>{isEnglish ? 'Enter password:' : 'Введіть пароль:'}</Text>
					<TextInput
						style={styles.input}
						placeholder="******"
						onChangeText={(val) => setPassword(val)}
						secureTextEntry={true}
					/>
					<CustomButton title={isEnglish ? 'Login' : 'Вхід'} onPress={handleLoginPress} />
					<CustomButtonOutline title={isEnglish ? 'Back' : 'Назад'} onPress={()=>setIsAuth(true)}/>
				</SafeAreaView>
			)}
		</TouchableWithoutFeedback>
	);
};
export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#86ff4a',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		marginTop: 10,
		backgroundColor: '#7CC6FE',
		borderRadius: 8,
		padding: 8,
		width: 'fit-content',
		alignItems: 'center',
	},
	buttonActive: {
		marginTop: 10,
		backgroundColor: '#C884A6',
		borderRadius: 8,
		padding: 8,
		width: 'fit-content',
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
	},
	input: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#7CC6FE',
		padding: 8,
		margin: 10,
		width: 200,
	},
	text: {
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'left',
	},
	textOrder: {
		fontSize: 28,
		fontWeight: '600',
		textAlign: 'left',
		marginBottom: 14,
	},
	languages: {
		display: 'flex',
		flexDirection: 'row',
		gap: 7,
	},
});
