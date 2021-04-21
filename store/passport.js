import axios from 'axios'
import cfg from '../server/config/config'

export const state = () => ({
  filter_date: new Date().toISOString().substr(0, 10),
  list_passports_k1: [],
  list_passports_k2: [],
  list_passports_k3: [],
  load_list_k1: true,
  load_list_k2: true,
  load_list_k3: true,
  bodyPassport: {
    num_passport: 0,
    headTechOper: [{
        text: 'Операция',
        value: 'oper'
      },
      {
        text: 'Начало',
        value: 'begin_date'
      },
      {
        text: 'Конец',
        value: 'end_date'
      },
      {
        text: 'Длительность',
        value: 'length'
      },
      {
        text: 'Расход (м3)',
        value: 'o2'
      },
    ],
    listTechOper: [],
    headSup: [{
        text: 'Время',
        value: 'time'
      },
      {
        text: 'Материал',
        value: 'mater'
      },
      {
        text: 'Вес',
        value: 'ves'
      },
      {
        text: 'Куда отдан',
        value: 'kyda'
      },
    ],
    listSup: [],

    headSupTotal: [
      { text: 'Материал', value: 'mater' },
      { text: 'В конвертер', value: 'konv' },
      { text: 'В ковш', value: 'kovsh' },
      ],
    listSupTotal:[],

    headFerr: [
        { text: 'Время', value: 'time' },
        { text: 'Материал', value: 'mater' },
        { text: 'Вес', value: 'ves' },
        ],
    listFerr:[],

    headFerrTotal: [
      { text: 'Материал', value: 'mater' },
      { text: 'В ковш', value: 'kovsh' },
      ],
    listFerrTotal:[],

    headVnePlav: [
      { text: 'Время', value: 'time' },
      { text: 'Материал', value: 'mater' },
      { text: 'Вес', value: 'ves' },
      { text: 'Куда отдан', value: 'kyda'},
      ],
    listVnePlav:[],

    headExpress: [
      { text: 'C', value: 'C' },
      { text: 'Mn', value: 'Mn' },
      { text: 'S', value: 'S' },
      { text: 'P', value: 'P' },
      { text: 'Cu', value: 'Cu' },
      { text: 'Cr', value: 'Cr' },
      { text: 'Ni', value: 'Ni' },
      { text: 'Al', value: 'Al' },
      { text: 'Sn', value: 'Sn' },
      { text: 'Sb', value: 'Sb' },
      ],
    listExpress:[],

    headCalcTemp: [
      { text: 'Время', value: 'Time' },
      { text: 'Дата', value: 'Date' },
      { text: 'Температура', value: 'TempBeginSlivMetal' },
      ],
    listCalcTemp:[],

    headTempPoval: [
      { text: 'Время', value: 'time' },
      { text: 'Температура', value: 'temperature' },
      { text: 'Тестовый замер', value: 'testing' },
      ],
    listTempPoval:[],

  },

})

export const mutations = {
  setNumPassport(state, val) {
    state.bodyPassport.num_passport = val
  },
  setFilterDate(state, date) {
    state.filter_date = date
  },
  setLoadListK1(state, val) {
    state.load_list_k1 = val
  },
  setLoadListK2(state, val) {
    state.load_list_k2 = val
  },
  setLoadListK3(state, val) {
    state.load_list_k3 = val
  },
  setListPassportK1(state, list) {
    state.list_passports_k1 = list
  },
  setListPassportK2(state, list) {
    state.list_passports_k2 = list
  },
  setlistTechOper(state, list) {
    state.bodyPassport.listTechOper = list
  },
  setListSup(state, list) {
    state.bodyPassport.listSup = list
  },
  setListSupTotal(state, list) {
    state.bodyPassport.listSupTotal = list
  },
  setListFerr(state, list) {
    state.bodyPassport.listFerr = list
  },
  setListFerrTotal(state, list) {
    state.bodyPassport.listFerrTotal = list
  },
  setListVnePlav(state, list) {
    state.bodyPassport.listVnePlav = list
  },
  setListExpress(state, list) {
    state.bodyPassport.listExpress = list
  },
  setListCalcTemp(state, list) {
    state.bodyPassport.listCalcTemp = list
  },
  setListTempPoval(state, list) {
    state.bodyPassport.listTempPoval = list
  },
}

export const actions = {
  getPassportList({
    state,
    commit
  }, date) {
    console.log("action ....")
    // commit('setNumPassport')

    commit('setLoadListK1', true)
    commit('setLoadListK2', true)
    commit('setLoadListK3', true)

    axios.get(`${cfg.SocketIO.connection}/get_list_passports/1/${date}`)
      .then((res) => {
        commit('setListPassportK1', res.data)
        commit('setLoadListK1', false)
      }).catch(function (error) {
        console.log(error);
      })


    axios.get(`${cfg.SocketIO.connection}/get_list_passports/2/${date}`)
      .then((res) => {
        //    state.list_passports_k2 = res.data
        commit('setListPassportK2', res.data)
        commit('setLoadListK2', false)
      }).catch(function (error) {
        console.log(error);
      })
  },

  loadPassport({
    state,
    commit
  }, nplavki) {
    commit('setNumPassport', nplavki)

    if (nplavki > 100000 && nplavki < 200000) {
        axios_get({
            url: `${cfg.SocketIO.connection}/get_passport_tech_operation/1/${nplavki}`,
            commit,
            commit_name:'setlistTechOper',
          })

        axios_get({
            url: `${cfg.SocketIO.connection}/get_passport_sup/1/${nplavki}`,
            commit,
            commit_name:'setListSup',
          })

          axios_get({
            url: `${cfg.SocketIO.connection}/get_passport_sup_total/1/${nplavki}`,
            commit,
            commit_name:'setListSupTotal',
          })

      axios_get({
        url: `${cfg.SocketIO.connection}/get_passport_ferr/1/${nplavki}`,
        commit,
        commit_name:'setListFerr',
      })

      axios_get({
        url: `${cfg.SocketIO.connection}/get_passport_ferr_total/1/${nplavki}`,
        commit,
        commit_name:'setListFerrTotal',
      })

      axios_get({
        url: `${cfg.SocketIO.connection}/get_passport_vne_plavki/1/${nplavki}`,
        commit,
        commit_name:'setListVnePlav',
      })

      axios_get({
        url: `${cfg.SocketIO.connection}/get_passport_express_analiz/1/${nplavki}`,
        commit,
        commit_name:'setListExpress',
      })

      axios_get({
        url: `${cfg.SocketIO.connection}/get_passport_calc_temp/1/${nplavki}`,
        commit,
        commit_name:'setListCalcTemp',
      })

      axios_get({
        url: `${cfg.SocketIO.connection}/get_passport_temp_povalka/1/${nplavki}`,
        commit,
        commit_name:'setListTempPoval',
      })
    }


    if (nplavki > 200000 && nplavki < 300000) {
        axios_get({
            url: `${cfg.SocketIO.connection}/get_passport_tech_operation/2/${nplavki}`,
            commit,
            commit_name:'setlistTechOper',
          })

        axios_get({
            url: `${cfg.SocketIO.connection}/get_passport_sup/2/${nplavki}`,
            commit,
            commit_name:'setListSup',
          })

        axios_get({
            url: `${cfg.SocketIO.connection}/get_passport_sup_total/2/${nplavki}`,
            commit,
            commit_name:'setListSupTotal',
          })

        axios_get({
            url: `${cfg.SocketIO.connection}/get_passport_ferr/2/${nplavki}`,
            commit,
            commit_name:'setListFerr',
          })

        axios_get({
            url: `${cfg.SocketIO.connection}/get_passport_ferr_total/2/${nplavki}`,
            commit,
            commit_name:'setListFerrTotal',
          })

        axios_get({
            url: `${cfg.SocketIO.connection}/get_passport_vne_plavki/2/${nplavki}`,
            commit,
            commit_name:'setListVnePlav',
          })

        axios_get({
            url: `${cfg.SocketIO.connection}/get_passport_express_analiz/2/${nplavki}`,
            commit,
            commit_name:'setListExpress',
          })

        axios_get({
            url: `${cfg.SocketIO.connection}/get_passport_calc_temp/2/${nplavki}`,
            commit,
            commit_name:'setListCalcTemp',
          })

        axios_get({
            url: `${cfg.SocketIO.connection}/get_passport_temp_povalka/2/${nplavki}`,
            commit,
            commit_name:'setListTempPoval',
          })
    }


  },

  //       axios.get(`${cfg.SocketIO.connection}/get_passport_ferr/2/${nplavki}`)
  //       .then((res) => {
  //         commit('setListSup', res.data)
  //       })
  // }

}


function axios_get(params) {
    axios.get(params.url)
        .then((res) => {
            params.commit(params.commit_name, res.data)
            console.log(res.data)
        }).catch(function (error) {
          console.log(error);
        })
}
