<template>
    <main class="flex items-center justify-center min-h-screen bg-stone-100 px-28 py-4">
        <div class="overflow-hidden pl-6 bg-cyan-900 rounded-3xl shadow-lg max-md:pl-4">
            <div class="flex gap-4 max-md:flex-col">
                <section class="flex flex-col w-1/3 max-md:w-full">
                    <div
                        class="flex flex-col mt-4 text-3xl leading-8 text-white tracking-wide max-md:mt-6 max-md:max-w-full">
                        <img loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ab3e43e40c7dd847fe5a21db0f8195405101e87f2adb96472ed98b714c6bfd1?placeholderIfAbsent=true&apiKey=e6fddaa1b53f41878d251139a58c0a7a"
                            class="object-contain max-w-full aspect-[1.17] w-24" alt="Company logo" />
                        <h1 class="mt-8 max-md:max-w-full">
                            Unlock Exclusive Savings Register Now and Redeem Your Vouchers!
                        </h1>
                    </div>
                </section>
                <section class="flex flex-col ml-4 w-2/3 max-md:ml-0 max-md:w-full ">
                    <div
                        class="flex flex-col items-center px-16 py-24 mx-auto w-full text-sm font-medium tracking-wide leading-8 bg-white rounded-3xl text-stone-900 max-md:px-4 max-md:pb-20 max-md:mt-4 max-md:max-w-full">
                        <h2
                            class="self-start mt-8 text-xl font-bold tracking-wider leading-none text-black max-md:mt-8">
                            Welcome Back!
                        </h2>
                        <form class="w-full max-w-md" @submit.prevent="login">
                            <!-- Email -->
                            <div class="mt-4">
                                <label for="email" class="block mb-1">Email</label>
                                <input v-model="email" type="email" id="email"
                                    class="w-full border-b border-zinc-500 pb-1" required />
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

                            <!-- Error message -->
                            <div v-if="errorMessage" class="mt-4 text-red-500 text-sm">
                                {{ errorMessage }}
                            </div>

                            <!-- Submit Button -->
                            <button type="submit"
                                class="w-full px-12 py-2 mt-4 text-sm font-bold tracking-wider text-white bg-cyan-900 rounded max-md:px-4 max-md:mt-8">
                                Log In
                            </button>
                        </form>

                    </div>
                </section>
            </div>
        </div>
    </main>
</template>


<script>
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'lucide-vue-next';
import { loginAdmin } from '../api/authService';

export default {
    name: "LoginView",
    components: {
        EyeIcon,
        EyeOffIcon
    },
    data() {
        return {
            email: '',
            password: '', // To store the password
            passwordFieldType: 'password', // To control the visibility of the password field
            errorMessage: '', // To store the error message
        };
    },
    methods: {
        togglePasswordVisibility() {
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
        },
        async login() {
        this.errorMessage = ''; // Reset error message

        try {
            const credentials = {
                email: this.email,
                password: this.password,
            };

            // Gửi request đến API
            const response = await loginAdmin(credentials);
            console.log('Login response:', response);
            const token = response.data.token; // Lấy token từ response
            const admin = response.data.admin; // Lấy thông tin admin

            // Lưu thông tin vào localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('admin', JSON.stringify(admin));

            console.log('Login successful:', response.data);

            // Chuyển hướng đến trang admin dashboard
            this.$router.push('/admin/profile');

        } catch (error) {
            // Xử lý lỗi từ API
            if (error.response && error.response.data) {
                this.errorMessage = error.response.data.message || 'Error logging in. Please try again.';
            } else {
                this.errorMessage = 'An unexpected error occurred. Please try again later.';
            }
            console.error('Error logging in:', error);
        }
    }
    }
};
</script>
