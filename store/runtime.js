export const state = () => ({
    status_connection:true,
    tags:{},
      groups: {
      oxigen: {
        name: 'Кислород',
        color: 'blue-grey darken-4',
        tags: [{
            name: 'CPU_k2/F_Oxygen',
            description: 'Расход',
            value: -1000,
            units: 'м<sup>3</sup>/мин',
            scaleMin: 0,
            scaleMax: 600
          },
          {
            name: 'CPU_k2/P_Oxygen',
            description: 'Давление',
            value: -1000,
            units: 'кг/см<sup>2</sup>',
            scaleMin: 0,
            scaleMax: 25
          },
          {
            name: 'CPU_k2/T_Oxygen',
            description: 'Температура',
            value: -1000,
            units: '&degC',
            scaleMin: -50,
            scaleMax: 150
          }
        ]
      },
      nitrogen: {
        name: 'Азот',
        color: 'brown darken-4',
        tags: [{
            name: 'CPU_k2/F_Nitrogen',
            description: 'Расход',
            value: -1000,
            units: 'м<sup>3</sup>/мин',
            scaleMin: 0,
            scaleMax: 600
          },
          {
            name: 'CPU_k2/P_Nitrogen',
            description: 'Давление',
            value: -1000,
            units: 'кг/см<sup>2</sup>',
            scaleMin: 0,
            scaleMax: 25
          },
          {
            name: 'CPU_k2/T_Nitrogen',
            description: 'Температура',
            value: -1000,
            units: '&degC',
            scaleMin: -50,
            scaleMax: 150
          }
        ]
      },
      konverter: {
        name: 'Ковертер, фурмы',
        color: 'grey darken-3',
        tags: [{
            name: 'CPU_k2/Angle_konv',
            description: 'Положение конвертера',
            value: -1000,
            units: '&deg',
            scaleMin: 0,
            scaleMax: 360
          },
          {
            name: 'MPK2_PLC1/LanceLeftCurPos',
            description: 'Положение левой фурмы',
            value: -1000,
            units: 'мм',
            scaleMin: 16000,
            scaleMax: 0
          },
          {
            name: 'MPK2_PLC1/LanceRightCurPos',
            description: 'Положение правой фурмы',
            value: -1000,
            units: 'мм',
            scaleMin: 16000,
            scaleMax: 0
          }
        ]
      },
      sup: {
        name: 'Сыпучие',
        color: 'grey darken-3',
        tags: [{
          name: 'CPU_k2/Weight_sup',
          description: 'Вес в ВБ',
          value: -1000,
          units: 'кг',
          scaleMin: 0,
          scaleMax: 5000
        },

        ]
      },
      ferr: {
        name: 'Ферросплавы',
        color: 'grey darken-3',
        tags: [{
          name: 'CPU_k2/Weight_ferr',
          description: 'Вес в ВБ',
          value: -1000,
          units: 'кг',
          scaleMin: 0,
          scaleMax: 5000
        }]
      },

    }
})

export const mutations = {
    setStatusConnection(state,val){
        state.status_connection = val
    },

    setTags(state,val){
        state.tags = val
    },

    setTagsGroup(state,val){
        for (const group_id in state.groups) {
            state.groups[group_id].tags.forEach((tag, index) => {
            tag.value = parseFloat(val[tag.name]).toFixed(1)
        });
        }
    }
}

export const actions = {
    SOCKET_connect({state, commit},data) {
        console.log('Message connect: ', data)
        commit('setStatusConnection',true)
    },
    SOCKET_SendData({state, commit}, data) {
        commit('setTags',data)
        commit('setTagsGroup',data)
        console.log('Message: ', data)
    },
    SOCKET_reconnect_error({state, commit},data) {
        console.log('Message error: ', data)
        commit('setStatusConnection',false)
    },
}

