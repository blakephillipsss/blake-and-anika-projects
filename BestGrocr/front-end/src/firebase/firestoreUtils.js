// src/firebase/firestoreUtils.js
import { db } from './firebaseConfig';
import { collection, addDoc, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

// Add an item for a user
export async function addItem(userId, item) {
  try {
    const userRef = doc(db, 'users', userId);
    const itemsCollection = collection(userRef, 'items');
    const docRef = await addDoc(itemsCollection, {
      ...item,
      lastPurchased: new Date()  // Set last purchased date to now
    });
    console.log('Item added with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding item: ', e);
  }
}

// Fetch items for a user
export async function getItemsForUser(userId) {
  const userRef = doc(db, 'users', userId);
  const itemsCollection = collection(userRef, 'items');
  const querySnapshot = await getDocs(itemsCollection);
  const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return items;
}

// Update an item for a user
export async function updateItem(userId, itemId, updatedItem) {
  try {
    const itemRef = doc(db, 'users', userId, 'items', itemId);
    await updateDoc(itemRef, updatedItem);
    console.log('Item updated successfully');
  } catch (e) {
    console.error('Error updating item: ', e);
  }
}

// Delete an item for a user
export async function deleteItem(userId, itemId) {
  try {
    const itemRef = doc(db, 'users', userId, 'items', itemId);
    await deleteDoc(itemRef);
    console.log('Item deleted successfully');
  } catch (e) {
    console.error('Error deleting item: ', e);
  }
}
