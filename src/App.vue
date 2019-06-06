<template>
  <div class="container" id="app">
    <AppHeader></AppHeader>
    <AppMenu></AppMenu>
    <div class="row">
        <h2> </h2>
    </div>
    <div class="container">
        <router-view @showProfileEvt="onShowProfile" :usrProfile="usrProfile"></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import AppMenu from './components/AppMenu';

export default {
  name: 'app',
  data() {
      return {
          usrProfile: null
      };
  },
  methods: {
      onShowProfile(profile) {
          console.log("Event showProfileEvt detected");
          this.usrProfile = profile;
      }
  },
  components: {
      AppHeader,
      AppMenu
  }
}
</script>

<style>
    h2 {
        height: 3vh;
    }

    .kaiser-btn-primary {
        outline-style: solid;
        outline-color: #0140c1;
        color: #0140c1;
    }

    .kaiser-btn {
        outline-style: solid;
        outline-color: #0140c1;
        color: #0140c1;
    }

    .kaiser-card {
        background: #0140c1;
    }

    .kaiser-title-dark-bg {
        color: #e8e8e8;
        font-family: Tahoma;
        font-size: medium;
    }

    .kaiser-text-dark-bg {
        color: #e8e8e8;
        font-family: Verdana;
        font-size: small;
    }

    .kaiserResultColumn {
        color: #0140c1;
        font-size: small;
    }

    li:hover {
        background-color: #eeefff;
    }

    .errorMessage {
        color: red;
        font-family: Verdana;
        font-size: medium;
    }

    .separator {
        height: 3vh;
    }

    .imgSmallContainer {
        width: 10vw;
    }

</style>
