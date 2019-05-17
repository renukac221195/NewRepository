<template>
  <v-layout class="container" align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card dark color="transparent elevation-12" class="mx-auto">
        <v-spacer></v-spacer>
        <v-card-title class="title" align-center justify-center>LOGIN</v-card-title>
        <v-card-text>
          <v-layout>
            <v-flex xs-12>
              <v-text-field
                prepend-icon="person"
                name="Username"
                v-model="username"
                :rules="usernameRules()"
                label="Username"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs-12>
              <v-text-field
                prepend-icon="lock"
                name="Password"
                v-model="password"
                :rules="passwordRules()"
                label="Password"
                type="password"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-checkbox v-model="checkbox" label="Remember me"></v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout align-center justify-center>
            <v-flex xs-6 offset-xs4>
              <v-card-actions>
                <v-btn id="btn" class="black--text" color="green" @click="loginUser">Login</v-btn>
                <!-- <v-btn  class="red--text" color="white" @click="onCancel">Cancel</v-btn> -->
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    usernameRules() {
      return [v => !!v || "Username is required"];
    },
    passwordRules() {
      return [v => !!v || "Password is required"];
    },
    loginUser() {
      this.userLogin.find(element => {
        if (
          element.userId === this.username &&
          element.password === this.password
        ) {
          localStorage.setItem("username", element.userId);
        //   this.$store.dispatch("setCurrentUser", element.userId).then(() => {
            // this.$router.push("/Feeds");
        //   });
        }
      });
    }
  }
};
</script>

<style scoped>
.title {
  font-weight: bold;
  margin-left: 225px;
  font-size: 60px;
  color: black;
}
.container {
  margin-top: 200px;
}
#btn {
    border-radius: 20px;
    padding: 10px 60px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
}
</style>