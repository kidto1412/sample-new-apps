<template>
  <div class="mt-15">
    <div v-if="wisata.id_wisata">
      <v-card class="rounded-t-xl mt-5 px-2 pb-5" style="height: 100vh">
        <v-card-title>{{ wisata.nama_wisata }}</v-card-title>
        <v-card-text class="text--disabled">
          By: {{ wisata.lokasi }}
        </v-card-text>
        <v-card-text class="text--disabled">
          Published: {{ wisata.cityprov }}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "Detail",
  data: () => ({
    wisata: {},
  }),
  created() {
    this.go();
  },
  methods: {
    go() {
      let { id } = this.$route.params;
      let url = "http://localhost:3000/wisata/" + id;
      this.axios
        .get(url)
        .then((response) => {
          let { data } = response;
          let dataObjek = data[0];
          console.log(dataObjek);
          this.wisata = dataObjek;
        })
        .catch((error) => {
          let { responses } = error;
          console.log(responses);
        });
    },
  },
};
</script>
