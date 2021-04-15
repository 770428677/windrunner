<template>
  <div class="audioPage">
    <div class="audio">
      <ul>
        <li
          v-for="(audioList,index) in audioList"
          :key="index"
          @click.stop="getAudio(index)">
          <img :src="audioList.imgUrl" alt="">
          <div>
            <span>歌曲名称 ： {{audioList.name}}</span>
            <span>歌手名称 ： {{audioList.user_name}}</span>
            <span>所属专辑 ： {{audioList.album}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div ref="bottomHeight" style="height:1px"></div>
    <div class="audioPlay" ref="audioPlay">
      <div class="articleContent" v-for="(audioArr,i) in audioArr" :key="i" ref="audio" v-show="isShow">
        <audio :src="audioArr.url" id="audio" :autoplay="auto" ref="audio" loop>您的浏览器不支持 video 标签。请您更换其他浏览器</audio>
        <img :src="audioArr.imgUrl" alt="">
        <span>歌曲名称 ： {{audioArr.name}}</span>
        <span>歌手名称 ： {{audioArr.user_name}}</span>
        <span>所属专辑 ： {{audioArr.album}}</span>
      </div>
      <div class="sh" @click="sORh">
        <div v-show="isShow">
          <i class="before"></i><span>隐藏歌曲详情</span><i class="after"></i>
        </div>
        <div v-show="!isShow">
          <i class="before"></i><span>显示歌曲详情</span><i class="after"></i>
        </div>
      </div>
      <ul class="fixedPlay">
        <li class="musicImg">
          <div>
            <img :src="audioArr[0].imgUrl" alt="">
          </div>
        </li>
        <li class="muiscProgressBar">
          <div class="ProgressBar">
            <input type="range" value="0" max="100" min="0" step="1" ref="musicTime" v-model="timeChange" id="musicTime"/>
<!--        :value="isVlaue? currentTime : 0"    -->
            <p><span>{{cMin}}:{{cSec}}</span>/<span>{{dMin}}:{{dSec}}</span></p>
          </div>
          <div>
            <ul class="musicControl">
              <li class="leftControl"  @click="lastMusic()">
                <span><span></span></span>
              </li>
              <li class="playControl" @click="playMusic()">
                <span class="run" v-show="playing"><span></span></span>
                <span class="stop" v-show="!playing"><span></span></span>
              </li>
              <li class="rightControl"  @click="nextMusic()">
                <span><span></span></span>
              </li>
            </ul>
          </div>
        </li>
        <li class="musicVolume">
          <div class="ProgressBar">
            <input id="volume" type="range" value="0.2" max="1" min="0" step="0.01" v-model="volumeChange"/>
          </div>
          <div id="volumeBar"  @click="isVolume()">
          <span>
            <span class="v1" :class="volume? 'bg':'bg1'"></span><span class="v2" :class="volume? 'bg':'bg1'"></span><span class="v3" :class="volume? 'bg':'bg1'"></span><span class="v4" :class="volume? 'bg':'bg1'"></span>
          </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'select2',
  data () {
    return {
      audioList: [],
      audioArr: [{'music_id': '1', 'name': 'Nova', 'url': '/windrunner/static/audio/Nova.mp3', 'imgUrl': '/windrunner/static/audioImg/Nova.jpg', 'user_name': 'Ahrix', 'album': 'Nova'}],
      start: 0,
      playing: true,
      auto: false,
      isShow: false,
      timeChange: 0,
      volumeChange: 0.5,
      volume: true,
      time: null,
      durationTime: 0,
      currentTime: 0,
      intervalTime: null,
      dMin: 0,
      dSec: 0,
      cMin: 0,
      cSec: 0
    }
  },
  methods: {
    getAudio (index) { // 点击播放音乐
      this.audioArr = []
      this.audioArr.push(this.audioList[index])
      this.pause()
      this.play()
      this.playing = false
      this.auto = true
      this.imgArr = this.audioArr[0].imgUrl
      console.log(this.imgArr)
    },
    play () { // 播放
      let audio = document.querySelector('#audio')
      this.auto = false
      audio.play()
      this.playing = false
      this.timeInterval()
    },
    pause () { // 暂停
      let audio = document.querySelector('#audio')
      audio.pause()
      this.playing = true
      if (this.intervalTime === 1000) {
        clearInterval(this.time)
        this.intervalTime = null
      }
    },
    lastMusic () { // 上一首
      this.musicId = this.audioArr[0].music_id
      if (this.musicId === '1') {
        this.audioArr = []
        let audioLisLtength = this.audioList.length
        this.audioArr.push(this.audioList[audioLisLtength - 1])
        this.pause()
        this.playing = false
        this.auto = true
        clearInterval(this.time)
        this.timeInterval()
      } else {
        this.audioArr = []
        this.audioArr.push(this.audioList[this.musicId - 2])
        this.pause()
        this.playing = false
        this.auto = true
        clearInterval(this.time)
        this.timeInterval()
      }
    },
    playMusic () { // 播放暂停
      if (this.playing === true) {
        this.play()
      } else if (this.playing === false) {
        this.pause()
      }
    },
    nextMusic () { // 下一首
      this.musicId = this.audioArr[0].music_id
      if (this.musicId === '15') {
        this.audioArr = []
        this.audioArr.push(this.audioList[0])
        this.pause()
        this.playing = false
        this.auto = true
        clearInterval(this.time)
        this.timeInterval()
      } else {
        this.audioArr = []
        this.audioArr.push(this.audioList[this.musicId])
        this.pause()
        this.playing = false
        this.auto = true
        clearInterval(this.time)
        this.timeInterval()
      }
    },
    getTime () {
      let audio = document.querySelector('#audio')
      this.durationTime = audio.duration
      this.currentTime = audio.currentTime
      this.$refs.musicTime.max = parseInt(this.durationTime) - 2
      this.timeChange = parseInt(this.currentTime) + 1
      if (this.durationTime !== 0) {
        this.min()
        this.sec()
      } else if (this.currentTime === this.durationTime) {
        clearInterval(this.time)
        this.timeInterval()
      }
    },
    timeInterval () {
      if (this.intervalTime === null) {
        this.intervalTime = 1000
        this.time = setInterval(this.getTime, this.intervalTime)
      }
    },
    min () {
      this.dMin = parseInt(this.durationTime / 60 % 60)
      this.dSec = parseInt((this.durationTime - 2) % 60)
      this.dMin = this.dMin > 9 ? this.dMin : '0' + this.dMin
      this.dSec = this.dSec > 9 ? this.dSec : '0' + this.dSec
    },
    sec () {
      this.cMin = parseInt(this.currentTime / 60 % 60)
      this.cSec = parseInt(this.currentTime % 60)
      this.cMin = this.cMin > 9 ? this.cMin : '0' + this.cMin
      this.cSec = this.cSec > 9 ? this.cSec : '0' + this.cSec
    },
    isVolume () {
      if (this.volumeChange !== 0) {
        this.volumeChange = 0
      } else {
        this.volumeChange = 0.5
      }
    },
    sORh () {
      if (this.isShow) {
        this.isShow = !this.isShow
      } else {
        this.isShow = !this.isShow
      }
    },
    setHeight () {
      let height = this.$refs.audioPlay.clientHeight
      this.$refs.bottomHeight.style.height = height + 'px'
    }
  },
  watch: {
    volumeChange: function (value) {
      let audio = document.querySelector('#audio')
      audio.volume = value
      if (this.volumeChange === 0) {
        this.volume = false
      } else {
        this.volume = true
      }
    },
    timeChange: function () {
      this.musicTime = this.$refs.musicTime.value
      let audio = document.querySelector('#audio')
      let current = parseInt(audio.currentTime)
      let durationTime = parseInt(this.durationTime) - 2
      if ((this.musicTime - current) > 15 || (this.musicTime - current) < -15) {
        if (current === durationTime) {
          audio.currentTime = 0
          this.timeChange = 0
        }
        audio.currentTime = this.musicTime
        this.play()
      }
    }
  },
  activated() {
    this.play()
  },
  deactivated () {
    this.playing = true
    if (this.intervalTime === 1000) {
      clearInterval(this.time)
      this.intervalTime = null
    }
  },
  created () {
    Axios({
      url: '/windrunner/static/audioList.json',
      method: 'get'
    }).then(res => {
      if (res.status === 200) {
        this.audioList = res.data.playlist
        this.setHeight()
      }
    })
  }
}
</script>

<style scoped>
  .audio{
    margin:1em auto;
    width:93vw;
  }
  /*音乐列表*/
  .audio ul li{
    display:flex;
    box-sizing: border-box;
    border:1px solid red;
    margin:2vw 0;
  }
  .audio ul li img,.audio ul li div{
    padding: 1vw 1vw;
    align-items: center;
  }
  .audio ul li img{
    width: 15vw;
  }
  .audio ul li div{
    width: 76vw;
  }
  .audio ul li div span{
    display: block;
    width: 75vw;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  .articleContent{
    background-color: #eee;
    box-sizing: border-box;
    border: 1px solid #eee;
    border-radius: 5vw;
    padding-bottom: 5vw;
  }
  .articleContent img{
    width: 60%;
    margin: 5vw auto;

  }
  .articleContent span{
    font-size: 14px;
    font-weight: bold;
    display: block;
    text-align: center;
  }
  .sh div{
    display:flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
  }
  .sh span{
    width:86vw;
    text-align: center;
    display:inline-block;
    line-height: 6vw;
    background-color: #eee;
  }
  .sh i{
    display:inline-block;
    text-align: center;
  }
  .sh .before{
    width: 0;
    height: 0;
    border-bottom: 6vw solid #eee;
    border-left: 6vw solid transparent;
  }
  .sh .after{
    width: 0;
    height: 0;
    border-bottom: 6vw solid #eee;
    border-right: 6vw solid transparent;
  }
    /*播放器样式*/
  .audioPlay{
    position:fixed;
    left:0;
    bottom:0;
    background-color: #fff;
  }
  .fixedPlay {
    width: 100vw;
    border:1px solid #ddd;
    box-sizing: border-box;
    background-color: #eee;
    border-radius: 1vw;
  }
  .fixedPlay li{
    display:inline-block;
    vertical-align: top;
    position:relative;
  }
  .musicImg,.musicVolume{
    width:15vw;
  }
  .musicImg img{
    margin: 2vw;
    width:100%;
  }
  .musicVolume{
    padding: 2vw 0;
  }
  .musicVolume>div{
    display:flex;
  }
  .musicVolume>div>input{
    width: 90%;
    align-self:center;
  }
  .muiscProgressBar{
    width:67vw;
    text-align: center;
    vertical-align: middle;
  }
  .ProgressBar input{
    width:80%;
  }
  .ProgressBar input[type="range"] {
    /*滑动条背景*/
    -webkit-appearance: none;
    background-color: rgba(115, 133, 159, 0.5);
    height: 5px;
  }
  .ProgressBar input[type=range]:focus {
    /*滑动条选择后外边距*/
    outline: none;
  }
  .ProgressBar input[type="range"]::-webkit-slider-thumb {
    /*滑动条操作按钮样式*/
    -webkit-appearance: none;
    border-radius: 5px;
    background: red;
    width: 10px;
    height: 11px;
  }
  .musicControl li{
    display:inline-block;
    vertical-align: top;
  }
  .leftControl>span>span{
    display:inline-block;
    width: 0;
    height: 0;
    border-right: 10vw solid #000;
    border-bottom: 5vw solid transparent;
    border-top: 5vw solid transparent;
  }
  .leftControl>span{
    display:inline-block;
    height: 10vw;
    padding-left: 5px;
    border-left: 1px solid #000;
  }
  .playControl>.run{
    display:flex;
    flex-flow:row-reverse;
    align-items: center;
    width: 10vw;
    height:10vw;
    border: 1px solid #000;
    border-radius: 5vw;
  }
  .playControl>.run>span{
    display: block;
    width: 0;
    height: 0;
    border-left: 8vw solid #000;
    border-bottom: 4vw solid transparent;
    border-top: 4vw solid transparent;
  }
  .playControl>.stop{
    display:flex;
    align-items: center;
    justify-content:center;
    width: 10vw;
    height: 10vw;
    border: 1px solid #000;
    border-radius: 5vw;
  }
  .playControl>.stop>span{
    display: block;
    width: 2.5vw;
    height: 5vw;
    border-left: 1vw solid #000;
    border-right: 1vw solid #000;
  }
  .rightControl>span>span{
    display:inline-block;
    width: 0;
    height: 0;
    border-left: 10vw solid #000;
    border-bottom: 5vw solid transparent;
    border-top: 5vw solid transparent;
  }
  .rightControl>span{
    display:inline-block;
    height: 10vw;
    padding-right:5px;
    border-right:1px solid #000;
  }

  /*音量静音*/
  .isShow{
    display: block;
  }
  .isHidden{
    display: none;
  }
  #volumeBar{
    margin: 5vw;
  }
  #volumeBar>span{
    margin:0 auto;
  }
  #volumeBar span span{
    display:inline-block;
    margin:0 0.3vw;
    width: 0.6vw;
  }
  #volumeBar .v1{
    height: 1vw;
  }
  #volumeBar .v2{
    height: 1.5vw;
  }
  #volumeBar .v3{
    height: 2vw;
  }
  #volumeBar .v4{
    height: 2.5vw;
  }
  .bg{
    background-color: #000;
  }
  .bg1{
    background-color: red;
  }
</style>
