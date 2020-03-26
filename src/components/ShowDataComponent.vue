<template>
  <table class="table table-borderless">
    <tr v-for="item in schema">
      <td><strong>{{ item.title }}:</strong></td>
      <td v-if="item.type === 'boolean'">{{ document[item.bind] ? 'SI' : 'NO' }}</td>
      <td v-else>{{ document[item.bind] }}</td>
    </tr>
  </table>
</template>

<script>
    export default {
      name: "ShowDataComponent",
      props: {
        document: {
          default() {
            return {}
          },
        },
        schema: {
          default() {
            return [];
          }
        }
      }
    }
</script>

<style scoped>

</style>
