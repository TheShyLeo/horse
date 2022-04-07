import Vue from 'vue'
import Router from 'vue-router'
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error);
};

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: require('./views/Home.vue').default,
            redirect: '/prophet',
            children: [
                {
                    path: '/prophet',
                    name: 'prophet',
                    component: require('./components/Prophet.vue').default
                },
                {
                    path: '/setting',
                    name: 'setting',
                    component: require('./components/Setting.vue').default
                },
            ]
        }
    ]
})
