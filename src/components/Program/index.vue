<template>
  <div>
    <Header></Header>
    <select1 class="lunbo"></select1>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import select1 from '@/components/page/programPage'
export default{
  name: 'Program',
  components: {
    Header,
    Footer,
    select1
  }
}
</script>

<style scoped>
  .lunbo{
    padding-top: 65px;
  }
</style>
