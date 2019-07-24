import api from '../../api/fridm';
import webutils from '../../api/webutils';
import { router } from '../../main';

const state = {
    usrProfile: null,
    regUser: null,
    givenNameChanged: false,
    snChanged: false,
    mailChanged: false,
    telephoneNumberChanged: false,
    frdpMFAChoiceChanged: false,
    frdpMFAPrefChanged: false,
    mfaChoiceValuesHD: [
        {
            value: "always",
            display: "Always"
        },
        {
            value: "sometimes",
            display: "Only on New Devices"
        },
        {
            value: "never",
            display: "Never"
        },
        {
            value: "required",
            display: "Required"
        },
        {
            value: "passwordless",
            display: "Passwordless"
        }
    ],
    mfaChoiceValues: [
        {
            value: "always",
            display: "Always"
        },
        {
            value: "sometimes",
            display: "Only on New Devices"
        },
        {
            value: "never",
            display: "Never"
        },
        {
            value: "required",
            display: "Required"
        },
        {
            value: "passwordless",
            display: "Passwordless"
        }
    ],
    mfaPrefsValues: [
        {
            value: "sms",
            display: "One Time Password (Text Messaging)"
        },
        {
            value: "push",
            display: "PUSH Notification (Mobile Device)"
        },
        {
            value: "fido",
            display: "YUBI Key (FIDO)"
        },
        {
            value: "mail",
            display: "One Time Password (E-Mail)"
        },
        {
            value: "nopassword",
            display: "Use the NoPassword App"
        }
    ],
    selectedMFAChoice: null,
    selectedMFAPref: null,
    targetUserId: null,
    FRSSOCookie: null,
    isHelpDesk: false,
    isPwdReset: false,
    userTrustedDevices: null,
    userPushDevices: null,
    userOathDevices: null,
    userFIDODevices: null,
    regStatus: false,
    emailVerificationCode: null,
    regToken: null,
    loginId: null,
    password: null,
    loginError: null,
    loggedInUserID: null
};

const getters = {
    isLoggedIn: (state) => {
        return !!state.usrProfile && !!state.FRSSOCookie;
    },
    loginId: (state) => {
        return state.loginId;
    },
    password: (state) => {
        return state.password;
    },
    usrProfile: (state) => {
        return state.usrProfile;
    },
    userTrustedDevices: (state) => {
        return state.userTrustedDevices;
    },
    userPushDevices: (state) => {
        return state.userPushDevices;
    },
    userOathDevices: (state) => {
        return state.userOathDevices;
    },
    userFIDODevices: (state) => {
        return state.userFIDODevices;
    },
    isHelpDesk: (state) => {
        return state.isHelpDesk;
    },
    givenNameChanged: (state) => {
        return state.givenNameChanged;
    },
    snChanged: (state) => {
        return state.snChanged;
    },
    mailChanged: (state) => {
        return state.mailChanged;
    },
    telephoneNumberChanged: (state) => {
        return state.telephoneNumberChanged;
    },
    isMFAChoiceConfigured: (state) => {
        return !!state.usrProfile.frdpmfachoice;
    },
    isMFAPrefConfigured: (state) => {
        return !!state.usrProfile.frdpmfapref;
    },
    mfaChoices: (state) => {
        return state.mfaChoiceValues;
    },
    mfaChoicesHD: (state) => {
        return state.mfaChoiceValuesHD;
    },
    mfaPrefs: (state) => {
        return state.mfaPrefsValues;
    },
    selectedMFAChoice: (state) => {
        return state.selectedMFAChoice;
    },
    selectedMFAPref: (state) => {
        return state.selectedMFAPref;
    },
    isPUSHChosen: (state) => {
        const result = (!!state.selectedMFAPref && state.selectedMFAPref === 'push' && state.usrProfile.frdpmfapref !== 'push');
        return result;
    },
    FRSSOCookie: (state) => {
        return state.FRSSOCookie;
    },
    isPwdReset: (state) => {
        return state.isPwdReset;
    },
    regUser: (state) => {
        return state.regUser;
    },
    regStatus: (state) => {
        return state.regStatus;
    },
    loginError: (state) => {
        return state.loginError;
    },
    isLoginError: (state) => {
        return !!state.loginError;
    },
    loggedInUserID: (state) => {
        return state.loggedInUserID;
    }
};

const actions = {
    async login({state}) {
        await api.login(state.loginId, state.password).then(response => {
            var obSSOCookie = response.data.obSSOCookie;
            console.log(response);
            console.log(obSSOCookie);
            window.$cookies.set("ObSSOCookie", obSSOCookie, null, null, "kaiserpermanente.org", true);
            window.location = "https://mfa-poc-forgerock.kaiserpermanente.org/fhdemoapp/oam/login";

        }).catch(error => {
            console.log(error);
            state.loginError = "Login Error, please retry.";
        });
    },
    async fetchProfile({ commit }) {
        const profile = await api.fetchUserProfile();
        commit('setProfile', profile.data.result[0]);
    },
    async resolveAuthz({ commit, state }) {
        console.log("Inside resolveAuthz");
        const authzResp = await api.resolveAuthz(state.FRSSOCookie).catch((error) => {
            console.log(error);
        });
        const myProfilePerm = authzResp.data.find((permission) => {
            return permission.resource === 'https://hc.frdpcloud.com/fhdemoapp';
        });
        const helpDesk = authzResp.data.find((permission) => {
            return permission.resource === 'https://hc.frdpcloud.com/fhdemoapp/helpdesk';
        });
        if (helpDesk.actions.GET != null) {
            commit('setIsHelpDesk', true);
        }
        else {
            commit('setIsHelpDesk', false);
        }
        window.localStorage.setItem('loggedInUserID', myProfilePerm.attributes.uid[0]);
        const profile = await api.fetchUserProfile();
        commit('setProfile', profile.data.result[0]);
    },
    async fetchDevices({ commit, state }) {
        const devices = await api.getDevices(state.usrProfile.userName, state.FRSSOCookie);
        commit('setUserTrustedDevices', devices.data.trustedDevices);
        commit('setUserPushDevices', devices.data.pushDevices);
        commit('setUserOathDevices', devices.data.oathDevices);
        commit('setUserFIDODevices', devices.data.fidoDevices);
    },
    updateLoginId({commit}, loginId) {
        commit('setLoginId', loginId);
    },
    updatePassword({commit}, password) {
        commit('setPassword', password);
    },
    updateProfile({commit}, profile) {
        commit('setProfile', profile);
    },
    updateGivenNameChanged({ commit }, givenNameChangedValue) {
        commit('setGivenNameChanged', givenNameChangedValue);
    },
    updateSNChanged({ commit }, snChangedValue) {
        commit('setSNChanged', snChangedValue);
    },
    updateMailChanged({ commit }, mailChangedValue) {
        commit('setMailChanged', mailChangedValue);
    },
    updateTelephoneNumberChanged({ commit }, telephoneNumberChangedValue) {
        commit('setTelephoneNumberChanged', telephoneNumberChangedValue);
    },
    updateFrdpMFAChoiceChanged({ commit }, frdpMFAChoiceChangedValue) {
        commit('setFrdpMFAChoiceChanged', frdpMFAChoiceChangedValue);
    },
    updateFrdpMFAPrefChanged({ commit }, frdpMFAPrefChangedValue) {
        commit('setFrdpMFAPrefChanged', frdpMFAPrefChangedValue);
    },
    updateSelectedMFAChoice( { commit }, newMFAChoice) {
        commit('setSelectedMFAChoice', newMFAChoice);
    },
    updateSelectedMFAPref({ commit }, newMFAPref) {
        commit('setSelectedMFAPref', newMFAPref);
    },
    updateTargetUserId( { commit } , targetUserId) {
        commit('setTargetUserId', targetUserId);
    },
    updateFRSSOCookie( { commit }, value) {
        commit('setFRSSOCookie', value);
    },
    updateIsPwdReset( { commit }, value ) {
        commit('setIsPwdReset', value);
    },
    updateRegUser({commit}, user) {
        commit('setRegUser', user );
    },
    updateRegEmailVerificationCode({commit}, code) {
        commit('setEmailVerificationCode', code);
    },
    updateRegToken({commit}, token) {
        commit('setRegToken', token);
    },
    initPreferences({state, commit }) {
        commit('setSelectedMFAPref', state.usrProfile.frdpmfapref);
        commit('setSelectedMFAChoice', state.usrProfile.frdpmfachoice);
    },
    async retrieveSelfRegConfig() {
        return await api.getSelfRegConfig();
    },
    async registerUser({state}) {
        await api.registerUser(state.regUser);
        router.push('/fhdemoapp');
    },
    async finishRegistration({state}) {
        await api.finishRegistration(state.regToken, state.emailVerificationCode);
        router.push("/fhdemoapp");
    },
    async saveProfileChanges({state}) {
        if (state.givenNameChanged) {
            await api.modifyAttribute(state.usrProfile.userName, "givenName", state.usrProfile.givenName);
        }
        if (state.snChanged) {
            await api.modifyAttribute(state.usrProfile.userName, "sn", state.usrProfile.sn);
        }
        if (state.mailChanged) {
            await api.modifyAttribute(state.usrProfile.userName, "mail", state.usrProfile.mail);
        }
        if (state.telephoneNumberChanged) {
            await api.modifyAttribute(state.usrProfile.userName, "telephoneNumber", state.usrProfile.telephoneNumber);
        }
        if (state.frdpMFAChoiceChanged) {
            state.usrProfile.frdpmfachoice = state.selectedMFAChoice;
            await api.modifyAttribute(state.usrProfile.userName, "frdpmfachoice", state.selectedMFAChoice);
        }
        if (state.frdpMFAPrefChanged) {
            state.usrProfile.frdpmfapref = state.selectedMFAPref;
            await api.modifyAttribute(state.usrProfile.userName, "frdpmfapref", state.selectedMFAPref);
        }
        router.push('/fhdemoapp');
    },
    async lockUser({ state }) {
        await api.lockUser(state.targetUserId);
    },
    async unlockUser({ state }) {
        await api.unlockUser(state.targetUserId);
    },
    async logout({state, commit}) {
        await api.logout(state.FRSSOCookie);
        commit('setFRSSOCookie', null);
        commit('setProfile', null);
        window.$cookies.remove('iPlanetDirectoryPro', null, 'kaiserpermanente.org');
        router.push("/fhdemoapp");
    }
};

const mutations = {
    setLoginId: (state, loginId) => {
        state.loginId = loginId;
    },
    setPassword: (state, password) => {
        state.password = password;
    },
    setProfile: (state, profile) => {
        if (state.usrProfile == null) {
            state.usrProfile = profile;
        }
        else {
            for(let prop in profile) {
                state.usrProfile[prop] = profile[prop];
            }
        }
    },
    setUserTrustedDevices: (state, devices) => {
        state.userTrustedDevices = devices;
    },
    setUserPushDevices: (state, devices) => {
        state.userPushDevices = devices;
    },
    setUserOathDevices: (state, devices) => {
        state.userOathDevices = devices;
    },
    setUserFIDODevices: (state, devices) => {
        state.userFIDODevices = devices;
    },
    setGivenNameChanged: (state, value) => {
        state.givenNameChanged = value;
    },
    setSNChanged: (state, value) => {
        state.snChanged = value;
    },
    setMailChanged: (state, value) => {
        state.mailChanged = value;
    },
    setTelephoneNumberChanged: (state, value) => {
        state.telephoneNumberChanged = value;
    },
    setFrdpMFAChoiceChanged: (state, value) => {
        state.frdpMFAChoiceChanged = value;
    },
    setFrdpMFAPrefChanged: (state, value) => {
        state.frdpMFAPrefChanged = value;
    },
    setSelectedMFAChoice: (state, value) => {
        state.selectedMFAChoice = value;
    },
    setSelectedMFAPref: (state, value) => {
        state.selectedMFAPref = value;
    },
    setTargetUserId: (state, value) => {
        state.targetUserId = value;
    },
    setFRSSOCookie: (state, value) => {
        state.FRSSOCookie = value;
    },
    setIsHelpDesk: (state, value) => {
        state.isHelpDesk = value;
    },
    setIsPwdReset: (state, value) => {
        state.isPwdReset = value;
    },
    setRegUser: (state, value) => {
        state.regUser = value;
    },
    setRegStatus: (state, value) => {
        state.regStatus = value;
    },
    setEmailVerificationCode: (state, value) => {
        state.emailVerificationCode = value;
    },
    setRegToken: (state, value) => {
        state.regToken = value;
    },
    setLoggedInUserID: (state, userId) => {
        state.loggedInUserID = userId;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};