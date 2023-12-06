import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

class FirebaseFactory {
	constructor(firestore, collection) {
		this.firestore = firestore;
		this.collection = collection;
	}

	getOneDocWithId(doc) {
		return {
			...doc.data(),
			id: doc.id,
		};
	}

	getDocsWithId(docs) {
		return docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
	}

	async getAll() {
		const ref = collection(this.firestore, this.collection);
		const querySnapshot = await getDocs(ref);
		return this.getDocsWithId(querySnapshot.docs);
	}

	async getById(id) {
		const ref = collection(this.firestore, this.collection);
		const docRef = doc(ref, id);
		const docSnapshot = await getDoc(docRef);

		if (docSnapshot.exists()) {
			return this.getOneDocWithId(docSnapshot);
		}

		return undefined;
	}

	async create(data) {
		const ref = collection(this.firestore, this.collection);
		const docRef = await addDoc(ref, data);
		const docSnapshot = await getDoc(docRef);
		return this.getOneDocWithId(docSnapshot);
	}

	async update(data) {
		const { id, ...rest } = data;
		const ref = collection(this.firestore, this.collection);
		const docRef = doc(ref, id);
		await setDoc(docRef, rest, { merge: true });
	}

	async delete(id) {
		const ref = collection(this.firestore, this.collection);
		const docRef = doc(ref, id);
		await deleteDoc(docRef);
	}

	async query(queryCb) {
		const ref = collection(this.firestore, this.collection);
		const query = queryCb(ref);
		const querySnapshot = await getDocs(query);
		return this.getDocsWithId(querySnapshot.docs);
	}
}

export default FirebaseFactory;
