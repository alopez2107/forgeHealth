<template>
    <div class="row">
        <div class="card kaiser-card" style="width: 23rem;">
            <img src="../assets/mobile-devices.jpg" class="card-img-top">
            <div class="card-body">
                <h5 class="kaiser-title-dark-bg">MFA Devices</h5>&nbsp;&nbsp;&nbsp;
                <p class="kaiser-text-dark-bg">You can manage your MFA devices.<br>You can remove devices you lost or<br>no longer own.</p>
            </div>
        </div>
        <div class="col-md-8">
            <div class="row">
                <button class="btn kaiser-btn-primary" type="button" @click="onRefresh">Refresh Devices</button>
            </div>
            <div class="row separator">
                <h2> </h2>
            </div>
            <div class="row">
                <h4 class="infoText">Trusted devices</h4>
            </div>
            <div class="row">
                <ul class="list-group" >
                    <DeviceProfileItem v-if="userTrustedDevices != null && userTrustedDevices.length > 0" v-for="device in userTrustedDevices" :device="device" :key="device.id" :deviceType="deviceTypes.trusted"></DeviceProfileItem>
                    <p v-else class="infoText">No Trusted Devices Found.</p>
                </ul>
            </div>
            <div class="row">
                <h4 class="infoText">PUSH devices</h4>
            </div>
            <div class="row">
                <ul class="list-group" >
                    <DeviceProfileItem v-if="userPushDevices != null && userPushDevices.length > 0" v-for="device in userPushDevices" :device="device" :key="device.id" :deviceType="deviceTypes.push"></DeviceProfileItem>
                    <p v-else class="infoText">No PUSH Devices Found.</p>
                </ul>
            </div>
            <div class="row">
                <h4 class="infoText">OATH devices</h4>
            </div>
            <div class="row">
                <ul class="list-group" >
                    <DeviceProfileItem v-if="userOathDevices != null && userOathDevices.length > 0" v-for="device in userOathDevices" :device="device" :key="device.id" :deviceType="deviceTypes.oath"></DeviceProfileItem>
                    <p v-else class="infoText">No OATH Devices Found.</p>
                </ul>
            </div>
            <div class="row">
                <h4 class="infoText">FIDO devices</h4>
            </div>
            <div class="row">
                <ul class="list-group" >
                    <DeviceProfileItem v-if="userFIDODevices != null && userFIDODevices.length > 0" v-for="device in userFIDODevices" :device="device" :key="device.id" :deviceType="deviceTypes.fido"></DeviceProfileItem>
                    <p v-else class="infoText">No FIDO Devices Found.</p>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import DeviceProfileItem from './DeviceProfileItem';
    export default {
        name: "Devices",
        components: {
            DeviceProfileItem
        },
        computed: {
            ...mapGetters(['deviceTypes', 'userTrustedDevices', 'userPushDevices', 'userOathDevices', 'userFIDODevices'])
        },
        methods: {
            ...mapActions(['fetchDevices']),
            onRefresh() {
                this.fetchDevices();
            }
        },
        created() {
            this.fetchDevices();
        }
    }
</script>

<style scoped>
    h4 {
        color: cadetblue;
        font-size: medium;
        font-family: Verdana;
    }

    .infoText {
        color: darkblue;
        font-size: small;
        font-family: Verdana;
    }

</style>