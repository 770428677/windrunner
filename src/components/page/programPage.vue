<template>
  <div class="programPage">
    <ul class="articles">
      <li v-for="(articleArr,index) in articleArr" :key="index" @click="parameter(index)">
        <ol>
          <li>
            <img :src="articleArr.src" alt="">
            <div class="articleContent">
              <h3>{{articleArr.name}}</h3>
              <p>
                <span>文章类型: {{articleArr.type}}</span><br/>
                <span>
                  {{articleArr.from}}
                  <a v-show="articleArr.href" :href="articleArr.href">点击跳转到原文</a>
                </span><br/>
                <span>关键词: {{articleArr.keyWords}}</span>
              </p>
            </div>
          </li>
        </ol>
      </li>
    </ul>
    <router-link tag="div" to="program" class="programLink">
      <button class="moreProgram" type="button">点击查看更多</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'select1',
  data () {
    return {
      articleArr: [
        {id: '0', name: 'css通用样式', src: '/windrunner/static/img/css.png', type: 'css', from: '笔记', href: '', keyWords: 'css, 通用样式'},
        {id: '1', name: 'input中的placeholder如何设置颜色', src: '/windrunner/static/img/css.png', type: 'css', from: '转载自:', href: 'https://blog.csdn.net/zeyu1021/article/details/44563393', keyWords: 'placeholder, 设置颜色'},
        {id: '2', name: 'vue之tab标签切换功能', src: '/windrunner/static/img/vue.png', type: 'vue', from: '转载自:', href: 'https://blog.csdn.net/weixin_41014370/article/details/79610440', keyWords: 'vue, 页签切换'},
        {id: '3', name: 'vue(事件处理：v-on)', src: '/windrunner/static/img/vue.png', type: 'vue', from: '转载自:', href: 'https://blog.csdn.net/qq_42238554/article/details/86592295', keyWords: 'v-on事件处理, 事件修饰符'}
      ],
      id: 0
    }
  },
  methods:{
    parameter (index) {
      this.id = index
      this.$router.push({
        path: '/Article',
        query: {
          id: this.id
        }
      })

    }
  }
}
</script>

<style scoped>
  .programPage{
    margin:1em auto;
    width:90vw;
  }
  .articles>li>ol{
    box-sizing: border-box;
    border:1px solid #777777;
    margin-bottom: 1em;
  }
  .articles>li>ol>li{
    margin:1em;
    height:20vw;
    position:relative;
  }
  .articles>li>ol>li>img{
    width:20vw;
    box-sizing: border-box;
    border:1px solid #aaa;
    display:block;
    position:absolute;
    top:0;
    left:0;
  }
  .articles>li>ol>li>.articleContent{
    width:60vw;
    box-sizing: border-box;
    border:1px solid transparent;
    margin-left: 0.5em;
    display:block;
    position:absolute;
    top:0;
    right:0;
  }
  .articleContent h3,.articleContent p{
    width:60vw;
  }
  .articleContent h3{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  .articleContent a{
    cursor: pointer;
    color: lightblue;
  }
  router-link{

  }
  .programLink{
    width:90vw;
    text-align: center;
  }
  .moreProgram{
    width: 40vw;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    border: 1px solid #bbb;
    border-radius: 4px;
  }
</style>
