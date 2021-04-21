<template>
  <v-row>
    <v-col sm="9">
       {{$store.state.passport}}

      <div v-show="show_passport">
          <h2>Плавка № {{passport.number_plavka}}</h2>
      <v-row>
        <v-col>

        <v-data-table
          caption="Сыпучие материалы"
          :headers="passport.head_sup"
          :items="passport.body_sup"
          item-key="id"
          hide-default-footer
          disable-pagination
        >
        </v-data-table>

        </v-col>
        <v-col>
          <v-data-table
          caption="Ферросплавы"
          :headers="passport.head_ferr"
          :items="passport.body_ferr"
          item-key="id"
          hide-default-footer
          disable-pagination
        >
        </v-data-table>
        </v-col>
      </v-row>

      </div>
      <div v-show="!show_passport">Выберите номер паспорта</div>



    </v-col>
    <v-col sm="3">
      <v-date-picker v-model="filter_date" input=no-title flat full-width locale="ru"></v-date-picker>
      <v-card class="pa-2 mt-3" :loading="load_list_k1">
        <v-card-title>Конвертер 1</v-card-title>
        <v-card-subtitle>{{filter_date}}</v-card-subtitle>
        <v-card-text v-if="show_list_k1">
          <v-btn v-for="item of list_passports_k1" :key="item.Nplavki" @click="get_passport_k1(item.Nplavki)" text small rounded>{{item.Nplavki}}
            ({{item.begin_time}}-{{item.end_time}})</v-btn>
        </v-card-text>
        <v-card-text v-else>
          в указанный день плавок не было
        </v-card-text>
      </v-card>

      <v-card class="pa-2 mt-3" :loading="load_list_k2">
        <v-card-title>Конвертер 2</v-card-title>
        <v-card-subtitle>{{filter_date}}</v-card-subtitle>
        <v-card-text v-if="show_list_k2">
          <v-btn v-for="item of list_passports_k2" :key="item.Nplavki" @click="get_passport_k2(item.Nplavki)" text small rounded>{{item.Nplavki}}
            ({{item.begin_time}}-{{item.end_time}})</v-btn>
        </v-card-text>
        <v-card-text v-else>
          в указанный день плавок не было
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

</template>


<script>
  import axios from 'axios'
  import {mapState} from 'vuex'



  export default {
    data() {
      return {
        filter_date: this.$store.state.passport.filter_date,
        passport : {
          number_plavka : 0,
          head_sup: [
            { text: 'Время', value: 'time' },
            { text: 'Материал', value: 'mater' },
            { text: 'Вес', value: 'ves' },
            { text: 'Куда отдан', value: 'kyda' },
            ],
          body_sup:[],
          head_ferr: [
            { text: 'Время', value: 'time' },
            { text: 'Материал', value: 'mater' },
            { text: 'Вес', value: 'ves' },
            ],
          body_ferr:[],
        }

      }
    },

    mounted() {
      // this.get_lists_passports()
      // this.$store.commit('passport/setNumPassport')

      this.load_list_k1 = true
      this.load_list_k2 = true

      this.$store.dispatch('passport/getPassportList')

    },

    computed: {
      dateRangeText() {
        return [this.filter_date]
      },

      show_list_k1() {
        return this.list_passports_k1.length > 0 ? true : false
      },

      show_list_k2() {
        return this.list_passports_k2.length > 0 ? true : false
      },

      // show_passport () {
      //   return this.passport.number_plavka > 0 ? true : false
      // },

      ...mapState('passport',
                  ['list_passports_k1',
                  'list_passports_k2',
                  'list_passports_k3',
                  'load_list_k1',
                  'load_list_k2',
                  'load_list_k3'])
    },

    watch: {
      filter_date() {

        this.$store.commit('passport/setFilterDate', this.filter_date)

        this.load_list_k1 = true
        this.load_list_k2 = true

        this.$store.dispatch('passport/getPassportList',this.filter_date)

        // axios.get(`http://10.191.23.182:3000/get_list_passports/1/${this.filter_date}`)
        //   .then((res) => {
        //     this.list_passports_k1 = res.data
        //     this.load_list_k1 = false
        //   })

        // axios.get(`http://10.191.23.182:3000/get_list_passports/2/${this.filter_date}`)
        //   .then((res) => {
        //     // this.list_passports_k2 = res.data
        //     // this.load_list_k2 = false
        //     // console.log(res.data)
        //   })
      }
    },

    methods: {
      print_data(p) {
        console.log(p)
      },

      get_passport_k2(nplavki) {
          this.passport.number_plavka = nplavki

          // this.$store.dispatch('passport/getPassportList')

          // axios.get(`http://10.191.23.182:3000/get_passport_sup/2/${nplavki}`)
          // .then((res) => {
          //   this.passport.body_sup = res.data
          // })

          // axios.get(`http://10.191.23.182:3000/get_passport_ferr/2/${nplavki}`)
          // .then((res) => {
          //   this.passport.body_ferr = res.data
          // })
      }
    }
  }

</script>
