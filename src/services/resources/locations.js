export default {
  root: 'locations',
  getListPaginate(page = 1, search) {
    return api.get(this.root + '?page=' + page + '&search=' + search);
  },
  show(id) {
    return api.get(this.root + '/' + id);
  },
  update(id, data) {
    return api.patch(this.root + '/' + id, data).then(() => {
      Toast.fire('Felicitaciones', 'Se ha actualizado correctamente.', 'success');
    });
  },
  store(data) {
    return api.post(this.root, data).then(() => {
      Toast.fire('Felicitaciones', 'Se ha creado una ubicación correctamente.', 'success');
    });
  },
  destroy(id) {
    return api.delete(this.root + '/' + id).then(() => {
      Toast.fire('Felicitaciones', 'Se ha eliminado la ubicación correctamente.', 'success');
    });
  },
  locationTime(data){
    return api.post(this.root + '/location-time', data)
  },
  routeTime(data){
    return api.post(this.root + '/route-time', data)
  },
}
