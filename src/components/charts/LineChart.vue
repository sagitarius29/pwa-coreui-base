<script>
import { Line } from 'vue-chartjs'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import { hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

export default {
  components: {
    hexToRgba,
    CustomTooltips
  },
  extends: Line,
  props: ['routes'],
  mounted() {
    this.renderLineChart();
  },
  computed: {
    routesData: function() {
      return this.routes;
    }
  },
  watch: {
    routesData: function() {
      console.log('watch')
      // this._chart.destroy();
      //this.renderChart(this.data, this.options);
      this.renderLineChart();
    }
  },
  methods: {
    renderLineChart(){
      let routes = [...this.routesData]
      let data = []
      let labels = []
      routes.reverse().map(route => {
        data.push(route.velocity ? route.velocity : 0)
        labels.push(moment.unix(route.timestamp).format('DD, MMM HH:mm'))
      })
      this.renderChart(
        {
          labels,
          datasets: [
            {
              label: 'Velocidad [Km/hr]',
              backgroundColor: hexToRgba('#E46651', 90),
              data
            }
          ]
        },
        {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }]
          },
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            enabled: false,
            custom: CustomTooltips,
            intersect: true,
            mode: 'index',
            position: 'nearest',
            callbacks: {
              labelColor: function (tooltipItem, chart) {
                return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].backgroundColor }
              }
            }
          }
        }
      )
    }
  }
}
</script>
