<template>
  <div id="debug">
    <span v-for="item in list"{{ item }}></span>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      list: this.data
    };
  }
}
</script>

<style>
#debug{ position: absolute;top: 0;left: 0;right: 0;z-index: 1000000; }
</style>
