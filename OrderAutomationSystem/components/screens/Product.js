import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
	Keyboard,
	Modal,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { products } from '../../config/firebaseConfig';
import { CustomButton, CustomButtonOutline, CustomDeleteButton } from '../ui/CustomButton';
import DisplayBase64Image from '../ui/DisplayImage';
import { addToCart } from '../../reducers';

const Product = ({ route }) => {
	const { item, setIsLoading, isAdmin, isUkrainian } = route.params;

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [nameEN, setNameEN] = useState(item.nameEN);
	const [nameUA, setNameUA] = useState(item.nameUA);
	const [amount, setAmount] = useState(item.price);
	const [compositionEN, setProductCompositionEN] = useState(item.compositionEN);
	const [compositionUA, setProductCompositionUA] = useState(item.compositionUA);
	const [categoryEN, setProductCategoryEN] = useState(item.categoryEN);
	const [categoryUA, setProductCategoryUA] = useState(item.categoryUA);
	const [image, setImage] = useState(item.picture);

	const navigate = useNavigation();
	const dispatch = useDispatch();

	const editProduct = async (id, nameEN, nameUA, amount, compositionEN, compositionUA, categoryEN, categoryUA, picture) => {
		const data = {
			id,
			nameEN: nameEN.trim(),
			nameUA: nameUA.trim(),
			price: parseInt(amount),
			compositionEN: compositionEN.trim(),
			compositionUA: compositionUA.trim(),
			picture: picture,
			categoryEN: categoryEN.trim(),
			categoryUA: categoryUA.trim(),
			picture: picture,
		};
		if (
			nameEN.trim() === '' ||
			nameUA.trim() === '' ||
			amount === '' ||
			compositionEN.trim() === '' ||
			compositionUA.trim() === '' ||
			categoryEN.trim() === '' ||
			categoryUA.trim() === ''
		) {
			setIsModalOpen(false);
			Toast.show({
				type: 'error',
				text1: isUkrainian ? 'Помилка!' : 'Error!',
				text2: isUkrainian ? 'Будь ласка, заповніть всі поля!' : 'Please fill all inputs!',
			});
		} else {
			setIsModalOpen(false);
			setIsLoading(true);

			await products
				.update(data)
				.then((res) => {
					setIsLoading(false);
					navigate.goBack();
					Toast.show({
						type: 'success',
						text1: `${isUkrainian ? item.nameUA : item.nameEN}`,
						text2: isUkrainian ? 'Продукт успішно оновлено!' : 'Product successfully updated!',
					});
				})
				.catch((err) => console.log(err));
		}
	};

	const handleProductDeleting = async (id) => {
		await products
			.delete(id)
			.then((res) => {
				navigate.goBack();
				setIsLoading(true);
			})
			.catch((err) => console.log(err));
	};

	const openImagePicker = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== 'granted') {
			console.log('Дозвіл на доступ до медіатеки не надано');
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.cancelled) {
			if (result.uri) {
				const localUri = result.uri;

				// Resize and compress the image using ImageManipulator
				const manipulatedImage = await ImageManipulator.manipulateAsync(localUri, [{ resize: { width: 600 } }], {
					compress: 0.8, // You can adjust the compression quality as needed
					format: ImageManipulator.SaveFormat.JPEG,
					base64: true, // Convert the image to base64
				});

				if (manipulatedImage.base64) {
					setImage(`data:image/jpeg;base64,${manipulatedImage.base64}`);
				} else {
					console.log('Не вдалося отримати base64 обраного зображення.');
				}
			} else {
				console.log('Не вдалося отримати URI обраного зображення.');
			}
		}
	};

	const addToCartHandler = (id, price) => {
		dispatch(addToCart({ id, price }));
		Toast.show({
			type: 'success',
			text1: isUkrainian ? 'Успішно!' : 'Success',
			text2: isUkrainian ? 'Успішно додано до кошика!' : 'Successfully added to cart!',
		});
	};

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
								<TextInput
									value={nameEN}
									style={styles.input}
									placeholder="Burger"
									onChangeText={(val) => setNameEN(val)}
								/>

								<Text style={styles.text}>Product name (ukrainian):</Text>
								<TextInput
									value={nameUA}
									style={styles.input}
									placeholder="Бургер"
									onChangeText={(val) => setNameUA(val)}
								/>

								<Text style={styles.text}>Product price:</Text>
								<TextInput
									value={String(amount)}
									style={styles.input}
									keyboardType="numeric"
									placeholder="77"
									onChangeText={(val) => setAmount(val)}
								/>

								<Text style={styles.text}>Product composition (english):</Text>
								<TextInput
									value={compositionEN}
									style={styles.input}
									placeholder="cucumber, onion"
									onChangeText={(val) => setProductCompositionEN(val)}
								/>

								<Text style={styles.text}>Product composition (ukrainian):</Text>
								<TextInput
									value={compositionUA}
									style={styles.input}
									placeholder="огірок, цибуля"
									onChangeText={(val) => setProductCompositionUA(val)}
								/>

								<Text style={styles.text}>Product category (english):</Text>
								<TextInput
									value={categoryEN}
									style={styles.input}
									placeholder="burger"
									onChangeText={(val) => setProductCategoryEN(val)}
								/>
								<Text style={styles.text}>Product category (ukrainian):</Text>
								<TextInput
									value={categoryUA}
									style={styles.input}
									placeholder="бургер"
									onChangeText={(val) => setProductCategoryUA(val)}
								/>

								<View style={styles.preview}>
									<CustomButtonOutline title="Choose Image" onPress={openImagePicker} />
									<DisplayBase64Image base64Image={image} />
								</View>
								<View style={styles.buttons}>
									<CustomButton
										title={isUkrainian ? 'Edit' : 'Редагувати'}
										onPress={() =>
											editProduct(
												item.id,
												nameEN,
												nameUA,
												amount,
												compositionEN,
												compositionUA,
												categoryEN,
												categoryUA,
												image
											)
										}
									/>
									<CustomButtonOutline
										title={isUkrainian ? 'Close' : 'Закрити'}
										onPress={() => setIsModalOpen(false)}
									/>
								</View>
							</SafeAreaView>
						</View>
					</TouchableWithoutFeedback>
				</ScrollView>
			</Modal>
			<DisplayBase64Image base64Image={item?.picture} />
			{item && (
				<View style={styles.productInfo}>
					<Text style={styles.productText}>
						{isUkrainian ? 'Назва: ' : 'Name: '}
						{isUkrainian ? item.nameUA : item.nameEN}
					</Text>
					<Text style={styles.productText}>
						{isUkrainian ? 'Ціна: ' : 'Price: '}
						{item.price}
					</Text>
					<Text style={styles.productText}>
						{isUkrainian ? 'Склад: ' : 'Composition: '}
						{isUkrainian ? item.compositionUA : item.compositionEN}
					</Text>
					<Text style={styles.productText}>
						{isUkrainian ? 'Категорія: ' : 'Category: '}
						{isUkrainian ? item.categoryUA : item.categoryEN}
					</Text>
				</View>
			)}

			{isAdmin ? (
				<View style={styles.buttons}>
					<CustomDeleteButton
						title={isUkrainian ? 'Delete' : 'Видалити'}
						onPress={() => {
							handleProductDeleting(item.id);
						}}
					/>
					<CustomButton title={isUkrainian ? 'Edit product' : 'Редагувати продукт'} onPress={() => setIsModalOpen(true)} />
				</View>
			) : (
				<View style={styles.buttons}>
					<CustomButton
						title={isUkrainian ? 'Додати в кошик' : 'Add to cart'}
						onPress={() => addToCartHandler(item.id, item.price)}
					/>
				</View>
			)}
		</SafeAreaView>
	);
};
export default Product;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#86ff4a',
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
	},
	buttons: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
	},
	preview: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	productInfo: {
		paddingHorizontal: 30,
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
	},
	productText: {
		fontSize: 20,
		fontWeight: '600',
	},
	input: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#1f2ef2',
		padding: 8,
		marginVertical: 10,
		width: '100%',
	},
	item: {
		backgroundColor: '#f1fc4c',
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
