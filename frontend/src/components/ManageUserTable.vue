<template>
    <!-- User Information Modal or Section -->
    <div v-if="selectedUser" class="z-50 fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white shadow-lg p-8 rounded-lg max-w-3xl w-full">
        <!-- Form Section -->
        <h1 class="text-xl mb-2 font-semibold text-green-800">
          User Profile
        </h1>
        <form class="grid grid-cols-2 gap-6">
          <!-- Personal Info -->
          <div>
            <h3 class="text-gray-600 font-semibold mb-2">Personal</h3>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Full Name</label>
              <input type="text" :value="selectedUser.username"
                class="w-full border border-gray-300 p-2 rounded-lg" disabled />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">National Code</label>
              <input type="text" :value="selectedUser.nationalCode || ''"
                class="w-full border border-gray-300 p-2 rounded-lg" disabled />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Date of Birth</label>
              <input type="date" :value="selectedUser.dateOfBirth || ''" class="w-full border border-gray-300 p-2 rounded-lg"
                disabled />
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
              <input type="email" :value="selectedUser.email" class="w-full border border-gray-300 p-2 rounded-lg"
                disabled />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Phone Number</label>
              <input type="tel" :value="selectedUser.phone" class="w-full border border-gray-300 p-2 rounded-lg"
                disabled />
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
              <input type="text" :value="selectedUser.city" class="w-full border border-gray-300 p-2 rounded-lg"
                disabled />
            </div>
          </div>
        </form>

        <!-- Back Button -->
        <div class="mt-4 flex justify-end">
          <button type="button" @click="closeUserProfile"
            class="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium">
            Back
          </button>
        </div>
      </div>
    </div>
  <div class="p-6">
  
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex-1 max-w-2xl">
        <div class="relative">
          <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input v-model="searchQuery" type="text" placeholder="Search"
            class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>
      <div class="flex items-center gap-4">
        <select class="border rounded-lg px-3 py-2">
          <option>All</option>
          <option>Active</option>
          <option>Blocked</option>
        </select>
        <button class="text-gray-600 hover:bg-gray-100 p-2 rounded-lg">
          <MoreVerticalIcon class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 table-fixed">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="w-12 px-6 py-3">
              <input type="checkbox" class="rounded" />
            </th>
            <th scope="col"
              class="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="changeSort('name')">
              User
              <span>{{ sortKey === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : '' }}</span>
            </th>
            <th scope="col"
              class="w-28 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="changeSort('status')">
              Status
              <span>{{ sortKey === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : '' }}</span>
            </th>
            <th scope="col"
              class="w-44 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="changeSort('phone')">
              Phone number
              <span>{{ sortKey === 'phone' ? (sortDirection === 'asc' ? '↑' : '↓') : '' }}</span>
            </th>
            <th scope="col"
              class="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="changeSort('email')">
              Email
              <span>{{ sortKey === 'email' ? (sortDirection === 'asc' ? '↑' : '↓') : '' }}</span>
            </th>
            <th scope="col"
              class="w-28 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="changeSort('date')">
              Date
              <span>{{ sortKey === 'date' ? (sortDirection === 'asc' ? '↑' : '↓') : '' }}</span>
            </th>
            <th scope="col"
              class="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="changeSort('activity')">
              Activity
              <span>{{ sortKey === 'activity' ? (sortDirection === 'asc' ? '↑' : '↓') : '' }}</span>
            </th>
            <th scope="col" class="w-16 px-6 py-3"></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in sortedUsers" :key="user.id" class="hover:bg-gray-50">
            <td class="w-12 px-6 py-4">
              <input type="checkbox" class="rounded" />
            </td>
            <td class="w-48 px-6 py-4">
              <div class="flex items-center">
                <img :src="user.avatar" :alt="user.name" class="w-8 h-8 rounded-full" />
                <span class="ml-3 font-medium text-blue-500 hover:underline cursor-pointer"
                  @click="viewUserDetails(user)">
                  {{ user.username }}
                </span>
              </div>
            </td>
            <td class="w-28 px-6 py-4">
              <span class="px-2 py-1 text-sm rounded-full"
              :class="user.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
              {{ user.status === 1 ? 'Active' : 'Blocked' }}
              </span>
            </td>
            <td class="w-44 px-6 py-4 text-gray-500">{{ user.phone }}</td>
            <td class="w-48 px-6 py-4 text-gray-500">{{ user.email }}</td>
            <td class="w-28 px-6 py-4 text-gray-500">{{ user.date }}</td>
            <td class="w-40 px-6 py-4 text-gray-500">{{ user.activity }}</td>
            <td class="w-20 px-6 py-4">
              <button class="text-red-600 hover:underline" v-if="user.status === 1" @click="blockUser(user.id)">
                Block
              </button>
              <button class="text-green-600 hover:underline" v-else @click="activateUser(user.id)">
                Activate
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { fetchUsers, fetchUserDetail  } from '../api/adminService'; // Adjust the path as needed

import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  Search as SearchIcon,
  MoreVertical as MoreVerticalIcon,
} from 'lucide-vue-next';

const users = ref([]);
const searchQuery = ref('');
const sortKey = ref('');
const sortDirection = ref('asc');
const router = useRouter();
const selectedUser = ref(null);

// Fetch users from the API when the component is mounted
onMounted(async () => {
  try {
    const response = await fetchUsers();  // API call to fetch users
    users.value = response.data;  // Set users from the response
  } catch (error) {
    console.error('Error fetching users:', error);
  }
});

async function viewUserDetails(user) {
  try {
    const response = await fetchUserDetail(user.id); // Gọi API sử dụng hàm đã định nghĩa
    selectedUser.value = response.data; // Gán dữ liệu từ API vào `selectedUser`
  } catch (error) {
    console.error('Error fetching user details:', error);
    alert('Failed to fetch user details.');
  }
}

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;

  const keywords = searchQuery.value.toLowerCase().split(' ').filter(Boolean);

  return users.value.filter((user) => {
    return keywords.every((keyword) =>
      ['name', 'email', 'phone'].some((key) => {
        const value = user[key]?.toString().toLowerCase() || '';
        return value.includes(keyword);
      })
    );
  });
});

const sortedUsers = computed(() => {
  const usersToSort = [...filteredUsers.value]; // Lấy danh sách đã được lọc

  if (!sortKey.value) return usersToSort; // Nếu không có trường để sắp xếp, trả về danh sách gốc

  return usersToSort.sort((a, b) => {
    const aValue = (a[sortKey.value] || '').toString().toLowerCase();
    const bValue = (b[sortKey.value] || '').toString().toLowerCase();

    // Sắp xếp ASC/DESC
    return sortDirection.value === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });
});

function changeSort(key) {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDirection.value = 'asc';
  }
}
import { lockUser, unlockUser } from '../api/adminService'; // Đảm bảo đường dẫn chính xác

async function blockUser(userId) {
  try {
    const response = await lockUser(userId); // Gọi API khóa người dùng
    const updatedUser = response.data.user;

    const userIndex = users.value.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      users.value[userIndex].status = 0; // Cập nhật trạng thái về 0
    }

    alert('User successfully locked.');
  } catch (error) {
    console.error('Error locking user:', error);
    alert('Failed to lock user.');
  }
}


async function activateUser(userId) {
  try {
    const response = await unlockUser(userId); // Gọi API mở khóa người dùng
    const updatedUser = response.data.user;

    const userIndex = users.value.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      users.value[userIndex].status = 1; // Cập nhật trạng thái về 1
    }

    alert('User successfully unlocked.');
  } catch (error) {
    console.error('Error unlocking user:', error);
    alert('Failed to unlock user.');
  }
}








function closeUserProfile() {
  selectedUser.value = null;
}
</script>