<template>
  <div>
    <b-modal id="table_config" ref="modalConfig" title="Configuración de Tabla" size="lg" @ok="saveConfig">
      <div class="row">
        <div class="col-lg-6">
          <div class="list-overflow">
            <!--<div>
              <b-input-group>

                <b-form-input placeholder="Buscar propiedades" type="text"/>

                <b-input-group-append>
                  <b-button variant="outline-primary"><i class="fa fa-search"/></b-button>
                </b-input-group-append>

              </b-input-group>
            </div>-->
            <h5 class="mb-3">Columnas Disponibles</h5>
            <b-form-group>
              <!--<strong>Información de Contacto</strong>-->
              <b-form-checkbox-group
                v-model="selected"
                :options="available"
                class="m-2"
                value-field="name"
                text-field="title"
                stacked
              />
            </b-form-group>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="list-overflow">
            <h5 class="mb-3">Columnas Seleccionadas ({{ this.selected.length }})</h5>
            <draggable
              tag="ul"
              class="list-group"
              :list="selected"
              :group="{ name: 'inputs', pull: 'clone', put: false }"
              handle=".handle"

            >
              <li
                class="list-group-item"
                v-for="(element) in selected"
              >
                <i class="fa fa-align-justify handle"></i>

                <span class="text">{{ selectedColumns[element].title }} </span>

                <button type="button" class="close" @click="deleteSelected(element)">×</button>
              </li>
            </draggable>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import custom_table from "../services/resources/custom_table";
  import * as __ from "lodash";

  export default {
    name: "TableConfigComponent",
    components: {draggable},
    props: {
      reference: {
        required: true
      }
    },
    data() {
      return {
        selected: [],
        available: [],
      }
    },
    computed: {
      selectedColumns() {
        let available = Object();
        __.forEach(this.available, (item) => {
          available[item.name] = item;
        });

        return available;
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      showModal() {
        console.log('Table config');
        this.$refs.modalConfig.show();
      },
      loadData() {
        custom_table.getProperties(this.reference).then(({data}) => {
          this.available = data.available;
          this.selected = data.selected;
        });
      },
      saveConfig() {
        custom_table.storeColumns(this.reference, {
          columns: this.selected
        }).then(() => {
          this.$emit('onSave', this.selected)
        });
      },
      deleteSelected(item) {
        console.log(this.selected.indexOf(item));
        this.selected.splice(this.selected.indexOf(item), 1);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-overflow {
    overflow-y: scroll;
    height: 300px;
  }
  .handle {
    float: left;
    padding-top: 8px;
    padding-bottom: 8px;
    cursor: move;
    margin-right: 10px;
  }
</style>
