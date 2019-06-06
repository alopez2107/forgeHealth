<template>
    <div class="row">
        <div class="col-md-7" v-if="selectedUser">
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
            <div class="row">
                <div class="col-sm-3">
                    <p class="fieldLabel">E-Mail</p>
                </div>
                <div class="col-sm-3">
                    <p class="fieldValue">{{ selectedUser.mail }}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Select a User...</p>
        </div>
        <div class="col-md-5" v-if="selectedUser">
            <div v-if="!selectedUserLocked">
                <button type="button" class="btn btn-danger" @click="onLockClick(true)">Lock User</button>
            </div>
            <div v-else>
                <button type="button" class="btn btn-danger" @click="onLockClick(false)">Un-Lock User</button>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: "UserView",
        data: function() {
            return {
                locked: false
            };
        },
        computed: {
            ...mapGetters(['selectedUser', 'selectedUserLocked'])
        },
        methods: {
            ...mapActions(['lockUser', 'unlockUser', 'updateSelectedUser', 'updateSelectedUserStatus']),
            onLockClick(value) {
                this.locked = value;
                console.log(this.locked);
                if (this.locked) {
                    this.updateSelectedUserStatus('inactive');
                    this.lockUser();
                }
                else {
                    this.updateSelectedUserStatus('active');
                    this.unlockUser();
                }
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