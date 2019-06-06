<template>
    <div>
        <UserSearch></UserSearch>
        <SearchResults :searchResults="searchResults"></SearchResults>
        <UserMFAView></UserMFAView>
    </div>
    
</template>

<script>
    import UserSearch from './UserSearch';
    import SearchResults from './SearchResults';
    import UserMFAView from './UserMFAView';
    import { mapGetters } from 'vuex';

    export default {
        name: "CustomerMFA",
        components: {
            UserSearch,
            SearchResults,
            UserMFAView
        },
        computed: {
            ...mapGetters(['searchOps', 'searchAttributes', 'searchResults'])
        }
    }
</script>

<style scoped>

</style>