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
            redirect: '/Prophets',
            children: [
                {
                    path: '/Prophets',
                    name: 'Prophets',
                    component: require('./components/Prophets.vue').default
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
