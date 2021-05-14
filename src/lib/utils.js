
export function getPathStr(points){
  return points.map(item=>{
    return `${item[0]},${item[1]}`
  }).join(' ');
}


/**
 * svg转图片
 */
export function svgToImage (svgHtml, fileName, imgType, {width, height}) {
  //1.给svg标签添加属性：version和xmlns
  [
    ['version', 1.1],
    ['xmlns', "http://www.w3.org/2000/svg"],
    ['width', width],
    ['height', height],
  ].forEach(function(item){
     svgHtml.setAttribute(item[0], item[1]);
  });
  
  // 2.获取到svg标签+标签内的所有元素
  let str = svgHtml.parentNode.innerHTML;
  
  //3.创建img
  let img = document.createElement('img');
  
  // 4.svg格式的base64图像
  img.setAttribute('src', 'data:image/svg+xml;base64,'+ btoa(unescape(encodeURIComponent(str))));
  
  // 5.转换成指定图片格式
  img.onload = function(){
    // 1.创建canvas
    let canvas = document.createElement('canvas');
    let context = canvas.getContext("2d");
    
    canvas.width = img.width;
    canvas.height = img.height;
    // 2.根据base64格式的svg生成canvas
    context.drawImage(img, 0, 0);
    
    // 3.将canvas转字符串（按指定好的图片格式）
    let canvasData = canvas.toDataURL("image/" + imgType);
    // 4.创建图片元素
    let img2 = document.createElement('img');
    // 5.生成图片
    img2.setAttribute('src', canvasData);
    
    // 6.下载该图片
    img2.onload = function () {
      let a = document.createElement("a");
      // 下载
      a.download = fileName + "." + imgType;
      a.href = img2.getAttribute('src');
      a.click();
    };
  };
}

/**
 * 查找最大id
 * @param GG
 */
export function findMaxId(GG){
  
  return Math.max(...GG.map(item=>item.id))
}

/**
 * 根据目标位置
 */
export function addArrayAuto(array, target, order, orderList, GG, isParent){
  const func = isParent?findParentBy:findChild;
  
  array = array.concat(target);
  let arrayMap = array.map((position, index)=>{
    let sortId = func(order[index], GG);
    return  {
      position: position,
      id: order[index],
      // 查找order里的id对应的孩子的index
      sortId: sortId,
      // 根据父级会有问题， 有的不存在父级， 此时应该怎么办呢
      sortNo: orderList.indexOf(sortId)
    }
  });
  
  const newArray = JSON.parse(JSON.stringify(arrayMap));
  
  // 排序, // arrayMap中存在sortId为-1的，此时获取他们的原有位置
  newArray.sort((a, b)=>{
    if(a.sortNo===-1 || b.sortNo===-1){
      return 0
    }
    return a.sortNo - b.sortNo
  });
  
  //console.log({ arrayMap, newArray });
  
  return newArray
}

export function findParent(id, GG){
  
  const shape = GG.find(item=>{
    return (item.outedges||[]).map(v=>v.to).includes(id)
  })||{};
  
  return shape.id
}

export function findParentBy(id, GG){
  if(!id) return -1;
  
  const curShape = GG.find(item=>item.id===id);
  
  // 查找自己的父级， 如果自己的父级不存在则查找夫妻的父级
  let parentId = findParent(id, GG);
  
  if(parentId && !curShape.hub) return parentId;
  
  // 查找夫妻
  let showId;
 
  if(curShape.hub){
    const shape = GG.find(item=>{
      return (item.outedges||[]).map(v=>v.to).includes(curShape.id)
    })||{};
  
    showId = shape.id
  }else{
  
    let pointId = ((curShape.outedges||[])[0]||{}).to;
    const shape = GG.find(item=>{
      return (item.outedges||[]).map(v=>v.to).includes(pointId) && item.id !==id
    })||{};
  
    showId = shape.id
  }
  
  //console.log({ id, showId, parentId: findParent(showId, GG) })
  
  return findParent(showId, GG)
}

/**
 * 获取目标定位
 */
export function findChild(id, GG) {
  // 查找孩子
  let shape = GG.find(item=>item.id === id);
  
  let to = ((shape.outedges||[])[0]||{}).to;
  
  if(shape.hub || shape.chhub) return to;

  let firstChild = GG.find(item=>item.id === to)||{};

  return ((firstChild.outedges||[])[0]||{}).to;
}

export function getPosition(curId, GG, ranks, order) {
  const rankIndex = GG.findIndex(item => item.id === curId);
  
  const orderIndex = ranks[rankIndex] || -1;
  
  const curOrders = order[orderIndex] || [];
  
  return {
    x: curOrders.findIndex(id => id === curId),
    y: orderIndex,
  }
}


export const Queue = function() {
  this.data = [];
};

Queue.prototype = {
  
  setTo: function(list) {
    this.data = list.slice();
  },
  
  push: function(v) {
    this.data.push(v);
  },
  
  pop: function(v) {
    return this.data.shift();
  },
  
  size: function() {
    return this.data.length;
  },
  
  clear: function() {
    this.data = [];
  }
};



export const Stack = function() {
  this.data = [];
};

Stack.prototype = {
  
  setTo: function(list) {
    this.data = list.slice();
  },
  
  push: function(v) {
    this.data.push(v);
  },
  
  pop: function(v) {
    return this.data.pop();
  },
  
  size: function() {
    return this.data.length;
  }
};

