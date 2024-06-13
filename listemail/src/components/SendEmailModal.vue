<template>
  <div class="relative w-full max-w-md max-h-full">
    <form @submit.prevent="sendEmail" class="flex flex-col w-full p-5 bg-white shadow dark:bg-gray-700">
      <div class="h-10">
        <p v-if="error" class="text-red-500 mt-2 text-center">{{ error }}</p>
      </div>
      <div class="flex justify-between">
        <h2 class="text-center text-white">Send Bulk Email</h2>
        <button type="button" class="text-white" @click="$emit('close')">x</button>
      </div>
      <div>
        <label for="email" class="block text-sm mb-1 font-medium text-gray-900 dark:text-white">Email-List</label>
        <input v-model="emailInput" type="text" class="bg-gray-50 border border-gray-200 text-gray-900 text-sm p-2 w-full"
          placeholder="emails (comma separated)" />
      </div>
      <div>
        <label for="message" class="block text-sm mb-1 font-medium text-gray-900 dark:text-white">Message</label>
        <textarea v-model="message" class="bg-gray-50 border border-gray-200 text-gray-900 text-sm p-2 w-full"
          placeholder="message" required></textarea>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 p-2 mt-3">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import axiosInstance from '@/axios/axiosInstance';

export default {
  props: {
    prefilledEmail: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const emailInput = ref(props.prefilledEmail);
    const message = ref('');
    const error = ref('');

    watch(() => props.prefilledEmail, (newEmail) => {
      emailInput.value = newEmail;
    });

    const sendEmail = async () => {
      const emails = emailInput.value.split(',').map(email => email.trim());
      try {
        const response = await axiosInstance.post('/emails/bulk', { emails, message: message.value });
        if (response.status === 200) {
          emit('close');
          console.log('Message sent successfully');
        }
      } catch (err) {
        error.value = 'Failed to send email. Please try again.';
        console.error(err);
      }
    };

    return {
      emailInput,
      message,
      error,
      sendEmail,
    };
  }
}
</script>
