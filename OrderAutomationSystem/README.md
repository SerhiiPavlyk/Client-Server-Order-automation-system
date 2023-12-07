# OrderAutomationSystem

The "OrderAutomationSystem" project is a mobile application developed using React Native and integrated with a Firebase database. This system is designed for organization of quick orders in food establishments.

## Getting Started

These instructions will help you get the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:

-   You have Git installed on your computer.
-   You have Node.js and a package manager (npm or yarn) installed.

### Clone the Repository

Use the following command to clone the GitHub repository:

```sh
git clone repository_url
```

Replace repository_url with the GitHub repository url.

### Create 'firebaseConfig.js' File

-   Inside the project's config folder, create a new file named firebaseConfig.js.
-   Open the firebaseConfig.js file you created. You'll need to add your Firebase configuration to this file.

#### Firebase config example

```
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import FirebaseFactory from './firebaseFactory';

const firebaseConfig = {
	apiKey: '',
	authDomain: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: '',
	appId: '',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);

export const firebaseCollections = {
	key_1: 'collection_name',
	key_2: 'collection_name'
};

export const collection_1 = new FirebaseFactory(firebaseFirestore, firebaseCollections.key_1);
export const collection_2 = new FirebaseFactory(firebaseFirestore, firebaseCollections.key_2);
```

### Install Dependencies

In your project folder, run one of the following commands to install the project's dependencies:

```sh
npm install
```

or

```sh
yarn install
```

### Launch the Project

In your project folder, run one of the following commands to install the project's dependencies:

```sh
npm start
```

or

```sh
yarn start
```
This will launch the project on your local development server.

## Usage

After running `npm start`, the project will be launched using Expo. You have a couple of options for using the app:

1. **Expo Go App:**
   - Install the "Expo Go" app on your smartphone.
   - Open the Expo Go app and scan the QR code displayed in the terminal or web browser after running `npm start`.
   - This will allow you to interact with and test the app on your mobile device.

2. **Android Studio (or iOS Simulator):**
   - If you prefer, you can use Android Studio's Android Emulator or the iOS Simulator on a Mac.
   - To do this, make sure you have Android Studio or Xcode (for iOS) installed.
   - Then, follow the instructions provided by your development environment to set up and run the project on an emulator or simulator.

Choose the method that suits your needs for testing and using the app.


## Built With

This project was developed using the following technologies and tools:

- [React Native](https://reactnative.dev/) - A mobile framework for building native applications using React.
- [Firebase](https://firebase.google.com/) - A cloud-based platform for app development, providing database and authentication services.
- [Expo](https://expo.dev/) - An open-source platform for building and deploying React Native applications with ease.
