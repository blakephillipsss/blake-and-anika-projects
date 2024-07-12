<template>
  <div>
    <input v-model="newItem.name" placeholder="Item Name" />
    <input v-model="newItem.price" placeholder="Price" type="number" />
    <!-- Add more fields as needed -->
    <button @click="addItem">Add Item</button>

    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - ${{ item.price }}
        <button @click="deleteItem(item.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { addItem, getItemsForUser, deleteItem } from '../firebase/firestoreUtils'; // Import your utility functions

export default {
  setup() {
    const items = ref([]);
    const newItem = ref({
      name: '',
      price: 0,
      quantity: 1,
      units: 'units',
      grocer: '',
      onSale: false,
      department: '',
      favorite: false
    });

    const userId = 'someUserId'; // Replace with the actual user ID

    const fetchItems = async () => {
      items.value = await getItemsForUser(userId);
    };

    const addItemToDB = async () => {
      await addItem(userId, newItem.value);
      fetchItems(); // Refresh the list
    };

    const deleteItemFromDB = async (itemId) => {
      await deleteItem(userId, itemId);
      fetchItems(); // Refresh the list
    };

    onMounted(() => {
      fetchItems();
    });

    return {
      items,
      newItem,
      addItem: addItemToDB,
      deleteItem: deleteItemFromDB
    };
  }
};
</script>
<style></style>