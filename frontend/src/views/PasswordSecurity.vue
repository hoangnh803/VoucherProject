<template>




    <!-- Main Content Section -->
    <div class="mt-12 flex p-4">

      <!-- Form Section -->
      <main class="flex-1 bg-white shadow-lg px-8 py-4">
        <h1 class="text-xl mb-2 font-semibold text-green-800">Change Password</h1>

        <!-- Password Change Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4 px-36 py-4">
          
          <div v-if="errorMessage" class="text-red-600 text-sm mb-2">{{ errorMessage }}</div>
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
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            :disabled="isSubmitting">
            {{ isSubmitting ? "Submitting..." : "Set Password" }}
          </button>
        </form>

      </main>
    </div>
</template>

<script>
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'lucide-vue-next'

import { changePassword } from '../api/adminService';
export default {
  name: "NavigationBar",
  components: {
    EyeIcon,
    EyeOffIcon
  },
  data() {
    return {
      userAvatar: "https://i.pravatar.cc/100",
      userName: "Nguyen Van A",
      fields: [
        { name: 'password', label: 'Current Password', type: 'password', value: '' },
        { name: 'newPassword', label: 'New Password', type: 'password', value: '' },
        { name: 'confirmPassword', label: 'Confirm Password', type: 'password', value: '' }
      ],
      errorMessage: null, // For error messages
      successMessage: null, // For success messages
      isSubmitting: false, // For loading state
    };
  },
  methods: {
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