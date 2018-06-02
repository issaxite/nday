<template>
  <div id="operate">
    <audio id="lighter" data-status="0" preload="auto" src="http://sl-cdn.hingyin.com/o_1br5vf10818se15121l981pfu84bc.mp3"></audio>
    <div class="mask" :style="{ opacity: maskOpacity }" v-show="isMask"></div>
    <div class="operate">
      <transition enter-active-class="animated zoomIn">
        <a href="javascript:;" class="next" v-show="isNext" @touchstart="nextPage"></a>
      </transition>
      <transition enter-active-class="animated zoomIn">
        <a href="javascript:;" class="back" v-show="isBack" @touchstart="prevPage"></a>
      </transition>
      <div class="start" v-show="isShowStart">
        <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
          <img class="fire" v-show="isFire" src="http://sl-cdn.hingyin.com/o_1br5u4l5r1ottvcf1su57vd91b7.gif">
        </transition>
        <a href="javascript:;" @touchstart="startPage"><img :src="fingerPart" class="animated" :class="{ figerSwig: isFiger }"></a>
        <!-- <span><i></i></span> -->
      </div>
    </div>
  </div>
</template>
<script>
import bus from '../../assets/js/bus';
// img
import fingerPart from '../../../static/img/figer_part.png';;

export default {
  props: ['mask', 'next', 'showNext','back', 'showBack', 'page', 'start', 'showStart', 'drag'],
  mounted() {
    const self = this;
    bus.$on('showNext', () => {
      self.isNext = true;
    });
  },
  data() {
    return {
      fingerPart: 'http://sl-cdn.hingyin.com/o_1br7bjl19rr360d14cbtej1i6h1k.png',
      isHitLighter: false,
      isFiger: false,
      isFire: false,
      isStart: this._defaultStatus(this.start),
      isMask: this._defaultStatus(this.mask, false),
      isNext: this._defaultStatus(this.next, false),
      isBack: this._defaultStatus(this.back),
      isShowStart: this._defaultStatus(this.showStart),
      which: this.page,
      maskOpacity: 1,
    };
  },
  watch: {
    next() {
      console.log(this.next);
      this.isNext = this.next;
    }
  },
  methods: {
    _fire(duration) {
      const self = this;
      self.isFire = true;
      setTimeout(() => {
        self.isFire = false;
      }, duration);
    },
    _figer(duration) {
      const self = this;
      self.isFiger = true;
      self._hitLighterAudio();
      setTimeout(() => {
        self.isFiger = false;
      }, duration);
    },
    _defaultStatus(status, defaultStatus = true) {
      return typeof status == 'undefined' ? defaultStatus : status;
    },
    _hitLighterAudio() {
      let audio = document.querySelector('audio#lighter');
      audio.play();
    },
    startPage() {
      const self = this;

      self._fire(800);
      self._figer(350);

      // 防止二次触发下面的事件
      if(self.isStart){ return ; }

      self.isStart = true;
      self.maskOpacity = 0;

      setTimeout(() => {
        self.isMask = false;
        // self.isNext = true;

        self.isFire = false;
        self.isBack = true;
        bus.$emit('initTipFlash');
        document.querySelector(self.drag).style.zIndex = 130;
      }, 1800);
    },
    nextPage() {
      bus.$emit('next', this.which);
      bus.$emit(`${this.which}-next`);
    },
    prevPage() {
      bus.$emit('back');
      bus.$emit(`${this.which}-back`);
    }
  }
}
</script>
