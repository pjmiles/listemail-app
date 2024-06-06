
<template>
    <div class="flex items-center justify-center h-screen">
        <form @submit.prevent="login" class="w-2/5 mx-auto bg-gray-700 p-6 rounded-lg">
            <div class="h-2">
                <p v-if="error" class="text-red-500 mt-2 text-center">{{ error }}</p>
            </div>
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input v-model="email" type="email" id="email" placeholder="admin@email.com" required class="w-full p-2" />
            </div>
            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input v-model="password" type="password" id="password" class="w-full p-2" required />
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 w-full p-2 mt-3">Submit</button>
        </form>
    </div>
</template>

  
<script>

import axiosInstace from '../axios/axiosInstance';
export default {
    data() {
        return {
            email: '',
            password: '',
            error: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('/login', {
                    email: this.email,
                    password: this.password
                });
                console.log('Login successful', response.data);
                localStorage.setItem('token', response.data.token);
                this.$router.push('/table');
            } catch (error) {
                if (error.response) {
                    this.error = error.response.data.message;
                } else {
                    this.error = 'An error occurred. Please try again.';
                }
                console.error('Login error', error);
            }
        }
    }
};
</script>