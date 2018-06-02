<template>
  <div id="mao" class="item">
    <audio src="http://sl-cdn.hingyin.com/o_1br6hh4v51v7nrvu1is0nco1ec47.mp3" preload="auto"></audio>
    <div class="text">
      <dl v-show="isText0" class="animated textIn"><img :src="text0"></dl>
      <dl v-show="isText1" class="animated textIn"><img :src="text1"></dl>
      <dl v-show="isText2" class="animated textIn"><img :src="text2"></dl>
    </div>
    <div class="sky">
      <dl class="flag"></dl>
      <dl class="mountain"></dl>
    </div>
    <div class="sence">
      <dl class="crowd"></dl>
      <dl class="role">
        <!-- <img class="head" :src="head"> -->
        <img :src="part" class="hand animated infinite" :class="{ cLimbsSwing: isMotion }">
      </dl>
      <dl class="mike"></dl>
    </div>
    <v-operate :page="page" :next="isNext"></v-operate>
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
    bus.$on(`${self.page}-next`, () => {
      self._audioPause();
    });
  },
  data() {
    return {
      page: 'isMao',
      part: 'http://sl-cdn.hingyin.com/o_1br9b3aam12vp1atvqr83g2q5615.png',
      isNext: false,
      isText0: false,
      isText1: false,
      isText2: false,
      text0: 'http://sl-cdn.hingyin.com/o_1br9b4vo61d12qa81798150g4c51f.png', 
      text1: 'http://sl-cdn.hingyin.com/o_1br9b5ste1p4p1mvu4lsuft1kgd1k.png', 
      text2: 'http://sl-cdn.hingyin.com/o_1br9b6nha1st8bek1d2qcf4v1p1p.png',
      isCash: false,
      isMotion: false,
      cLimbsAnimate: 'cLimbsSwing', 
      drag: {
        differ: 0,
        size: [], // [w, h]
        animation: 'pFanSwing',
        pointEl:'#mao .drag>i'
      },
      match: {
        el: '#mao i.match',
        dom: null,
        range: [1, 1], // [xRadius, yRadius]
        origin: [] // [x, y]
      }
    };
  },
  methods: {
    _audioPlay() {
      let dom = document.querySelector('#mao>audio');
      dom.play();
    },
    _audioPause() {
      let dom = document.querySelector('#mao>audio');
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
    _showNextBtn() {
      this.isNext = true;
    },
    _showText(counter, callback, delay = 0, duration = 1000) {
      const self = this;
      let len = counter;

      setTimeout(() => {
        let timer = setInterval(() => {
          self[`isText${len - counter}`] = true;
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
          self._showNextBtn();
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
