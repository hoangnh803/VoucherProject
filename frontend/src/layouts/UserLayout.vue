<template>
    <div class="min-h-screen bg-white">
        <!-- Navigation Bar -->
        <HeaderComponent 
        :userAvatar="userAvatar"
        :userName="userName"
        @option-click="navigateToOption"
        />
        <!-- Main content -->
        <main>
        <router-view/>
        </main>
    </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";

export default {
  name: "App",
  components: { HeaderComponent },
  data() {
    return {
      userAvatar: "",
      userName: ""
    };
  },
  created() {
    // Lấy thông tin người dùng từ localStorage (hoặc API)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.userAvatar = user.avatar || "https://i.pravatar.cc/100";
      this.userName = user.username || "User";
    }
  },
  methods: {
    navigateToOption(option) {
      this.$router.push(option.route);
    }
  }
};
</script>