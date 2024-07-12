<template>
    <div>
      <h2>Add New Item</h2>
      <form @submit.prevent="addItem">
        <div>
          <label for="name">Item Name:</label>
          <input v-model="newItem.name" id="name" placeholder="Item Name" required />
        </div>
        <div>
          <label for="price">Price:</label>
          <input v-model="newItem.price" id="price" placeholder="Price" type="number" step="0.01" required />
        </div>
        <div>
          <label for="quantity">Quantity:</label>
          <input v-model="newItem.quantity" id="quantity" placeholder="Quantity" type="number" step="0.01" required />
        </div>
        <div>
          <label for="units">Units:</label>
          <select v-model="newItem.units" id="units" required>
            <option value="L">Liters</option>
            <option value="mL">Milliliters</option>
            <option value="kg">Kilograms</option>
            <option value="g">Grams</option>
            <option value="mg">Milligrams</option>
            <option value="units">Units</option>
            <!-- Add more units as needed -->
          </select>
        </div>
        <div>
          <label for="grocer">Grocer:</label>
          <select v-model="newItem.grocer" id="grocer" required>
            <option v-for="grocer in grocers" :key="grocer.id" :value="grocer.name">{{ grocer.name }}</option>
          </select>
          <input v-model="newGrocer" placeholder="Add new grocer" />
          <button @click.prevent="addNewGrocer">Add Grocer</button>
        </div>
        <div>
          <label for="lastPurchased">Last Purchased:</label>
          <input v-model="newItem.lastPurchased" id="lastPurchased" type="date" required />
          <button @click.prevent="setToday">Today</button>
        </div>
        <div>
          <label for="onSale">On Sale:</label>
          <input type="checkbox" v-model="newItem.onSale" id="onSale" />
        </div>
        <div>
          <label for="department">Department:</label>
          <select v-model="newItem.department" id="department" required>
            <option v-for="department in departments" :key="department.id" :value="department.name">{{ department.name }}</option>
          </select>
          <input v-model="newDepartment" placeholder="Add new department" />
          <button @click.prevent="addNewDepartment">Add Department</button>
        </div>
        <div>
          <label for="favorite">Favorite:</label>
          <input type="checkbox" v-model="newItem.favorite" id="favorite" />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
</template>
  
<script>
    import { ref, onMounted } from 'vue';
    import { addItem, addGrocer, getGrocers, addDepartment, getDepartments } from '../firebase/firestoreUtils'; // Import your utility functions
    
    export default {
        setup(props, { emit }) {
        const newItem = ref({
            name: '',
            price: 0,
            quantity: 1,
            units: '',
            grocer: '',
            lastPurchased: '',
            onSale: false,
            department: '',
            favorite: false
        });
    
        const newGrocer = ref('');
        const newDepartment = ref('');
        const grocers = ref([]);
        const departments = ref([]);
    
        const userId = 'someUserId'; // Replace with the actual user ID
    
        const fetchGrocers = async () => {
            grocers.value = await getGrocers(userId);
        };
    
        const fetchDepartments = async () => {
            departments.value = await getDepartments(userId);
        };
    
        const addItemToDB = async () => {
            // Convert the date string to a JavaScript Date object
            const itemToAdd = { ...newItem.value, lastPurchased: new Date(newItem.value.lastPurchased) };
            await addItem(userId, itemToAdd);
            emit('item-added'); // Emit event after adding item
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
    
        const addNewGrocer = async () => {
            if (newGrocer.value.trim() !== '') {
            await addGrocer(userId, newGrocer.value);
            newGrocer.value = '';
            fetchGrocers(); // Refresh the list
            }
        };
    
        const addNewDepartment = async () => {
            if (newDepartment.value.trim() !== '') {
            await addDepartment(userId, newDepartment.value);
            // newDepartment.value = '';
            fetchDepartments(); // Refresh the list
            }
        };
    
        const setToday = () => {
            newItem.value.lastPurchased = new Date().toISOString().substr(0, 10); // Set to today's date in YYYY-MM-DD format
        };
    
        onMounted(() => {
            fetchGrocers();
            fetchDepartments();
        });
    
        return {
            newItem,
            newGrocer,
            newDepartment,
            grocers,
            departments,
            addItem: addItemToDB,
            addNewGrocer,
            addNewDepartment,
            setToday
        };
        }
    };
</script>
  
<style>
/* Add your styles here */
</style>
  