<!-- Legacy, not in use
 To be deleted at some point

-->

<template>
  <div>
    <h2>Add New Item</h2>
    <form @submit.prevent="addItem">
      <div>
        <label for="name">Item Name:</label>
        <input v-model="newItem.name" id="name" placeholder="Item Name" required />
      </div>
      <div>
        <label for="brand">Brand Name:</label>
        <input v-model="newItem.brand" id="brand" placeholder="Brand Name" required />
      </div>
      <div>
        <label for="price">Price:</label>
        <input v-model="newItem.price" id="price" placeholder="Price" type="number" required />
      </div>
      <div>
        <label for="quantity">Quantity:</label>
        <input v-model="newItem.quantity" id="quantity" placeholder="Quantity" type="number" required />
      </div>
      <div>
        <label for="units">Units:</label>
        <input v-model="newItem.units" id="units" placeholder="Units" required />
      </div>
      <div>
        <label for="grocer">Grocer:</label>
        <input v-model="newItem.grocer" id="grocer" placeholder="Grocer" required />
      </div>
      <div>
        <label for="lastPurchased">Last Purchased:</label>
        <input v-model="newItem.lastPurchased" id="lastPurchased" type="date" required />
      </div>
      <div>
        <label for="onSale">On Sale:</label>
        <input type="checkbox" v-model="newItem.onSale" id="onSale" />
      </div>
      <div>
        <label for="department">Department:</label>
        <input v-model="newItem.department" id="department" placeholder="Department" required />
      </div>
      <div>
        <label for="favorite">Favorite:</label>
        <input type="checkbox" v-model="newItem.favorite" id="favorite" />
      </div>
      <button type="submit">Add Item</button>
    </form>

    <h2>Items List</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - ${{ item.price }} - {{ item.quantity }} {{ item.units }} - {{ item.grocer }}
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
      const itemToAdd = { ...newItem.value, lastPurchased: new Date(newItem.value.lastPurchased) };
      await addItem(userId, itemToAdd);
      fetchItems(); // Refresh the list
      // Reset form
      newItem.value = {
        name: '',
        price: 0,
        quantity: 1,
        units: '',
        grocer: '',
        lastPurchased: '',
        onSale: false,
        department: '',
        favorite: false
      };
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