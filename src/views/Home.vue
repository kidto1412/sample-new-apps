<template>
  <v-container>
    <div v-if="apiKey == null || apiKey == ''">
      <v-img
        src="../../public/img/notfound.svg"
        width="300"
        class="text-center mx-auto mt-15"
      >
      </v-img>
      <a href="/" class="red--text mt-5">Silahkan Login</a>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="9">
          <v-text-field v-model="search" label="Search" outlined clearable>
            ></v-text-field
          >
        </v-col>
        <v-col>
          <v-select
            v-model="select"
            :items="items"
            label="country"
            outlined
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="selectCategory"
            :items="categories"
            label="Category"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn depressed color="primary" class="mb-5" @click="doSearch">
          Search
        </v-btn>
      </div>
      <v-card class="mb-5" v-for="article in articles" :key="article.id">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">{{ article.publishedAt }}</div>
            <v-list-item-title class="text-h5 mb-1">
              {{ article.title }}
            </v-list-item-title>
            <v-list-item-subtitle
              >{{ article.description }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>{{ article.content }} </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="200" color="grey">
            <v-img :src="article.urlToImage"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-chip class="ma-2" color="orange" outlined>
          {{ article.author }}
        </v-chip>
      </v-card>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      search: "",
      select: "",
      selectCategory: "",
      // items: ["Foo", "Bar", "Fizz", "Buzz"],
      items: ["ae", "ar", "us", "fr", "ch"],
      categories: [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology",
      ],
      articles: [],
      show: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      apiKey: "auth/apiKey",
    }),
  },
  methods: {
    ...mapActions({
      fetchApiKey: "auth/fetchApiKey",
    }),
    doSearch(e) {
      e.preventDefault();
      let search = this.search;
      if (search.length > 0) {
        this.show = true;
        this.axios
          .get(
            "https://newsapi.org/v2/top-headlines?q=" +
              search +
              "&country=" +
              this.select +
              "&category=" +
              this.selectCategory +
              "&apiKey=" +
              this.apiKey
          )
          .then((response) => {
            let data = response.data.articles;
            this.articles = data;
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  created() {
    this.fetchApiKey();
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

<style scoped>
a {
  text-align: center;
  display: block;
}
</style>
