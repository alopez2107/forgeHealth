import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';
import UseCaseOne from './components/UseCaseOne';
import UseCaseTwo from './components/UseCaseTwo';
import UseCaseThree from './components/UseCaseThree';
import UseCaseFour from './components/UseCaseFour';
import UseCaseFive from './components/UseCaseFive';
import CompletePwdReset from './components/CompletePwdReset';
import Preferences from './components/Preferences';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import Login from './components/Login';
import LoginDone from './components/LoginDone';
import UserLocking from './components/UserLocking';
import CustomerMFA from './components/CustomerMFA';
import StephenLogin from './components/StephenLogin';
import Logout from './components/Logout';
import Devices from './components/Devices';
import Registration from './components/Registration';
import RegDone from './components/RegDone';
import OAMLogin from './components/OAMLogin';


import store from './store';


Vue.use(VueRouter);
Vue.use(VueCookies);


export const router = new VueRouter ({
    mode: 'history',
    routes: [
        {
            path: '/fhdemoapp',
            component: Home
        },
        {
            path: '/fhdemoapp/register',
            component: Registration
        },
        {
            path: '/fhdemoapp/registration/done',
            component: RegDone
        },
        {
            path: '/fhdemoapp/login',
            component: Login
        },
        {
            path: '/fhdemoapp/oam/login',
            component: OAMLogin
        },
        {
            path: '/fhdemoapp/login/done',
            component: LoginDone
        },
        {
            path: '/fhdemoapp/logout',
            component: Logout
        },
        {
            path: '/fhdemoapp/stephen/login',
            component: StephenLogin
        },
        {
            path: '/fhdemoapp/option1',
            component: UseCaseOne
        },
        {
            path: '/fhdemoapp/option2',
            component: UseCaseTwo
        },
        {
            path: '/fhdemoapp/option3',
            component: UseCaseThree
        },
        {
            path: '/fhdemoapp/option4',
            component: UseCaseFour
        },
        {
            path: '/fhdemoapp/pwdResetComplete',
            component: CompletePwdReset
        },
        {
            path: '/fhdemoapp/preferences',
            component: Preferences
        },
        {
            path: '/fhdemoapp/profile',
            component: UserProfile
        },
        {
            path: '/fhdemoapp/userLock',
            component: UserLocking
        },
        {
            path: '/fhdemoapp/customer/mfa',
            component: CustomerMFA
        },
        {
            path: '/fhdemoapp/devices',
            component: Devices
        }
    ]
});

new Vue({
    store,
    router,
    Home,
    Login,
    LoginDone,
    StephenLogin,
    UseCaseOne,
    UseCaseTwo,
    UseCaseThree,
    UseCaseFour,
    UseCaseFive,
    CompletePwdReset,
    Preferences,
    UserProfile,
    UserLocking,
    CustomerMFA,
    Logout,
    Devices,
    Registration,
    RegDone,
    OAMLogin,
    render: h => h(App),
}).$mount('#app');
