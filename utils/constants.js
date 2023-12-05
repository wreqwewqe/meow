/*
 * @Description: 
 * @Author: Martin
 * @Date: 2023-05-05 16:29:14
 * @LastEditors: Martin
 * @LastEditTime: 2023-05-05 16:29:40
 */
const ETHEREUM_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
const EthereumCode = 5
const ScrollCode = 534351
const EthereumScan = "https://goerli.etherscan.io"
const ScrollScan = "https://sepolia.scrollscan.com/"
// const BaseURI = 'https://api.bittesseract.com/api/v1/';
// const BaseURI = "http://127.0.0.1:8000/api/v1"
const BaseURI = "http://10.251.253.170:8000/api"
const intersetRate = [
    {"name":"0%","Utilization Rate":0, "Borrow APR, variable":3},
    {"Utilization Rate":1, "Borrow APR, variable":3.0625},
    {"Utilization Rate":2, "Borrow APR, variable":3.125},
    {"Utilization Rate":3, "Borrow APR, variable":3.1875},
    {"Utilization Rate":4, "Borrow APR, variable":3.25},
    {"Utilization Rate":5, "Borrow APR, variable":3.3125},
    {"Utilization Rate":6, "Borrow APR, variable":3.375},
    {"Utilization Rate":7, "Borrow APR, variable":3.4375},
    {"Utilization Rate":8, "Borrow APR, variable":3.5},
    {"Utilization Rate":9, "Borrow APR, variable":3.5625},
    {"Utilization Rate":10, "Borrow APR, variable":3.625},
    {"Utilization Rate":11, "Borrow APR, variable":3.6875},
    {"Utilization Rate":12, "Borrow APR, variable":3.75},
    {"Utilization Rate":13, "Borrow APR, variable":3.8125},
    {"Utilization Rate":14, "Borrow APR, variable":3.875},
    {"Utilization Rate":15, "Borrow APR, variable":3.9375},
    {"Utilization Rate":16, "Borrow APR, variable":4},
    {"Utilization Rate":17, "Borrow APR, variable":4.0625},
    {"Utilization Rate":18, "Borrow APR, variable":4.125},
    {"Utilization Rate":19, "Borrow APR, variable":4.1875},
    {"Utilization Rate":20, "Borrow APR, variable":4.25},
    {"Utilization Rate":21, "Borrow APR, variable":4.3125},
    {"Utilization Rate":22, "Borrow APR, variable":4.375},
    {"Utilization Rate":23, "Borrow APR, variable":4.4375},
    {"Utilization Rate":24, "Borrow APR, variable":4.5},
    {"name":"25%","Utilization Rate":25, "Borrow APR, variable":4.5625},
    {"Utilization Rate":26, "Borrow APR, variable":4.625},
    {"Utilization Rate":27, "Borrow APR, variable":4.6875},
    {"Utilization Rate":28, "Borrow APR, variable":4.75},
    {"Utilization Rate":29, "Borrow APR, variable":4.8125},
    {"Utilization Rate":30, "Borrow APR, variable":4.875},
    {"Utilization Rate":31, "Borrow APR, variable":4.9375},
    {"Utilization Rate":32, "Borrow APR, variable":5},
    {"Utilization Rate":33, "Borrow APR, variable":5.0625},
    {"Utilization Rate":34, "Borrow APR, variable":5.125},
    {"Utilization Rate":35, "Borrow APR, variable":5.1875},
    {"Utilization Rate":36, "Borrow APR, variable":5.25},
    {"Utilization Rate":37, "Borrow APR, variable":5.3125},
    {"Utilization Rate":38, "Borrow APR, variable":5.375},
    {"Utilization Rate":39, "Borrow APR, variable":5.4375},
    {"Utilization Rate":40, "Borrow APR, variable":5.5},
    {"Utilization Rate":41, "Borrow APR, variable":5.5625},
    {"Utilization Rate":42, "Borrow APR, variable":5.625},
    {"Utilization Rate":43, "Borrow APR, variable":5.6875},
    {"Utilization Rate":44, "Borrow APR, variable":5.75},
    {"Utilization Rate":45, "Borrow APR, variable":5.8125},
    {"Utilization Rate":46, "Borrow APR, variable":5.875},
    {"Utilization Rate":47, "Borrow APR, variable":5.9375},
    {"Utilization Rate":48, "Borrow APR, variable":6},
    {"Utilization Rate":49, "Borrow APR, variable":6.0625},
    {"name":"50%","Utilization Rate":50, "Borrow APR, variable":6.125},
    {"Utilization Rate":51, "Borrow APR, variable":6.1875},
    {"Utilization Rate":52, "Borrow APR, variable":6.25},
    {"Utilization Rate":53, "Borrow APR, variable":6.3125},
    {"Utilization Rate":54, "Borrow APR, variable":6.375},
    {"Utilization Rate":55, "Borrow APR, variable":6.4375},
    {"Utilization Rate":56, "Borrow APR, variable":6.5},
    {"Utilization Rate":57, "Borrow APR, variable":6.5625},
    {"Utilization Rate":58, "Borrow APR, variable":6.625},
    {"Utilization Rate":59, "Borrow APR, variable":6.6875},
    {"Utilization Rate":60, "Borrow APR, variable":6.75},
    {"Utilization Rate":61, "Borrow APR, variable":6.8125},
    {"Utilization Rate":62, "Borrow APR, variable":6.875},
    {"Utilization Rate":63, "Borrow APR, variable":6.9375},
    {"Utilization Rate":64, "Borrow APR, variable":7},
    {"Utilization Rate":65, "Borrow APR, variable":7.0625},
    {"Utilization Rate":66, "Borrow APR, variable":7.125},
    {"Utilization Rate":67, "Borrow APR, variable":7.1875},
    {"Utilization Rate":68, "Borrow APR, variable":7.25},
    {"Utilization Rate":69, "Borrow APR, variable":7.3125},
    {"Utilization Rate":70, "Borrow APR, variable":7.375},
    {"Utilization Rate":71, "Borrow APR, variable":7.4375},
    {"Utilization Rate":72, "Borrow APR, variable":7.5},
    {"Utilization Rate":73, "Borrow APR, variable":7.5625},
    {"Utilization Rate":74, "Borrow APR, variable":7.625},
    {"name":"75%","Utilization Rate":75, "Borrow APR, variable":7.6875},
    {"Utilization Rate":76, "Borrow APR, variable":7.75},
    {"Utilization Rate":77, "Borrow APR, variable":7.8125},
    {"Utilization Rate":78, "Borrow APR, variable":7.875},
    {"Utilization Rate":79, "Borrow APR, variable":7.9375},
    {"Utilization Rate":80, "Borrow APR, variable":8},
    {"Utilization Rate":81, "Borrow APR, variable":8.75},
    {"Utilization Rate":82, "Borrow APR, variable":9.5},
    {"Utilization Rate":83, "Borrow APR, variable":10.25},
    {"Utilization Rate":84, "Borrow APR, variable":11},
    {"Utilization Rate":85, "Borrow APR, variable":11.75},
    {"Utilization Rate":86, "Borrow APR, variable":12.5},
    {"Utilization Rate":87, "Borrow APR, variable":13.25},
    {"Utilization Rate":88, "Borrow APR, variable":14},
    {"Utilization Rate":89, "Borrow APR, variable":14.75},
    {"Utilization Rate":90, "Borrow APR, variable":15.5},
    {"Utilization Rate":91, "Borrow APR, variable":16.25},
    {"Utilization Rate":92, "Borrow APR, variable":17},
    {"Utilization Rate":93, "Borrow APR, variable":17.75},
    {"Utilization Rate":94, "Borrow APR, variable":18.5},
    {"Utilization Rate":95, "Borrow APR, variable":19.25},
    {"Utilization Rate":96, "Borrow APR, variable":20},
    {"Utilization Rate":97, "Borrow APR, variable":20.75},
    {"Utilization Rate":98, "Borrow APR, variable":21.5},
    {"Utilization Rate":99, "Borrow APR, variable":22.25},
    {"name":"100%","Utilization Rate":100, "Borrow APR, variable":23},
]

module.exports = {
    ETHEREUM_ADDRESS,BaseURI,intersetRate,EthereumCode,ScrollCode,EthereumScan,ScrollScan
}
