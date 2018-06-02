<template>
  <div id="summary" class="item">
    <a href="javascript:;" @touchstart="next"></a>
    <dl><img :src="text0"></dl>
    <dl><img :src="emoji"></dl>
    <dl><img :src="text1"></dl>
  </div>
</template>
<script>
// bus
import bus from '../../assets/js/bus';
// img
import text0 from '../../../static/img/summary/text0.png';
import text1 from '../../../static/img/summary/text1.png';
import emoji from '../../../static/img/summary/emoji.gif';

export default {
  data() {
    return {
      text0, text1, emoji,
      page: 'isSummary'
    };
  },
  methods: {
    next() {
      bus.$emit('next', this.page);
    }
  }
}
</script>
