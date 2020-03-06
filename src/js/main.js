let data = require('./data');
let store = require('./storeJS');
//let highLight = require('highlight.js');
import * as $ from 'jquery';

function init() {
    console.log("初始化index");

    //所有函数
    const funcList = data.getAllFunc();
    //
    const listEle = $('#funcList');
    if (listEle) {
        funcList.forEach((item, index) => {
            const randPic = Math.random() * 6 >> 0;
            listEle.append(`
            <div class="item-func flex-center">
                <div class="item-content">
                    <div class="item-back">
                        <img src="static/u${randPic}.png" />
                    </div>
                    <div class="item-title">${item.title}</div>
                    <div class="item-desc">${item.desc}</div>
                </div>
            </div>
            `);
        });
    }

    //highLight.initHighlightingOnLoad();
    initLibrary();
}


function initLibrary() {
    console.log("初始化library");
    //所有函数
    const funcList = data.getAllFunc();
    const listEle = $('#funcShowList');
    const code = $('#func-code');
    const title = $('#func-title');
    if (listEle) {
        funcList.forEach((item, index) => {
            const randPic = Math.random() * 6 >> 0;
            listEle.append(`
            <div class="func-show-item">${item.title}</div>
            `);
            if (0 === index) {
                //初始化code

                //code[0].innerHTML = item._define.toString();
                title[0].innerHTML = item.title;
                code.val(item._define.toString());
            }
        });
    }

    //添加事件
    const funcBtnList = $('.func-show-item');

    if (funcBtnList && funcBtnList.length === funcList.length) {
        for (let i = 0; i < funcBtnList.length; i++) {

            funcBtnList[i].onclick = (e) => {

                const current = funcBtnList[i];
                const currentTitle = funcList[i].title;
                const currentCode = funcList[i]._define.toString();
                //设置
                code.val(currentCode);
                title[0].innerHTML = currentTitle;
            }

        }
    }

    //按钮
    const cleanBtn = $('#exec-clean');
    const doneBtn = $('#exec-done');
    const result = $('#exec-result');
    const inputContent = $('#exec-param');
    if (!cleanBtn || !doneBtn) {
        console.log("!");
        return;
    }

    doneBtn.click((e) => {
        let p = inputContent.val().split(',');
        p = p.map((item, index) => Number(item));
        //当前函数
        const funcContent = code.val();
        //console.log(func);
        const func = null;
        let ans = null;
        try {
            eval("func=" + funcContent);
            ans = func.apply(this, p);
        } catch (e) {
            result.text(e);
            return;
        }

        console.log(ans);
        result.text(ans);
    });

}



export default init;