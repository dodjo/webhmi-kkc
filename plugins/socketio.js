// const config = require("./config/config");
import {SocketIO} from '../server/config/config'
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function({store}){
    Vue.use(new VueSocketIO({
        debug: false,
        connection: SocketIO.connection,
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_'
        }
    }))
}

