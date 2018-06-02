<template>
  <div id="home" class="route">
    <transition 
    :enter-active-class="transition.enter" @leave="leave('isMao', 'isSummary')"
    :leave-active-class="transition.leave">
      <v-mao v-if="isMao"></v-mao>
    </transition>  

    <transition 
    :enter-active-class="transition.enter" @leave="leave('isSoldier', 'isMeeting')"
    :leave-active-class="transition.leave">
      <v-soldier v-show="isSoldier"></v-soldier>
    </transition>

    <transition 
    :enter-active-class="transition.enter" @leave="leave('isMeeting', 'isMao')"
    :leave-active-class="transition.leave">
      <v-meeting v-if="isMeeting"></v-meeting>
    </transition>

    <transition 
    :enter-active-class="transition.enter" @leave="leave('isParty', 'isSoldier')"
    :leave-active-class="transition.leave">
      <v-party v-if="isParty"></v-party>
    </transition>
    
    <transition 
    :enter-active-class="transition.enter" @leave="leave('isCountry', 'isParty')"
    :leave-active-class="transition.leave">
      <v-country v-if="isCountry"></v-country>
    </transition>

    <transition 
    :enter-active-class="transition.enter"
    :leave-active-class="transition.leave">
      <v-summary v-if="isSummary"></v-summary>
    </transition>

    <transition 
    :enter-active-class="transition.enter"
    :leave-active-class="transition.leave">
      <v-end v-if="isEnd"></v-end>
    </transition>
    
  </div>
</template>
<script>
import bus from '../../assets/js/bus';

import mao from './_mao';
import soldier from './_soldier';
import meeting from './_meeting';
import party from './_party';
import country from './_country';
import summary from './_summary';
import end from './_end';

export default {
  name: 'home',
  mounted() {
    const self = this;
    bus.$on('next', page => {
      const isValid = typeof page !== 'undefined';
      if(isValid) {
        self.history.push(page);
        self[page] = false;
      }
    });
    bus.$on('back', () => {
      const isBackToCover = !self.history.length;
      if(isBackToCover) {
        location.href = '#/';
      } else {
        let prev = self.history.pop();
        self[prev] = true;
      }
    });


    (function loadingPages(){
      setTimeout(() => {
        console.log('loading other pages start')
        self.isParty = true;
        self.isSoldier = true;
        self.isMeeting = true;
        self.isMao = true;
        self.isSummary = true;
        self.isEnd = true;
      }, 4000);
    })();
  },
  data() {
    return {
      isMao: false,
      isSoldier: false,
      isMeeting: false,
      isParty: false,
      isCountry: true,
      isSummary: false,
      isEnd: false,
      isFinishLoad: false,
      history: [],
      transition: {
        enter: 'animated slideInRight',
        leave: 'animated slideOutRight'
      },
    };
  },
  methods: {
    leave(from, to) {

      console.log(from, to);
    }
  },
  components: {
    'v-mao': mao,
    'v-soldier': soldier,
    'v-meeting': meeting,
    'v-party': party,
    'v-country': country,
    'v-summary': summary,
    'v-end': end,
  }
}
</script>
