<template>

</template>

<script>
    export default {
        name: "Login",
        created() {
            window.location = `https://mfa-poc-apps-forgerock.kaiserpermanente.org/openam/XUI/?realm=/&service=OAM_MFA_Choice_Profile&goto=${encodeURIComponent("https://mfa-poc-forgerock.kaiserpermanente.org/kpdemoapp/login/done")}`;
        }
    }
</script>

<style scoped>

</style>