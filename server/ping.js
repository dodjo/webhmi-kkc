const ping = require("ping")
const influxWrite = require('./influx.js')


module.exports =  async function () {
    let hosts =
        [{ip:'10.191.23.180', name:'SRVKKC1',},
        {ip:'10.191.23.181', name:'',},
        {ip:'10.191.23.182', name:'KKC_ES',},
        {ip:'10.191.23.183', name:'KKC1_CL1 (ПУ1)',},
        {ip:'10.191.23.184', name:'KKC1_CL2 (ПУ1)',},
        {ip:'10.191.23.185', name:'KKC2_CL1 (ПУ2)',},
        {ip:'10.191.23.186', name:'KKC2_CL2 (ПУ2)',},
        {ip:'10.191.23.187', name:'CP (конвертер №2)',},
        {ip:'10.191.23.188', name:'KKC3_CL1 (ПУ3)',},
        {ip:'10.191.23.189', name:'KKC3_CL2 (ПУ3)',},
        {ip:'10.191.23.191', name:'',},
        {ip:'10.191.23.192', name:'ibaPDA (Маш. зал)',},
        {ip:'10.191.23.195', name:'CP (конвертер №1)',},
        {ip:'10.191.23.196', name:'CP (конвертер №3)',},
        {ip:'10.191.23.198', name:'PLC1 (МПК_К1)',},
        {ip:'10.191.23.199', name:'Гранат3 (Конвертер 3)',},
        {ip:'10.191.23.200', name:'CPU-400 (стенд универсальный)',},
        {ip:'10.191.23.202', name:'PLC2_OCEO (деаэраторная)',},
        {ip:'10.191.23.203', name:'PLC2 (МПК_К1)',},
        {ip:'10.191.23.204', name:'PLC1 (МПК_К2)',},
        {ip:'10.191.23.206', name:'c2_ded_main (ОКГ)',},
        {ip:'10.191.23.207', name:'c2_ded_main_rio (дымососная)',},
        {ip:'10.191.23.208', name:'c2_ded_pult (ОКГ)',},
        {ip:'10.191.23.209', name:'c2_ded_pult_rio (дымососная)',},
        {ip:'10.191.23.210', name:'c3_ded_main (ОКГ)',},
        {ip:'10.191.23.211', name:'c3_ded_main_rio (дымососная)',},
        {ip:'10.191.23.212', name:'c3_ded_pult (ОКГ)',},
        {ip:'10.191.23.213', name:'c3_ded_pult_rio (дымососная)',},
        {ip:'10.191.23.214', name:'PLC2 (МПК_К2)',},
        {ip:'10.191.23.216', name:'ENG2_GOT',},
        {ip:'10.191.23.217', name:'PLC1 (МПК_К3)',},
        {ip:'10.191.23.220', name:'ibaPDA2_KKC_VM (Маш. зал)',},
        {ip:'10.191.23.221', name:'C1SRV1',},
        {ip:'10.191.23.222', name:'C1SRV2 (деаэраторная)',},
        {ip:'10.191.23.224', name:'C2SRV1',},
        {ip:'10.191.23.225', name:'C2SRV2 (деаэраторная)',},
        {ip:'10.191.23.226', name:'C2SRV3 (деаэраторная)',},
        {ip:'10.191.23.227', name:'C3SRV1',},
        {ip:'10.191.23.228', name:'C3SRV2 (деаэраторная)',},
        {ip:'10.191.23.229', name:'C3SRV3 (деаэраторная)',},
        {ip:'10.191.23.230', name:'ENG_GOT (ОКГ)',},
        {ip:'10.191.23.231', name:'OCEOSRV1 (деаэраторная)',},
        {ip:'10.191.23.232', name:'OCEOSRV2 (деаэраторная)',},
        {ip:'10.191.23.233', name:'PLC1_OCEO (деаэраторная)',},
        {ip:'10.191.23.234', name:'Гранат 2',},
        {ip:'10.191.23.235', name:'ESXi1KKC',},
        {ip:'10.191.23.236', name:'C1SRV3 (деаэраторная)',},
        {ip:'10.191.23.238', name:'Гранат 1',},
        {ip:'10.191.23.239', name:'HMI_SERVER_VM',},
        {ip:'10.191.23.240', name:'ESXi2KKC',},
        {ip:'10.191.23.241', name:'PLC2 (МПК_К3)',},
        {ip:'10.191.23.242', name:'c1_ded_pult (ОКГ)',},
        {ip:'10.191.23.243', name:'c1_ded_pult_rio (дымососная)',},
        {ip:'10.191.23.244', name:'ibaPDA_KKC_VM',},
        {ip:'10.191.23.246', name:'MP377 (тамбур)',},
        {ip:'10.191.23.247', name:'c1_ded_main (ОКГ)',},
        {ip:'10.191.23.248', name:'c1_ded_main_rio (дымососная)',},
        {ip:'10.191.23.249', name:'KKC_Diagnostic',},
        {ip:'10.191.23.250', name:'PLC Общецеховой',},
        {ip:'10.191.23.252', name:'scalance 1 okg',},
        {ip:'10.191.23.254', name:'Свеча дожигания 1 (контроллер)',}]

    for(let host of hosts){
        let res = await ping.promise.probe(host.ip, {
            timeout: 0.1,
        });
        influxWrite(res.host, Number(!res.alive))
        console.log(res.alive, res.host , host.name);
    }

}