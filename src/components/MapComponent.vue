<template>
  <div>
    <gmap-map
      :center="map_conf.center"
      :map-type-id="map_conf.mapTypeId"
      :zoom="map_conf.zoom"
      class="w-100"
      :style="`height: ${height ? height : '100'}vh`"
    >
      
      <gmap-marker
        :position="{lat: routes[0] ? routes[0].lat : 0, lng: routes[0] ? routes[0].lng : 0}"
        :clickable="true"
        :draggable="false">

        <!-- <gmap-info-window
          :position="{lat: vehicle.routes[0].lat, lng: vehicle.routes[0].lng}"
          :opened="true"
          content="DRF678"
          @closeclick="infoOpened=false">
        </gmap-info-window> -->

      </gmap-marker>
      <!-- :icon="`img/vehicle_marker.svg`" -->
      <gmap-polygon
        v-for="(location) in polygon_locations"
        :key="location.id"
        :path="location.points"
        :editable="false"
        :draggable="false"
        :options="{
          strokeOpacity: 0.8,
          strokeWeight: 1,
        }"
      />

      <gmap-circle
        v-for="(location) in radius_locations"
        :key="location.id"
        :radius="location.radius"
        :center="{lat: location.geo_lat, lng: location.geo_lng}"
        :options="{
          strokeOpacity: 0.8,
          strokeWeight: 1,
        }"
      />

      <!-- <div v-for="vehicle in vehicles" :key="vehicle.imei"> -->
      <gmap-polyline 
        v-bind:path.sync="routes" 
        v-bind:options="{ strokeColor:'#3fd822' }"
        v-on:click="InfoWindowShown = true"
        v-if="map_conf.show_routes">
      </gmap-polyline>
      <!-- </div> -->
    </gmap-map>

  </div>
</template>

<script>

export default {
  name: 'map-component',
  props: ['vehicle', 'routes', 'map_conf', 'show_routes', 'polygon_locations', 'radius_locations', 'height'],
  data(){
    return{
      InfoWindowShown: false
    }
  },
  // vehicle: {
  //   vehicle: function() {
  //     return this.vehicleData;
  //   }
  // },
  // watch: {
  //   vehicle: function() {
  //   }
  // },
}
</script>