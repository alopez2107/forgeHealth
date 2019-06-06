<template>
    <li class="list-group-item">
        <div class="row">
            <div class="col-sm-8 kaiserResultColumn">
                <p>{{ device.id }}</p>
            </div>
            <div class="col-sm-4 kaiserResultColumn">
                <button class="btn kaiser-btn-primary" @click="onDeleteDevice">Delete Device</button>
            </div>
        </div>
    </li>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "DeviceProfileItem",
        props: ['device', 'deviceType'],
        methods: {
            ...mapActions(['updateSelectedDevice', 'deleteSelectedDevice', 'fetchDevices']),
            onDeleteDevice() {
                console.log("Selected device Type ");
                console.log(this.deviceType);
                this.updateSelectedDevice({selectedDevice: this.device, devType: this.deviceType});
                this.deleteSelectedDevice(this.deviceType);
                this.fetchDevices();
            }
        }
    }
</script>

<style scoped>

</style>