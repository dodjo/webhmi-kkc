<template>
  <v-row>
    <v-col>

      <v-progress-linear :active="loading" :indeterminate="loading" absolute top color="deep-purple accent-4"></v-progress-linear>

      <v-row>
        <v-col cols="12" lg="12" md="12" xs="12">
          <h2>Конвертер 2</h2>
           <!-- {{groups}} -->
          <!-- {{tags}} -->
        </v-col>

      </v-row>
      <v-row>
        <v-col class="body-1">
          Номер плавки: {{tags['CPU_k2/Num_plav']}}
        </v-col>
      </v-row>

      <v-row>
        <v-col lg="3">
          <v-card>
            <v-card-text class="d-flex justify-center">
              <konverter :konv-rotate="tags['CPU_k2/Angle_konv']" :FOxygen="tags['CPU_k2/F_Oxygen']"
                :FNitrogen="tags['CPU_k2/F_Nitrogen']" :furm-height="maps(tags['MPK2_PLC1/LanceLeftCurPos'],groups.konverter.tags[2].scaleMin,groups.konverter.tags[2].scaleMax,1,291)">
              </konverter>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col lg="4">
          <v-card>
            <v-card-title>Тракт подачи сыпучих материалов</v-card-title>
            <v-card-text class="d-flex justify-center">
              <supk2
                :work_bunker1="!!tags['CPU_k2/Work_bunker5_sup']"
                :work_bunker2="!!tags['CPU_k2/Work_bunker6_sup']"
                :work_bunker3="!!tags['CPU_k2/Work_bunker7_sup']"
                :work_bunker4="!!!tags['CPU_k2/Work_bunker8A_sup']"
                :work_bunker5="!!!tags['CPU_k2/Work_bunker8_sup']"
                :work_conveyor_bunker12="!!!tags['CPU_k2/Work_conveyor_5_6_sup']"
                :work_conveyor_bunker45="!!!tags['CPU_k2/Work_conveyor_8_8A_sup']"
                :work_VB="!!tags['CPU_k2/Open_VB_sup']"
                :weight_in_VB="tags['CPU_k2/Weight_sup']"
                :lepestok_konverter="!!tags['CPU_k2/Lepestok_konverter']"
                :lepestok_konvsh="!!tags['CPU_k2/Lepestok_kovsh']"
              ></supk2>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col lg="4">
          <v-card>
            <v-card-title>Тракт подачи ферросплавов</v-card-title>
            <v-card-text class="d-flex justify-center">
              <ferrk2
                :work_bunker1="!!tags['CPU_k2/Work_conveyor_14_ferr']"
                :work_bunker2="!!tags['CPU_k2/Work_bunker5_ferr']"
                :work_bunker3="!!tags['CPU_k2/Work_bunker6_ferr']"
                :work_bunker4="!!tags['CPU_k2/Work_bunker7_ferr']"
                :work_bunker5="!!tags['CPU_k2/Work_bunker8_ferr']"
                :work_conveyor_bunker12="!!tags['CPU_k2/Work_conveyor_14_ferr']"
                :work_VB="!!tags['CPU_k2/Open_VB_ferr']"
                :weight_in_VB="tags['CPU_k2/Weight_ferr']"
              ></ferrk2>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>



      <v-row>
        <v-col>
          <v-card>
            <v-card-text class="body-1">
              Готовность конвертера:
              <!-- <span v-show="tags[1].value" class="pa-1 red white--text">не готов</span>
                    <span v-show="!tags[1].value" class="pa-1 green white--text">готов</span> -->
              <v-chip label v-show="tags['CPU_k2/Ready_konv']" class="pa-1 red white--text">не готов</v-chip>
              <v-chip label v-show="!tags['CPU_k2/Ready_konv']" class="pa-4 green white--text">готов</v-chip>
            </v-card-text>
          </v-card>

          <v-expansion-panels accordion multiple focusable v-model="panel">

            <v-expansion-panel v-for="(group, idg) in groups" :key="idg">
              <v-expansion-panel-header :color="group.color" class="font-weight-bold">{{group.name}}</v-expansion-panel-header>
              <v-expansion-panel-content :color="group.color">
                <v-row v-for="(tag,idt) in group.tags" :key="idt">
                  <v-col sm="6" xs="6" class="d-flex align-center">{{tag.description}}:</v-col>
                  <v-col sm="3" xs="3" class=" d-flex justify-center">
                    <v-progress-linear v-if="tag.name!='CPU_k2/Angle_konv'" :active="!loading" :background-opacity="0.1"
                      :value="maps(tag.value,tag.scaleMin,tag.scaleMax,0,100)" :color="group.color+1" height="25">
                      {{tag.value}}
                    </v-progress-linear>
                    <v-progress-circular v-else :rotate="-tag.value-92" :size="60" :value="3" :width="5"
                      color="group.color+1">{{
                      tag.value }}</v-progress-circular>

                  </v-col>
                  <v-col sm="3" xs="3" v-html="tag.units"></v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col lg="9" md="12" v-if="!loading">
          <iframe src="http://10.191.23.182:3333/d/DF5i576Wk/konverter-2?orgId=1&refresh=5s&kiosk=tv" width="100%" height="800" style="min-width:350px"
            frameborder="0"></iframe>
        </v-col>

      </v-row>
    </v-col>
  </v-row>
</template>

<script>
  import konverter from "../components/konverter.vue";
  import supk2 from "../components/sup_k2.vue";
  import ferrk2 from "../components/ferr_k2.vue";
  import mix1 from "../components/mixins/mix1"
  import {mapState} from 'vuex'



  export default {
    mixins: [mix1],
    components: {
      konverter,
      supk2,
      ferrk2
    },
    data() {
      return {
        loading: false,
        panel: [0, 1, 2, 3, 4, 5],
      }
    },

    computed: {
      ...mapState('runtime',['tags','groups'])
    },

    sockets: {
      connect() {
        console.log('Client connect')
        console.log(this.tags)

      },
      SendData(data) {

        // console.log(data)
        // this.tag_array = data

        // this.tags.forEach((tag, index) => {
        //     tag.value = data[tag.name]
        // });

        // for (const group_id in this.groups) {
        //   this.groups[group_id].tags.forEach((tag, index) => {
        //     tag.value = data[tag.name]
        //   });
        // }


        // setTimeout(() => {
        //   this.loading = false
        // }, 1000);

      }

    },
    // mounted(){
    //   maps()
    // },
    // methods: {
    //   calc_maps(){
    //     maps()
    //   }
    //   // maps(x, in_min, in_max, out_min, out_max) {
    //   //   let out = Math.round((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
    //   //   if (x < 0) {
    //   //     return out = out_max;
    //   //   }
    //   //   return out;
    //   // }
    // }

  }

</script>
