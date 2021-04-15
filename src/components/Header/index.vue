<template>
  <Header id="header">
    <div class="header">
      <nav class="navbar navbar-default">
        <div class="container-fluid" >
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" @click.stop="clickToggle">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <div>
              <a class="navbar-brand logo" href="#">
                <img src="../../../static/img/logo.png" alt="兴趣爱好者"/>
              </a>
            </div>
          </div>

          <!--Collect the nav links, forms, and other content for toggling-->
          <div class="collapse navbar-collapse barWidth" v-show="toggle" id="barPageClick">
            <ul class="nav navbar-nav">
              <router-link tag="li" to="home" class="active"><a>楼主小窝</a></router-link>
              <li><a href="#">建议留言</a></li>
              <li class="dropdown" :class="{'open':isActive}">
                <i class="dropdown-toggle" @click.stop="clickChildToggle">兴趣爱好<span class="caret"></span></i>
                <ul class="dropdown-menu" v-show="childToggle">
                  <router-link tag="li" to="program"><a>搬砖代码</a></router-link>
                  <router-link tag="li" to="music"><a>迷幻电音</a></router-link>
                  <router-link tag="li" to="game"><a>WOW世界</a></router-link>
                </ul>
              </li>
            </ul>
            <form class="navbar-form">
              <div>
                <div class="form-group ">
                  <input type="text" class="form-control" placeholder="输入您想要搜索的内容">
                </div>
                <button type="submit" class="btn btn-default">搜索</button>
              </div>
            </form>
          </div>
        </div> <!--/.navbar-collapse &ndash;&gt;-->
      </nav>
    </div>
  </Header>
</template>

<script>
export default {
  name: 'Head',
  data () {
    return {
      toggle: false,
      childToggle: false,
      isActive: false
    }
  },

  methods: {
    clickToggle: function () {
      this.toggle = !this.toggle
      this.childToggle = false
      this.isActive = false
    },
    clickChildToggle: function () {
      this.childToggle = !this.childToggle
      if (this.childToggle) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    }
  }
}
</script>

<style scoped>
    .header{
      width:100%;
      position:fixed;
      top:0;
      background-image: url('../../../static/img/bar-bg1.jpg');
      padding-bottom:1px;
      z-index: 100;
    }
    nav{
      box-sizing:border-box;
      border-bottom: 0.1em solid #aaa;
    }
    .header nav .logo{
      display:block;
    }
    .header nav .logo img{
      width:40%;
      min-height: 60px;
      max-width:161px;
    }
    .navbar-nav{
      margin-top:0.6em;
      border-top:0.15em solid #fff;
      border-bottom:0.15em solid #fff;
    }
    .navbar-default .navbar-toggle{
      position: fixed;
      top: 0;
      right: 0;
      padding: 0.5em .8em;
      margin-top: 0.6em;
      margin-right: 1em;
      margin-bottom: 0.6em;
      background-color: transparent;
      background-image: none;
      border: 0.15em solid #ddd;
      border-radius: 0.5em;
    }
    .navbar-header button {
      cursor: pointer;
    }
    .navbar-header:after{
      clear:both;
    }
    .navbar span.caret{
      width: 0;
      height: 0;
      border-right: 0.5em solid transparent;
      border-left: 0.5em solid transparent;
      border-top: 0.5em solid #fff;
      position:relative;
      top: 0.8em;
      left: 0.4em;
    }
    .navbar-default .navbar-toggle .icon-bar{
      background-color: #888;
    }
    .navbar-toggle .icon-bar{
      display: block;
      width: 22px;
      height: 2px;
      border-radius: 1px;
      margin:4px 0 ;
    }
    .navbar-brand{
      padding:0;
    }
    .navbar-default .navbar-nav>li>a,.navbar-default .navbar-nav>li>i{
      display:block;
      padding: 0.8em 0 0.8em 0.8em;
      line-height: 1em;
      font-size:14px;
    }
    .dropdown-menu{
      margin-top:0.5em;
    }
    .navbar-nav .dropdown-menu li>a{
      display:block;
      padding: 0.8em 0 0.8em 1.8em;
      line-height: 1em;
      font-size:14px;
    }
    .navbar-default .navbar-nav>.active>a, .navbar-default .navbar-nav>.active>a:focus, .navbar-default .navbar-nav>.active>a:hover{
      background-color:transparent;
      color:#fff;
    }
    .navbar-default .navbar-nav>.open>i, .navbar-default .navbar-nav>.open>i:focus, .navbar-default .navbar-nav>.open>i:hover{
      background:url('../../../static/img/bar-bg.png');
      color: #ccc;
    }
    .navbar-default .navbar-nav>li>a,.navbar-default .navbar-nav>li>i{
      color:#eee;
    }
    .navbar-default .navbar-nav>li>a:focus, .navbar-default .navbar-nav>li>a:hover{
      color:#ccc;
    }
    .navbar-nav>li>.dropdown-menu>li{
      color:#eee;
    }
    .navbar-default .navbar-nav .dropdown-menu>li>a:focus, .navbar-default .navbar-nav .dropdown-menu>li>a:hover{
      color:#ccc;
    }
    .navbar-nav>li>.dropdown-menu>li>a{
      color:#777;
    }
    .navbar-form{
      margin-bottom:0;
    }
    .navbar-form{
      text-align: center;
      vertical-align: middle;
      line-height: 4.5em;
      width:100%;
    }
    .navbar-form .form-group,.navbar-form button{
      display:inline-block;
    }
    .form-group{
      width:75%;
    }
    .navbar-form .form-group .form-control{
      width: 100%;
      height: 34px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #000;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
      transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
      placeholder: #555;
    }
    .navbar-form button {
      width:20%;
      max-width:5em;
      padding: 6px 12px;
      margin-bottom: 0;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.42857143;
      text-align: center;
      white-space: nowrap;
      touch-action: manipulation;
      cursor: pointer;
      border: 1px solid transparent;
      border-radius: 4px;
    }
    input::-webkit-input-placeholder { /* WebKit browsers */
      color: #ccc;
    }
    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #ccc;
    }
    input::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #ccc;
    }
    input:-ms-input-placeholder { /* Internet Explorer 10+ */
      color: #ccc;
    }
    @media screen and (max-width:767px){
  }

</style>
