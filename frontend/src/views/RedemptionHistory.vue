<template>
    <div class="min-h-screen bg-white">


      

            <!-- Form Section -->
            <main class="flex-1 bg-white shadow-lg px-8 py-4">
                <h1 class="text-xl mb-2 font-semibold text-green-800">Redemption</h1>


                <!-- Search and Filter Section -->
                <div class="flex justify-between items-center mb-6">
                    <div class="relative">
                        <select v-model="selectedFilter"
                            class="appearance-none bg-white border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All</option>
                        </select>
                        <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <div class="relative w-64">
                        <input type="text" v-model="searchTerm" placeholder="Search" @input="handleSearch"
                            class="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <!-- Redemption Table -->
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="border p-3 text-left cursor-pointer" @click="sortTable('id')">
                                    ID
                                    <span v-if="sortBy === 'id'">
                                        <ChevronDown v-if="!sortAsc" class="inline-block ml-2" />
                                        <ChevronUp v-if="sortAsc" class="inline-block ml-2" />
                                    </span>
                                </th>
                                <th class="border p-3 text-left cursor-pointer" @click="sortTable('issuanceId')">
                                    Issuance ID
                                    <span v-if="sortBy === 'issuanceId'">
                                        <ChevronDown v-if="!sortAsc" class="inline-block ml-2" />
                                        <ChevronUp v-if="sortAsc" class="inline-block ml-2" />
                                    </span>
                                </th>
                                <th class="border p-3 text-left cursor-pointer" @click="sortTable('issuanceName')">
                                    Issuance Name
                                    <span v-if="sortBy === 'issuanceName'">
                                        <ChevronDown v-if="!sortAsc" class="inline-block ml-2" />
                                        <ChevronUp v-if="sortAsc" class="inline-block ml-2" />
                                    </span>
                                </th>
                                <th class="border p-3 text-left cursor-pointer" @click="sortTable('userName')">
                                    User Name
                                    <span v-if="sortBy === 'userName'">
                                        <ChevronDown v-if="!sortAsc" class="inline-block ml-2" />
                                        <ChevronUp v-if="sortAsc" class="inline-block ml-2" />
                                    </span>
                                </th>
                                <th class="border p-3 text-left cursor-pointer" @click="sortTable('useAt')">
                                    Use At
                                    <span v-if="sortBy === 'useAt'">
                                        <ChevronDown v-if="!sortAsc" class="inline-block ml-2" />
                                        <ChevronUp v-if="sortAsc" class="inline-block ml-2" />
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="redemption in filteredRedemptions" :key="redemption.id" class="hover:bg-gray-50">
                                <td class="border p-3">{{ redemption.id }}</td>
                                <td class="border p-3">{{ redemption.issuanceId }}</td>
                                <td class="border p-3">{{ redemption.issuanceName }}</td>
                                <td class="border p-3 cursor-pointer" >
                                    <span @click="selectUser(redemption.userId)">{{ getUserName(redemption.userId) }}</span>
                                </td>
                                <td class="border p-3">
                                    <input disabled type="text" v-model="redemption.useAt" placeholder="null"
                                        class="border rounded px-2 py-1 w-32" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
        <div v-if="selectedUser" class="z-50 fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white shadow-lg p-8 rounded-lg max-w-3xl w-full">
        <h1 class="text-xl mb-2 font-semibold text-green-800">User Profile</h1>
        <form class="grid grid-cols-2 gap-6">
          <!-- Personal Info -->
          <div>
            <h3 class="text-gray-600 font-semibold mb-2">Personal</h3>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">First Name</label>
              <input type="text" :value="selectedUser.name.split(' ')[0]" class="w-full border border-gray-300 p-2 rounded-lg" disabled />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Surname</label>
              <input type="text" :value="selectedUser.name.split(' ')[1]" class="w-full border border-gray-300 p-2 rounded-lg" disabled />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">National Code</label>
              <input type="text" :value="selectedUser.nationalCode || ''" class="w-full border border-gray-300 p-2 rounded-lg" disabled />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Date of Birth</label>
              <input type="date" :value="selectedUser.dob || ''" class="w-full border border-gray-300 p-2 rounded-lg" disabled />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Gender</label>
              <select class="w-full border border-gray-300 p-2 rounded-lg" :value="selectedUser.gender || ''" disabled>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-gray-600 font-semibold mb-2">Contact</h3>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Email</label>
              <input type="email" :value="selectedUser.email" class="w-full border border-gray-300 p-2 rounded-lg" disabled />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Phone Number</label>
              <input type="tel" :value="selectedUser.phone" class="w-full border border-gray-300 p-2 rounded-lg" disabled />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Country</label>
              <select class="w-full border border-gray-300 p-2 rounded-lg" :value="selectedUser.country || ''" disabled>
                <option>Select</option>
                <option>USA</option>
                <option>Canada</option>
                <option>UK</option>
              </select>
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">City</label>
              <input type="text" :value="selectedUser.city" class="w-full border border-gray-300 p-2 rounded-lg" disabled />
            </div>
          </div>
        </form>

        <div class="mt-4 flex justify-end">
          <button type="button" @click="closeUserProfile" class="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium">Back</button>
        </div>
      </div>
    </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ChevronDown, ChevronUp, Search, } from 'lucide-vue-next'
import { fetchRedemption } from '../api/adminService';

const redemptionData = ref([]);

const loadRedemptionData = async () => {
  try {
    const response = await fetchRedemption();
    if (response.data.status === 'success') {
      redemptionData.value = response.data.data;
      console.log('Redemption data:', redemptionData.value);
    } else {
      console.error('Error fetching redemption data:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching redemption data:', error);
  }
};

onMounted(() => {
  loadRedemptionData();
});

const initialRedemptions = [
  { id: '#00001', issuanceId: '#00001', issuanceName: '20% off', userId: 1, useAt: '06 / 01 / 2021', isVerified: true },
  { id: '#00002', issuanceId: '#00002', issuanceName: '25% off', userId: 2, useAt: '08 / 04 / 2022', isVerified: true },
  { id: '#00003', issuanceId: '#00003', issuanceName: '25% off', userId: 3, useAt: '08 / 04 / 2022', isVerified: true },
  { id: '#00004', issuanceId: '#00004', issuanceName: '15% off', userId: 4, useAt: null, isVerified: false },
];

// Simulated user data fetched by userId
const users = ref({
  1: { id: 1, name: 'Lili Daniels', nationalCode: 'AB1234', dob: '1990-05-14', gender: 'Female', email: 'lili@example.com', phone: '1234567890', country: 'USA', city: 'New York' },
  2: { id: 2, name: 'Seth McDaniel', nationalCode: 'CD5678', dob: '1985-10-02', gender: 'Male', email: 'seth@example.com', phone: '0987654321', country: 'Canada', city: 'Toronto' },
  3: { id: 3, name: 'Edward King', nationalCode: 'EF9012', dob: '1992-11-22', gender: 'Male', email: 'edward@example.com', phone: '1122334455', country: 'UK', city: 'London' },
  4: { id: 4, name: 'Isabella Rose', nationalCode: 'GH3456', dob: '1993-08-10', gender: 'Female', email: 'isabella@example.com', phone: '2233445566', country: 'USA', city: 'Los Angeles' },
});

const searchTerm = ref('')
const selectedFilter = ref('All')
const redemptions = ref([...initialRedemptions])
const sortBy = ref('id')
const sortAsc = ref(true)
const selectedUser = ref(null);


const handleSearch = () => {
    const term = searchTerm.value.toLowerCase()
    redemptions.value = initialRedemptions.filter(redemption =>
        Object.values(redemption).some(value =>
            value && value.toString().toLowerCase().includes(term)
        )
    )
}

const sortedRedemptions = computed(() => {
    return [...redemptions.value].sort((a, b) => {
        const aValue = a[sortBy.value]
        const bValue = b[sortBy.value]
        if (aValue < bValue) return sortAsc.value ? -1 : 1
        if (aValue > bValue) return sortAsc.value ? 1 : -1
        return 0
    })
})

const filteredRedemptions = computed(() => {
    return sortedRedemptions.value.filter(redemption => {
        if (selectedFilter.value === 'All') return true
        return redemption.issuanceName === selectedFilter.value
    })
})

const sortTable = (column) => {
    if (sortBy.value === column) {
        sortAsc.value = !sortAsc.value
    } else {
        sortBy.value = column
        sortAsc.value = true
    }
}



// Function to get the user name by userId
const getUserName = (userId) => {
  return users.value[userId]?.name || 'Unknown User';
};

// Handle user selection for profile modal
const selectUser = (userId) => {
  selectedUser.value = users.value[userId];
};

// Close the user profile modal
const closeUserProfile = () => {
  selectedUser.value = null;
};
</script>