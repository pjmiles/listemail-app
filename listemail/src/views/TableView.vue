<template>
  <div class="relative overflow-x-auto">
    <div class="mb-4">
      <input v-model="searchQuery" type="text" placeholder="Search emails"
        class="px-4 py-2 w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            sn
          </th>
          <th scope="col" class="px-6 py-3">
            email
          </th>
          <th scope="col" class="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(emailObj, index) in filteredEmails" :key="index" class="bg-white dark:bg-gray-800">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ index + 1 }}
          </th>
          <td class="px-6 py-4">
            {{ emailObj.EMAILADDRESS }}
          </td>
          <td class="px-6 py-4">
            <button @click="() => showModal(emailObj.EMAILADDRESS)"
              class="px-3.5 py-1 text-white bg-gray-600 rounded-md dark:hover:bg-blue-500">
              add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <SendEmailModal v-if="popUp" :prefilledEmail="selectedEmail" @close="hideModal" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import SendEmailModal from '@/components/SendEmailModal.vue';
import axiosInstance from '@/axios/axiosInstance';

export default {
  components: { SendEmailModal },
  setup() {
    const emails = ref([]);
    const popUp = ref(false);
    const searchQuery = ref('');
    const selectedEmail = ref('');

    const showModal = (email) => {
      selectedEmail.value = email;
      popUp.value = true;
    };
    const hideModal = () => {
      popUp.value = false;
    };

    const getEmails = async () => {
      try {
        const response = await axiosInstance.get("/");
        if (response.status === 200) {
          emails.value = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      getEmails();
    });

    const filteredEmails = computed(() => {
      return emails.value.filter(emailObj =>
        emailObj.EMAILADDRESS.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    return {
      emails,
      popUp,
      showModal,
      hideModal,
      searchQuery,
      filteredEmails,
      selectedEmail,
    };
  },
}
</script>
