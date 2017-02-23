<template>
    <div class="box">
        <h1>SCORE:{{score}}</h1>
        <slot></slot>
        <div class="scene" v-gesture="move">
            <div class='info'>
                <div style="text-align:center;">=========STATE=========</div>
                <div v-for="value in squares">{{(JSON.stringify(value)+"").replace(/"/g,' ')}}</div>
            </div>
            <div class="bg">
                <i v-for="i in 16"></i>
            </div>
            <div class="squares">
                <transition-group name="fade">
                    <Square v-for="s in squares" :key="s.id" :d="s"></Square>
                </transition-group>
            </div>

        </div>
    </div>
</template>
<style lang="scss">
    $bgColor: #eee9dd;
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
    .info{
        position: fixed;
        font-size: 13px;
        text-align: left;
        padding: 15px 30px;
        background: rgba(0, 0, 0, 0.5);
        bottom:20px;
        margin-top: 10px;
        box-sizing: border-box;
        left: 20px;
        z-index: 1;
        pointer-events: none;
        color: #fff;
    }
    .box {
        position: relative;
        width: 600px;
        max-width: 90%;
        margin: 0 auto;
        *{
            webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
        }
    }

    .scene {
        background: $bgColor;
        position: relative;
        box-sizing: content-box;
        overflow: visible;
        width: 100%;
        padding-top: 100%;
        cursor: pointer;
        .bg {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            pointer-events: none;
        }
        .squares {
            pointer-events: none;
            position: absolute;
            width: 25%;
            height: 25%;
            left: 0;
            top: 0;
        }
        i {
            display: block;
            position: relative;
            box-sizing: border-box;
            float: left;
            width: 25%;
            height: 25%;
            border: 1px solid $bgColor;
            background: #fff;
            border-radius: 3px;
            pointer-events: none;
        }
        &:before {
            content: '';
            display: block;
            position: absolute;
            left: -5px;
            right: -5px;
            top: -5px;
            bottom: -5px;
            border: 5px solid $bgColor;
            border-radius: 5px;
        }
    }
</style>
<script>
    import gesture from '../directives/gesture.js'
    import Square from './Square.vue'
    import TWEEN from 'tween.js'

    export default{
        props:['action'],
        mounted(){
            let a = this.action;
            let store = this.$store;
            a(store.dispatch.bind(store));
        },
        data(){
            return {
                score:0
            }
        },
        directives:{
             gesture
        },
        methods:{
            move:function(a,b){
                this.$store.dispatch('move',[a,b])
            },
        },
        computed:{
            squares:function(){
                return this.$store.state.squares;
            },
            _score:function(){
                return this.$store.state.score;
            }
        },
        watch:{
            _score:function(newValue, oldValue){
                var vm = this
                function animate (time) {
                    requestAnimationFrame(animate)
                    TWEEN.update(time)
                }
                new TWEEN
                        .Tween({ tweeningNumber: oldValue })
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .to({ tweeningNumber: newValue }, 300)
                        .onUpdate(function () {
                        vm.score = this.tweeningNumber.toFixed(0)
                        })
                .start()
                animate()
            }
        },
        components:{
            Square
        }
    }

</script>
