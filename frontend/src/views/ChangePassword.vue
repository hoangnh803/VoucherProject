<template>
  <div class="min-h-screen bg-white">


    <!-- Header Section -->
    <header class="relative bg-green-200 h-24 mt-12 p-4">
      <!-- Cover Image -->
      <div class="absolute inset-0">
        <img src="https://png.pngtree.com/thumb_back/fw800/background/20200821/pngtree-plain-dark-green-wallpaper-image_396569.jpg" alt="Cover" class="object-cover w-full h-full" />
      </div>
      <!-- Avatar and User Info -->
      <div class="absolute bottom-[-70px] left-8 flex items-center space-x-4">
        <!-- Avatar -->
        <div class="relative w-24 h-24 border-4 border-white rounded-full overflow-hidden shadow-lg">
          <img src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg" alt="Avatar" class="object-cover w-full h-full" />
          <button
            class="absolute bottom-2 right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
        <!-- User Info -->
        <div>
          <h1 class=" font-semibold text-black">{{ userName }}</h1>
          <p class="text-xs text-black">Your account is ready, you can now apply for advice.</p>
        </div>
      </div>
    </header>

    <!-- Main Content Section -->
    <div class="mt-12 flex p-4">
      <!-- Sidebar -->
      <aside class="w-64 bg-white p-4">
        <ul class="space-y-2">
          <li>
            <router-link to="/profile"
              class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
              Edit Profile
            </router-link>
          </li>
          <li>
            <router-link to="/notifications"
              class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
              Notifications
            </router-link>
          </li>
          <li>
            <router-link to="/voucher"
              class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
              My Voucher
            </router-link>
          </li>
          <li>
            <router-link to="/password-security"
              class="block py-2 px-4 text-green-600 bg-green-100 rounded-lg font-medium">
              Password & Security
            </router-link>
          </li>
        </ul>
      </aside>

      <!-- Form Section -->
      <main class="flex-1 bg-white shadow-lg px-8 py-4">
        <h1 class="text-xl mb-2 font-semibold text-green-800">Change Password</h1>

        <!-- Password Change Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4 px-36 py-4">
          <!-- Display error message -->
          <div v-if="errorMessage" class="text-red-600 text-sm mb-2">{{ errorMessage }}</div>
          
          <!-- Display success message -->
          <div v-if="successMessage" class="text-green-600 text-sm mb-2">{{ successMessage }}</div>

          <div v-for="(field, index) in fields" :key="index" class="relative">
            <label :for="field.name" class="block text-sm font-medium text-gray-700">
              {{ field.label }}
            </label>
            <input :type="field.type" :id="field.name" v-model="field.value"
              class="mt-1 block w-full border-gray-500 rounded-md border focus:ring-blue-500 focus:border-blue-500 p-2" />
            <button type="button" @click="toggleVisibility(index)" class="absolute right-3 top-2/3 -translate-y-1/2">
              <EyeOffIcon v-if="field.type === 'password'" class="w-5 h-5 text-gray-500" />
              <EyeIcon v-else class="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Set Password
          </button>
        </form>
      </main>
    </div>
  </div>
</template>

<script>
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'lucide-vue-next'
import { changePassword } from '../api/authService';

export default {
  name: "NavigationBar",
  components: {
    EyeIcon,
    EyeOffIcon
  },
  data() {
    return {
      userAvatar: "", // Placeholder for user avatar
      userName: "", // User's name
      fields: [
        { name: 'currentPassword', label: 'Current Password', type: 'password', value: '' },
        { name: 'newPassword', label: 'New Password', type: 'password', value: '' },
        { name: 'confirmPassword', label: 'Confirm Password', type: 'password', value: '' }
      ],
      errorMessage: null, // For error messages
      successMessage: null, // For success messages
      isSubmitting: false, // For loading state

    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.userAvatar = user.avatar || "https://i.pravatar.cc/100"; // Default avatar if not provided
      this.userName = user.username || "User"; // Default name if not provided
    }
  },
  methods: {
    handleDropdownOption(option) {
      this.$router.push(option.route);
    },
    toggleVisibility(index) {
      this.fields[index].type = this.fields[index].type === 'password' ? 'text' : 'password';
    },
     async handleSubmit() {
      const [currentPassword, newPassword, confirmPassword] = this.fields.map(field => field.value);

      // Validation
      if (!currentPassword || !newPassword || !confirmPassword) {
        this.errorMessage = "All fields are required.";
        return;
      }
      if (newPassword !== confirmPassword) {
        this.errorMessage = "New password and confirmation do not match.";
        return;
      }

      this.isSubmitting = true;
      this.errorMessage = null;
      this.successMessage = null;

      try {
        // API call
        const response = await changePassword({
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword
        });

        this.successMessage = response.data.message;
        this.fields.forEach(field => field.value = ''); // Clear fields after success
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "An error occurred.";
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>