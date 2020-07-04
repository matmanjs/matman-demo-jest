<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>
            For a guide and recipes on how to configure / customize this project,<br>
            check out the
            <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
        </p>

        <h3>{{userInfo.name}}</h3>
        <div v-if="userInfo.htmlUrl"><a :href="userInfo.htmlUrl" class="github-html-url" target="_blank">{{userInfo.htmlUrl}}</a>
        </div>
        <div v-if="userInfo.avatarUrl"><img :src="userInfo.avatarUrl" :alt="userInfo.name" class="github-avatar-url" />
        </div>
    </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'HelloVue',
    props: {
      msg: String
    },
    data: () => {
      return {
        a: 1,
        isLoaded: false,
        totalCount: 0,
        userInfo: {
          name: 'Evan You',
          htmlUrl: '',
          avatarUrl: ''
        }
      };
    },
    mounted() {
      // https://github.com/yyx990803
      axios.get('https://api.github.com/search/users?q=yyx990803').then((res) => {
        const userInfo = res.data && res.data.items && res.data.items[0];

        this.userInfo.htmlUrl = userInfo.html_url;
        this.userInfo.avatarUrl = userInfo.avatar_url;
      });
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
