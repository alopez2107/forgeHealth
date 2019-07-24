<template>
    <div class="container kaiser-container">
        <div class="row" style="height: 30px;">

        </div>
        <div class="row align-items-start">
            <div class="col-lg-12 justify-content-start padding">
                <img src="../assets/forgehealth.png" style="height: 50px;width: 360px;">
            </div>
        </div>
        <div class="separator">
            <div class="col-md-12">
                <h2> </h2>
            </div>
        </div>
        <div v-if="displayButtons" class="row">
            <div class="col-sm-3">
                <h2> </h2>
            </div>
            <div class="col-sm-3">
                <router-link v-if="isLoggedIn" to="/fhdemoapp/preferences" class="btn kaiser-btn">Authentication Preferences</router-link>
            </div>
            <div class="col-sm-3">
                <button v-if="isLoggedIn" type="button" class="btn kaiser-btn" @click="onUserProfile">User Profile</button>
            </div>
            <div class="col-sm-3 logout">
                <div class="row">
                    <div class="col-sm-6">
                        <p class="userHdr">Welcome:<br>{{ usrProfile.givenName}} {{ usrProfile.sn }}</p>
                    </div>
                    <div class="col-sm-6">
                        <button v-if="isLoggedIn" type="button" class="btn kaiser-btn" @click="onLogout">Logout</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="row">
            <div class="col-sm-6">
                <h2> </h2>
            </div>
            <div class="col-sm-3">
                <button v-if="!isPwdReset" class="btn kaiser-btn" @click="onRegister">Registration</button>
            </div>
            <div class="col-sm-3">
                <button v-if="!isPwdReset" to="/fhdemoapp/login" class="btn kaiser-btn" @click="onLogin">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { router } from '../main';
    import { mapActions, mapGetters } from 'vuex';
    import webApi from '../api/webutils';

    export default {
        name: "AppHeader",
        computed: {
            ...mapGetters(['isLoggedIn', 'usrProfile', 'isPwdReset']),
            displayButtons() {
                return (this.isLoggedIn && !this.isPwdReset);
            }
        },
        methods: {
            ...mapActions(['logout']),
            async onUserProfile() {
                router.push("/fhdemoapp/profile");
            },
            onLogout() {
                this.logout();
                webApi.delete_cookie('OAMAuthnCookie_kpdemoapp.frdpcloud.com:7777');
                router.push("/fhdemoapp");
                //window.location = `http://kpdemoapp.frdpcloud.com:7777/kpdemoapp/logout?end_url=${encodeURIComponent("http://kpdemoapp.frdpcloud.com:7777/kpdemoapp")}`;
            },
            onLogin() {
                window.location = `https://hc.frdpcloud.com/openam/XUI/?service=FR_MFA_Choice_Profile&goto=${encodeURIComponent("https://hc.frdpcloud.com/fhdemoapp/login/done")}`;
            },
            onRegister() {
                window.location = `https://hc.frdpcloud.com/openam/XUI/#login&service=RegisterIDProofing&goto=${encodeURIComponent("https://hc.frdpcloud.com/fhdemoapp/login/done")}`;
            }
        }
    }
</script>

<style scoped>
    .apptitle {
        display: table-cell;
        vertical-align: middle;
        color: #0140c1;
    }

    .headerRow {
        height: 40px;
    }

    img {
        height: 9vh;
        width: 17vw;
    }

    .logout {
        align-content: center;
        width: 20vw;
    }

    .userHdr {
        color: #0140c1;
        font-size: small;
        font-family: Verdana;
    }

    .kaiser-container {
        background-color: #e6f2ff;
        width: 100%;
        height: 33vh;
    }

    .vcenter {
        display: flex;
        vertical-align: middle;
        float: none;
    }

</style>