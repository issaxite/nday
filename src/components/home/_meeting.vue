<template>
  <div id="meeting" class="item">
    <audio src="http://sl-cdn.hingyin.com/o_1br6h7vrka73d1vrgt8nk2q77.mp3" preload="auto"></audio>

    <div class="text">
      <dl v-show="isText0" class="animated textIn"><img :src="text0"></dl>
      <dl v-show="isText1" class="animated textIn"><img :src="text1"></dl>
      <dl v-show="isText2" class="animated textIn"><img :src="text2"></dl>
    </div>

    <div class="sky">
      <dl class="plane"></dl>
      <dl class="mountain"></dl>
    </div>

    <div class="sence">
      <dl class="stone"></dl>
      <dl class="flag"></dl>
      <dl class="crowd"></dl>
      <dl class="role-0"></dl>
      <dl class="role-1">
        <img :src="part1" class="animated infinite" :class="{ mBowSwig: isMotion }">
      </dl>
    </div>
    <v-operate :page="page" :next="isNext"></v-operate>
    <a class="drag animated infinite" @touchstart="dragStart" @touchmove="dragMove" :class="{ correct: isCorrect }">
      <img :src="partDrag" class="animated infinite" :class="{ mBowSwig: isMotion }"><i></i>
    </a>
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
      page: 'isMeeting',
      part1: 'http://sl-cdn.hingyin.com/o_1br98vtq8162q1b301hlru31du81k.png', 
      partDrag: 'http://sl-cdn.hingyin.com/o_1br98qsur3netd9q4quc71dj2c.png',
      isNext: false,
      isCorrect: false,
      isMotion: false,
      isText0: false,
      isText1: false,
      isText2: false,
      text0: 'http://sl-cdn.hingyin.com/o_1br9951nk14ru5e51pvh1ulu1a7k28.png', 
      text1: 'http://sl-cdn.hingyin.com/o_1br995qn9o2id2d1eak18c31mgq2d.png', 
      text2: 'http://sl-cdn.hingyin.com/o_1br996cue1ctk2gf2m4mn19q72i.png',
      isCash: false,
      cLimbsAnimate: 'cLimbsSwing', 
      drag: {
        differ: 0,
        size: [], // [w, h]
        animation: 'pFanSwing',
        pointEl:'#meeting .drag>i'
      },
      match: {
        el: '#meeting i.match',
        dom: null,
        range: [10, 10], // [xRadius, yRadius]
        origin: [] // [x, y]
      }
    };
  },
  methods: {
    _audioPlay() {
      let dom = document.querySelector('#meeting>audio');
      dom.play();
    },
    _audioPause() {
      let dom = document.querySelector('#meeting>audio');
      dom.pause();
    },
    _initMatchData() {
      const self = this;
      let dom = document.querySelector(self.match.el);
      let range = [dom.offsetWidth - self.match.range[0], dom.offsetHeight - self.match.range[1]];

      self.match.dom = dom;
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
      const target = document.querySelector('#meeting .drag');
      const touche = e.changedTouches[0];

      let pos = [touche.pageX, touche.pageY];
      let offset = [target.offsetLeft, target.offsetTop];
      let differ = [pos[0] - offset[0], pos[1] - offset[1]];

      self.drag.differ = differ;
      self._initMatchData();
      self.isCorrect = true;
    },
    dragMove(e) {
      const self = this;
      if(self.isCash) { return false; }

      const target = document.querySelector('#meeting .drag');
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
        target.style.zIndex = 68;
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
