<template>
  <v-app>
    <app-header v-if="$route.name != 'Login'"></app-header>
    <v-container>
      <router-view></router-view>
    </v-container>
    <app-footer v-if="$route.name != 'Login'"></app-footer>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    "app-header": Header,
    "app-footer": Footer
  },
  data() {
    return {
      show: false
    };
  },
  created() {
    this.$store.dispatch("loginUser", "./static/Users.json").then(() => {
      if (window.localStorage.username) {
        let currentUser = localStorage.getItem("username");
        this.$store.dispatch("setCurrentUser", currentUser);
      } else {
        this.$router.push("/");
      }
    });
  },
  computed: {
    checkUser() {
      if (this.$route.name != "Login") {
        this.show = true;
      }
      return this.show;
    }
  }
};
</script>

<style>
#app {
  background-image: url("../static/images/background.jpg");
  background-size: cover;
  overflow: hidden;
  background-repeat: no-repeat;
}

.container {
  margin: auto;
  padding: 100px;
}
</style>
