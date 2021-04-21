<template>
<v-form v-model="valid" ref="form">
    <v-container>

      <v-row>
          <v-col lg="6">
              <v-card>
            <v-tabs
                v-model="tab"
                center-active
                dark
                fixed-tabs
               >
                <v-tab>УКП-1</v-tab>
                <v-tab>УКП-2</v-tab>
                <v-tab>МНЛЗ-1</v-tab>
                <v-tab>МНЛЗ-2</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
            <v-tab-item v-for="i of 4">
              <v-card flat>
                  <v-card-text>
              {{valid}}
                <v-row>
                    <v-col cols="12" md="3" v-for="item in fields">
                        <v-text-field
                            v-model="item.value"
                            :rules="item.rules"
                            :label="item.name"
                        ></v-text-field>
                    </v-col>
                </v-row>
                  </v-card-text>
              </v-card>
            </v-tab-item>
            </v-tabs-items>
                <v-card-text>
                    <v-btn class="mr-4" @click="send">отправить</v-btn>
                    <v-btn class="mr-4" @click="reset">очистить</v-btn>
                </v-card-text>
              </v-card>
          </v-col>
      </v-row>

    </v-container>
  </v-form>
</template>

<script>
export default {
    data: () => ({
        tab: null,
        valid: false,
        fields:[
            {
                name:'Al',
                rules:[v => (v >= 0.01 && v <=1) || 'Значение вне диапазона 0,1-1',],
                value:0,
            },
           {
                name:'C',
                rules:[v => (v >= 0.01 && v <=1) || 'Значение вне диапазона 0,1-1',],
                value:0,
            },
            {
                name:'Mn',
                rules:[v => (v >= 0.01 && v <=1) || 'Значение вне диапазона 0,1-1',],
                value:0,
            },
            {
                name:'S',
                rules:[v => (v >= 0 && v <=1) || 'Значение вне диапазона 0,1-1',],
                value:0,
            },
            {
                name:'P',
                rules:[v => (v >= 0 && v <=1) || 'Значение вне диапазона 0,1-1',],
                value:0,
            },
        ]
        }),
        methods: {
            send () {
                this.$refs.form.validate()
                if (this.valid) alert("ok")
            },
            reset () {
                this.$refs.form.reset()
            },
        }
}
</script>
