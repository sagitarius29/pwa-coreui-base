<template>
  <div class="modal fade" :id="'modal'+_uid" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Seleccione archivo</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Archivo Excel</label>
            <input type="file" class="form-control" :id="'excel_upload'+_uid" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button @click="upload()" type="button" class="btn btn-primary">Importar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FormImportComponent",
    props: {
      endpoint: {
        required: true
      }
    },
    methods: {
      upload() {
        let data = new FormData();
        let fileInput = document.getElementById('excel_upload'+this._uid);
        if(fileInput.files.length === 0) {
          Toast.fire('Error', 'Por favor seleccione un archivo.', 'error');
        }
        console.log(fileInput.files);
        data.append('file', fileInput.files[0]);
        api.post(this.endpoint+'/excel-import', data).then((r) => {
          console.log(r.data);
          Toast.fire('Felicitaciones', 'Se realizó la importación exitosamente.', 'success');
        });
      },
      showModal() {
        $('#modal'+this._uid).modal('show');
      }
    }
  }
</script>

<style scoped>

</style>
