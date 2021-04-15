<template>
  <div>
    <Header></Header>
    <select2 class="lunbo"></select2>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import select2 from '@/components/page/muiscPage'

export default{
  name: 'Music',
  components: {
    Header,
    Footer,
    select2
  }
}
</script>

<style scoped>
  .lunbo{
    padding-top: 65px;
  }
</style>
