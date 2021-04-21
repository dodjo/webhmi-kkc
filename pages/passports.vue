<template>
  <v-row>
    <v-col>
       <!-- {{$store.state.passport}} -->

       <nuxt-child></nuxt-child>

      <div v-show="show_passport">

        <v-row>
          <v-col  md="12" cols="12">
            <v-btn  block class="d-lg-none"
            @click.stop="nav_right = !nav_right">
            список паспортов
            </v-btn>
          </v-col>
          <v-col  md="12" cols="12">
            <h2 class="d-inline">Плавка № {{bodyPassport.num_passport}}</h2>
          </v-col>
        </v-row>

      <v-row>
        <v-col>
        <v-data-table
          caption="Технологические операции"
          :headers="bodyPassport.headTechOper"
          :items="bodyPassport.listTechOper"
          item-key="id"
          hide-default-footer
          disable-pagination
        >
        </v-data-table>
        </v-col>
      </v-row>

       <v-row>
        <v-col md="6" cols="12">
        <v-data-table
          caption="Сыпучие материалы"
          :headers="bodyPassport.headSup"
          :items="bodyPassport.listSup"
          item-key="id"
          hide-default-footer
          disable-pagination
        >
        </v-data-table>

        <v-data-table
          caption="Итог по сыпучим материалам"
          :headers="bodyPassport.headSupTotal"
          :items="bodyPassport.listSupTotal"
          item-key="id"
          hide-default-footer
          disable-pagination
          class="mt-7"
        >
        </v-data-table>
        </v-col>

        <v-col md="6"  cols="12">
          <v-data-table
          caption="Ферросплавы"
          :headers="bodyPassport.headFerr"
          :items="bodyPassport.listFerr"
          item-key="id"
          hide-default-footer
          disable-pagination
        >
        </v-data-table>

        <v-data-table
          caption="Итог по ферросплавам"
          :headers="bodyPassport.headFerrTotal"
          :items="bodyPassport.listFerrTotal"
          item-key="id"
          hide-default-footer
          disable-pagination
          class="mt-7"
        >
        </v-data-table>

        <v-data-table
          v-show = "bodyPassport.listVnePlav.length > 0"
          caption="Материалы вне плавки"
          :headers="bodyPassport.headVnePlav"
          :items="bodyPassport.listVnePlav"
          item-key="id"
          hide-default-footer
          disable-pagination
          class="mt-7"
        >
        </v-data-table>

        <v-data-table
          caption="Замер температуры на повалке"
          :headers="bodyPassport.headTempPoval"
          :items="bodyPassport.listTempPoval"
          item-key="id"
          hide-default-footer
          disable-pagination
          class="mt-7"
        >
        </v-data-table>

        <v-data-table
          caption="Расчетная температура на сливе металла"
          :headers="bodyPassport.headCalcTemp"
          :items="bodyPassport.listCalcTemp"
          item-key="id"
          hide-default-footer
          disable-pagination
          class="mt-7"
        >
        </v-data-table>

        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-data-table
          caption="Экспресс-анализ"
          :headers="bodyPassport.headExpress"
          :items="bodyPassport.listExpress"
          item-key="id"
          hide-default-footer
          disable-pagination
        >
        </v-data-table>
        </v-col>
      </v-row>

      </div>
      <div v-show="!show_passport">
        <v-btn  block class="d-lg-none"
            @click.stop="nav_right = !nav_right">
            Выберите номер паспорта
        </v-btn>
        <span class="d-none d-lg-flex justify-center">Выберите номер паспорта</span>
      </div>



    </v-col>

     <v-navigation-drawer
       app
       fixed
       v-model="nav_right"
       right
       width = "400"
       floating
       color="#121212"
       clipped
       >
         <v-date-picker v-model="filter_date" color="grey darken-4"   input=no-title flat full-width locale="ru"></v-date-picker>

         <v-card class="pa-2 mt-3" :loading="load_list_k1">
        <v-card-title>Конвертер 1</v-card-title>
        <v-card-subtitle>{{formatDate (filter_date)}} <span class="ml-3"> Кол-во плавок - {{list_passports_k1.length}} </span></v-card-subtitle>
        <v-card-text v-if="show_list_k1">
          <v-btn v-for="item of list_passports_k1" :key="item.Nplavki" :to="`/passports/${item.Nplavki}`" nuxt text small rounded>{{item.Nplavki}}
            ({{item.begin_time}}-{{item.end_time}})</v-btn>
        </v-card-text>
        <v-card-text v-else>
          в указанный день плавок не было
        </v-card-text>
      </v-card>

      <v-card class="pa-2 mt-3" :loading="load_list_k2">
        <v-card-title>Конвертер 2</v-card-title>
        <v-card-subtitle>{{formatDate (filter_date)}} <span class="ml-3"> Кол-во плавок - {{list_passports_k2.length}} </span></v-card-subtitle>
        <v-card-text v-if="show_list_k2">
          <v-btn v-for="item of list_passports_k2" :key="item.Nplavki" :to="`/passports/${item.Nplavki}`" nuxt text small rounded>{{item.Nplavki}}
            ({{item.begin_time}}-{{item.end_time}})</v-btn>
        </v-card-text>
        <v-card-text v-else>
          в указанный день плавок не было
        </v-card-text>
      </v-card>

       </v-navigation-drawer>

  </v-row>

</template>


<script>
  import axios from 'axios'
  import {mapState} from 'vuex'





  export default {
    data() {
      return {
        filter_date: this.$store.state.passport.filter_date,
        nav_right: true,
      }
    },

    mounted() {
      // this.get_lists_passports()
      // this.$store.commit('passport/setNumPassport')
      if (this.list_passports_k1.length == 0 && this.list_passports_k2.length == 0 && this.list_passports_k3.length == 0) {
        this.$store.dispatch('passport/getPassportList',this.filter_date)
      }
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

      show_passport () {
        return this.bodyPassport.num_passport > 0 ? true : false
      },

      ...mapState('passport',
                  ['list_passports_k1',
                  'list_passports_k2',
                  'list_passports_k3',
                  'load_list_k1',
                  'load_list_k2',
                  'load_list_k3',
                  'bodyPassport'])
    },

    watch: {
      filter_date() {
        this.$store.commit('passport/setFilterDate', this.filter_date)
        // this.load_list_k1 = true
        // this.load_list_k2 = true
        this.$store.dispatch('passport/getPassportList',this.filter_date)
      }

    },

    methods: {
      formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${day}.${month}.${year}`
      },
    }
  }

</script>
