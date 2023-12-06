import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const CustomButton = ({ title, onPress }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
};
export const CustomButtonOutline = ({ title, onPress }) => {
	return (
		<TouchableOpacity style={styles.buttonOutline} onPress={onPress}>
			<Text style={styles.buttonTextOutline}>{title}</Text>
		</TouchableOpacity>
	);
};
export const CustomDeleteButton = ({ title, onPress }) => {
	return (
		<TouchableOpacity style={styles.buttonDelete} onPress={onPress}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		marginTop: 10,
		backgroundColor: '#7D8EB4',
		borderRadius: 8,
		padding: 8,
		width: 200,
		alignItems: 'center',
		textAlign: 'center',
	},
	buttonOutline: {
		marginTop: 10,
		backgroundColor: 'transparent',
		borderRadius: 8,
		borderStyle: 'dashed',
		borderColor: '#7D8EB4',
		borderWidth: 1,
		padding: 8,
		width: 200,
		alignItems: 'center',
	},
	buttonDelete: {
		marginTop: 10,
		backgroundColor: '#C33149',
		borderRadius: 8,
		borderColor: '#8B1E3F',
		borderWidth: 1,
		padding: 8,
		width: 200,
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	buttonTextOutline: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000',
	},
});
