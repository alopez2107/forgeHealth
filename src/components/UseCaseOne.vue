<template>
    <div class="row">
        <div class="col-sm-6">
            <form>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" aria-describedby="pwdHelp" placeholder="Enter Password" @input="onInputPassword">
                    <small id="pwdHelp" class="form-text text-muted">Password must be 8 characters long, with at least 1 capital letter and a number.</small>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" class="form-control" id="confirmPassword" placeholder="Re-enter Password" @input="onInputPwdConfirm">
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <button type="button" class="btn btn-primary" @click="onPasswordReset">Reset Password</button>
                    </div>
                    <div class="col-sm-3">
                        <router-link to="/kpdemoapp" class="btn btn-outline-secondary">Cancel</router-link>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-sm-6">
            <div class="card" style="width: 23rem;">
                <img src="../assets/passwordReset.jpg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Password Reset</h5>&nbsp;&nbsp;&nbsp;
                    <p class="card-text">You can reset your password here. You will need a Second Factor Authentication Setup.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../api/fridm';
    import { mapActions } from 'vuex';

    export default {
        name: "UseCaseOne",
        methods: {
            ...mapActions(['logout']),
            async onPasswordReset() {
                const pwd = window.localStorage.getItem('password');
                const pwdConfirm = window.localStorage.getItem('passwordConfirm');
                if (pwd === pwdConfirm) {
                    window.localStorage.setItem('password', pwd);
                    this.logout();
                    window.location = `https://kp.frdpcloud.com/openam/XUI/?realm=/&service=OAM_MFA_Choice_Profile&goto=${encodeURIComponent("http://kpdemoapp.frdpcloud.com:7777/kpdemoapp/pwdResetComplete")}`;
                }
                else {
                    // Present an alert or something to tell users this is not OK.
                }
            },
            onInputPassword: function (event) {
                console.log(event.target.value);
                window.localStorage.setItem("password", event.target.value);
            },
            onInputPwdConfirm: function (event) {
                console.log(event.target.value);
                window.localStorage.setItem("passwordConfirm", event.target.value);
            }
        }
    }
</script>

<style scoped>
    h5 {
        color: cadetblue;
        font-family: Georgia;
    }

    p {
        color: darkblue;
        font-family: Arial;
        font-size: small;
    }

</style>