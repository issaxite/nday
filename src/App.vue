<template>
  <div id="app">
    <transition
    :enter-active-class="trans.enter"
    :leave-active-class="trans.leave">
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
const transitions = {
  slideUp: {
    enter: 'animated slideInUp',
    leave: 'animated slideOutUp'
  },
  slideDown: {
    enter: 'animated slideInDown',
    leave: 'animated slideOutDown'
  },
};

export default {
  mounted() {
    // console.log(this)
  },
  data(){
    return {
      trans: transitions.slideDown,
    }
  },
  watch: {
    '$route'(to, from) {
      switch(from.name) {
        case 'cover': 
          this.trans = transitions.slideUp;break;
        case 'home': 
          this.trans = transitions.slideDown;break;
        default: 
          console.error('unknown error');
      }
    }
  }
}
</script>
<style lang="scss">
@import './assets/scss/style';
</style>
