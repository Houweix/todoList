import Vue from 'vue';
import App from './app.vue';

new Vue({
    // vue2.0
    // render: function (createElement) {
    //     return createElement(App);
    // }
    render: (h) =>h(App)

    // 如果没有指定#el，可以使用$mount手动挂载
}).$mount()