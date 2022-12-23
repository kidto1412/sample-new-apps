<template>
  <v-app>
    <v-app-bar app color="primary" dark> News App </v-app-bar>
    <alert />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Alert: () => import("@/components/Alert.vue"),
  },
  data: () => ({
    //
  }),
  ...mapActions({
    setAlert: "alert/set",
  }),
};
</script>
