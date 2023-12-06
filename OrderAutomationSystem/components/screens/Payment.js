import React, { useState } from 'react';
import {
	Keyboard,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { pay } from '../../reducers';
import { CustomButton } from '../ui/CustomButton';

const Payment = ({ route }) => {
	const { isUkrainian } = route.params;
	const [cardNumber, setCardNumber] = useState('');
	const [expiryDate, setExpiryDate] = useState('');
	const [cvc, setCvc] = useState('');
	const [isCash, setIsCash] = useState(false);
	const [isPayed, setIsPayed] = useState(false);
	const [inHall, setInHall] = useState(true);

	const dispatch = useDispatch();

	const formatCardNumber = (value) => {
		return value
			.replace(/\s/g, '')
			.replace(/(\d{4})/g, '$1 ')
			.trim();
	};

	const formatExpiryDate = (value) => {
		return value
			.replace(/\s/g, '')
			.replace(/(\d{2})(\d{2})/g, '$1/$2')
			.trim();
	};

	function generateRandomNumber() {
		const min = 100;
		const max = 3000;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function generateRandomCass() {
		const min = 1;
		const max = 5;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	const cardPay = () => {
		dispatch(pay());
		Toast.show({
			type: 'success',
			text1: isUkrainian ? 'Успішно!' : 'Successfully!',
			text2: isUkrainian ? 'Оплата успішна!' : 'Successfully payed!',
		});
	};

	const cashPay = () => {
		dispatch(pay());
		Toast.show({
			type: 'info',
			text1: isUkrainian ? 'Інформація!' : 'Info!',
			text2: isUkrainian ? 'Очікуйте замовлення!' : 'Wait your order!',
		});
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}>
			<SafeAreaView style={styles.container}>
				<>
					<CustomButton
						title={isUkrainian ? 'Готівкою' : 'Cash'}
						onPress={() => {
							setIsCash(true);
							cashPay();
						}}
					/>
					{isCash ? (
						<View>
							<Text style={styles.text}>{isUkrainian ? 'Номер вашого замовлення:' : 'Your order number:'}</Text>
							<Text style={styles.orderNumber}>{generateRandomNumber()}</Text>
							<Text style={styles.text}>{isUkrainian ? 'Номер каси:' : 'Cash desk number:'}</Text>
							<Text style={styles.orderNumber}>{generateRandomCass()}</Text>
						</View>
					) : (
						<>
							<View style={styles.card}>
								<View style={styles.cardHeader}>
									<Text style={styles.cardHeaderText}>My Bank</Text>
								</View>
								<View style={styles.cardBody}>
									<TextInput
										style={styles.cardNumberInput}
										placeholder="Card Number"
										keyboardType="numeric"
										value={formatCardNumber(cardNumber)}
										onChangeText={(text) => setCardNumber(text)}
									/>
									<View style={styles.cardFooter}>
										<TextInput
											style={styles.cardExpiryInput}
											placeholder="MM/YY"
											keyboardType="numeric"
											value={formatExpiryDate(expiryDate)}
											onChangeText={(text) => setExpiryDate(text)}
										/>
										<TextInput
											style={styles.cvcInput}
											placeholder="CVC"
											keyboardType="numeric"
											value={cvc}
											onChangeText={(text) => setCvc(text)}
										/>
									</View>
								</View>
							</View>
							<CustomButton
								title={isUkrainian ? 'Картою' : 'Card'}
								onPress={() => {
									if (cardNumber && cvc && expiryDate) {
										cardPay();
										setIsPayed(true);
									} else {
										Toast.show({
											type: 'error',
											text1: isUkrainian ? 'Помилка!' : 'Error!',
											text2: isUkrainian ? 'Будь ласка, заповніть всі поля!' : 'Please fill all fields!',
										});
									}
								}}
							/>
							{isPayed && (
								<View>
									<Text style={styles.text}>
										{isUkrainian ? 'Номер вашого замовлення:' : 'Your order number:'}
									</Text>
									<Text style={styles.orderNumber}>{generateRandomNumber()}</Text>
								</View>
							)}
						</>
					)}
					{!isCash && !isPayed && <View style={styles.languages}>
						<TouchableOpacity style={inHall ? styles.buttonActive : styles.button} onPress={() => setInHall(true)}>
							<Text style={styles.buttonText}>{isUkrainian ? 'В залі' : 'In the hall'}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={!inHall ? styles.buttonActive : styles.button} onPress={() => setInHall(false)}>
							<Text style={styles.buttonText}>{isUkrainian ? 'З собою' : 'With you'}</Text>
						</TouchableOpacity>
					</View>}
				</>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	button: {
		marginTop: 10,
		backgroundColor: '#cccccc',
		borderRadius: 8,
		padding: 8,
		width: 'fit-content',
		alignItems: 'center',
	},
	buttonActive: {
		marginTop: 10,
		backgroundColor: '#7D8EB4',
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
	container: {
		flex: 1,
		backgroundColor: '#EDEEF2',
		alignItems: 'center',
	},
	card: {
		marginTop: 20,
		backgroundColor: '#3498db',
		borderRadius: 10,
		padding: 20,
		width: 300,
	},
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	cardHeaderText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	cardBody: {},
	cardNumberInput: {
		color: 'white',
		fontSize: 18,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: 'white',
		paddingBottom: 5,
	},
	cardFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	cardExpiryInput: {
		color: 'white',
		fontSize: 12,
		width: '30%',
		borderBottomWidth: 1,
		borderBottomColor: 'white',
		paddingBottom: 5,
	},
	cvcInput: {
		color: 'white',
		fontSize: 12,
		width: '30%',
		borderBottomWidth: 1,
		borderBottomColor: 'white',
		paddingBottom: 5,
	},
	text: {
		fontSize: 30,
		fontWeight: '600',
		textAlign: 'center',
	},
	orderNumber: {
		fontSize: 60,
		fontWeight: '600',
		textAlign: 'center',
	},
});

export default Payment;
