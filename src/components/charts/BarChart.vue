<script>
import { Bar } from 'vue-chartjs'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

export default {
  extends: Bar,
  props: [ 'labels', 'datasets' ],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderBarChart()
  },
  computed: {
    chartData: function() {
      return this.datasets;
    }
  },
  methods: {
    renderBarChart(){
      this.renderChart(
        {
          labels: this.labels,//['Julio','Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero'],
          datasets: [this.datasets]
          // [
          //   {
          //     label: 'Tiempo demora promedio',
          //     backgroundColor: '#f87979',
          //     data: [2.2, 2, 3, 2, 2.8, 3.5, 1.5, 1.2]
          //   }
          // ]
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
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false,
        }
      )
    }
  },
  watch: {
    datasets: function() {
      // this._chart.destroy();
      //this.renderChart(this.data, this.options);
      this.renderBarChart();
    }
  }
}
</script>
