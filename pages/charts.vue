<template>
<div>
  <v-row>
    <v-col cols="12" lg="12">
      <v-card>
        <v-card-title>Статистика за 5 лет</v-card-title>
        <v-card-text><div id="chartDivYear"></div></v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" lg="12">
      <v-card>
        <v-card-title>Статистика за 60 месяцев</v-card-title>
        <v-card-text><div id="chartDivMonth"></div></v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" lg="12">
      <v-card>
        <v-card-title>Статистика за 30 дней</v-card-title>
        <v-card-text><div id="chartDivDay"></div></v-card-text>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
import cfg from '../server/config/config'
import axios from 'axios'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

var chart = []
var categoryAxis = []
var valueAxis = []
var series = []

const chartcfg = [
                    {
                      div:"chartDivYear",
                      valueX:"year",
                      valueY:"value",
                    },
                    {
                      div:"chartDivMonth",
                      valueX:"month",
                      valueY:"value",
                    },
                    {
                      div:"chartDivDay",
                      valueX:"day_k2",
                      valueY:"value_k2",
                    }
                ]





export default {

  data(){
    return {
      chart:'',
      chart2:'',
      chart3:''
    }
  },

  mounted(){
      for (let index = 0; index < chartcfg.length; index++) {

  chart[index] = am4core.create(chartcfg[index].div, am4charts.XYChart);
  categoryAxis[index] = chart[index].xAxes.push(new am4charts.CategoryAxis());
        categoryAxis[index].dataFields.category = chartcfg[index].valueX;
        // categoryAxis[index].renderer.grid.template.location = 0;
        categoryAxis[index].renderer.minGridDistance = 20;
        categoryAxis[index].renderer.cellStartLocation = 0.1;
        categoryAxis[index].renderer.labels.template.rotation = -90;
        categoryAxis[index].renderer.cellEndLocation = 0.9;
        categoryAxis[index].renderer.labels.template.horizontalCenter = "right";
        categoryAxis[index].renderer.labels.template.verticalCenter = "middle";

  valueAxis[index] = chart[index].yAxes.push(new am4charts.ValueAxis());
        valueAxis[index].min = 0;
        valueAxis[index].title.text = "Чугун (т)";

  series[index] = chart[index].series.push(new am4charts.ColumnSeries());
          series[index].dataFields.valueY = chartcfg[index].valueY;
          series[index].dataFields.categoryX = chartcfg[index].valueX;
          series[index].columns.template.tooltipText = "{year}: [bold]{valueY}[/]";
          series[index].columns.template.width = am4core.percent(95)

}
  },

  async fetch() {




await  axios.get(`${cfg.SocketIO.connection}/mixer_stat_year`)
    .then((res) => {

        console.log(`${cfg.SocketIO.connection}/mixer_stat_year`,res.data )

        chart[0].data = res.data

})

await axios.get(`${cfg.SocketIO.connection}/mixer_stat_month`)
    .then((res) => {

        chart[1].data = res.data

})


await  axios.get(`${cfg.SocketIO.connection}/mixer_stat_day`)
    .then((res) => {
        chart[2].data = res.data
})

  },

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#chartDivYear, #chartDivMonth, #chartDivDay{
  /* width: 100%; */
  height: 250px;
  font-size: 0.9em;
}
</style>