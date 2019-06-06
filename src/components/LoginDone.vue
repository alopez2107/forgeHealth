<template>
    
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import webApi from '../api/webutils';
    import { router } from '../main';

    export default {
        name: "login-done",
        computed: {
            ...mapGetters(['loggedInUserID'])
        },
        methods: {
            ...mapActions(['updateFRSSOCookie','fetchProfile', 'resolveAuthz', 'updateIsPwdReset', 'updateLoginId', 'updatePassword'])
        },
        created() {
            this.updateLoginId(null);
            this.updatePassword(null);
            this.updateIsPwdReset(false);
            const iPlanetDirectoryPro = window.$cookies.get('iPlanetDirectoryPro');
            console.log(iPlanetDirectoryPro);
            if (iPlanetDirectoryPro.length > 0) {
                this.updateFRSSOCookie(iPlanetDirectoryPro);
            }
            this.resolveAuthz();
            router.push('/fhdemoapp');
        }
    }
</script>

<style scoped>

</style>