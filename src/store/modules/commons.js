import api from '../../api/fridm';
import {router} from "../../main";

const state = {
    searchAttributes: [
        {
            value: "userName",
            display: "Login Name"
        },
        {
            value: "mail",
            display: "E-Mail Address"
        },
        {
            value: "givenName",
            display: "First Name"
        },
        {
            value: "sn",
            display: "Last Name"
        },
        {
            value: "telephoneNumber",
            display: "Telephone Number"
        }
    ],
    searchOps: [
        {
            value: "sw",
            display: "Starts With"
        },
        {
            value: "eq",
            display: "Equals To"
        },
        {
            value: "co",
            display: "Contains"
        }
    ],
    deviceTypes: {
        trusted: 'trusted',
        push: 'push',
        oath: 'oath',
        fido: 'fido'
    },
    selectedSearchAttribute: null,
    selectedSearchOp: null,
    searchCriteriaValue: null,
    searchResults: null,
    selectedUser: null,
    selectedTrustedDevice: null,
    selectedPushDevice: null,
    selectedOathDevice: null,
    selectedFIDODevice: null
};

const getters = {
    searchAttributes: (state) => {
        return state.searchAttributes;
    },
    searchOps: (state) => {
        return state.searchOps;
    },
    deviceTypes: (state) => {
        return state.deviceTypes;
    },
    selectedSearchAttribute: (state) => {
        return state.selectedSearchAttribute;
    },
    selectedSearchOp: (state) => {
        return state.selectedSearchOp;
    },
    searchCriteriaValue: (state) => {
        return state.searchCriteriaValue;
    },
    searchResults: (state) => {
        return state.searchResults;
    },
    selectedUser: (state) => {
        return state.selectedUser;
    },
    selectedTrustedDevice: (state) => {
        return state.selectedDevice;
    },
    selectedPushDevice: (state) => {
        return state.selectedPushDevice;
    },
    selectedOathDevice: (state) => {
        return state.selectedOathDevice;
    },
    selectedFIDODevice: (state) => {
        return state.selectedFIDODevice;
    },
    selectedUserLocked: (state) => {
        return (!!state.selectedUser && state.selectedUser.accountStatus === 'inactive');
    }
};

const actions = {
    async search({ state, commit }) {
        const searchResp = await api.userSearch(state.selectedSearchAttribute, state.selectedSearchOp, state.searchCriteriaValue);
        commit('setSearchResults', searchResp.data.result);
    },
    updateSelectedSearchAttribute({ commit }, selectedSearchAttribute) {
        commit('setSelectedSearchAttribute', selectedSearchAttribute);
    },
    updateSelectedSearchOp( { commit }, selectedSearchOp) {
        commit('setSelectedSearchOp', selectedSearchOp);
    },
    updateSearchCriteriaValue({ commit }, searchCriteriaValue) {
        commit('setSearchCriteriaValue', searchCriteriaValue);
    },
    updateSelectedUser( { commit }, selectedUser) {
        commit('setSelectedUser', selectedUser);
    },
    updateSelectedDevice({ commit }, selectedDevice) {
        console.log("Device Type");
        console.log(selectedDevice.devType);
        console.log("About to delete: ");
        console.log(selectedDevice.selectedDevice.id);
        if (selectedDevice.devType == 'trusted') {
            commit('setSelectedTrustedDevice', selectedDevice.selectedDevice);
        }
        if (selectedDevice.devType == 'push') {
            commit('setSelectedPushDevice', selectedDevice.selectedDevice);
        }
        if (selectedDevice.devType == 'oath') {
            commit('setSelectedOathDevice', selectedDevice.selectedDevice);
        }
        if (selectedDevice.devType == 'fido') {
            commit('setSelectedFIDODevice', selectedDevice.selectedDevice);
        }
    },
    updateSelectedUserMFAChoice( { commit }, newMFAChoice) {
        commit('setSelectedUserMFAChoice', newMFAChoice);
    },
    updateSelectedUserMFAPref({ commit }, newMFAPref) {
        commit('setSelectedUserMFAPref', newMFAPref);
    },
    updateSelectedUserStatus({ commit }, newStatus) {
        commit('setSelectedUserStatus', newStatus);
    },
    async saveSelectedUserProfile({ rootState, state }) {
        const { frdpMFAChoiceChanged } = rootState.idm;
        const { frdpMFAPrefChanged } = rootState.idm;
        if ( frdpMFAChoiceChanged ) {
            await api.modifyAttribute(state.selectedUser.userName, "frdpmfachoice", state.selectedUser.frdpmfachoice);
        }
        if ( frdpMFAPrefChanged ) {
            await api.modifyAttribute(state.selectedUser.userName, "frdpmfapref", state.selectedUser.frdpmfapref);
        }
        router.push('/kpdemoapp');
    },
    async deleteSelectedDevice({ rootState, state }, deviceType) {
        const { usrProfile } = rootState.idm;
        const { FRSSOCookie } = rootState.idm;
        if (deviceType == 'trusted') {
            await api.deleteTrustedDevice(state.selectedTrustedDevice, usrProfile.userName, FRSSOCookie);
        }
        if (deviceType == 'push') {
            await api.deletePushDevice(state.selectedPushDevice, usrProfile.userName, FRSSOCookie);
        }
        if (deviceType == 'oath') {
            await api.deleteOathDevice(state.selectedOathDevice, usrProfile.userName, FRSSOCookie);
        }
        if (deviceType == 'fido') {
            await api.deleteFIDODevice(state.selectedFIDODevice, usrProfile.userName, FRSSOCookie);
        }
    },
    async deleteSelectedPushDevice({ rootState, state }) {
        const { usrProfile } = rootState.idm;
        const { FRSSOCookie } = rootState.idm;
        await api.deletePushDevice(state.selectedDevice, usrProfile.userName, FRSSOCookie);
    },
    async deleteSelectedOathDevice({ rootState, state }) {
        const { usrProfile } = rootState.idm;
        const { FRSSOCookie } = rootState.idm;
        await api.deleteOathDevice(state.selectedDevice, usrProfile.userName, FRSSOCookie);
    },
    async deleteSelectedFIDODevice({ rootState, state }) {
        const { usrProfile } = rootState.idm;
        const { FRSSOCookie } = rootState.idm;
        await api.deleteFIDODevice(state.selectedDevice, usrProfile.userName, FRSSOCookie);
    }
};

const mutations = {
    setSelectedSearchAttribute: (state, value) => {
        state.selectedSearchAttribute = value;
    },
    setSelectedSearchOp: (state, value) => {
        state.selectedSearchOp = value;
    },
    setSearchCriteriaValue: (state, value) => {
        state.searchCriteriaValue = value;
    },
    setSearchResults: (state, value) => {
        state.searchResults = value;
    },
    setSelectedUser: (state, value) => {
        state.selectedUser = value;
    },
    setSelectedTrustedDevice: (state, value) => {
        state.selectedTrustedDevice = value;
    },
    setSelectedPushDevice: (state, value) => {
        state.selectedPushDevice = value;
    },
    setSelectedOathDevice: (state, value) => {
        state.selectedOathDevice = value;
    },
    setSelectedFIDODevice: (state, value) => {
        state.selectedFIDODevice = value;
    },
    setSelectedUserMFAChoice: (state, value) => {
        state.selectedUser["frdpmfachoice"] = value;
    },
    setSelectedUserMFAPref: (state, value) => {
        state.selectedUser["frdpmfapref"] = value;
    },
    setSelectedUserStatus: (state, value) => {
        state.selectedUser.accountStatus = value;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};