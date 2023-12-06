import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	Keyboard,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { products } from '../../config/firebaseConfig';
import { CustomButton, CustomButtonOutline } from '../ui/CustomButton';
import { useDispatch } from 'react-redux';
const Products = ({ route }) => {
	const [productsData, setProductsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [nameEN, setNameEN] = useState('');
	const [nameUA, setNameUA] = useState('');
	const [amount, setAmount] = useState('');
	const [compositionEN, setProductCompositionEN] = useState('');
	const [compositionUA, setProductCompositionUA] = useState('');
	const [categoryEN, setProductCategoryEN] = useState('');
	const [categoryUA, setProductCategoryUA] = useState('');
	
	const { isAdmin, isUkrainian, setIsLoggedIn } = route.params;

	const navigation = useNavigation();
	const dispatch = useDispatch();
	const addProduct = async (nameEN, nameUA, amount, compositionEN, compositionUA, categoryEN, categoryUA) => {
		const data = {
			nameEN: nameEN.trim(),
			nameUA: nameUA.trim(),
			price: parseInt(amount),
			compositionEN: compositionEN.trim(),
			compositionUA: compositionUA.trim(),
			picture: '',
			categoryEN: categoryEN.trim(),
			categoryUA: categoryUA.trim(),
		};
		if (
			nameEN.trim() === '' ||
			nameUA.trim() === '' ||
			amount.trim() === '' ||
			compositionEN.trim() === '' ||
			compositionUA.trim() === '' ||
			categoryEN.trim() === '' ||
			categoryUA.trim() === ''
		) {
			setIsModalOpen(false);
			Toast.show({
				type: 'error',
				text1: isUkrainian ? 'Помилка!' : 'Error',
				text2: isUkrainian ? 'Будь ласка, заповніть всі поля!' : 'Please fill all inputs!',
			});
		} else {
			setIsModalOpen(false);
			setIsLoading(true);

			await products
				.create(data)
				.then((res) => {
					setIsLoading(false);
					Toast.show({
						type: 'success',
						text1: isUkrainian ? 'Успішно!' : 'Success!',
						text2: isUkrainian ? 'Продукт успішно додано!' : 'Product successfully added!',
					});
				})
				.catch((err) => console.log(err));
		}
	};


	useEffect(() => {
		const fetchData = async () => {
			await products
				.getAll()
				.then((res) => {
					const categories = Array.from(new Set(res.map((item) => (isUkrainian ? item.categoryUA : item.categoryEN))));
					setProductsData(categories);
					setIsLoading(false);
				})
				.catch((err) => console.log(err));
		};
		fetchData();
	}, [isLoading]);

	if (isLoading) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Modal visible={isModalOpen} animationType="slide">
				<ScrollView>
					<TouchableWithoutFeedback
						onPress={() => {
							Keyboard.dismiss();
						}}>
						<View style={styles.modalContainer}>
							<SafeAreaView style={styles.modalContent}>
								<Text style={styles.text}>Product name (english):</Text>
								<TextInput style={styles.input} placeholder="Burger" onChangeText={(val) => setNameEN(val)} />

								<Text style={styles.text}>Product name (ukrainian):</Text>
								<TextInput style={styles.input} placeholder="Бургер" onChangeText={(val) => setNameUA(val)} />

								<Text style={styles.text}>Product price:</Text>
								<TextInput
									style={styles.input}
									keyboardType="numeric"
									placeholder="77"
									onChangeText={(val) => setAmount(val)}
								/>

								<Text style={styles.text}>Product composition (english):</Text>
								<TextInput
									style={styles.input}
									placeholder="cucumber, onion"
									onChangeText={(val) => setProductCompositionEN(val)}
								/>

								<Text style={styles.text}>Product composition (ukrainian):</Text>
								<TextInput
									style={styles.input}
									placeholder="огірок, цибуля"
									onChangeText={(val) => setProductCompositionUA(val)}
								/>

								<Text style={styles.text}>Product category (english):</Text>
								<TextInput
									style={styles.input}
									placeholder="burger"
									onChangeText={(val) => setProductCategoryEN(val)}
								/>
								<Text style={styles.text}>Product category (ukrainian):</Text>
								<TextInput
									style={styles.input}
									placeholder="бургер"
									onChangeText={(val) => setProductCategoryUA(val)}
								/>

								<View style={styles.buttons}>
									<CustomButton
										title="Add"
										onPress={() =>
											addProduct(
												nameEN,
												nameUA,
												amount,
												compositionEN,
												compositionUA,
												categoryEN,
												categoryUA
											)
										}
									/>
									<CustomButtonOutline title="Close" onPress={() => setIsModalOpen(false)} />
								</View>
							</SafeAreaView>
						</View>
					</TouchableWithoutFeedback>
				</ScrollView>
			</Modal>
			{isAdmin && (
				<>
					<CustomButton title={isUkrainian ? 'Додати продукт' : 'Add product'} onPress={() => setIsModalOpen(true)} />
					<View style={styles.divider}></View>
				</>
			)}
				<>
					<CustomButton title={isUkrainian ? 'Назад до головного меню' : 'Back to the main menu'} onPress={() => setIsLoggedIn(false)} />
					<View style={styles.divider}></View>
				</>
			<FlatList
				keyExtractor={(item) => item.id}
				data={productsData}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.item}
						onPress={() => {
							navigation.navigate('ProductCategory', { item, setIsLoading });
						}}>
						<Text style={styles.itemText}>{item}</Text>
					</TouchableOpacity>
				)}
			/>
		</SafeAreaView>
	);
};
export default Products;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EDEEF2',
		alignItems: 'center',
	},
	modalContainer: {
		paddingTop: 100,
		flex: 1,
		alignItems: 'center',
		width: '100%',
	},
	modalContent: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'left',
		justifyContent: 'center',
		padding: 10,
		width: '100%',
		justifyContent: 'space-between',
		width: '100%',
	},
	buttons: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#6E83B4',
		padding: 8,
		marginVertical: 10,
		width: '100%',
	},
	item: {
		backgroundColor: '#CDDAFA',
		width: 300,
		padding: 15,
		borderRadius: 8,
		borderStyle: 'dashed',
		borderColor: '#6E83B4',
		borderWidth: 1,
		marginBottom: 10,
	},
	itemText: {
		textAlign: 'center',
		fontSize: 24,
	},
	divider: {
		width: '90%',
		height: 1,
		backgroundColor: '#CCCCCC',
		marginVertical: 10,
	},
	text: {
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'left',
	},
});
