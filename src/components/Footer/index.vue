<template>
  <Footer id="footer">
    <div class="beian">
      <p>练习用网站，如有任何侵害权益行为请联系本人<br/>本人尽快删除相关内容</p>
      <p><b>邮箱:</b>770428677@qq.com,<b>备案：</b><a href="https://beian.miit.gov.cn/#/Integrated/index">京ICP备17069025号-1</a></p>
      <p></p>
    </div>
  </Footer>
</template>

<script>
export default {
  name: 'Foot'
}
</script>

<style scoped>
  #footer{
    clear:both;
  }
  .beian{
    display:none;
  }
  @media screen and (min-width:767px) {
    div p{
      text-align: center;
    }
    div a{
      cursor:pointer;
      color:blue;
    }
    .beian{
      display:block;
    }
  }
</style>
