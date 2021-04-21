<template>
    <div>
        <v-row>
            <v-col cols="12" lg="12">
                <h2>Помещение АСУТП (отм. 14)</h2>
            </v-col>
        </v-row>
        <v-row>
        <v-col cols="12" lg="4">
            <v-card>
                <v-card-title>Температура</v-card-title>
                <v-card-text class="fs12">
                <div class="ma-3">Комната дежурного персонала: {{temp1}} <sup>o</sup>C</div>
                <div class="ma-3">Улица: {{temp2}} <sup>o</sup>C</div>
                </v-card-text>
            </v-card>

            <iframe src="http://10.191.23.182:3333/d-solo/KL8S9G6Zk/obshchetsekhovye-parametry?orgId=1&refresh=5s&panelId=2" width="100%" height="300" frameborder="0"></iframe>
        </v-col>

        <v-col cols="12" lg="4">
            <v-card>
                <v-card-title>Управление освещением</v-card-title>
                <v-card-text>
                <v-switch color="yellow" @change="writeData('DIAG/room1',!$event)" :label="`Кабинет начальника`" :input-value="!tags['DIAG/room1']"></v-switch>
                <v-switch color="yellow" @change="writeData('DIAG/room2',!$event)" :label="`Гермозона`" :input-value="!tags['DIAG/room2']"></v-switch>
                <v-switch color="yellow" @change="writeData('DIAG/room3',!$event)" :label="`Комната дежурного персонала`" :input-value="!tags['DIAG/room3']"></v-switch>
                <v-switch color="yellow" @change="writeData('DIAG/room4',!$event)" :label="`Тамбур`" :input-value="!tags['DIAG/room4']"></v-switch>
                <v-switch color="yellow" @change="writeData('DIAG/room5',!$event)" :label="`Раздевалка`" :input-value="!tags['DIAG/room5']"></v-switch>
                <v-switch color="yellow" @change="writeData('DIAG/room6',!$event)" :label="`Маш. зал`" :input-value="!tags['DIAG/room6']"></v-switch>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" lg="4">
            <v-card>
                <v-card-title>Управление обогревом</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-switch @change="writeData('DIAG/modeControlTemp',$event)" :label="tags['DIAG/modeControlTemp'] ? `Авто управление` : `Ручной управление`" :input-value="tags['DIAG/modeControlTemp']"></v-switch>
                        </v-col>
                        <v-col>
                            <v-switch color="yellow" v-show="!tags['DIAG/modeControlTemp']" @change="writeData('DIAG/manualControlTemp',$event)" :label="tags['DIAG/manualControlTemp'] ? `Обогрев включен` : `Обогрев выключен`" :input-value="tags['DIAG/manualControlTemp']"></v-switch>
                        </v-col>
                    </v-row>


                <v-text-field
                    readonly
                    label="Текущая температура"
                    :value="temp1"
                ></v-text-field>
                <v-text-field
                    label="Заданная температура"
                    :value="tags['DIAG/setTemp1']"
                    @change="writeData('DIAG/setTemp1',$event)"
                ></v-text-field>
                </v-card-text>
            </v-card>


            <v-snackbar
                v-model="snackbar.visible"
                color="blue"
                bottom
                right
                :timeout="3000"
                >
                {{ snackbar.text }}

                <template v-slot:action="{ attrs }">
                    <v-btn
                    dark
                    text
                    @click="snackbar.visible = false"
                    >
                    Close
                    </v-btn>
                </template>
            </v-snackbar>
        </v-col>

    </v-row>
    </div>
</template>

<style scoped>
    .fs12{
        font-size: 1em;
    }
</style>


<script>
import {mapState} from 'vuex'

export default {
    data() {
        return {
            snackbar : {
                visible : false,
                text: ''
            }
        }
    },
    computed: {
      ...mapState('runtime',['tags']),
      temp1(){
          return this.tags['DIAG/temp1'] ? this.tags['DIAG/temp1'].toFixed(1)  : ''
      },
      temp2(){
          return this.tags['DIAG/temp2'] ? this.tags['DIAG/temp2'].toFixed(1)  : ''
      },
    },
     methods : {
         writeData(tag,val){
             let data = {
                 tag: tag,
                 value: val
             }
             this.$socket.emit('write_data', data, data=>{
                 console.log(`write data... ${data}`)
                 this.snackbar.visible = true
                 this.snackbar.text = data
             })
             console.log(`write data ${data}`)

         }
     }
}
</script>

