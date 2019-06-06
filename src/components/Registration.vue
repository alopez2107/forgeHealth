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
            <form>
                <div class="form-group">
                    <label for="userName">User Name</label>
                    <input type="text" class="form-control" id="userName" placeholder="Enter Your User Name" @input="onInputUserName">
                </div>
                <div class="form-group">
                    <label for="guid">User GUID</label>
                    <input type="text" class="form-control" id="guid" placeholder="Enter Your GUID" @input="onInputUserGUID">
                </div>
                <div class="form-group">
                    <label for="givenName">First Name</label>
                    <input type="text" class="form-control" id="givenName" placeholder="Enter Your First Name" @input="onInputGivenName">
                </div>
                <div class="form-group">
                    <label for="sn">Last Name</label>
                    <input type="text" class="form-control" id="sn" placeholder="Enter Your Last Name" @input="onInputSN">
                </div>
                <div class="form-group">
                    <label for="mail">E-Mail</label>
                    <input type="text" class="form-control" id="mail" placeholder="Enter Your E-Mail Address" @input="onInputMail">
                </div>
                <div class="form-group">
                    <label for="telephoneNumber">Telephone Number</label>
                    <input type="text" class="form-control" id="telephoneNumber" placeholder="Enter Your Contact Phone Number" @input="onInputTelephoneNumber">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" aria-describedby="pwdHelp" placeholder="Enter Password" @input="onInputPassword">
                    <small id="pwdHelp" class="form-text text-muted">Password must be 8 characters long, with at least 1 capital letter and a number.</small>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" class="form-control" id="confirmPassword" placeholder="Re-enter Password" @input="onInputPwdConfirm">
                    <small v-if="displayError" id="pwdConfirmHelp" class="form-text text-muted">Password Confirm does not match the provided password.</small>
                </div>
                <div class="form-group">
                    <label for="mfaChoice">MFA Method Trigger Preference</label>
                    <select id="mfaChoice" v-model="selectedMFAChoice" class="custom-select" @change="onMFAChoiceChange($event)">
                        <option v-for="choice in mfaChoices" :value="choice.value">{{ choice.display }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="mfaPref">MFA Method Choice</label>
                    <select id="mfaPref" v-model="selectedMFAPref" class="custom-select" @change="onMFAPrefChange($event)">
                        <option v-for="pref in mfaPrefs" :value="pref.value">{{ pref.display }}</option>
                    </select>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <button type="button" class="btn kaiser-btn-primary" @click="onSubmitRegistration" :disabled="isDisabled">Submit Registration</button>
                    </div>
                    <div class="col-md-6">
                        <router-link to="/kpdemoapp" class="btn btn-outline-secondary">Cancel</router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "Registration",
        data() {
            return {
                user: {
                    userName: null,
                    guid: null,
                    givenName: null,
                    sn: null,
                    mail: null,
                    password: null,
                    passwordConfirm: null,
                    telephoneNumber: null,
                    frdpmfachoice: null,
                    frdpmfapref: null
                },
                displayError: false
            };
        },
        computed: {
            ...mapGetters(['mfaChoices', 'mfaPrefs']),
            isDisabled() {
                return (this.user.userName == null || this.user.userName.length == 0 ||
                        this.user.givenName == null || this.user.givenName.length == 0 ||
                        this.user.sn == null || this.user.sn.length == 0 ||
                        this.user.mail == null || this.user.mail.length == 0 ||
                        this.user.password == null || this.user.password.length == 0 ||
                        this.user.passwordConfirm == null || this.user.passwordConfirm.length == 0 || this.user.password != this.user.passwordConfirm);
            }
        },
        methods: {
            ...mapActions(['retrieveSelfRegConfig', 'registerUser', 'updateRegUser']),
            onSubmitRegistration() {
                if (this.user.password === this.user.passwordConfirm) {
                    this.displayError = false;
                    this.updateRegUser(this.user);
                    this.registerUser();
                }
                else {
                    this.displayError = true;
                }

            },
            onInputPassword: function (event) {
                this.user.password = event.target.value;
            },
            onInputPwdConfirm: function (event) {
                this.user.passwordConfirm = event.target.value;
                if (this.user.password === this.user.passwordConfirm) {
                    this.displayError = false;
                }
                else {
                    this.displayError = true;
                }
            },
            onInputGivenName: function (event) {
                this.user.givenName = event.target.value;
            },
            onInputSN: function (event) {
                this.user.sn = event.target.value;
            },
            onInputMail: function (event) {
                this.user.mail = event.target.value;
            },
            onInputTelephoneNumber: function (event) {
                this.user.telephoneNumber = event.target.value;
            },
            onInputUserName: function (event) {
                this.user.userName = event.target.value;
            },
            onInputUserGUID: function (event) {
                this.user.guid = event.target.value;
            },
            onMFAChoiceChange(event) {
                this.user.frdpmfachoice = event.target.value;
            },
            onMFAPrefChange(event) {
                this.user.frdpmfapref = event.target.value;
            }
        },
        created() {
            const selfRegConfig = this.retrieveSelfRegConfig();
            console.log(selfRegConfig);
        }
    }
</script>

<style scoped>

</style>