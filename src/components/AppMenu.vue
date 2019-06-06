<template>
    <div v-if="isLoggedIn" class="row">
        <div class="col-sm-3">
            <button class="menuLink" @click="onFRDPPortal">FRDP Portal</button>
        </div>
        <div class="col-sm-3">
            <router-link class="menuLink" to="/fhdemoapp/devices">Manage MFA Devices</router-link>
        </div>
        <div v-if="isHelpDesk" class="col-sm-3">
            <router-link class="menuLink" to="/fhdemoapp/userLock">Security Member Locking</router-link>
        </div>
        <div v-if="isHelpDesk" class="col-sm-3">
            <router-link class="menuLink" to="/fhdemoapp/customer/mfa">Member MFA Preferences</router-link>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "AppMenu",
        computed: {
            ...mapGetters(['isLoggedIn', 'isHelpDesk'])
        },
        methods: {
            execUseCaseOne() {
                window.location = `https://hc.frdpcloud.com/openam/XUI/?realm=/&service=OAMTree&goto=${encodeURIComponent("https://hc.frdpcloud.com/fhdemoapp/option1")}`;
            },
            onFRDPPortal() {
                window.location = 'https://hc.frdpcloud.com/apps/frdp/';
            },
            execUseCaseTwo() {

            },
            execUseCaseThree() {

            },
            execUseCaseFour() {

            }
        }
    }
</script>

<style scoped>
    .menuLink {
        background-color: transparent;
        color: #006ba6;
        outline: transparent;
        font-family: Tahoma;
        font-size: small;
    }

</style>