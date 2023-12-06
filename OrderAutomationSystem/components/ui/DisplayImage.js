import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

function DisplayBase64Image({ base64Image }) {
	return (
		<View style={styles.container}>
			{base64Image ? (
				<Image source={{ uri: base64Image }} style={styles.image} />
			) : (
				<View style={styles.errorImg}>
					<Text>No Image Available</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 10,
	},
	errorImg: {
		width: 200,
		height: 200,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#000000',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default DisplayBase64Image;
