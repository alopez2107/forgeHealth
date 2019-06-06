<template>
    <li class="list-group-item" @click="onUserSelected">
        <div class="row">
            <div class="col-sm-2 kaiserResultColumn">
                <p>{{ result.userName }}</p>
            </div>
            <div class="col-sm-2 kaiserResultColumn">
                <p>{{ result.givenName }}</p>
            </div>
            <div class="col-sm-3 kaiserResultColumn">
                <p>{{ result.sn }}</p>
            </div>
            <div class="col-sm-5 kaiserResultColumn">
                <p>{{ result.mail }}</p>
            </div>
        </div>
    </li>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: "SearchResultItem",
        props: ['result'],
        methods: {
            ...mapActions(['updateSelectedUser', 'updateTargetUserId']),
            onUserSelected() {
                this.updateSelectedUser(this.result);
                this.updateTargetUserId(this.result._id);
            }
        }
    }
</script>

<style scoped>
    .resultColum {
        color: #1b6d85;
        font-size: small;
    }

    li:hover {
        background-color: #eeefff;
    }

</style>