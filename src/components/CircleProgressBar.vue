<template>
  <div>
    <div class="truck-wrapper">
      <span v-if="transport.trip.intervals[0].status.status !== 'pending'" :style="'font-size: 13px; left: '+getPercentOfTruck+'%;'" class="truck"> <i class="fa fa-truck fa-flip-horizontal"/>{{ transport.actualLocation.velocity !== null ? transport.actualLocation.velocity + ' Km/h' : '' }}</span>
    </div>
    <!--<ul class="progress_bar" style="margin-top: 15px;">
      <li style="'width: 50%;" class="start activated"><span></span></li>
      <li style="'width: 50%;" class="activated"><span></span></li>
      <li style="'width: 50%;" class="activated"><span></span></li>
    </ul>-->
    <ul class="progress_bar" style="margin-top: 15px;">
      <li v-for="(interval, index) in transport.trip.intervals" :style="'width: '+getSpaceIntervals+'%;'" :class="classInterval(interval.status.status, index)" :key="index" :data-title="index + 1">
        <span :class="lineColorClass(interval)" @click="$emit('onClickInterval', interval)"></span>
        <div class="progress_eta" v-if="interval.eta !== undefined">ETA: {{ interval.eta.distance.text }}, {{ interval.eta.duration.text }}</div>
      </li>
    </ul>
    <span class="pull-right ">{{ getPercentOfTruck }}%</span>
  </div>
</template>

<script>
  export default {
    name: "CircleProgressBar",
    props: {
      transport: {
        default() {
          return {};
        }
      },
    },
    computed: {
      getPercentOfTruck() {
        let totalIntervals = this.transport.trip.intervals.length * 2;
        let totalCompleted = 0;
        let next_stop = false;
        this.transport.trip.intervals.forEach((item) => {
          if(item.status.status === 'finished' || item.status.status === 'cancelled') {
            totalCompleted += 2;
          } else if(item.status.status === 'on-my-way') {
            totalCompleted++;
            if(next_stop === false) {
              this.transport.trip.next_stop = item.location_end.name;
            }
            next_stop = true;
          }
        });

        console.log(totalIntervals, totalCompleted);

        return (totalCompleted / totalIntervals) * 100;
      },
      getSpaceIntervals() {
        return 100 / this.transport.trip.intervals.length;
      }
    },
    methods: {
      classInterval(status, index) {
        console.log('STATUS', status);
        if((status === 'in-first-point' || status === 'on-my-way') && index === 0) {
          return 'start';
        }
        if(status === 'finished' && index === 0) {
          return 'start activated';
        }
        if(status === 'finished') {
          return 'activated';
        }
        return '';
      },
      lineColorClass(interval) {
        console.log('Expected Date init', interval.expected_date_init);
        console.log('Expected Date Finish: ', interval.expected_date_finish);
        if(interval.expected_date_init == null || interval.expected_date_finish == null || interval.eta.duration.value == null) {
          return 'sg-pointer bg-success';
        }
        let expectedDateInit = moment(interval.expected_date_init).unix();
        let expectedDateFinish = moment(interval.expected_date_finish).unix();

        let totalMinutes = expectedDateFinish - expectedDateInit;
        let dateMax = expectedDateInit + totalMinutes + parseInt(totalMinutes * 0.05 );

        let dateEta = moment().unix() + interval.eta.duration.value;


        console.log('Interval duration', interval.eta.duration.value);
        console.log('Total Minutes: ', totalMinutes);
        console.log('MaxDate: ', dateMax);
        console.log('Date Eta: ', dateEta);

        if(dateEta <= expectedDateFinish) {
          return 'sg-pointer bg-success';
        } else if(expectedDateFinish < dateEta && dateEta < dateMax) {
          return 'sg-pointer bg-warning';
        } else if(dateEta > dateMax) {
          return 'sg-pointer bg-danger';
        }
      }
    }
  }
</script>

<style lang="css" scoped>

  ul.progress_bar{
    max-width: 98%;
    width: 100%;
    /*padding: 0 18px;*/
    height: 3em;
    margin: 0;
    padding: 0;
    font-size: 10px; /* change font size only to scale*/
  }

  ul.progress_bar li{
    width: 20%;
    float: left;
    height: 100%;
    list-style: none;
    position: relative;
    margin: 0;
    padding: 0;
  }

  ul.progress_bar li span{
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: #0182a7;
    height: .7em;
    z-index: 1;
  }


  ul.progress_bar li:after{
    content: attr(data-title);
    display: block;
    position: absolute;
    right: -2em;
    top: 0;
    background: #fff;
    border: 0.3em solid #0182a7;
    width: 2em;
    height: 2em;
    border-radius: 15%;
    z-index: 2;
    font-size: 1.5em;
    text-align: center;
    font-weight: bold;
  }

  ul.progress_bar li:first-child:before{
    content: 'P';
    background: #fff;
    border: 0.3em solid #0182a7;
    box-sizing: border-box;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 2em;
    height: 2em;
    border-radius: 15%;
    z-index: 2;
    font-size: 1.5em;
    text-align: center;
    font-weight: bold;
  }

  .truck-wrapper {
    position: relative;
    width: 98%;
    font-size: 1.2em;
  }

  .truck {
    position: absolute;
    top: -20px;
  }

  ul.progress_bar li.start:before{
    background: #0182a7;
    border: 0.3em solid #0182a7;
    box-sizing: border-box;
    color: white;
  }

  ul.progress_bar li.activated:after{
    background: #0182a7;
    border: 0.3em solid #0182a7;
    box-sizing: border-box;
    color: white;
  }

  .progress_eta {
    position: absolute;
    z-index: 10;
    right: 5px;
    top: -7px;
    font-size: 1.2em;
  }

</style>
