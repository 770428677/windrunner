<template>
  <div>
    <Header></Header>
    <div class="lunbo">
      <h2 class="articleTitle" ref="articleTitle">{{articleArr.name}}</h2>
      <div class="articleIntroduce" ref="articleIntroduce">
        <span><b>文章类型：</b>{{articleArr.type}}</span>
        <span><b>{{articleArr.from}}：</b><a v-show="articleArr.href" :href="articleArr.href" class="yuanwen">跳转到原文</a></span>
        <span><b>关键词：</b>{{articleArr.keyWords}}</span>
      </div>
      <textarea name="content" ref="content" id="content" cols="30" v-bind:value="articleArr.article">

      </textarea>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'
  import Axios from "axios";

  export default{
    name: 'Article',
    components: {
      Header,
      Footer,
    },
    data () {
      return {
        articleArr: [],
        articleId: -1,
        curHeight: 0
      }
    },
    activated () {
      // 取到路由带过来的参数
      var id = this.$route.query.id
      if (this.articleId === id) {
        return
      }
      this.articleId = this.$route.query.id
      Axios({
        url: '/windrunner/static/articleList.json',
        method: 'get'
      }).then(res => {
        if (res.status === 200) {
          this.articleArr = res.data.articleArr[this.articleId]
          // console.log(this.articleArr[this.articleId])
        }
      })

    },
    mounted: function () {
      let h = document.documentElement.clientHeight || document.body.clientHeight;
      let titleHeight = this.$refs.articleTitle.clientHeight
      let introduceHeight = this.$refs.articleIntroduce.clientHeight
      let contentHeight = h - titleHeight - introduceHeight
      this.$refs.content.style.height = contentHeight - 65 - 40 + 'px' // 65标题栏固定高度，40为ref=“content”的padding的值
    },
    methods: {

    },
    watch: {

    }
  }
</script>

<style scoped>
  .lunbo{
    padding-top: 65px;
    width:93vw;
    margin:0 auto;
  }
  .articleTitle{
    text-align: center;
    padding:3%;
  }
  .yuanwen{
    color:blue;
  }
  #content{
    width:100%;
    font-size: 14px;
    padding:20px 10px;
    white-space:nowrap;
    background-color: #eee;
  }
  .articleIntroduce{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
</style>
