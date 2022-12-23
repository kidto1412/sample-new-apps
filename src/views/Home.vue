<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <v-text-field v-model="search" label="Search" outlined clearable>
          ></v-text-field
        >
      </v-col>
      <v-col>
        <v-select :items="items" label="Outlined style" outlined></v-select>
      </v-col>
    </v-row>
    <v-card
      class="mb-5"
      v-for="article in articles"
      :key="article.id"
      to="/detail"
      +article.id
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">{{ article.publishedAt }}</div>
          <v-list-item-title class="text-h5 mb-1">
            {{ article.title }}
          </v-list-item-title>
          <v-list-item-subtitle
            >{{ article.description }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="100" color="grey">
          <v-img :src="article.urlToImage"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-chip class="ma-2" color="orange" outlined>
        {{ article.author }}
      </v-chip>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      search: "",
      country: "",
      articles: [],
      apiKey: "1d5ac57eebda4972af6be89f6aff2d6b",
      show: false,
    };
  },
  ...mapGetters({
    user: "auth/user",
    apiKey: "auth/apiKey",
  }),
  methods: {
    doSearch() {
      let keyword = this.keyword;
      if (keyword.length > 0) {
        this.show = true;
        this.axios
          .get("http://localhost:3000/search?q=" + keyword)
          .then((response) => {
            let { data } = response;
            this.search = data;
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.show = false;
        this.search = [];
      }
    },
  },
  created() {
    this.axios
      .get(
        `https://newsapi.org/v2/everything?q=${
          this.search == "" ? "keyword" : this.search
        }&apiKey=${this.apiKey}`
      )
      .then((response) => {
        let data = response.data.articles;
        this.articles = data;
        console.log(data);
      });
  },
};
</script>
