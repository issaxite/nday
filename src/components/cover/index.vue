<template>
  <div id="cover" class="route">
    <!-- <audio src="http://sl-cdn.hingyin.com/o_1br6fb6a61tuie3l1al530bpm7.mp3" autoplay="autoplay"></audio> -->
    <v-loading v-show="isLoading"></v-loading>
    <div class="mask" :style="{opacity: maskOpacity }"></div>
    <div class="lighter animated swingBig infinite" v-show="!isLoading"><img :src="lighterImg"></div>
    <div class="text" v-show="!isLoading">
      <img :src="text0">
      <img :src="text1">
    </div>
    <div class="hand" v-show="!isLoading">
      <dl @touchstart="dragHandStart" @touchmove="dragHandMove" @touchend="dragHandEnd"><img :src="handImg"></dl>
    </div>
  </div>
</template>
<script>

// components
import loading from '../common/_loading';

export default {
  created(){
    const self = this;
    let preloadList = [
      'http://sl-cdn.hingyin.com/o_1br5u4l5r1ottvcf1su57vd91b7.gif',
      'http://sl-cdn.hingyin.com/o_1br7bjl19rr360d14cbtej1i6h1k.png',
      'http://sl-cdn.hingyin.com/o_1br7blt9v1fr11303nnucdq1m3f1p.png',
      'http://sl-cdn.hingyin.com/o_1br7auefq5kh1jk3178g11p91etv15.png',
      'http://sl-cdn.hingyin.com/o_1br7atinfmlr2l01uga18grlbl10.png',
      'http://sl-cdn.hingyin.com/o_1br7assfe19ur1p9p1l2dl0tfqer.png',
      'http://sl-cdn.hingyin.com/o_1br7as5ir13n61f0l1un8124g18n3m.png',
      'http://sl-cdn.hingyin.com/o_1br7arbcsau3f4um3i1jb01befh.png',
      'http://sl-cdn.hingyin.com/o_1br7aq8um1b951fco10na1um51e90c.png',
      'http://sl-cdn.hingyin.com/o_1br7amkgpdmnua2kmrc4gr1f7.png',
      'http://sl-cdn.hingyin.com/o_1br7b9d2u1ar6qau13os2dk4g21a.png',
      'http://sl-cdn.hingyin.com/o_1br7ahogp1go1ip31lr6sh31j29r.png',
      'http://sl-cdn.hingyin.com/o_1br7afaj0mes1aagc0tg1458m.png',
      'http://sl-cdn.hingyin.com/o_1br7a550314in8p74s91kqr1g2qh.png',
      'http://sl-cdn.hingyin.com/o_1br79slp7ecdr7h18q61h6bn70c.png',
      'http://sl-cdn.hingyin.com/o_1br79psrus0qrkr1d5jjqkjcc7.png',
      'http://sl-cdn.hingyin.com/o_1br8hk82u1gnc7n71qnuspmmhh7.png',
      'http://sl-cdn.hingyin.com/o_1br8q1jfu12hhlci1qbi2lc8u6r.png',
      'http://sl-cdn.hingyin.com/o_1br8ps522qummosbjr1irc1dh7.png',
      'http://sl-cdn.hingyin.com/o_1br8pu4i3jlm1bvl1hlm19qt168uc.png',
      'http://sl-cdn.hingyin.com/o_1br8pvkht1697lte17ktljf1g4uh.png',
      'http://sl-cdn.hingyin.com/o_1br8q0ksp16vo1jc81r3v47sbnom.png',
      'http://sl-cdn.hingyin.com/o_1br8smdlsc5s1qholivn6g7j7.png',
      'http://sl-cdn.hingyin.com/o_1br8so3e11phjcklvqdq36vcc.png',
      'http://sl-cdn.hingyin.com/o_1br8spcopehp12rc14661hmd4j1h.png',
      'http://sl-cdn.hingyin.com/o_1br8sq0r41u1s1uac1vfv4c2i7um.png',
      'http://sl-cdn.hingyin.com/o_1br8sqor1bcv11968rc1uursicr.png',
      'http://sl-cdn.hingyin.com/o_1br8stuih19lrkum1uf01qdh1nng10.png',
      'http://sl-cdn.hingyin.com/o_1br90m7qnpc11h56121ov23d4m7.png',
      'http://sl-cdn.hingyin.com/o_1br90n9iu1kcgm50bkrucpun6c.png',
      'http://sl-cdn.hingyin.com/o_1br90o080mm41c0f6291v5a193ph.png',
      'http://sl-cdn.hingyin.com/o_1br90ojq4nb91sabmjvqb547am.png',
      'http://sl-cdn.hingyin.com/o_1br90q8mrpcj16fr8501jg71uqr.png',
      'http://sl-cdn.hingyin.com/o_1br90qv9hm7k1am0pbq1q28t1910.png',
      'http://sl-cdn.hingyin.com/o_1br90ro8akdc6k8i0hntr1gqi15.png',
      'http://sl-cdn.hingyin.com/o_1br90snrv173d1vo3140e01s7a1a.png',
      // soldier
      'http://sl-cdn.hingyin.com/o_1br8u3g5c8ld19dadhoa3vd5rh.png',
      'http://sl-cdn.hingyin.com/o_1br972f6i1lne1r9gp9b1jv916s67.png',
      'http://sl-cdn.hingyin.com/o_1br973tmsqkgatb4lssq13n1c.png',
      'http://sl-cdn.hingyin.com/o_1br974nfj17qi1ktofiugiltllh.png',
      'http://sl-cdn.hingyin.com/o_1br975h2po501fpukdv1hh5gfkm.png',
      'http://sl-cdn.hingyin.com/o_1br9767qvboc1o941ig011016qir.png',
      'http://sl-cdn.hingyin.com/o_1br9773pi17b5rt11j66ir1ui110.png',
      'http://sl-cdn.hingyin.com/o_1br977pk91qdrfkc1ja5vkvqna15.png',
      'http://sl-cdn.hingyin.com/o_1br978q7ng44mi1vl31i9j5np1a.png',
      'http://sl-cdn.hingyin.com/o_1br979epcneo94a1tu91m501l6h1f.png',
      'http://sl-cdn.hingyin.com/o_1br97a8j6hir5m01bsakfr11mi1k.png',
      'http://sl-cdn.hingyin.com/o_1br97b1bm46his3lsf1ctta881p.png',
      'http://sl-cdn.hingyin.com/o_1br97bkku1i0512gh1lrqkk11b91u.png',
      
      // meeting
      'http://sl-cdn.hingyin.com/o_1br8u4t8b15qb1doapid1opmprsm.png',
      'http://sl-cdn.hingyin.com/o_1br98q21kktlikk4vu1h2l10rt7.png',
      'http://sl-cdn.hingyin.com/o_1br98qsur3netd9q4quc71dj2c.png',
      'http://sl-cdn.hingyin.com/o_1br98ropk3efacq12l611th1n8h.png',
      'http://sl-cdn.hingyin.com/o_1br98shlq1od9fdnkio1rtc844m.png',
      'http://sl-cdn.hingyin.com/o_1br98t7m71micmq2521b551u9vr.png',
      'http://sl-cdn.hingyin.com/o_1br98u1vbl3m1r4g13c2u21d8s15.png',
      'http://sl-cdn.hingyin.com/o_1br98ukaip8i1otpm1fhpu15pd1a.png',
      'http://sl-cdn.hingyin.com/o_1br98v7rr5dm1m3gd5p137210tk1f.png',
      'http://sl-cdn.hingyin.com/o_1br98vtq8162q1b301hlru31du81k.png',
      'http://sl-cdn.hingyin.com/o_1br99391nrk0c2b16pp1oml1e231p.png',
      'http://sl-cdn.hingyin.com/o_1br9944lg1ism1fjic41d0e1qu81u.png',
      'http://sl-cdn.hingyin.com/o_1br9951nk14ru5e51pvh1ulu1a7k28.png',
      'http://sl-cdn.hingyin.com/o_1br995qn9o2id2d1eak18c31mgq2d.png',
      'http://sl-cdn.hingyin.com/o_1br996cue1ctk2gf2m4mn19q72i.png',
      // mao
      'http://sl-cdn.hingyin.com/o_1br8ufu6b1bi013pb17tri3spdsr.png',
      'http://sl-cdn.hingyin.com/o_1br9ard7c1dnoi791fnb1p8j15gm7.png',
      'http://sl-cdn.hingyin.com/o_1br9av8hf1k1ka00ueg1et0uf7c.png',
      'http://sl-cdn.hingyin.com/o_1br9b0bc2a9012t813csf2fm1th.png',
      'http://sl-cdn.hingyin.com/o_1br9b10uk1hgscd81ovi1h5719s0m.png',
      'http://sl-cdn.hingyin.com/o_1br9b1u4b4pgq7ieeq2bm1oaor.png',
      'http://sl-cdn.hingyin.com/o_1br9b2kcq1lid1tfhu0q1msh6om10.png',
      'http://sl-cdn.hingyin.com/o_1br9b3aam12vp1atvqr83g2q5615.png',
      'http://sl-cdn.hingyin.com/o_1br9b3uk21s4t5kh19tc3nk1tgi1a.png',
      'http://sl-cdn.hingyin.com/o_1br9b4vo61d12qa81798150g4c51f.png',
      'http://sl-cdn.hingyin.com/o_1br9b5ste1p4p1mvu4lsuft1kgd1k.png',
      'http://sl-cdn.hingyin.com/o_1br9b6nha1st8bek1d2qcf4v1p1p.png',
    ];

    !function loadImgList() {
      self.isLoading = false;
      return false;
      let len = preloadList.length;
      +(function preload(n) {
        if(n == len ) {
          console.log('finish');
          self.isLoading = false;
          return false;
        } else {
          let img = new Image();
          img.src = preloadList[n];
          console.log(preloadList[n]);
          if(img.complete) {
            console.log('complete:' + img.src);
            preload(++n);
          } else {
            img.onload = function() {
            // console.log('onload:' + img.src);
            img.onerror = function() {
              console.error(img.src);
            }
            preload(++n);

          }
          }
        }
      })(0);
    }();
  },
  data() {
    return {
      rem: 37.5,
      text0: 'http://sl-cdn.hingyin.com/o_1br8q2e3e445e9b13j71cmfeus10.png', 
      text1: 'http://sl-cdn.hingyin.com/o_1br8q36pe1fltn5s1j3jfr3192t15.png',
      isLoading: true,
      isCash: false,
      lighterImg: 'http://sl-cdn.hingyin.com/o_1br8q0ksp16vo1jc81r3v47sbnom.png',
      handImg: 'http://sl-cdn.hingyin.com/o_1br8pvkht1697lte17ktljf1g4uh.png',
      handDom: null,
      handHeight: 0,
      inithandBottom: '-660',
      handBottom: '',
      handPageY: 0,
      distance: 0,
      vHeight: 0,
      maskOpacity: 0
    };
  },
  computed: {
    gap() {
      let domLighter = document.querySelector('#cover .lighter');
      let domHand = document.querySelector('#cover .hand');
      return domHand.offsetTop - domLighter.offsetHeight;
    },
    coverDom() { return document.querySelector('#cover'); }
  },
  methods: {
    _resetHandPos() {
      const self = this;
      let domMask = document.querySelector('#cover .mask');
      self.handDom.classList.add('reset');
      self.handDom.style.bottom = self.inithandBottom / self.rem + 'rem';
      domMask.classList.add('reset');
      domMask.style.opacity = 0;
    },
    _cashLighter(handPageY) {
      const self = this;
      const limit = 5;
      const lighterDom = document.querySelector('#cover .lighter');
      const isValid = lighterDom.offsetHeight - handPageY >= limit;
      // console.log(isValid)
      return isValid;
    },
    dragHandStart(e) {
      const self = this;
      let domMask = document.querySelector('#cover .mask');
      self.handDom = document.querySelector('#cover .hand');
      self.handDom.classList.remove('reset');
      self.distance = e.changedTouches[0].pageY - self.handDom.offsetTop;
      self.handHeight = self.handDom.offsetHeight;
      self.vHeight = document.querySelector('#cover').offsetHeight;
      domMask.classList.remove('reset');
    },
    dragHandMove(e) {
      const self = this;
      if(self.isCash){ return false; }
      let lighterDom = document.querySelector('#cover .lighter');
      let curPageY = e.changedTouches[0].pageY;
      let handY = curPageY - self.distance;
      self.handBottom = (self.vHeight - handY) - self.handHeight;
      self.handDom.style.bottom = self.handBottom + 'px';
      self.handPageY = handY;
      
      self.maskOpacity = (self.gap + lighterDom.offsetHeight - handY) / self.gap;
      self.isCash= self._cashLighter(handY);
      if(self.isCash) {
        lighterDom.classList.remove('animated');
        self.coverDom.classList.add('finish');
        self.handDom.style.bottom = self.handBottom + 30 + 'px';
      }
    },
    dragHandEnd(e){
      const self = this;
      self.isCash ?
      location.href = '#home'
      : self._resetHandPos();
    }
  },
  components: {
    'v-loading': loading
  }
}
</script>
