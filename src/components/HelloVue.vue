<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>
            For a guide and recipes on how to configure / customize this project,<br>
            check out the
            <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
        </p>

        <h3>Contributors</h3>
        <button v-on:click="changeUser">click to change</button>
        <div v-if="tips">
            <span class="tips">{{tips}}</span>
        </div>
        <br>
        <div v-if="userInfo.userName">
            <span class="github-user-name">{{userInfo.userName}}</span>
        </div>
        <div v-if="userInfo.htmlUrl">
            <a :href="userInfo.htmlUrl" class="github-html-url" target="_blank">{{userInfo.htmlUrl}}</a>
        </div>
        <div v-if="userInfo.avatarUrl">
            <img :src="userInfo.avatarUrl" :alt="userInfo.userName" class="github-avatar-url" />
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
        isLoading: false,
        totalCount: 0,
        userInfo: {
          userId: '',
          userName: '',
          htmlUrl: '',
          avatarUrl: ''
        },
        tips: ''
      };
    },
    methods: {
      fetchUser: function (userId, userName) {
        if (this.isLoading) {
          this.tips = 'click too fast...';
          return;
        }

        this.isLoading = true;
        this.tips = 'loading...';

        axios.get(`https://api.github.com/search/users?q=${userId}`).then((res) => {
          const userInfo = res.data && res.data.items && res.data.items[0];

          this.isLoading = false;
          this.tips = '';
          this.userInfo.userId = userId;
          this.userInfo.userName = userName || 'unknown';
          this.userInfo.htmlUrl = userInfo.html_url;
          this.userInfo.avatarUrl = userInfo.avatar_url;
        }).catch((err)=>{
          this.tips = `Sorry some wrong hippend! Please refresh page and try again. Error message: ${err}`;
          this.isLoading = false;
        })
      },
      changeUser: function () {
        if (this.userInfo.userId !== 'yyx990803') {
          // https://github.com/yyx990803
          this.fetchUser('yyx990803', 'Evan You');
        } else {
          this.fetchUser('Jinjiang', 'Jinjiang');
        }
      }
    },
    mounted() {
      this.changeUser();
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
