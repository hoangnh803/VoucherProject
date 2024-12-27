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

                            <p class="self-start mt-4 text-sm tracking-wider">
                                <router-link to="/forgotpassword" class="text-cyan-900">Forgot password?</router-link>
                            </p>

                            <!-- Submit Button -->
                            <button type="submit"
                                class="w-full px-12 py-2 mt-4 text-sm font-bold tracking-wider text-white bg-cyan-900 rounded max-md:px-4 max-md:mt-8">
                                Log In
                            </button>
                            <p class="self-start mt-4 text-sm tracking-wider">
                                Don't have an account? <router-link to="/user/register" href="#"
                                    class="text-cyan-900">Sign
                                    up</router-link>
                            </p>
                        </form>

                    </div>
                </section>
            </div>
        </div>
    </main>
</template>


<script>
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'lucide-vue-next';
import { loginUser } from '../api/authService';

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
            this.errorMessage = ''; // Reset error message before submitting

            try {
                const credentials = {
                    email: this.email,
                    password: this.password,
                };
                const response = await loginUser(credentials);
                const token = response.data.token;
                const user = response.data.user; // Assuming the user info is returned in the response
                localStorage.setItem('authToken', token);
                localStorage.setItem('user', JSON.stringify(user));
                console.log('Login successful:', response.data);

                // Handle successful login, e.g., store token, redirect, etc.
                this.$router.push('/');

            } catch (error) {
                // Handle login errors and display message
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
