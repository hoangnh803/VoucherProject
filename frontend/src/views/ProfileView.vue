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
            <router-link to="/profile" class="block py-2 px-4 text-green-600 bg-green-100 rounded-lg font-medium">
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
              class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
              Password & Security
            </router-link>
          </li>
        </ul>
      </aside>

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
                class="w-full border border-gray-300 p-2 rounded-lg" disabled/>
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Phone Number</label>
              <input v-model="phoneNumber" type="tel" placeholder="Enter phone number"
                class="w-full border border-gray-300 p-2 rounded-lg" />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Country</label>
              <select v-model="selectedCountry" @change="loadCities"
                class="w-full border border-gray-300 p-2 rounded-lg">
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
  </div>
</template>

<script>
import { fetchCountries, fetchCities, updateUserProfile, fetchUserProfile } from '../api/locationService';

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
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.userAvatar = user.avatar || "placehold.co/150"; // Default avatar if not provided
      this.userName = user.username || ""; // Default name if not provided
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
          username: this.userName,
          email: this.email,
          avatar: this.avatar,
          phone: this.phoneNumber,
          city_id: this.city,
          country_id: this.country,
          dateOfBirth: this.dob,
          gender: this.gender,
          nationalCode: this.nationalCode
        };
        // Gọi API để cập nhật thông tin người dùng
        await updateUserProfile(updatedUser);

        // Gọi hàm fetchUserProfile để lấy thông tin mới nhất từ backend
        const response = await fetchUserProfile();

        // Lưu thông tin người dùng đã cập nhật vào local storage
        const userData = response.data.user; // Điều chỉnh tùy thuộc vào cấu trúc dữ liệu trả về từ API
        localStorage.setItem("user", JSON.stringify(userData)); alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
  },
};
</script>
