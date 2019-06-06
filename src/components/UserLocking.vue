<template>
    <div>
        <UserSearch></UserSearch>
        <SearchResults :searchResults="searchResults"></SearchResults>
        <UserView></UserView>
    </div>
    
</template>

<script>
    import UserSearch from './UserSearch';
    import SearchResults from './SearchResults';
    import UserView from './UserView';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        components: {
            UserSearch,
            SearchResults,
            UserView
        },
        name: "UserLocking",
        computed: {
            ...mapGetters(['searchResults'])
        },
        methods: {
            ...mapActions(['updateTargetUserId']),
            onRowSelected(selectedRow) {
                this.selectedUser = selectedRow;
                this.updateTargetUserId(this.selectedUser._id);
            }
        }
    }
</script>

<style scoped>

</style>