<template>
    <div class="row">
        <div class="card kaiser-card" style="width: 23rem;">
            <img src="../assets/login-img.png" class="card-img-top">
            <div class="card-body">
                <h5 class="kaiser-title-dark-bg">Member Login</h5>&nbsp;&nbsp;&nbsp;
                <p class="kaiser-text-dark-bg">Please provide your user ID<br>and Password to Login.</p>
            </div>
        </div>
        <div class="col-sm-6">
            <form>
                <div class="form-group">
                    <label for="userName">User Name</label>
                    <input type="text" class="form-control" id="userName" placeholder="Enter Your User Name" @input="onInputUserName">
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" aria-describedby="pwdHelp" placeholder="Enter Password" @input="onInputPassword">
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <button type="button" class="btn kaiser-btn-primary" :disabled="isDisabled" @click="onLogin">Login</button>
                    </div>
                    <div class="col-md-6">
                        <button type="button" class="btn btn-outline-secondary" @click="onCancel">Cancel</button>
                    </div>
                </div>
            </form>
            <div class="errorMessage" v-if="isLoginError">{{ loginError }}</div>
        </div>
    </div>
    
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import {router} from '../main';

    export default {
        name: "Login",
        computed: {
            ...mapGetters(['loginId', 'password', 'isLoginError', 'loginError']),
            isDisabled() {
                return (this.loginId == null || this.password == null || this.loginId.length == 0 || this.password.length == 0);
            }
        },
        methods: {
            ...mapActions(['login', 'updateLoginId', 'updatePassword']),
            onLogin() {
                this.login();
            },
            onCancel() {
                this.updateLoginId(null);
                this.updatePassword(null);
                router.push('/kpdemoapp');
            },
            onInputUserName: function (event) {
                this.updateLoginId(event.target.value);
            },
            onInputPassword: function (event) {
                this.updatePassword(event.target.value);
            }
        }
    }
</script>

<style scoped>

</style>