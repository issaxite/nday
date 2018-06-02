<template>
  <div id="end" class="item">
    <dl>
      <img :src="end">
      <a href="javascript:;" @touchstart="toCover"></a>
    </dl>
    <dl><img :src="sqcode"></dl>
  </div>
</template>
<script>
import sqcode from '../../../static/img/end/sqcode.png';
import end from '../../../static/img/end/end.png';

export default {
  data() {
    return { sqcode, end };
  },
  methods: {
    toCover() {
      location.href = "#/";
    }
  }
}
</script>
