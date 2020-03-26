<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
       <img
        src="/img/avatars/6.jpg"
        class="img-avatar"
        alt="Image Profile" />
        {{user.first_name}} {{user.last_name}} &nbsp;
        <!-- {{this.user.name}} {{this.user.last_name}} -->
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Mi Cuenta</strong></b-dropdown-header>
      <b-dropdown-item @click="signOut"><i class="fa fa-lock" /> Salir</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  computed: {
    ...mapGetters(
      { 'user': 'user/getUser' }
    )
  },
  data: () => {
    return { itemsCount: 42 }
  },
  methods: {
    signOut() {
      store.dispatch('user/logout')
    }
  }
}
</script>
