const storeJS = require('./storeJS');

module.exports = {
  // 获取所有函数
  getAllFunc() {
    return storeJS;
  },
  // 检索函数
  search(query) {
    if (!query) return storeJS;
    return storeJS.filter(item => {
      if(!item.title) item.title = '';
      if(!item.desc) item.desc = '';
      if (item.title.indexOf(query) > -1 || item.desc.indexOf(query) > -1) {
        return true;
      }
    })
  },
  // 根据ID检索函数
  getFunc(id) {
    return storeJS.filter(item => item.id === id);
  },
  // 根据类别检索函数
  getTypeFunc(type) {
    return storeJS.filter(item => item.type === type);
  },
  // 获取函数类别
  getFunTypes() {
    let types = new Set();
    storeJS.forEach(item => types.add(item.type));
    return [...types];
  },
  // 根据函数名随机产生参数
  getFunParams(name) {
    // 暂未实现
  }
}

// 写前端的时候一定注意后续函数库可能会放在数据库上，所以要利用这些API操作，即使暂时以JS的方式可以直接通过对象数组操作
// 千万注意这一点