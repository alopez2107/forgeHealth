<template>
    <div class="row">
        <div class="card kaiser-card" style="width: 23rem;">
            <img src="../assets/user-profile.png" class="card-img-top">
            <div class="card-body">
                <h5 class="kaiser-title-dark-bg">User Profile</h5>&nbsp;&nbsp;&nbsp;
                <p class="kaiser-text-dark-bg">You can modify your profile information here.</p>
            </div>
        </div>
        <div class="col-sm-6">
            <form>
                <div class="form-group">
                    <label for="givenName">First Name</label>
                    <input type="text" class="form-control" id="givenName" placeholder="Enter Your First Name" @input="onInputGivenName" :value="firstName">
                </div>
                <div class="form-group">
                    <label for="sn">Last Name</label>
                    <input type="text" class="form-control" id="sn" placeholder="Enter Your Last Name" @input="onInputSN" :value="lastName">
                </div>
                <div class="form-group">
                    <label for="mail">E-Mail</label>
                    <input type="text" class="form-control" id="mail" placeholder="Enter Your E-Mail Address" @input="onInputMail" :value="email">
                </div>
                <div class="form-group">
                    <label for="telephoneNumber">Telephone Number</label>
                    <input type="text" class="form-control" id="telephoneNumber" placeholder="Enter Your Contact Phone Number" @input="onInputTelephoneNumber" :value="telephoneNumber">
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <button type="button" class="btn kaiser-btn-primary" @click="saveProfileChanges">Save</button>
                    </div>
                    <div class="col-md-6">
                        <router-link to="/fhdemoapp" class="btn btn-outline-secondary">Cancel</router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import api from '../api/fridm';
    import { mapActions, mapGetters } from 'vuex';

    var modifiedAttributes = [
        {
            attrName: "givenName",
            attrModified: false
        },
        {
            attrName: "sn",
            attrModified: false
        },
        {
            attrName: "mail",
            attrModified: false
        },
        {
            attrName: "telephoneNumber",
            attrModified: false
        }
    ];



    export default {
        name: "UserProfile",
        computed: {
            ...mapGetters(['usrProfile']),
            firstName() {
                if (this.usrProfile) {
                    return this.usrProfile['givenName'];
                }
                else {
                    return null;
                }
            },
            lastName() {
                if (this.usrProfile) {
                    return this.usrProfile['sn'];
                }
                else {
                    return null;
                }
            },
            email() {
                if (this.usrProfile) {
                    return this.usrProfile['mail'];
                }
                else {
                    return null;
                }
            },
            telephoneNumber() {
                if (this.usrProfile) {
                    return this.usrProfile['telephoneNumber'];
                }
                else {
                    return null;
                }
            }
        },
        methods: {
            ...mapActions(['updateProfile', 'updateGivenNameChanged', 'updateSNChanged', 'updateMailChanged', 'updateTelephoneNumberChanged', 'saveProfileChanges']),
            onInputGivenName: function (event) {
                this.updateGivenNameChanged(true);
                const profile = {
                    "givenName": event.target.value
                };
                this.updateProfile(profile);
                console.log(profile.givenName);
            },
            onInputSN: function (event) {
                this.updateSNChanged(true);
                const profile = {
                    "sn": event.target.value
                };
                this.updateProfile(profile);
                console.log(this.usrProfile.sn);
            },
            onInputMail: function (event) {
                this.updateMailChanged(true);
                const profile = {
                    "mail": event.target.value
                };
                this.updateProfile(profile);
                console.log(this.usrProfile.mail);
            },
            onInputTelephoneNumber: function (event) {
                this.updateTelephoneNumberChanged(true);
                const profile = {
                    "telephoneNumber": event.target.value
                };
                this.updateProfile(profile);
                console.log(this.usrProfile.telephoneNumber);
            }
        }
    }
</script>

<style scoped>
    .kaiser-btn {
        outline-style: solid;
        outline-color: #e8e8e8;
        color: #e8e8e8;
    }

</style>