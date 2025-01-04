<template>
  <div class="min-h-screen bg-white">


    <!-- Form Section -->
    <main class="flex-1 bg-white shadow-lg px-8 py-4">
      <h1 class="text-xl mb-2 font-semibold text-green-800">
        Edit Profile
      </h1>
      <form class="grid grid-cols-2 gap-6" @submit.prevent="updateProfile">
        <!-- Personal Info -->
        <div>
          <h3 class="text-gray-600 font-semibold mb-2">Personal</h3>
          <div class="mb-2">
            <label class="block text-gray-500 mb-2">Full Name</label>
            <input v-model="userName" type="text" id="fullName" class="w-full border border-gray-300 p-2 rounded-lg"
              required />
          </div>
          <div class="mb-2">
            <label class="block text-gray-500 mb-2">Date of Birth</label>
            <input v-model="dob" type="date" class="w-full border border-gray-300 p-2 rounded-lg" />
          </div>
          <div class="mb-2">
            <label class="block text-gray-500 mb-2">Gender</label>
            <select v-model="gender" class="w-full border border-gray-300 p-2 rounded-lg">
              <option :value="null" disabled>Select a Gender</option>
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
            <input v-model="email" type="email" placeholder="Enter email"
              class="w-full border border-gray-300 p-2 rounded-lg" disabled />
          </div>
          <div class="mb-2">
            <label class="block text-gray-500 mb-2">Phone Number</label>
            <input v-model="phoneNumber" type="tel" placeholder="Enter phone number"
              class="w-full border border-gray-300 p-2 rounded-lg" />
          </div>
          <div class="mb-2">
            <label class="block text-gray-500 mb-2">Country</label>
            <select v-model="selectedCountry" @change="loadCities" class="w-full border border-gray-300 p-2 rounded-lg">
              <option :value="null" disabled>Select a Country</option>
              <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}</option>
            </select>
          </div>
          <div class="mb-2">
            <label class="block text-gray-500 mb-2">City</label>
            <select v-model="selectedCity" class="w-full border border-gray-300 p-2 rounded-lg">
              <option :value="null" disabled>Select a City</option>
              <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
            </select>
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
import { fetchCountries, fetchCities } from '../api/locationService';
import { updateAdminProfile, fetchAdminProfile } from '../api/adminService';

export default {
  name: "NavigationBar",
  components: {
  },
  data() {
    return {
      dropdownOptions: [
        { label: "Edit profile", route: "/profile" },
        { label: "My Voucher", route: "/voucher" },
        { label: "Option 3", route: "/option-3" },
      ],
      countries: [],
      cities: [],
      selectedCountry: null,
      selectedCity: null,
      userAvatar: "", // Placeholder for user avatar
      userName: "", // User's name
      userEmail: "", // User's email
      fullName: "", // Editable full name
      email: "", // Editable email
      avatar: "", // Editable avatar URL
      phoneNumber: "", // Editable phone number
      city: "", // Editable city
      country: "", // Editable country
      dob: "", // Editable date of birth
      gender: "", // Editable gender
      nationalCode: "", // Editable national code
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem('admin'));
    if (user) {
      this.userAvatar = user.avatar || "placehold.co/150"; // Default avatar if not provided
      this.userName = user.adminname || ""; // Default name if not provided
      this.userEmail = user.email || ""; // Default email if not provided
      this.fullName = user.name || "";
      this.email = user.email || "";
      this.avatar = user.avatar || "";
      this.phoneNumber = user.phone || "";
      this.city = user.city || "";
      this.country = user.country || "";
      this.dob = user.dateOfBirth || "";
      this.gender = user.gender || "";
      this.nationalCode = user.nationalCode || "";
    }
    this.loadCountries(); // Tải danh sách quốc gia khi trang được tải
  },

  methods: {

    async loadCountries() {
      try {
        const response = await fetchCountries();
        this.countries = response.data.countries;
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    },
    async loadCities() {
      if (!this.selectedCountry) return;
      try {
        const response = await fetchCities(this.selectedCountry);
        this.cities = response.data.cities;
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    },
    handleDropdownOption(option) {
      this.$router.push(option.route);
    },
    async updateProfile() {
      try {
        const updatedUser = {
          adminname: this.userName,
          email: this.email,
          avatar: this.avatar,
          phone: this.phoneNumber,
          city_id: this.city,
          country_id: this.country,
          dateOfBirth: this.dob,
          gender: this.gender,
          nationalCode: this.nationalCode
        };
        console.log('Updated user:', updatedUser);
        // Gọi API để cập nhật thông tin người dùng
        await updateAdminProfile(updatedUser);

        // Gọi hàm fetchUserProfile để lấy thông tin mới nhất từ backend
        const response = await fetchAdminProfile();

        // Lưu thông tin người dùng đã cập nhật vào local storage
        const userData = response.admin; // Điều chỉnh tùy thuộc vào cấu trúc dữ liệu trả về từ API
        localStorage.setItem("admin", JSON.stringify(userData)); alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
    
  },
};
</script>
