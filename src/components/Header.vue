<template>
  <div>
    <v-navigation-drawer clipped fixed app v-model="drawer">
      <v-list dense>
        <template v-for="item in getDrawerItems">
          <v-list-tile :key="item.text" @click="goToPage(item)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="cyan darken-2" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 mt-1 pl-3">
        <v-toolbar-side-icon @click.stop="onClickDrawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down white--text" style="font-size:25px">
          <strong>Welcome</strong>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar class="mt-1" size="42px">
        <img :src="currentUserInfo.dp" :alt="currentUserInfo.name">
      </v-avatar>
      <v-toolbar-title class="mt-1 mr-2">{{currentUserInfo.name}} {{currentUserInfo.lastName}}</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      user: []
    };
  },
  computed: {
    getLoginUser() {
      return this.$store.getters.getLoginUser;
    },
    getDrawerItems() {
      return this.$store.getters.getDrawerItems;
    },
    currentUserInfo() {
      this.currentUser = localStorage.getItem("username");
      this.currentUserData = this.getLoginUser.find(element => {
        if (this.currentUser === element.userId) {
          return element;
        }
      });
      return this.currentUserData;
    }
  },
  methods: {
    onClickDrawer() {
      this.$store.dispatch("fetchDrawerItems", "./static/DrawerItems.json");
      return (this.drawer = !this.drawer);
    },
    onLogout() {
      localStorage.removeItem("username");
      this.$router.push("/");
    },
    goToPage(item) {
      if (item.text == "Home") this.$router.push("/Home");
      else if (item.text == "Duplicates") this.$router.push("/Duplicates");
      else if (item.text == "Logout") this.$router.push("/");
      else this.$router.push("/Home");
    }
  }
};
</script>

<style scoped>
</style>

