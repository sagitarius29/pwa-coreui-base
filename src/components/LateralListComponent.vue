<template>
  <div class="card">
    <div class="card-header">
      {{ title }}
      <div class="card-header-actions">
        <div class="card-header-action btn-setting" >
          <i class="icon-plus sg-pointer" v-if="permissions.create" @click="$emit('onMore')"/>
        </div>
      </div>
    </div>
    <div class="card-body p-0">
      <div class="input-group p-3">
        <input v-model="search" type="text" class="form-control border-primary " placeholder="Filtrar por nombre o código" aria-label="Filtrar por nombre o código">
        <div class="input-group-append">
          <button class="btn btn-outline-primary" type="button" ><i class="fa fa-search"/></button>
        </div>
      </div>
      <div class="list-group list-group-flush overflow-list">
        <div v-if="useLink">
          <router-link :to="{path: endpoint + '/' + document.id}" class="list-group-item list-group-item-action" v-for="document in documents" :key="document.id">
            <slot v-bind:document="document">
              <strong>{{ document.code }} - {{ document.name }}</strong>
            </slot>
          </router-link>
        </div>
        <div v-else>
          <a class="list-group-item list-group-item-action sg-pointer" @click="$emit('onDocumentClick', document)" v-for="document in documents" :key="document.id">
            <slot v-bind:document="document">
              <strong>{{ document.code }} - {{ document.name }}</strong>
            </slot>
          </a>
        </div>
        <div class="list-group-item" v-if="documents.length === 0">
          No se han encontrado resultados
        </div>
        <infinite-loading @infinite="infiniteHandler"/>
      </div>
    </div>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';
  export default {
    name: "LateralListComponent",
    components: {InfiniteLoading},
    props: {
      useLink: {
        default: true
      },
      endpoint: {
        required: true,
        default: ''
      },
      title: {
        required: true,
        default: ''
      },
      permissions: {
        default() {
          return {
            create: true
          }
        }
      }
    },
    watch: {
      search() {
        this.searchDebounce(this);
      }
    },
    data() {
      return {
        page: 1,
        search: '',
        documents: []
      }
    },
    methods: {
      infiniteHandler($state) {
        this.loadDocuments(this.page, $state);
      },
      searchDebounce: _.debounce((vm) => {
        vm.loadDocuments();
      }, 350),
      loadDocuments(page = 1, $state) {
        if(page === 1) {
          this.page = 1;
          this.documents = [];
        }

        this.$parent.getListPaginate(this.page, this.search).then(({data}) => {
          if($state !== undefined) {
            if (data.data.length) {
              this.documents.push(...data.data);
              $state.loaded();
            } else {
              $state.complete();
            }
          } else {
            this.documents = data.data;
          }
          this.page += 1;
        });
      },
    }
  }
</script>

<style scoped>
  .overflow-list {
    max-height: 400px;
    overflow-y: auto;
  }
</style>
