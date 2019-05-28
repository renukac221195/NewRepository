<template>
  <v-layout class="login" align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card color="transparent elevation-12" class="mx-auto">
        <v-spacer></v-spacer>
        <v-card-title class="titling" align-center justify-center>LOGIN</v-card-title>
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
          <v-layout align-center justify-center>
            <v-flex xs-6 offset-xs4>
              <v-card-actions>
                <v-btn id="btn" class="white--text" color="green" @click="loginUser">Login</v-btn>
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
  data() {
    return {
      username: "",
      password: "",
      user: [],
      checkbox: false
    };
  },
  computed: {
    getLoginUser() {
      return this.$store.getters.getLoginUser;
    }
  },
  methods: {
    usernameRules() {
      return [v => !!v || "Username is required"];
    },
    passwordRules() {
      return [v => !!v || "Password is required"];
    },
    loginUser() {
      this.getLoginUser.find(element => {
        if (
          element.userId === this.username &&
          element.password === this.password
        ) {
          localStorage.setItem("username", element.userId);
          this.$store.dispatch("setCurrentUser", element.userId).then(() => {
            this.$router.push("/Home");
          });
        }
      });
    }
  }
};
</script>

<style>
.titling {
  font-family: cursive;
  font-weight: bold;
  text-align: center;
  margin-left: 202px;
  font-size: 25px;
  color: black;
}
.login {
  margin-top: 100px;
}
#btn {
  font-family:'Times New Roman', Times, serif;
  border-radius: 20px;
  padding: 8px 50px;
  font-size: 16px;
}
</style>