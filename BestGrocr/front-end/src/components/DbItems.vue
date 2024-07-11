<template>
  <div>
    <input v-model="newItem" placeholder="Add a new item" />
    <button @click="addItem">Add Item</button>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.data().name }}</li>
    </ul>
  </div>
</template>

<script>
import { db } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export default {
  data() {
    return {
      newItem: '',
      items: []
    };
  },
  created() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      const itemsCollection = collection(db, 'items');
      onSnapshot(itemsCollection, snapshot => {
        this.items = snapshot.docs;
      });
    },
    async addItem() {
      try {
        await addDoc(collection(db, 'items'), {
          name: this.newItem
        });
        this.newItem = '';
      } catch (error) {
        console.error('Error adding item: ', error);
      }
    }
  }
};
</script>
<style></style>