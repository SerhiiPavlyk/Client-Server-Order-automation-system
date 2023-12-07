import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { products } from '../../config/firebaseConfig';
import { removeFromCart } from '../../reducers';
import { CustomDeleteButton } from '../ui/CustomButton';

const Cart = ({ route }) => {
	const { isUkrainian } = route.params;
	const cart = useSelector((state) => state.fastfood.cart);
	const total = useSelector((state) => state.fastfood.total);
	const [isLoading, setIsLoading] = useState(true);
	const [productsCart, setProductsCart] = useState([]);

	const dispatch = useDispatch();
	const navigation = useNavigation();

	const removeFromCartHandler = (id, price) => {
		dispatch(removeFromCart({ id, price }));
		Toast.show({
			type: 'success',
			text1: isUkrainian ? 'Успішно!' : 'Successfully!',
			text2:isUkrainian ? 'Успішно видалено з кошика!' : 'Successfully removed from cart!',
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const allProducts = await products.getAll();

				const productQuantities = cart.reduce((quantities, productId) => {
					quantities[productId] = (quantities[productId] || 0) + 1;
					return quantities;
				}, {});

				const cartProducts = allProducts
					.filter((product) => cart.includes(product.id))
					.map((product) => ({
						...product,
						quantity: productQuantities[product.id] || 0,
					}));

				setProductsCart(cartProducts);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};

		fetchData();
	}, [cart]);

	if (isLoading) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				keyExtractor={(item) => item.id}
				data={productsCart}
				renderItem={({ item }) => (
					<TouchableOpacity style={styles.itemCart}>
						<Text style={styles.itemText}>
							{isUkrainian ? 'Назва: ' : 'Name: '}
							{isUkrainian ? item.nameUA : item.nameEN}
						</Text>
						<Text style={styles.itemPriceText}>
							{isUkrainian ? 'Ціна: ' : 'Price: '}
							{item.price}
						</Text>
						<Text>
							{isUkrainian ? 'Кількість: ' : 'Quantity: '}
							{item.quantity}
						</Text>
						<CustomDeleteButton
							title={isUkrainian ? 'Видалити' : 'Delete'}
							onPress={() => removeFromCartHandler(item.id, item.price)}
						/>
					</TouchableOpacity>
				)}
			/>
			<View style={styles.divider}></View>
			<Text style={styles.payPrice}>{total} грн</Text>
			<View style={styles.buttons}>
				<CustomDeleteButton
					title={isUkrainian ? 'Оплатити' : 'Pay'}
					onPress={() => {
						navigation.navigate('Payment', { item: total, setIsLoading });
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Cart;

const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#86ff4a',
			alignItems: 'center',
		},

	buttons: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#fffc57',
		padding: 8,
		marginVertical: 10,
		width: '100%',
	},
	itemCart: {
		marginTop: 7,
		backgroundColor: '#c5ff26',
		width: 300,
		padding: 8,
		borderRadius: 8,
		borderStyle: 'solid',
		borderColor: '#6E83B4',
		borderWidth: 1,
		marginBottom: 10,
		display: 'flex',
		alignItems: 'flex-start',
	},
	itemText: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
	},
	payPrice: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
	},
	itemPriceText: {
		textAlign: 'center',
		fontSize: 20,
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
		backgroundColor: '#ff3a1c'
	},
});
