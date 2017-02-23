export default {
    bind:function (el,binding) {
        const move =  binding.value;
        if('function'!== typeof move) return;
        let p0={},p1={};
        function setPoint(e,p) {
            let point,type = e.type;
            const isMouse = !/^touch/.test(type);
            if(isMouse) point=e;
            else {
                point=e.touches[0];
            }
            if(point){
                p.x=point.clientX;
                p.y=point.clientY;
            }
        }
        function start(e) {
            clear();
            setPoint(e,p0);
            el.addEventListener('touchmove',end)
            el.addEventListener('mouseup',end)
            el.addEventListener('touchend',end)
        }
        function end(e) {
            const type = e.type;
            if('touchmove'!==type)clear()
            setPoint(e,p1)
            if('mouseup'===type||'touchend'===type){
                let x = p0.x-p1.x;
                let y = p0.y-p1.y;
                if(Math.abs(x)<50&&Math.abs(y)<50)return;
                const isHorizontal = y===0||!!(x/y>>0)
                if(isHorizontal) move(x<0?1:-1,0)
                else move(0,y<0?1:-1)
            }
        }
        function clear() {
            el.removeEventListener('mouseup',end)
            el.removeEventListener('touchmove',end)
            el.removeEventListener('touchend',end)
        }
        el.removeEventListener('mousedown',start)
        el.removeEventListener('touchstart',start)
        el.addEventListener('mousedown',start)
        el.addEventListener('touchstart',start)
    }
}