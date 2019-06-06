<template>
    <div class="row">
        <div class="col-md-5" v-if="selectedUser">
            <div class="row">
                <div class="col-sm-3">
                    <p class="fieldLabel">User Login ID</p>
                </div>
                <div class="col-sm-3">
                    <p class="fieldValue">{{ selectedUser.userName }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-3">
                    <p class="fieldLabel">First Name</p>
                </div>
                <div class="col-sm-3">
                    <p class="fieldValue">{{ selectedUser.givenName }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-3">
                    <p class="fieldLabel">Last Name</p>
                </div>
                <div class="col-sm-3">
                    <p class="fieldValue">{{ selectedUser.sn }}</p>
                </div>
            </div>
        </div>
        <div class="col-md-7" v-if="selectedUser">
            <form>
                <div class="form-group">
                    <label for="mfaChoice">MFA Method Trigger Preference</label>
                    <select id="mfaChoice" v-model="selectedUserMFAChoice" class="custom-select" @change="onMFAChoiceChange($event)">
                        <option v-for="choice in mfaChoicesHD" :value="choice.value">{{ choice.display }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="mfaPref">MFA Method Choice</label>
                    <select id="mfaPref" v-model="selectedUserMFAPref" class="custom-select" @change="onMFAPrefChange($event)">
                        <option v-for="pref in mfaPrefs" :value="pref.value">{{ pref.display }}</option>
                    </select>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <button type="button" class="btn btn-primary" @click="saveSelectedUserProfile">Save</button>
                    </div>
                    <div class="col-sm-3">
                        <router-link to="/kpdemoapp" class="btn btn-outline-secondary">Cancel</router-link>
                    </div>
                </div>
            </form>
        </div>
        <div v-else>
            <p>Select a User...</p>
        </div>
    </div>
    
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: "UserMFAView",
        computed: {
            ...mapGetters(['selectedUser', 'mfaChoicesHD', 'mfaPrefs']),
            selectedUserMFAChoice() {
                return this.selectedUser.frdpmfachoice;
            },
            selectedUserMFAPref() {
                return this.selectedUser.frdpmfapref;
            }
        },
        methods: {
            ...mapActions(['updateFrdpMFAChoiceChanged', 'updateFrdpMFAPrefChanged', 'updateSelectedUserMFAChoice', 'updateSelectedUserMFAPref', 'saveSelectedUserProfile']),
            onMFAChoiceChange(event) {
                this.updateFrdpMFAChoiceChanged(true);
                console.log(event.target.value);
                this.updateSelectedUserMFAChoice(event.target.value);
            },
            onMFAPrefChange(event) {
                this.updateFrdpMFAPrefChanged(true);
                this.updateSelectedUserMFAPref(event.target.value);
            }
        }
    }
</script>

<style scoped>
    .fieldLabel {
        font-size: small;
        font-style: italic;
        padding: 15px;
        text-align: right;
        vertical-align: middle;
    }

    .fieldValue {
        font-size: small;
        color: cadetblue;
        padding: 15px;
        text-align: justify;
        vertical-align: middle;
    }

</style>