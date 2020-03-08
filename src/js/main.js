let data = require('./data');
let highLight = require('highlight.js');

import 'highlight.js/styles/default.css';
import * as $ from 'jquery';

function init() {
  console.log("初始化index");
  window._typeof = (a) => {
    return typeof a;
  }
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


  initLibrary();
}


function initLibrary() {
  console.log("初始化library");
  //所有函数
  const funcList = data.getAllFunc();
  const listEle = $('#funcShowList');
  const code = $('#func-code');
  const title = $('#func-title');
  // 以后别应用jquery，采用原生JS来写
  const funcQuery = document.getElementById('func-query');
  const funcSearch = $('#func-search');
  refreshFuncList(funcList);
  funcQuery.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
      searchFuncs();
    }
  })

  funcSearch.on('click', () => {
    searchFuncs();
  })

  // //添加事件
  // const funcBtnList = $('.func-show-item');
  // let referenceType = '';
  // if (funcBtnList && funcBtnList.length === funcList.length) {
  //   for (let i = 0; i < funcBtnList.length; i++) {

  //     funcBtnList[i].onclick = (e) => {

  //       // const current = funcBtnList[i];
  //       // const currentTitle = funcList[i].title;
  //       // let item = funcList[i];
  //       // referenceType = funcList[i]._return;
  //       // title[0].innerHTML = currentTitle;
  //       showFunc(item.id);
  //     }

  //   }
  // }

  //按钮
  const cleanBtn = $('#exec-clean');
  const doneBtn = $('#exec-done');
  const result = $('#exec-result');
  const inputContent = $('#exec-param');
  if (!cleanBtn || !doneBtn) {
    console.log("!");
    return;
  }
  cleanBtn.on('click', () => {
    inputContent.val(null)
  })

  doneBtn.click((e) => {
    // let p = inputContent.val().split(',');
    // p = p.map((item, index) => Number(item));
    // 由于还没实现参数的类别，单纯就写成字符串
    let p = inputContent.val();
    //当前函数
    const funcContent = code[0].innerText;
    //console.log(func);
    // const func = null;
    let ans = null;
    try {
      ans = eval(`(${funcContent})(${p})`);
      // eval("func=" + funcContent);
      // ans = func.apply(this, p);
    } catch (e) {
      result.text(e);
      return;
    }
    // showReferenceType()
    result.text(ans);
  });
  //显示出参类型
  // function showReferenceType() {
  //   console.log(referenceType)
  // }
  // 刷新函数列表
  function refreshFuncList(funcs) {
    listEle.html("");
    funcs.forEach(item => {
      let listItem = $(`<div class="func-show-item">${item.title}</div>`);
      listEle.append(listItem);
      listItem.on('click', () => {
        showFunc(item.id);
      })
    })
  }
  // 根据ID显示函数
  function showFunc(id) {
    let func = data.getFunc(id)[0];
    title[0].innerHTML = func.title;
    result.text(func._return);
    code.html(highLight.highlight('javascript', func._define.toString().replace('_define', func.name)).value);
  }
  function searchFuncs() {
    let query = funcQuery.value;
    let funcs = data.search(query);
    if (funcs.length > 0) {
      refreshFuncList(funcs);
    } else {
      alert('无结果');
    }
  }
}



export default init;