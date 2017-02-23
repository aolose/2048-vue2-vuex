<template>
  <div id="app">
    <Scene :action="initActions">
      <button @click="action('init')">START</button>
    </Scene>
  </div>
</template>

<script>
import Scene from './components/Scene.vue'
let dispatch;
export default {
  name: 'app',
  methods:{
    action(a){
      if(dispatch)dispatch(a);
    }
  },
  data () {
    let methods = this.methods;
    return {
          initActions:function(x){
            dispatch = x;
          }
    }
  },
  components:{
    Scene
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 10px;
  button{
    color: #fff;
    border-radius: 5px;
    max-width: 600px;
    border:0;
    background: #4bb7e9;
    opacity: .8;
    transition: .2s;
    box-shadow: rgba(0, 0, 0, 0.14) 1px 2px 4px;
    width: 80%;
    line-height: 40px;
    text-align: center;
    margin: 10px auto 30px;
    outline: none ;
    &:hover{
      opacity: 1;
    }
  }
}

</style>
