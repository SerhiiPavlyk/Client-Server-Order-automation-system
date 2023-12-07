import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { users } from '../../config/firebaseConfig';
import { CustomButtonOutline } from '../ui/CustomButton';
import DisplayBase64Image from '../ui/DisplayImage';

const Profile = ({ route }) => {
	const [userData, setUserData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const { userId, setIsLoggedIn } = route.params;

	const removeData = async () => {
		try {
			await AsyncStorage.removeItem('user');
		} catch (error) {
			console.error('Помилка видалення даних: ', error);
		}
	};

	useEffect(() => {
		const fetchData = async (userId) => {
			await users
				.getById(userId)
				.then((res) => {
					setUserData(res);
					setIsLoading(false);
				})
				.catch((err) => console.log(err));
		};
		fetchData(userId);
	}, [userId, isLoading]);

	if (isLoading) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.userBox}>
				{userData?.picture ? (
					<DisplayBase64Image base64Image={userData?.picture} />
				) : (
					<FontAwesome name="user-circle-o" size={60} color="black" />
				)}
				<Text style={styles.name}>{userData?.name}</Text>
				<Text>{userData?.email}</Text>
				{userData?.isAdmin && <Text style={styles.admin}>Admin</Text>}
				<CustomButtonOutline
					title="Logout"
					onPress={() => {
						setIsLoggedIn(false);
						removeData();
					}}
				/>
			</View>
		</SafeAreaView>
	);
};
export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#23C9FF',
		alignItems: 'center',
	},
	userBox: {
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		alignItems: 'center',
	},
	name: {
		fontSize: 30,
		fontWeight: '700',
	},
	admin: {
		padding: 5,
		borderWidth: 1,
		borderStyle: 'dashed',
		borderColor: '#bbb',
		borderRadius: 5,
	},
});
