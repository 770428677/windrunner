<template>
  <div>
    <Header></Header>
    <select3 class="lunbo"></select3>
    <Footer></Footer>
  </div>
</template>

<script>
// import header from '../Header'
// import footer from '../Footer'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import select3 from '@/components/page/gamePage'

export default{
  name: 'Game',
  components: {
    Header,
    Footer,
    select3
  },
  data () {
    return {
      value: 0,
      change: 50,
      volume: true
    }
  },
  methods: {
    isVolume () {

    }
  },
  watch: {
    change: function () {
      console.log(this.$refs.value.value)
    }
  }
}
</script>

<style scoped>
  .lunbo{
    padding-top: 65px;
  }
</style>
