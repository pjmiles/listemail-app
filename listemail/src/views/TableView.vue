<script setup>

</script>

<template>
    <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3 ">
                        sn
                    </th>
                    <th scope="col" class="px-6 py-3 ">
                        email
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        1
                    </th>
                    <td class="px-6 py-4">
                        testemail@gridiron.com
                    </td>
                    <td class="px-6 py-4">
                        <button class="px-3.5 py-1 text-white bg-gray-600 rounded-md dark:hover:bg-blue-500">add</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

