<template>
  <div class="relative">
    <!-- Avatar -->
    <div class="w-10 h-10 rounded-full bg-gray-400 overflow-hidden cursor-pointer border border-gray-500"
      @click="toggleDropdown">
      <img :src="avatarUrl" alt="User Avatar" class="object-cover w-full h-full" />
    </div>

    <!-- Dropdown Menu -->
    <transition name="dropdown">
      <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-56 bg-[#1F485B] text-white rounded-lg shadow-lg z-50">
        <!-- User Info -->
        <div class="flex items-center px-4 py-3 border-b border-gray-600">
          <div class="w-10 h-10 rounded-full bg-gray-500 overflow-hidden">
            <img :src="avatarUrl" alt="User Avatar" class="object-cover w-full h-full" />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium">{{ userName }}</p>
          </div>
        </div>

        <!-- Options -->
        <ul class="flex flex-col py-2">
          <li v-for="option in options" :key="option.route" class="text-sm">
            <router-link :to="option.route" class="block px-4 py-2 hover:bg-gray-600 cursor-pointer">
              {{ option.label }}
            </router-link>
          </li>
        </ul>

        <!-- Footer -->
        <div class="flex justify-between items-center px-8 py-3 text-sm">
          <a href="#" class="hover:underline text-gray-300">Help</a>
          <button class="hover:underline text-red-500" @click="handleLogout">
            Log out
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>



<script>
import { logout } from "../api/authService"; // Import API logout


export default {
  name: "DropboxComponent",
  props: {
    options: {
      type: Array,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: "", // Default avatar URL
    },
    userName: {
      type: String,
      default: "User", // Default user name
    },
  },
  data() {
    return {
      isDropdownOpen: false, // Track dropdown visibility
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    handleOptionClick(action) {
      this.isDropdownOpen = false; // Close dropdown after selection
      this.$emit("option-click", action); // Emit the action to the parent
    },
    async handleLogout() {
      try {
        await logout(); // Gọi API logout
        localStorage.removeItem("user"); // Xóa thông tin người dùng khỏi localStorage
        localStorage.removeItem("authToken"); // Xóa thông tin người dùng khỏi localStorage
        this.$router.push("/user/login"); // Chuyển hướng về trang đăng nhập
      } catch (error) {
        console.error("Error during logout:", error);
        alert("Logout failed. Please try again.");
      }
    },
  },
};
</script>
<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>