
import axios from "axios"
// import { AsyncStorage } from 'AsyncStorage';
import API from "./API"
// import AsyncStorage from '@react-native-community/async-storage';


class Global {

    static getRequest(url) {
        return new Promise((resolve) => {
            const token = localStorage.getItem(API.key)
            axios.get(API.BASE_URL + url, { headers: { Authorization: 'Bearer ' + token } })
                .then((res) => {
                    // console.log(res, 'res')
                    resolve(res)
                })
                .catch((err) => {
                    // console.log(err, 'err')
                    resolve(err)
                })
        })
    }

    static postRequest(url, data) {
        return new Promise(resolve => {
            const token = localStorage.getItem(API.key)
            axios.post(API.BASE_URL + url, data, { headers: { Authorization: 'Bearer ' + token } })
                .then((res) => {
                    // console.log(res, 'res')
                    resolve(res)
                })
                .catch((err) => {
                    // console.log(err, 'err', err.message)
                    resolve(err)
                })
        })
    }
    static saveData(key, data) {
        localStorage.setItem(key, data)
        // console.log("KEY", key)
        // console.log("DATA", data)

    }

    static getData(key) {
        return new Promise(resolve => {
            const res = localStorage.getItem(key)
            resolve(res)
        })
    }
    static removeData(key) {
        localStorage.removeItem(key);
        console.log("DELTED")
    }
}
export default Global