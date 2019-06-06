<template>
    
</template>

<script>
    export default {
        name: "OAMLogin",
        created() {
            //window.location = `https://mfa-poc-apps-forgerock.kaiserpermanente.org/openam/XUI/?realm=/&service=oamCookieTree&goto=${encodeURIComponent("https://mfa-poc-forgerock.kaiserpermanente.org/kpdemoapp/login/done")}`;
            window.location = `https://mfa-poc-apps-forgerock.kaiserpermanente.org/openam/XUI/?realm=/&service=OAM_MFA_Choice_Profile&goto=${encodeURIComponent("https://mfa-poc-forgerock.kaiserpermanente.org/kpdemoapp/login/done")}`;
        }
    }
</script>

<style scoped>

</style>