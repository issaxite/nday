export default {
  forward(url){
    location.href = url
  },
  setNamespace(name){
    document.body.className = name
  },
  setTitle(title) {
    let dom = document.querySelector('title');
    dom.innerHTML = title
  },
  asyncRootPx() {
    let html = document.querySelector('html');
    html.style.fontSize = `${html.offsetWidth / 10}px`
  },
  search() {
    let search = location.search.slice(1);
    if(!search){ return false; }
    search = search.split('&');
    let temp = {}
    search.forEach((v) => {
      v = v.split('=') 
      temp[v[0]] = decodeURIComponent(v[1]).replace('/', '');
    })
    return temp
  },
  assign(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  },
  concat(target){
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    for(let i = 1, len = arguments.length;i < len; i++) {
      target = target.concat(arguments[i]);
    }
    target = Array.from(new Set(target));

    return target;
  },
  setParamsSession(params) {
    sessionStorage.setItem('params', JSON.stringify(params));
  },
  getParamsSession() {
    let params = sessionStorage.getItem('params');
    return params ?
    JSON.parse(params) : 
    null;
  }
}
