<template>
  <main class="flex items-center justify-center min-h-screen bg-stone-100 px-28 ">
    <div class="overflow-hidden pl-6 bg-cyan-900 rounded-3xl shadow-lg max-md:pl-4">
      <div class="flex gap-4 max-md:flex-col">
        <section class="flex flex-col w-1/3 max-md:w-full">
          <div class="flex flex-col mt-4 text-3xl leading-8 text-white tracking-wide max-md:mt-6 max-md:max-w-full">
            <img loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ab3e43e40c7dd847fe5a21db0f8195405101e87f2adb96472ed98b714c6bfd1?placeholderIfAbsent=true&apiKey=e6fddaa1b53f41878d251139a58c0a7a"
              class="object-contain max-w-full aspect-[1.17] w-24" alt="Company logo" />
            <h1 class="mt-8 max-md:max-w-full">
              Unlock Exclusive Savings Register Now and Redeem Your Vouchers!
            </h1>
          </div>
        </section>
        <section class="flex flex-col ml-4 w-2/3 max-md:ml-0 max-md:w-full">
          <div
            class="flex flex-col items-center px-16 py-6 mx-auto w-full text-sm font-medium tracking-wide leading-8 bg-white rounded-3xl text-stone-900 max-md:px-4 max-md:pb-20 max-md:mt-4 max-md:max-w-full">
            <h2 class="self-start mt-8 text-xl font-bold tracking-wider leading-none text-black max-md:mt-8">
              Create Account
            </h2>
            <div
              class="flex flex-wrap gap-8 mt-8 ml-6 max-w-full text-sm font-light tracking-wide text-black w-96 max-md:mt-6">
              <button class="flex flex-1 gap-3 p-2 rounded border border-solid border-zinc-100">
                <img loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f52bf560330ed257154c3f2829b5b5eab6e7d96b25688ad344d48cee5a0bacd5?placeholderIfAbsent=true&apiKey=e6fddaa1b53f41878d251139a58c0a7a"
                  class="object-contain shrink-0 my-auto aspect-[0.85] w-5" alt="" />
                <span class="my-auto">Signup with Google</span>
              </button>
              <button class="flex flex-1 gap-2 px-2 py-2 rounded border border-solid border-zinc-100">
                <img loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fa7e5972913b8c9e0ad3cb9e4b5244feb5dc3b8edc71815f136c241a1cd73d6?placeholderIfAbsent=true&apiKey=e6fddaa1b53f41878d251139a58c0a7a"
                  class="object-contain shrink-0 my-auto w-5 aspect-square" alt="" />
                <span>Signup with Facebook</span>
              </button>
            </div>
            <div class="mt-4 ml-5 text-base font-light tracking-wider text-stone-900 max-md:mt-8">
              - OR -
            </div>
            <div class="w-full max-w-md">
              <!-- Full Name -->
              <div class="mt-4 max-md:mt-8">
                <label for="fullName" class="block mb-1">Full Name</label>
                <input v-model="fullName" type="text" id="fullName" class="w-full border-b border-zinc-500 pb-1"
                  required />
              </div>
              <!-- Email -->
              <div class="mt-4">
                <label for="email" class="block mb-1">Email</label>
                <input v-model="email" type="email" id="email" class="w-full border-b border-zinc-500 pb-1" required />
              </div>
              <!-- Password -->
              <div class="mt-4 relative">
                <label for="password" class="block">Password</label>
                <input v-model="password" :type="passwordFieldType" id="password"
                  class="w-full border-b border-zinc-500 pb-1 pr-10" required />
                <button type="button" @click="togglePasswordVisibility"
                  class="absolute right-3 top-3/4 -translate-y-1/2">
                  <EyeOffIcon v-if="passwordFieldType === 'password'" class="w-5 h-5 text-gray-500" />
                  <EyeIcon v-else class="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div v-if="errorMessage" class="mt-2 text-red-500 text-sm">
                {{ errorMessage }}
              </div>
              <!-- Register Button -->
              <div class="mt-6">
                <button @click.prevent="registerUser" class="w-full bg-blue-500 text-white py-2 rounded">Register</button>
              </div>
            </div>
            <p class="self-start mt-4 text-sm tracking-wider">
              Already have an account? <router-link to="/user/login" href="#" class="text-cyan-900">Log In</router-link>
            </p>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'lucide-vue-next'
import { registerUser } from '../api/authService';


export default {
  name: "UnlockSavingsComponent",
  components: {
    EyeIcon,
    EyeOffIcon
  },
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      passwordFieldType: 'password',
      errorMessage: '', // Biến để lưu thông báo lỗi
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
    async registerUser() {
      this.errorMessage = '';
      this.loading = true;

      // Step 1: Validate the form data
      if (!this.fullName || !this.email || !this.password) {
        this.errorMessage = 'Please fill in all fields.';
        this.loading = false;
        return;
      }

      // Step 2: Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.errorMessage = 'Please enter a valid email address.';
        this.loading = false;
        return;
      }

      // Step 3: Prepare user data
      const userData = {
        username: this.fullName,
        email: this.email,
        password: this.password,
      };

      // Step 4: Call the API and handle errors
      try {
        console.log('Sending data:', userData);
        await registerUser(userData);
        this.$router.push('/user/login'); // Navigate to login on success
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || 'Error registering user. Please try again.';
      } finally {
        this.loading = false;
      }
    },


  }
};
</script>
