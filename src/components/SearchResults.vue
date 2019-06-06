<template>
    <div v-if="searchResults" class="row">
        <div class="col-md-12">
            <ul class="list-group" >
                <SearchResultItem v-for="result in searchResults" :result="result" :key="result._id"></SearchResultItem>
            </ul>
        </div>
    </div>
</template>

<script>
    import SearchResultItem from './SearchResultItem';

    export default {
        name: "SearchResults",
        props: ['searchResults'],
        components: {
            SearchResultItem
        }
    }
</script>

<style scoped>

</style>