<template>
  <div id="country" class="item">
    <audio preload="auto" src="http://sl-cdn.hingyin.com/o_1br6fb6a61tuie3l1al530bpm7.mp3"></audio>
    <div class="text">
      <dl v-show="isText0" class="animated fadeInUp"><img :src="text0"></dl>
      <dl v-show="isText1" class="animated fadeInUp"><img :src="text1"></dl>
      <dl v-show="isText2" class="animated fadeInUp"><img :src="text2"></dl>
    </div>
    <div class="tip">
      <dl class="denote animated" :class="{ zoomOut: isTipoff, 'flash infinite': !isTipoff && isFlash }"></dl>
      <dl class="arrow animated" :class="{ zoomOut: isTipoff}"></dl>
    </div>
    <div class="sky">
      <dl class="plane"></dl>
      <dl class="land"></dl>
    </div>
    <div class="sence">
      <dl class="flag"></dl>
      <dl class="door"></dl>
      <dl class="crowd"></dl>
      <dl class="role-0">
        <img :src="role0.part" class="animated infinite" :class="{ cLimbsSwing: isMotion }">
      </dl>
      <dl class="role-1">
        <img :src="role1.part" class="animated infinite" :class="{ cLimbsSwing: isMotion }">
      </dl>
      <dl class="role-2"></dl>
    </div>
    <v-operate :start="false" :mask="true" :next="isNext" :back="false" drag="#country .drag" :page="page"></v-operate>
    <a class="drag animated infinite" @touchstart="dragStart" @touchmove="dragMove"><i></i></a>
    <i class="match" :class="{ 'no-bgimg': isMotion }"></i>
  </div>
</template>
<script>
import bus from '../../assets/js/bus';
import operate from '../common/_operate';

export default {
  created() {
    const self = this;
    bus.$on('initTipFlash', () => {
      self.isFlash = true;
    });
    bus.$on(`${self.page}-next`, () => {
      self._audioPause();
    });
  },
  mounted() {
    // console.log('country-page');
    // this._showText(3);
  },
  data() {
    return { 
      isText0: false,
      isText1: false,
      isText2: false,
      isMotion: false,
      isTipoff: false,
      isFlash: false,
      isNext: false,
      tipFlash: 'flash infinite',
      text0: 'http://sl-cdn.hingyin.com/o_1br9bo3sh1m7r7dp1m94iuurel1u.png', 
      text1: 'http://sl-cdn.hingyin.com/o_1br9bqe0g1if91ho6eqf1rc31tfh23.png', 
      text2: 'http://sl-cdn.hingyin.com/o_1br9bri6311u91g9lkpfnn71fva28.png',
      role0: { part: 'http://sl-cdn.hingyin.com/o_1br7arbcsau3f4um3i1jb01befh.png' },
      role1: { part: 'http://sl-cdn.hingyin.com/o_1br7assfe19ur1p9p1l2dl0tfqer.png' },
      page: 'isCountry',
      isCash: false,
      cLimbsAnimate: 'cLimbsSwing', 
      drag: {
        differ: 0,
        size: [], // [w, h]
        animation: 'pFanSwing',
        pointEl:'#country .drag>i'
      },
      match: {
        el: '#country i.match',
        dom: null,
        range: [1,1], // [xRadius, yRadius]
        origin: [] // [x, y]
      }
    };
  },
  methods: {
    _audioPlay() {
      let dom = document.querySelector('#country>audio');
      // console.log(dom);
      dom.play();
    },
    _audioPause() {
      let dom = document.querySelector('#country>audio');
      dom.pause();
    },
    _initMatchData() {
      const self = this;
      let dom = document.querySelector(self.match.el);
      let range = [dom.offsetWidth / 2, dom.offsetHeight / 2];
      let minRange = Math.min(range[0], range[1]);

      self.match.dom = dom;
      self.match.range = [minRange, minRange];
      self.match.origin = [dom.offsetLeft + range[0], dom.offsetTop + range[1]];
    },
    _showText(counter, callback, delay = 0, duration = 1000) {
      const self = this;
      let len = counter;

      setTimeout(() => {
        let timer = setInterval(() => {
          self[`isText${len - counter}`] = true;
          // self[`isText0`] = true;
          --counter
          if(!counter) {
            clearInterval(timer);
            callback && callback();
          }
        }, duration);
      }, delay);
    },
    dragStart(e) {
      const self = this;
      const target = e.target;
      const touche = e.changedTouches[0];

      let pos = [touche.pageX, touche.pageY];
      let offset = [target.offsetLeft, target.offsetTop];
      let differ = [pos[0] - offset[0], pos[1] - offset[1]];

      self.drag.differ = differ;
      self.isTipoff = true;
      self._initMatchData();
    },
    dragMove(e) {
      const self = this;
      if(self.isCash) { return false; }

      const target = e.target;
      const touchPoint = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
      
      let match = self.match;
      let pos = [touchPoint[0] - self.drag.differ[0], touchPoint[1] - self.drag.differ[1]];

      let range = [target.offsetWidth / 2, target.offsetHeight / 2];
      let origin = [pos[0] + range[0], pos[1] + range[1]];

      target.style.left = `${pos[0]}px`;
      target.style.top = `${pos[1]}px`; 

      const isXCash = Math.abs(origin[0] - match.origin[0]) < range[0] + match.range[0];
      const isYCash = Math.abs(origin[1] - match.origin[1]) < range[1] + match.range[1];
      self.isCash = isXCash && isYCash;

      if(self.isCash) {
        let drag = document.querySelector(self.drag.pointEl);
        target.style.left = `${match.dom.offsetLeft}px`;
        target.style.top = `${match.dom.offsetTop}px`;
        self.isMotion = true;
        self._showText(3, () => {
          // bus.$emit('showNext');
          self.isNext = true;
        });
        self._audioPlay();
      }
    }
  },
  components: {
    'v-operate': operate
  }
}
</script>
