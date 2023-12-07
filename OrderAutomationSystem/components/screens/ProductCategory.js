import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { products } from '../../config/firebaseConfig';

const ProductCategory = ({ route }) => {
	const { item, setIsLoading } = route.params;

	const [productsData, setProductsData] = useState([]);
	const [isLoading, setIsLoadingCategory] = useState(true);

	const { isAdmin, isUkrainian } = route.params;

	const navigation = useNavigation();

	useEffect(() => {
		const fetchData = async () => {
			await products
				.getAll()
				.then((res) => {
					const filteredProducts = res.filter(
						(product) => (isUkrainian ? product.categoryUA : product.categoryEN) === item
					);

					setProductsData(filteredProducts);
					setIsLoadingCategory(false);
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
			<FlatList
				keyExtractor={(item) => item.id}
				data={productsData}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.item}
						onPress={() => {
							navigation.navigate('Product', { item, setIsLoading });
						}}>
						<Text style={styles.itemText}>{isUkrainian ? item.nameUA : item.nameEN}</Text>
					</TouchableOpacity>
				)}
			/>
		</SafeAreaView>
	);
};
export default ProductCategory;

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
		borderColor: '#23C9FF',
		padding: 8,
		marginVertical: 10,
		width: '100%',
	},
	item: {
		backgroundColor: '#86fccb',
		width: 300,
		padding: 15,
		borderRadius: 8,
		borderStyle: 'dotted',
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
