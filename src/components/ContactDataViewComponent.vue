<template>
  <table class="table table-borderless">
    <tr>
      <td><strong>Email:</strong></td>
      <td>{{ document.email }}</td>
    </tr>
    <tr>
      <td><strong>Web:</strong></td>
      <td>{{ document.web }}</td>
    </tr>
    <tr>
      <td><strong>Teléfono 1:</strong></td>
      <td>{{ document.phone_1 }}</td>
    </tr>
    <tr>
      <td><strong>Teléfono 2:</strong></td>
      <td>{{ document.phone_2 }}</td>
    </tr>
    <tr>
      <td><strong>Dirección:</strong></td>
      <td>{{ document.address }}</td>
    </tr>
  </table>
</template>

<script>
    export default {
      name: "ContactDataViewComponent",
      props: {
        document: {
          default() {
            return {
              email: null,
              web: null,
              phone_1: null,
              phone_2: null,
              address: null
            }
          }
        }
      }
    }
</script>

<style scoped>

</style>
