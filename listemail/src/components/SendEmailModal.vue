<template>
  <div class="w-3/5 m-auto max-w-md my-5">
    <form @submit.prevent="sendEmail" class="flex flex-col w-full p-5 bg-white shadow dark:bg-gray-700">
      <div v-if="error || success" class="mb-4">
        <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
        <p v-else class="text-green-500 text-center">{{ success }}</p>
      </div>
      <div class="flex justify-between">
        <div></div>
        <h2 class="text-white text-sm">Send Bulk Email</h2>
        <button type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-500 hover:text-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          @click="$emit('close')">X</button>
      </div>
      <div>
        <label for="email" class="block text-sm mb-1 font-medium text-gray-900 dark:text-white">Emails</label>
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
    const success = ref('')

    watch(() => props.prefilledEmail, (newEmail) => {
      emailInput.value = newEmail;
    });

    watch(emailInput, (newVal) => {
      const emails = newVal.split(',').map(email => email.trim());
      if (emails.length > 20) {
        error.value = 'You can only enter a maximum of 20 emails.';
        success.value = '';
      } else {
        error.value = '';
      }
    });

    const sendEmail = async () => {
      const emails = emailInput.value.split(',').map(email => email.trim());
      if (emails.length > 20) {
        error.value = 'You can only enter a maximum of 20 emails.'
      }
      try {
        const response = await axiosInstance.post('/emails/bulk', { emails, message: message.value });
        if (response.status === 200) {
          success.value = response.data.message
          message.value = ''
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
      success,
      sendEmail,
    };
  }
}
</script>
