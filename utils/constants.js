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
const EthereumScan = "https://etherscan.io"
const ScrollScan = "https://scrollscan.com/"
// const BaseURI = 'https://api.bittesseract.com/api/v1/';
const BaseURI = "http://127.0.0.1:8000/api"
// const BaseURI = "https://api.meowprotocol.xyz/api"
// const BaseURI = "http://yvqput.natappfree.cc/api"

const intersetRate = [
    { "name": "0%", "Utilization Rate": 0, "Borrow APR, variable": 1 },
    { "Utilization Rate": 1, "Borrow APR, variable": 1.0125 },
    { "Utilization Rate": 2, "Borrow APR, variable": 1.025 },
    { "Utilization Rate": 3, "Borrow APR, variable": 1.0375 },
    { "Utilization Rate": 4, "Borrow APR, variable": 1.05 },
    { "Utilization Rate": 5, "Borrow APR, variable": 1.0625 },
    { "Utilization Rate": 6, "Borrow APR, variable": 1.075 },
    { "Utilization Rate": 7, "Borrow APR, variable": 1.0875 },
    { "Utilization Rate": 8, "Borrow APR, variable": 1.1 },
    { "Utilization Rate": 9, "Borrow APR, variable": 1.1125 },
    { "Utilization Rate": 10, "Borrow APR, variable": 1.125 },
    { "Utilization Rate": 11, "Borrow APR, variable": 1.1375 },
    { "Utilization Rate": 12, "Borrow APR, variable": 1.15 },
    { "Utilization Rate": 13, "Borrow APR, variable": 1.1625 },
    { "Utilization Rate": 14, "Borrow APR, variable": 1.175 },
    { "Utilization Rate": 15, "Borrow APR, variable": 1.1875 },
    { "Utilization Rate": 16, "Borrow APR, variable": 1.2 },
    { "Utilization Rate": 17, "Borrow APR, variable": 1.2125 },
    { "Utilization Rate": 18, "Borrow APR, variable": 1.225 },
    { "Utilization Rate": 19, "Borrow APR, variable": 1.2375 },
    { "Utilization Rate": 20, "Borrow APR, variable": 1.25 },
    { "Utilization Rate": 21, "Borrow APR, variable": 1.2625 },
    { "Utilization Rate": 22, "Borrow APR, variable": 1.275 },
    { "Utilization Rate": 23, "Borrow APR, variable": 1.2875 },
    { "Utilization Rate": 24, "Borrow APR, variable": 1.3 },
    { "name": "25%", "Utilization Rate": 25, "Borrow APR, variable": 1.3125 },
    { "Utilization Rate": 26, "Borrow APR, variable": 1.325 },
    { "Utilization Rate": 27, "Borrow APR, variable": 1.3375 },
    { "Utilization Rate": 28, "Borrow APR, variable": 1.35 },
    { "Utilization Rate": 29, "Borrow APR, variable": 1.3625 },
    { "Utilization Rate": 30, "Borrow APR, variable": 1.375 },
    { "Utilization Rate": 31, "Borrow APR, variable": 1.3875 },
    { "Utilization Rate": 32, "Borrow APR, variable": 1.4 },
    { "Utilization Rate": 33, "Borrow APR, variable": 1.4125 },
    { "Utilization Rate": 34, "Borrow APR, variable": 1.425 },
    { "Utilization Rate": 35, "Borrow APR, variable": 1.4375 },
    { "Utilization Rate": 36, "Borrow APR, variable": 1.45 },
    { "Utilization Rate": 37, "Borrow APR, variable": 1.4625 },
    { "Utilization Rate": 38, "Borrow APR, variable": 1.475 },
    { "Utilization Rate": 39, "Borrow APR, variable": 1.4875 },
    { "Utilization Rate": 40, "Borrow APR, variable": 1.5 },
    { "Utilization Rate": 41, "Borrow APR, variable": 1.5125 },
    { "Utilization Rate": 42, "Borrow APR, variable": 1.525 },
    { "Utilization Rate": 43, "Borrow APR, variable": 1.5375 },
    { "Utilization Rate": 44, "Borrow APR, variable": 1.55 },
    { "Utilization Rate": 45, "Borrow APR, variable": 1.5625 },
    { "Utilization Rate": 46, "Borrow APR, variable": 1.575 },
    { "Utilization Rate": 47, "Borrow APR, variable": 1.5875 },
    { "Utilization Rate": 48, "Borrow APR, variable": 1.6 },
    { "Utilization Rate": 49, "Borrow APR, variable": 1.6125 },
    { "name": "50%", "Utilization Rate": 50, "Borrow APR, variable": 1.625 },
    { "Utilization Rate": 51, "Borrow APR, variable": 1.6375 },
    { "Utilization Rate": 52, "Borrow APR, variable": 1.65 },
    { "Utilization Rate": 53, "Borrow APR, variable": 1.6625 },
    { "Utilization Rate": 54, "Borrow APR, variable": 1.675 },
    { "Utilization Rate": 55, "Borrow APR, variable": 1.6875 },
    { "Utilization Rate": 56, "Borrow APR, variable": 1.7 },
    { "Utilization Rate": 57, "Borrow APR, variable": 1.7125 },
    { "Utilization Rate": 58, "Borrow APR, variable": 1.725 },
    { "Utilization Rate": 59, "Borrow APR, variable": 1.7375 },
    { "Utilization Rate": 60, "Borrow APR, variable": 1.75 },
    { "Utilization Rate": 61, "Borrow APR, variable": 1.7625 },
    { "Utilization Rate": 62, "Borrow APR, variable": 1.775 },
    { "Utilization Rate": 63, "Borrow APR, variable": 1.7875 },
    { "Utilization Rate": 64, "Borrow APR, variable": 1.8 },
    { "Utilization Rate": 65, "Borrow APR, variable": 1.8125 },
    { "Utilization Rate": 66, "Borrow APR, variable": 1.825 },
    { "Utilization Rate": 67, "Borrow APR, variable": 1.8375 },
    { "Utilization Rate": 68, "Borrow APR, variable": 1.85 },
    { "Utilization Rate": 69, "Borrow APR, variable": 1.8625 },
    { "Utilization Rate": 70, "Borrow APR, variable": 1.875 },
    { "Utilization Rate": 71, "Borrow APR, variable": 1.8875 },
    { "Utilization Rate": 72, "Borrow APR, variable": 1.9 },
    { "Utilization Rate": 73, "Borrow APR, variable": 1.9125 },
    { "Utilization Rate": 74, "Borrow APR, variable": 1.925 },
    { "name": "75%", "Utilization Rate": 75, "Borrow APR, variable": 1.9375 },
    { "Utilization Rate": 76, "Borrow APR, variable": 1.95 },
    { "Utilization Rate": 77, "Borrow APR, variable": 1.9625 },
    { "Utilization Rate": 78, "Borrow APR, variable": 1.975 },
    { "Utilization Rate": 79, "Borrow APR, variable": 1.9875 },
    { "Utilization Rate": 80, "Borrow APR, variable": 2 },
    { "Utilization Rate": 81, "Borrow APR, variable": 2.4 },
    { "Utilization Rate": 82, "Borrow APR, variable": 2.8 },
    { "Utilization Rate": 83, "Borrow APR, variable": 3.2 },
    { "Utilization Rate": 84, "Borrow APR, variable": 3.6 },
    { "Utilization Rate": 85, "Borrow APR, variable": 4 },
    { "Utilization Rate": 86, "Borrow APR, variable": 4.4 },
    { "Utilization Rate": 87, "Borrow APR, variable": 4.8 },
    { "Utilization Rate": 88, "Borrow APR, variable": 5.2 },
    { "Utilization Rate": 89, "Borrow APR, variable": 5.6 },
    { "Utilization Rate": 90, "Borrow APR, variable": 6 },
    { "Utilization Rate": 91, "Borrow APR, variable": 6.4 },
    { "Utilization Rate": 92, "Borrow APR, variable": 6.8 },
    { "Utilization Rate": 93, "Borrow APR, variable": 7.2 },
    { "Utilization Rate": 94, "Borrow APR, variable": 7.6 },
    { "Utilization Rate": 95, "Borrow APR, variable": 8 },
    { "Utilization Rate": 96, "Borrow APR, variable": 8.4 },
    { "Utilization Rate": 97, "Borrow APR, variable": 8.8 },
    { "Utilization Rate": 98, "Borrow APR, variable": 9.2 },
    { "Utilization Rate": 99, "Borrow APR, variable": 9.6 },
    { "name": "100%", "Utilization Rate": 100, "Borrow APR, variable": 10 },
]

module.exports = {
    ETHEREUM_ADDRESS, BaseURI, intersetRate, EthereumCode, ScrollCode, EthereumScan, ScrollScan
}
