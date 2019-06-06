<template>
    <div class="row">
        <div class="col-sm-3">
            <label for="searchBy">Search By</label>
            <select id="searchBy" v-model="selectedSearchAttribute" class="custom-select" @change="onSelectedSearchAttrChanged($event)">
                <option v-for="attribute in searchAttributes" :value="attribute.value">{{ attribute.display }}</option>
            </select>
        </div>
        <div class="col-sm-3">
            <label for="searchOp">Operation</label>
            <select id="searchOp" v-model="selectedSearchOp" class="custom-select" @change="onSelectedSearchOpChanged($event)">
                <option v-for="op in searchOps" :value="op.value">{{ op.display }}</option>
            </select>
        </div>
        <div class="col-sm-3">
            <label for="searchCriteria">Search Value</label>
            <input id="searchCriteria" type="text" class="form-control" @change="onSearchCriteriaValueChanged($event)" :value="searchCriteriaValue">
        </div>
        <div class="col-sm-3">
            <div class="row buttonCell">
                <button id="search" type="button" class="btn btn-outline-secondary" @click="onSearch">Search</button>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "UserSearch",
        data: function() {
            return {
                result: null
            }
        },
        computed: {
            ...mapGetters(['searchAttributes', 'searchOps', 'selectedSearchAttribute', 'selectedSearchOp', 'searchCriteriaValue', 'searchResults'])
        },
        methods: {
            ...mapActions(['updateSelectedSearchAttribute', 'updateSelectedSearchOp', 'updateSearchCriteriaValue', 'search']),
            onSelectedSearchAttrChanged(event) {
                this.updateSelectedSearchAttribute(event.target.value);
            },
            onSelectedSearchOpChanged(event) {
                this.updateSelectedSearchOp(event.target.value);
            },
            onSearchCriteriaValueChanged(event) {
                this.updateSearchCriteriaValue(event.target.value);
            },
            onSearch() {
                this.search();
            },
            onRowSelected(selectedRow) {
                this.$emit('rowSelected', selectedRow);
            }
        }
    }
</script>

<style scoped>
    .buttonCell {
       vertical-align: bottom;
    }

</style>