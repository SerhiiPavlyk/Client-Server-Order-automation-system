import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../screens/Cart';
import Product from '../screens/Product';
import ProductCategory from '../screens/ProductCategory';
import Products from '../screens/Products';
import Profile from '../screens/Profile';
import Payment from '../screens/Payment';

const Stack = createNativeStackNavigator();
const StackCart = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackGroup({ navigation, route }) {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Products"
				component={Products}
				initialParams={{
					isAdmin: route.params.isAdmin,
					isUkrainian: route.params.isUkrainian,
					setIsLoggedIn: route.params.setIsLoggedIn,
				}}
			/>
			<Stack.Screen
				name="ProductCategory"
				component={ProductCategory}
				initialParams={{
					isAdmin: route.params.isAdmin,
					isUkrainian: route.params.isUkrainian,
				}}
			/>
			<Stack.Screen
				name="Product"
				component={Product}
				initialParams={{
					isAdmin: route.params.isAdmin,
					isUkrainian: route.params.isUkrainian,
				}}
			/>
		</Stack.Navigator>
	);
}

function StackCartGroup({ navigation, route }) {
	return (
		<StackCart.Navigator>
			<StackCart.Screen
				name="Cart"
				component={Cart}
				initialParams={{
					isAdmin: route.params.isAdmin,
					isUkrainian: route.params.isUkrainian,
				}}
			/>
			<StackCart.Screen
				name="Payment"
				component={Payment}
				initialParams={{
					isAdmin: route.params.isAdmin,
					isUkrainian: route.params.isUkrainian,
				}}
			/>
		</StackCart.Navigator>
	);
}

function TabGroup({ userId, setIsLoggedIn, isAdmin, isUkrainian }) {
	if (isAdmin) {
		return (
			<Tab.Navigator
				screenOptions={({ route, navigation }) => ({
					tabBarIcon: ({ color, focused, size }) => {
						let iconName;
						if (route.name === 'Profile') {
							iconName = focused ? 'person-circle' : 'person-circle-outline';
						}
						if (route.name === 'StackGroup') {
							iconName = focused ? 'fast-food' : 'fast-food-outline';
						}

						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: '#6E83B4',
					tabBarInactiveTintColor: '#A4A7AE',
				})}>
				<Tab.Screen
					name="Profile"
					component={Profile}
					initialParams={{
						userId: userId,
						setIsLoggedIn: setIsLoggedIn,
						isUkrainian,
					}}
				/>
				<Tab.Screen
					name="StackGroup"
					component={StackGroup}
					initialParams={{
						userId: userId,
						setIsLoggedIn: setIsLoggedIn,
						isAdmin: isAdmin,
						isUkrainian,
					}}
					options={{ headerShown: false, tabBarLabel: isUkrainian ? 'Продукти' : 'Products' }}
				/>
			</Tab.Navigator>
		);
	}
	return (
		<Tab.Navigator
			screenOptions={({ route, navigation }) => ({
				tabBarIcon: ({ color, focused, size }) => {
					let iconName;
					if (route.name === 'StackCartGroup') {
						iconName = focused ? 'cart' : 'cart-outline';
					}
					if (route.name === 'StackGroup') {
						iconName = focused ? 'fast-food' : 'fast-food-outline';
					}
					if (route.name === 'Users') {
						iconName = 'users';
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: '#6E83B4',
				tabBarInactiveTintColor: '#A4A7AE',
			})}>
			<Tab.Screen
				name="StackGroup"
				component={StackGroup}
				initialParams={{
					userId: userId,
					setIsLoggedIn: setIsLoggedIn,
					isAdmin: isAdmin,
					isUkrainian,
				}}
				options={{ headerShown: false, tabBarLabel: isUkrainian ? 'Продукти' : 'Products' }}
			/>
			<Tab.Screen
				name="StackCartGroup"
				component={StackCartGroup}
				initialParams={{
					userId: userId,
					setIsLoggedIn: setIsLoggedIn,
					isAdmin: isAdmin,
					isUkrainian,
				}}
				options={{ headerShown: false, tabBarLabel: isUkrainian ? 'Кошик' : 'Cart' }}
			/>
		</Tab.Navigator>
	);
}

const Navigation = ({ route }) => {
	return (
		<TabGroup
			userId={route.params.userId}
			setIsLoggedIn={route.params.setIsLoggedIn}
			isAdmin={route.params.isAdmin}
			isUkrainian={route.params.isUkrainian}
		/>
	);
};
export default Navigation;
