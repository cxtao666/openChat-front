const render = () => {
    document.getElementById('purehtml-container').innerHTML = `<div>
    <a href="jump.html">跳一跳</a>
<a href="chess.html">象棋</a>
    </div> 
    `
    return Promise.resolve();
};

((global) => {
    global['purehtml'] = {
        bootstrap: () => {
            console.log('purehtml bootstrap');
            return Promise.resolve();
        },
        mount: () => {
            console.log('purehtml mount');
            return render();
        },
        unmount: () => {
            console.log('purehtml unmount');
            return Promise.resolve();
        },
    };
})(window);