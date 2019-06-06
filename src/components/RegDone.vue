<template>
    <div class="row">
        <div class="card kaiser-card" style="width: 23rem;">
            <img src="../assets/registration_banner.jpg" class="card-img-top">
            <div class="card-body">
                <h5 class="kaiser-title-dark-bg">Member Registration</h5>&nbsp;&nbsp;&nbsp;
                <p class="kaiser-text-dark-bg">You can Register as a Member<br>and pick your MFA preferences here.</p>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="card-body">
                <h5>Your E-Mail Verification was Successful. Click the<br>button below to Complete your Registration:</h5>
                <button type="button" class="btn kaiser-btn-primary" @click="onClose">Complete</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: "RegDone",
        computed: {
            ...mapGetters(['regStatus'])
        },
        methods: {
            ...mapActions(['finishRegistration','updateRegToken', 'updateRegEmailVerificationCode']),
            onClose() {
                const params = window.location.hash;
                const token = params.split("&")[1].split("=")[1];
                const code = params.split("&")[2].split("=")[1];
                this.updateRegToken(token);
                this.updateRegEmailVerificationCode(code);
                this.finishRegistration();
            }
        }
    }
</script>

<style scoped>

</style>