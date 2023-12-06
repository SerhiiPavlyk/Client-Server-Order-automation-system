import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import Navigation from './components/navigation/Navigation';
import Login from './components/screens/Login';
import { Provider } from 'react-redux';
import store from './store'; 

const Stack = createNativeStackNavigator();

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);
	const [isUkrainian, setIsUkrainian] = useState(false);

	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					{isLoggedIn ? (
						<>
							<Stack.Screen
								name="Navigation"
								component={Navigation}
								options={{
									headerShown: false,
								}}
								initialParams={{
									userId: userId,
									setIsLoggedIn: setIsLoggedIn,
									isAdmin,
									isUkrainian,
								}}
							/>
						</>
					) : (
						<Stack.Screen
							name="Login"
							component={Login}
							options={{
								headerShown: false,
							}}
							initialParams={{
								setUserId: setUserId,
								setIsLoggedIn: setIsLoggedIn,
								setIsAdmin,
								setIsUkrainian,
								isUkrainian,
							}}
						/>
					)}
				</Stack.Navigator>
			</NavigationContainer>
			<Toast />
		</Provider>
	);
};

export default App;
