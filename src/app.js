console.log('this is app.js')
require('./style.1.css');

import Vue from "vue"

let vm = new Vue({
    el:"#app",
    data(){
        return {
            message:"123"
        }
    }
})