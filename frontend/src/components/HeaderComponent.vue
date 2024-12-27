<template>
  <nav class="border-b border-white/10 fixed w-full top-0 z-50 transition-colors duration-300 bg-[#1F485B]">
    <div class="max-w-8xl mx-auto px-4">
      <div class="flex h-12 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-8">
          <router-link to="/" class="flex-shrink-0 flex items-center">
            <img loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ab3e43e40c7dd847fe5a21db0f8195405101e87f2adb96472ed98b714c6bfd1?placeholderIfAbsent=true&apiKey=e6fddaa1b53f41878d251139a58c0a7a"
              class="object-contain max-w-full aspect-[1.17] w-20" alt="Company logo" />
          </router-link>
        </div>
        <!-- User Section -->
        <div v-if="isLoggedIn">
          <DropboxComponent 
            :options="dropdownOptions" 
            :avatarUrl="userAvatar" 
            :userName="userName" 
            @option-click="handleDropdownOption" 
          />
        </div>
        <div v-else>
          <router-link to="/user/login" class="text-white hover:text-gray-300 transition-colors">
            Đăng nhập
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import DropboxComponent from "./DropdownComponent.vue";

export default {
  name: "NavigationBar",
  components: { DropboxComponent },
  props: {
    userAvatar: {
      type: String,
      required: false, // Không bắt buộc vì có thể chưa đăng nhập
    },
    userName: {
      type: String,
      required: false, // Không bắt buộc vì có thể chưa đăng nhập
    }
  },
  data() {
    return {
      dropdownOptions: [
        { label: "Edit Profile", route: "/profile" },
        { label: "Notifications", route: "/notifications" },
        { label: "My Voucher", route: "/voucher" },
        { label: "Change Password", route: "/password-security" }
      ],
      isLoggedIn: false, // Mặc định chưa đăng nhập
    };
  },
  mounted() {
    // Kiểm tra trạng thái đăng nhập qua localStorage
    const token = localStorage.getItem("authToken");
    this.isLoggedIn = !!token; // Nếu có token => đăng nhập
  },
  methods: {
    handleDropdownOption(option) {
      this.$emit("option-click", option);
    }
  }
};
</script>
