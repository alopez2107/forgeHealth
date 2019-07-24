<template>
    <div class="row">
        <div class="card kaiser-card" style="width: 23rem;">
            <img src="../assets/Authentication_Choices.jpg" class="card-img-top">
            <div class="card-body">
                <h5 class="kaiser-title-dark-bg">Authentication Preferences</h5>&nbsp;&nbsp;&nbsp;
                <p class="kaiser-text-dark-bg">You can select your method of Authentication<br>and the time when MFA is to be triggered.</p>
            </div>
        </div>
        <div class="col-sm-6">
            <form>
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
                    <div class="col-sm-4">
                        <button type="button" class="btn kaiser-btn-primary" @click="saveProfileChanges">Save</button>
                    </div>
                    <div class="col-sm-4">
                        <router-link to="/fhdemoapp" class="btn btn-outline-secondary">Cancel</router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: "Preferences",
        methods: {
            ...mapActions(['initPreferences', 'updateFrdpMFAChoiceChanged', 'updateFrdpMFAPrefChanged', 'updateSelectedMFAChoice', 'updateSelectedMFAPref', 'saveProfileChanges', 'logout']),
            onMFAChoiceChange(event) {
                this.updateFrdpMFAChoiceChanged(true);
                this.updateSelectedMFAChoice(event.target.value);
            },
            onMFAPrefChange(event) {
                this.updateFrdpMFAPrefChanged(true);
                this.updateSelectedMFAPref(event.target.value);
            },
            registerPushDevice() {
                this.saveProfileChanges();
                this.logout();
                window.location = `https://kp.frdpcloud.com/openam/XUI/?service=OAMChain&goto=${encodeURIComponent("https://mfa-poc-forgerock.kaiserpermanente.org/kpdemoapp/login/done")}#login`;
            }
        },
        computed: {
            ...mapGetters(['usrProfile', 'isMFAChoiceConfigured', 'isMFAPrefConfigured', 'selectedMFAChoice', 'selectedMFAPref', 'mfaChoices', 'mfaPrefs', 'isPUSHChosen']),
            frdpMFAChoice() {
                if (this.isMFAChoiceConfigured) {
                    return this.usrProfile['frdpmfachoice'];
                }
                else {
                    return null;
                }
            },
            frdpMFAPref() {
                if (this.isMFAPrefConfigured) {
                    return this.usrProfile['frdpmfapref'];
                }
                else {
                    return null;
                }
            }
        },
        created() {
            this.initPreferences();
        }
    }
</script>

<style scoped>

</style>