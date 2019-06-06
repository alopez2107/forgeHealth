<template>
    <div class="row">
        <div class="col-sm-6">
            <div class="card kaiser-card" style="width: 18rem;">
                <img src="../assets/passwordReset.jpg" class="card-img-top">
                <h5 class="kaiser-title-dark-bg">Password Reset</h5>
                <p class="kaiser-text-dark-bg">Password Reset Successful.</p>
            </div>
        </div>
        <div class="col-sm-6 pwdResetActions">
            <button @click="onLogin" class="btn kaiser-btn-primary">Login</button>
        </div>
    </div>
</template>

<script>
    import api from "../api/fridm";
    import webApi from '../api/webutils';
    import { mapActions } from 'vuex';

    export default {
        name: "CompletePwdReset",
        methods: {
            ...mapActions(['updateFRSSOCookie','fetchProfile', 'updateIsPwdReset', 'logout']),
            onLogin() {
                this.logout();
                window.location = "http://kpdemoapp.frdpcloud.com:7777/kpdemoapp/stephen/login";
            }
        },
        created() {
            this.updateIsPwdReset(true);
            const iPlanetDirectoryPro = webApi.getCookie('iPlanetDirectoryPro');
            console.log(iPlanetDirectoryPro);
            if (iPlanetDirectoryPro.length > 0) {
                this.updateFRSSOCookie(iPlanetDirectoryPro);
            }
        }
    }
</script>

<style scoped>
    .pwdResetActions {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        background-color: #e8e8e8;
        color: #006ba6;
        height: 40vh;
        width: 100vw;
    }

    .kaiser-text-clear-bg {
        color: #006ba6;
    }

</style>