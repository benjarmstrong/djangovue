const x = 'Hello world from index.js';
console.log(x);

window.Vue = require('vue');

// Configure API calls
import { AVRest } from './avrest.js';
let avrest = AVRest()
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    console.log('Assigning avrest csrf token to ' + token.content)
    avrest.inject_headers['X-CSRFToken'] = token.content;
} 
else {
    console.error('CSRF token not found. API calls may not work.');
}

// Can pass vars to vue components here via
//    Vue.prototype.$x = x;
// Then in component:
//    this.$x // or {{ $x }} in template

Vue.prototype.$avrest = avrest;

Vue.component('vue-test', require('./components/vuetest.vue').default);
Vue.component('test-rest', require('./components/testrest.vue').default);

const app = new Vue({el: '#app'});