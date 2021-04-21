<template>
</template>

<script>

import {mapState} from 'vuex'


export default {


middleware: ['passport'],

 mounted() {
   if (this.$route.params.passport) {
    this.$store.dispatch('passport/loadPassport',this.$route.params.passport)
    console.log(this.$route.params.passport)
   }
  }
}
</script>

