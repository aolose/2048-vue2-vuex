<template>
    <div class="square" :style="o">
        <span>{{v}}</span>
        <i>{{i}}</i>

    </div>
</template>
<style lang="scss">
    .square {
        transition: .3s linear;
        pointer-events: none;
        position: absolute;
        background-clip: content-box;
        border: 1px solid transparent;
        border-radius: 3px;
        box-sizing: border-box;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            color:#fff;
        }
        i{
            font-size: 12px;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            background: rgba(9, 9, 9, 0.5);
            display: block;
            color: #fff;
            line-height: 1.4;
            border:0;
            padding: 0;
            height: auto;
            border-radius: 0;
        }
    }
</style>
<script>
    const colors=[
        '#69D2E7',   '#A7DBDB',   '#E0E4CC',   '#F38630',
        '#FA6900',   '#00C8F8',   '#59C4C5',   '#FFC33C',
        '#FBE2B4',   '#FF4C65',   '#591E23',   '#D94E67',
        '#F2D8A7',   '#A68572',   '#73503C',   '#466675',
        '#E94C6F',   '#542733',   '#5A6A62',   '#C6D5CD',
        '#FDF200'
        ];
    export default{
        props:['d'],
        computed:{
             i:function(){
              return (this.d||{}).id;
             },
             o:function(){
                let d = this.d;
                let level = Math.log2(d.v);
                return d&&{
                    fontSize:((2/(d.v+'').length)/0.8+0.2).toFixed(2)+'em',
                    left:d.x+'00%',
                    top:d.y+'00%',
                    backgroundColor:colors[level]
                }||{
                    display:'none'
                }
             },
             v:function(){
                let d = this.d;
                return d&&d.v
            }
        }
    }
</script>
