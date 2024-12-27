<template>
  <div class="min-h-screen bg-white">

    

      <!-- Form Section -->
      <main class="flex-1 bg-white shadow-lg px-8 py-4">
        <h1 class="text-xl mb-2 font-semibold text-green-800">
          Edit Profile
        </h1>
        <form @submit.prevent="saveProfile" class="grid grid-cols-2 gap-6">
          <div>
            <h3 class="text-gray-600 font-semibold mb-2">Personal</h3>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">First Name</label>
              <input v-model="admin.adminname" type="text" class="w-full border border-gray-300 p-2 rounded-lg" />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">National Code</label>
              <input v-model="admin.nationalCode" type="text" class="w-full border border-gray-300 p-2 rounded-lg" />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Date of Birth</label>
              <input v-model="admin.dateOfBirth" type="date" class="w-full border border-gray-300 p-2 rounded-lg" />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Gender</label>
              <select v-model="admin.gender" class="w-full border border-gray-300 p-2 rounded-lg">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <h3 class="text-gray-600 font-semibold mb-2">Contact</h3>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Email</label>
              <input  v-model="admin.email" type="email" class="w-full border border-gray-300 p-2 rounded-lg" />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Phone Number</label>
              <input v-model="admin.phone" type="tel" class="w-full border border-gray-300 p-2 rounded-lg" />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Country</label>
              <select v-model="admin.country_id" class="w-full border border-gray-300 p-2 rounded-lg">
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
              </select>
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">City</label>
              <input v-model="admin.city_id" type="text" class="w-full border border-gray-300 p-2 rounded-lg" />
            </div>
          </div>
          <div class="">
          <button type="submit" class="px-6 py-2 bg-green-500 text-white rounded-lg font-medium">
            Save
          </button>
        </div>
        </form>
        <!-- Save Button -->

      </main>
    </div>
</template>



<script>
import {  updateAdminProfile, fetchAdminProfile } from '../api/adminService'; // Import các hàm cần thiết
import { fetchCountries, fetchCities } from '../api/locationService'; // Import các hàm cần thiết
export default {
  name: "EditProfile",
  data() {
    return {
      admin: {
        adminname: "",
        nationalCode: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phone: "",
        country_id: null,
        city_id: null,
      },
      countries: [],
      cities: [],
      userAvatar: "https://i.pravatar.cc/100", // Avatar mặc định
      userName: "", // Tên người dùng
      message: "", // Thông báo trạng thái
    };
  },
  async created() {
    // Tải thông tin admin từ localStorage
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      try {
        this.admin = JSON.parse(adminData);
        this.userAvatar = this.admin.avatar || this.userAvatar;
        this.userName = this.admin.adminname || "";
      } catch (error) {
        console.error("Error loading admin data:", error);
      }
    }
    
    // Tải danh sách quốc gia khi khởi tạo
    await this.loadCountries();
  },
  methods: {
    // Tải danh sách quốc gia từ API
    async loadCountries() {
      try {
        const response = await fetchCountries();
        this.countries = response.data.countries;
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    },
    // Tải danh sách thành phố dựa vào quốc gia đã chọn
    async loadCities() {
      if (!this.admin.country_id) return;
      try {
        const response = await fetchCities(this.admin.country_id);
        this.cities = response.data.cities;
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },
    // Lưu thông tin hồ sơ admin
    async saveProfile() {
      try {
        const updatedAdmin = {
          adminname: this.admin.adminname,
          email: this.admin.email,
          nationalCode: this.admin.nationalCode,
          dateOfBirth: this.admin.dateOfBirth,
          gender: this.admin.gender,
          phone: this.admin.phone,
          country_id: this.admin.country_id,
          city_id: this.admin.city_id,
        };
        
        // Gọi API để cập nhật thông tin admin
        await updateAdminProfile(updatedAdmin);

        // Lấy lại thông tin admin từ server để cập nhật
        const response = await fetchAdminProfile();
        
        const updatedData = response.data.admin;
        // Lưu thông tin vào localStorage
        localStorage.setItem("admin", JSON.stringify(updatedData));

        // Cập nhật giao diện
        this.admin = updatedData;
        this.userName = updatedData.adminname;
        this.userAvatar = updatedData.avatar || this.userAvatar;
        
        this.message = "Profile updated successfully!";
      } catch (error) {
        this.message = "Error updating profile. Please try again.";
        console.error("Error updating profile:", error);
      }
    },
  },
};
</script>

