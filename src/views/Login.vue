<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="574">
      <v-card-text>
        <v-text-field
          v-model="email"
          :rules="[emailRules.required, emailRules.email]"
          label="E-mail"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[passwordRules.required, passwordRules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-btn block color="primary" @click="handlerLogin()"> Sign In </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      //data dummy user
      user: {
        email: "dimasqy@gmail.com",
        password: 12345678,
      },

      // bagian email
      email: "",
      emailRules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      // bagian password
      show1: false,
      password: "",
      passwordRules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  getters: {
    ...mapGetters({
      user: "auth/user",
      apiKey: "auth/apiKey",
    }),
  },
  methods: {
    ...mapActions({
      setToken: "auth/setToken",
      setAuth: "auth/set",
      setAlert: "alert/set",
    }),
    handlerLogin() {
      if (this.email != "" && this.password != "") {
        if (
          this.email == this.user.email &&
          this.password == this.user.password
        ) {
          this.$emit("authenticated", true);
          this.setToken("1d5ac57eebda4972af6be89f6aff2d6b");
          this.setAuth(this.user);
          this.setAlert({
            status: true,
            color: "success",
            text: "Login success",
          });
          this.$router.push({ name: "Home" });
        } else {
          this.setAlert({
            status: true,
            color: "error",
            text: "The username and / or password is incorrect",
          });
          console.log("The username and / or password is incorrect");
        }
      } else {
        this.setAlert({
          status: true,
          color: "error",
          text: "A username and password must be present",
        });
        console.log("A username and password must be present");
      }
    },
  },
};
</script>
