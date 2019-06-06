import axios from 'axios';

//const KP_SERVICE_BASE_URL = "http://fhdemoapp.fridam.aeet-forgerock.com:8777";
const KP_SERVICE_BASE_URL = "https://hc.frdpcloud.com/fhappservices";
export default {
    fetchUserProfile() {
        const OUD_USR_ID = window.localStorage.getItem('loggedInUserID');
        const GET_USER_INFO_URL = `${KP_SERVICE_BASE_URL}/user/userInfo?userName=${OUD_USR_ID}`;
        return axios.get(GET_USER_INFO_URL, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    userSearch(attrName, oper, value) {
        const GET_USER_SEARCH_URL = `${KP_SERVICE_BASE_URL}/user/search?attrName=${attrName}&oper=${oper}&value=${value}`;
        return axios.get(GET_USER_SEARCH_URL, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    resetPassword(password) {
        const OUD_USR_ID = window.localStorage.getItem('loggedInUserID');
        const formData = new FormData();
        formData.append('userName', OUD_USR_ID);
        formData.append('password', password);
        const PWD_RESET_URL = `${KP_SERVICE_BASE_URL}/user/resetPassword`;
        return axios.post(PWD_RESET_URL, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    registerUser(user) {
        var req = {
            "input": {
                "user": {
                    "userName": user.userName,
                    "guid": user.guid,
                    "givenName": user.givenName,
                    "sn": user.sn,
                    "mail": user.mail,
                    "telephoneNumber": user.telephoneNumber,
                    "password": user.password,
                    "frdpmfachoice" : user.frdpmfachoice,
                    "frdpmfapref" : user.frdpmfapref
                }
            }
        };
        const REGISTER_USER_URL = `${KP_SERVICE_BASE_URL}/user/registration`;
        return axios.post(REGISTER_USER_URL, req, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    finishRegistration(token, code) {
        const formData = new FormData();
        formData.append('token', token);
        formData.append('code', code);
        const FINISH_REGISTRATION_URL = `${KP_SERVICE_BASE_URL}/user/registration/done`;
        return axios.post(FINISH_REGISTRATION_URL, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    modifyAttribute(userId, name, value) {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('attrName', name);
        formData.append('newValue', value);
        const MODIFY_PROFILE_URL = `${KP_SERVICE_BASE_URL}/user/modifyProfile`;
        return axios.post(MODIFY_PROFILE_URL, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    lockUser(userId) {
        const formData = new FormData();
        formData.append('userId', userId);
        const MODIFY_PROFILE_URL = `${KP_SERVICE_BASE_URL}/user/lock`;
        return axios.post(MODIFY_PROFILE_URL, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    unlockUser(userId) {
        const formData = new FormData();
        formData.append('userId', userId);
        const MODIFY_PROFILE_URL = `${KP_SERVICE_BASE_URL}/user/unlock`;
        return axios.post(MODIFY_PROFILE_URL, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    login(userId, password) {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('password', password);
        const LOGIN_URL = `${KP_SERVICE_BASE_URL}/user/login`;
        return axios.post(LOGIN_URL, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    logout(sessionCookie) {
        const formData = new FormData();
        formData.append('ssoCookie', sessionCookie);
        const MODIFY_PROFILE_URL = `${KP_SERVICE_BASE_URL}/user/logout`;
        return axios.post(MODIFY_PROFILE_URL, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    isUserInHelpDesk(sessionCookie) {
        const formData = new FormData();
        formData.append('ssoToken', sessionCookie);
        const AUTHZ_HELP_DESK = `${KP_SERVICE_BASE_URL}/user/authorizeHD`;
        return axios.post(AUTHZ_HELP_DESK, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    getDevices(userId, sessionCookie) {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('ssoCookie', sessionCookie);
        const DEVICE_PROFILES_URL = `${KP_SERVICE_BASE_URL}/user/deviceProfiles`;
        return axios.post(DEVICE_PROFILES_URL, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    deleteTrustedDevice(device, userId, sessionCookie) {
        const formData = new FormData();
        formData.append('deviceType', 'trusted');
        formData.append('userId', userId);
        formData.append('ssoCookie', sessionCookie);
        formData.append('uuid', device.uuid);
        const DEVICE_PROFILES_DELETE_URL = `${KP_SERVICE_BASE_URL}/user/deviceProfiles/delete`;
        return axios.post(DEVICE_PROFILES_DELETE_URL, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    deletePushDevice(device, userId, sessionCookie) {
        const formData = new FormData();
        formData.append('deviceType', 'push');
        formData.append('userId', userId);
        formData.append('ssoCookie', sessionCookie);
        formData.append('uuid', device.uuid);
        const DEVICE_PROFILES_DELETE_URL = `${KP_SERVICE_BASE_URL}/user/deviceProfiles/delete`;
        return axios.post(DEVICE_PROFILES_DELETE_URL, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    deleteOathDevice(device, userId, sessionCookie) {
        const formData = new FormData();
        formData.append('deviceType', 'oath');
        formData.append('userId', userId);
        formData.append('ssoCookie', sessionCookie);
        formData.append('uuid', device.uuid);
        const DEVICE_PROFILES_DELETE_URL = `${KP_SERVICE_BASE_URL}/user/deviceProfiles/delete`;
        return axios.post(DEVICE_PROFILES_DELETE_URL, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    deleteFIDODevice(device, userId, sessionCookie) {
        const formData = new FormData();
        formData.append('deviceType', 'fido');
        formData.append('userId', userId);
        formData.append('ssoCookie', sessionCookie);
        formData.append('uuid', device.uuid);
        const DEVICE_PROFILES_DELETE_URL = `${KP_SERVICE_BASE_URL}/user/deviceProfiles/delete`;
        return axios.post(DEVICE_PROFILES_DELETE_URL, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    resolveAuthz(sessionCookie) {
        const req = {
            ssoCookie : sessionCookie,
            policySet: 'iPlanetAMWebAgentService',
            scopes: ["https://hc.frdpcloud.com/fhdemoapp",
                     "https://hc.frdpcloud.com/fhdemoapp/helpdesk"]
        };
        const AUTHZ_END_POINT = `${KP_SERVICE_BASE_URL}/user/authorize`;
        return axios.post(AUTHZ_END_POINT, req, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}