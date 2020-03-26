<template>
  <div>
    <b-modal ref="modal" :title="title" :hide-footer="hideFooter" :size="size">
      <slot name="content" v-bind:document="document">
      </slot>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "DataModalComponent",
    props: {
      title: {
        default: ''
      },
      hideFooter: {
        default: false
      },
      size: {
        default: 'md'
      }
    },
    data() {
      return {
        document: {}
      }
    },
    methods: {
      showModal(data) {
        this.document = {};
        this.document = data;
        this.$refs['modal'].show();
      },
      hideModal() {
        this.$refs['modal'].hide();
      },
    }
  }
</script>

<style scoped>

</style>
