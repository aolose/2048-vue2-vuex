function fillArray(ss) {
    let m = [[], [], [], []]
    let ks = Object.keys(ss);
    for (let k of ks) {
        let _s = ss[k];
        if (_s) m[_s.x][_s.y] = _s;
    }
    return m;
}
function changeState(state, mv) {
    let needCreate = false;
    let sq = state.squares;
    let ss = fillArray(sq);
    const isX = mv[0];
    let starts = [];// 存放移动目标
    const isASC = mv[0] + mv[1] === -1;
    let a, x, y, m, s = isASC && 1 || -1;
    a = isASC ? 0 : 3;
    m = isASC ? 4 : -1;
    for (x = a; x !== m; x = x + s) {
        for (y = a; y !== m; y += s) {
            let p0 = ss[x][y];   // 数组点
            let sn = isX ? y : x;  // 移动点下标
            let sp = starts[sn]; // 移动点
            if (!sp) sp = starts[sn] = [x, y, p0]; // 移动点 对应数组点
            if (p0 && p0 !== sp[2]) {
                if(localStorage.getItem('debug')==1)debugger;
                let p1 = sp[2];
                let v = p0.v;
                if (!p1 || (a !== p0[['y', 'x'][~~isX]] && p1.v === v)) { // 覆盖位置
                    needCreate = true;
                    let isCombine = p1 && v === p1.v;
                    [p0.x, p0.y, p0.v] = [sp[0], sp[1], isCombine ? v * 2 : v];
                    if (isCombine) {
                        state.score+=v;
                        if (isX) sp[0] += s; else sp[1] += s;
                        delete sq[p1.id];
                        delete sp[2]
                    } else sp[2] = p0;
                } else { // 移动到空位置
                    let [_x, _y]=[p1.x, p1.y];
                    if (isX) _x += s; else _y += s;
                    let np = ss[_x][_y];
                    if (p0 !== np) {
                        needCreate = true;
                        [p0.x, p0.y] = [_x, _y];
                    }
                    starts[sn] = [_x, _y, p0];
                }
            }
        }
    }
    if (needCreate) {
        state.squares = Object.assign({}, sq);
        setTimeout(mv.create, 300);
        state.score+=5;
    }
}
function randomCreate(state, squares) {
    const id = ((Date.now() - 1487729363049) * 100 + (100 * Math.random() >> 0)).toString(32);
    let sq = state.squares
    if (!squares) squares = fillArray(sq);
    let emptySquares = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let s = squares[i][j];
            if (!s) emptySquares.push({x: i, y: j})
        }
    }
    let v = Math.random() > 0.1 ? 2 : 4;
    let x = emptySquares.length * Math.random() >> 0;
    let n = emptySquares[x];
    n.id = id;
    n.v = v;
    sq[id] = n;
    state.squares = Object.assign({}, sq);
}
export default {
    state: {
        end:0,
        squares: {},
        score:0
    },
    mutations: {
        move: changeState,
        create: randomCreate,
        initGame:function (state) {
            state.squares = {}
            state.score =0;
        }
    },
    actions: {
        move({commit}, mv){
            mv.create = function () {
                commit('create')
            }
            commit('move', mv)
        },
        init({commit, state}){
            commit('initGame')
            commit('create')
            commit('create')
        }
    }
}