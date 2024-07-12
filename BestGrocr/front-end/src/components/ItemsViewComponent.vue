<template>
    <div>
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
    import { getItemsForUser, deleteItem } from '../firebase/firestoreUtils'; // Import your utility functions
    
    export default {
        setup() {
        const items = ref([]);
        const userId = 'someUserId'; // Replace with the actual user ID
    
        const fetchItems = async () => {
            try {
                items.value = await getItemsForUser(userId);
                console.log('Fetched items:', items.value); // Debug log
            } catch (error) {
                console.error('Error fetching items:', error);
            }
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
            fetchItems, // Expose fetchItems method
            deleteItem: deleteItemFromDB
        };
        }
    };
</script>
  
<style>
/* Add your styles here */
</style>
  