<template>
  <div>
    <Header></Header>
      <div>
        <div class="lunbo homeBody" ref="ab">
          <div class="swiper">
            <div class="container">
              <ul
                ref="imgBox"
                @transitionend="animateEnd"
                @touchstart="touchstart($event)"
                @touchmove="touchmove($event)"
                @touchend="touchend">
                <!-- 过渡结束事件、开始触摸、触摸移动和触摸结束事件 -->
                <!-- 为了实现无缝循环滚动需要在li前后分别复制最后一张图片和第一张图片 -->
                <li><img :src="imgArr[imgArr.length-1].src" alt=""></li>
                <li
                  v-for="(item, index) in imgArr"
                  :key="index"
                >
                  <img :src="item.src" alt="">
                </li>
                <li><img :src="imgArr[0].src" alt=""></li>
              </ul>
            </div>
          </div>
        </div>
      <div class="imgBanner">
        <img src="../../../static/img/pic-banner1.jpg" alt="" title="风景">
      </div>
      <div class="pageContent">
        <div class="radio-wrap switching">
          <ul class="radio-group">
            <li
              v-for="(item,index) in imgArrs"
              :class="{cur:iscur===index}"
              @click="iscur=index, tabChange(item,index)"
              :key="index"
            >
              <img class="firstImg" :class="item.flag? 'imgShow':'imgHidden'" :src='item.src1' alt="">
              <img class="secondImg" :class="item.flag? 'imgHidden':'imgShow'" :src="item.src2" alt="">
            </li>
          </ul>
          <keep-alive>
            <component v-bind:is="tabView"></component>
          </keep-alive>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import select1 from '@/components/page/programPage'
import select2 from '@/components/page/muiscPage'
import select3 from '@/components/page/gamePage'
export default{
  name: 'Home',
  components: {
    Header,
    Footer,
    select1,
    select2,
    select3

  },
  data () {
    return {
      // 轮播
      imgArr: [
        {src: '/windrunner/static/img/program.jpg'},
        {src: '/windrunner/static/img/music.jpg'},
        {src: '/windrunner/static/img/game.jpg'}
      ],
      flag: true, // 节流阀 防止快速滑动
      circleIndex: 0, // 当前展示图片对应圆点
      imgIndex: 0, // 当前展示图片
      timer: null, // 圆点定时器
      imgWidth: 0, // 图片宽度
      startX: 0, // 手指开始触摸位置
      moveX: 0, // 手指移动距离
      interval: 2000, // 滚动间隔时间

      // 页签切换
      tabView: 'select1',
      iscur: 0,
      imgArrs: [
        {flag: false, src1: '/windrunner/static/img/heike.jpg', src2: '/windrunner/static/img/web.jpg'},
        {flag: true, src1: '/windrunner/static/img/ailunwoke.jpg', src2: '/windrunner/static/img/xianchang.jpg'},
        {flag: true, src1: '/windrunner/static/img/xiongmao.jpg', src2: '/windrunner/static/img/fengjing1.jpg'}
      ]
    }
  },
  watch: {
    // 轮播
    circleIndex () { // 监视原点索引变化
      if (this.circleIndex >= this.imgArr.length) {
        this.circleIndex = 0
      }
      if (this.circleIndex < 0) {
        this.circleIndex = this.imgArr.length - 1
      }
    }
  },
  computed: {
    // 轮播
    translateX () { // 计算图片ul当前距离
      return -(this.imgWidth + this.imgWidth * this.imgIndex)
    }
  },
  mounted () {
    // 轮播
    this.imgWidth = Math.floor(window.innerWidth * 0.9) + 2 // 获取图片宽度 获取的宽度与实际宽度有误差，获取到为337 实际观测为337.5，
    console.log('width:' + this.imgWidth)
    // ul先左移动一个图片距离，显示第一张图片
    this.$refs.imgBox.style.transform = `translateX(-${this.imgWidth}px)`
    this.timer = setInterval(() => { // 自动轮播
      this.imgIndex++
      this.circleIndex++
      this.$refs.imgBox.style.transition = 'all .5s' // 切换下一张图片
      this.$refs.imgBox.style.transform = `translateX(${this.translateX}px)`
    }, this.interval)
  },
  methods: {
    // 轮播
    animateEnd () { // 过渡结束事件
      if (this.imgIndex >= this.imgArr.length) { // 判断当前图片索引是否为最后一张图
        this.imgIndex = 0
        this.$refs.imgBox.style.transition = 'none' // 迅速跳转至第一张图
        this.$refs.imgBox.style.transform = `translateX(-${this.imgWidth}px)`
      }
      if (this.imgIndex < 0) { // 判断当前图片索引是否为第一张图
        this.imgIndex = this.imgArr.length - 1
        this.$refs.imgBox.style.transition = 'none' // 迅速跳转至最后一张图
        this.$refs.imgBox.style.transform = `translateX(${this.translateX}px)`
      }
      this.flag = true // 打开节流阀
    },
    touchstart ($event) { // 手指开始触摸事件
      clearInterval(this.timer) // 关闭自动轮播
      if (this.flag) {
        this.startX = $event.targetTouches[0].clientX // 获取开始触摸位置
      }
    },
    touchmove ($event) { // 手指开始移动
      if (this.flag) {
        this.moveX = $event.targetTouches[0].clientX - this.startX // 手指移动位置
        this.$refs.imgBox.style.transition = 'none' // 图片ul跟随手指移动
        this.$refs.imgBox.style.transform = `translateX(${this.translateX + this.moveX}px)`
      }
    },
    touchend (event) { // 结束触摸
      if (this.flag) {
        if (this.moveX > 80) { // 移动距离大于80，图片索引--
          this.imgIndex--
          this.circleIndex--
        } else if (this.moveX < -80) { // 移动距离小于-80，图片索引++
          this.imgIndex++
          this.circleIndex++
        }
        this.$refs.imgBox.style.transition = 'all .5s' // 展示当前索引图片
        this.$refs.imgBox.style.transform = `translateX(${this.translateX}px)`
      }
      // 触摸事件完成，继续自动轮播
      clearInterval(this.timer) // 防止定时器叠加
      this.timer = setInterval(() => {
        this.imgIndex++
        this.circleIndex++
        this.$refs.imgBox.style.transition = 'all .5s'
        this.$refs.imgBox.style.transform = `translateX(${this.translateX}px)`
      }, this.interval)
      this.flag = false // 关闭节流阀，等待动画完成
    },

    // 页签切换
    tabChange: function (item, index) {
      this.tabView = 'select' + (index + 1)
      this.imgArrs.forEach(function (imgArrs, i, arr) {
        if (i === index) {
          imgArrs.flag = false
        } else {
          imgArrs.flag = true
        }
      })
    }
  }
}
</script>

<style scoped>
  .homeBody{
    background: url("../../../static/img/banner-bg.jpg") center repeat-y ;
  }
  /*轮播图*/
  .lunbo{
    padding:100px 0 30px 0;
  }
  .container{
    width: 90vw;
    height:calc(90vw / 1.78 );
    margin:0 auto;
    overflow: hidden;
  }
  .container ul{
    width: 10000px;
  }
  .container ul li{
    display:inline-block;
    box-sizing: border-box;
    border:none;
  }
  .container ul li img{
    width: 90vw;
    height: calc(90vw / 1.78);
  }
  .circle ol{
    vertical-align: middle;
    text-align: center;
  }
  .circle ol li{
    display:inline-block;
    width:5vw;
    height:5vw;
    border-radius: 50%;
    background-color: #cccccc;
    margin:2vw 3vw;
    font-size: 16px;
    color: #444;
  }
  /* 轮播结束 */
  /* 页签切换 */
  .pageContent{
    padding-top:30px;
  }
  .imgShow{
    display:inline-block;
  }
  .imgHidden{
    display:none;
    text-align: center;
    vertical-align: middle;
  }
  .pageContent .switching ul{
    margin:0 auto;
    width:93vw;
  }
  .pageContent .switching ul li{
    display:inline-block;
  }
  .pageContent .switching ul li .firstImg{
    width: 23vw;
    box-sizing: border-box;
    border:1px solid #ddd;
  }
  .pageContent .switching ul li .secondImg{
    width: 47vw;
    box-sizing: border-box;
    border:1px solid #ddd;
  }
</style>
