let map13 = [
//{"prefunc":fn},//the function to be called on each item, useful for generate row related function, params: index,item,contextNode
{"field":"Email","node":"//*[@id='email']","operation":"INSERT"},
{"field":"integralIndex","node":"//*[@id='phone']","operation":"INSERT"},
{"field":"FkTblUserRole","node":"//*[@id='role']","operation":"INSERT"},
{"field":"Password","node":"//*[@id='pass']","operation":"INSERT"},
{"field":"UserName","node":"//*[@id='uname']","operation":"INSERT"},
{"field":"_index","node":"//*[@id='fname']","operation":"INSERT"},
{"field":"FirstName","node":"//*[@id='fname']","operation":"APPEND"},
{"field":"LastName","node":"//*[@id='fname']","operation":"APPEND"}
];
let gp13 = [
  {"prefunc":applyEvent},
  {"field":"_index","node":".","operation":"INSERT"}
];
function firstFive(data){
  var r = [];
  for (var i = 0 ; i < 5 ; i++){
    r.push(data[i]);
  }
  return r;
}
var timer;
function keyPressReceived(){
if (timer)
  clearTimeout(timer);
timer = setTimeout(function(){
    startSearch();
  },2000);
}
function keyPressHolder(keyPressCount){
  let res = function(){
    return keyPressCount;
  }
}
function startSearch(){
  var options = {
  shouldSort: true,
  threshold: 0.1,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 3,
  keys: [
    "FirstName",
    "LastName"
  ]
};
var fuse = new Fuse(dataSource, options); // "list" is the item array
var result = fuse.search(document.getElementById("word").value);
fire(result,"//*[@id='branch']",map13,"pechenicolet.user");
}
function generateGrouper(len,offset){
  grouper = function(data){//the function that gives the next len items from the offset
    let result = [];
    for(let i = offset; i < offset + len;i++){
      data[i].integralIndex = i;
      result.push(data[i]);
    }
    return result;
  }
  return grouper;
}
const groupSize = 10;
var dataSource;
function initialConstruct(){
ServerResult().then(function(data){
  dataSource = data;
fire(firstFive(data),"//*[@id='branch']",map13,"pechenicolet.user");
fire(regroup(data,groupSize),"//*[@id='ppp']",gp13,"pch.user.gr");//regroup generates an array based on data array in which there are item with offset field
});
}
function regroup(data,size){
  var count = data.length / size;
  var groups = [];
  for (var i = 0 ; i < count ; i++){
    groups.push({"offset":i * size});
  }
  return groups;
}
function applyEvent(index,item,node){
let func = generateGrouper(groupSize,item["offset"]);
let clickFunction = function(){
  fire(func(dataSource),"//*[@id='branch']",map13,"pechenicolet.user");
}
node.addEventListener('click',clickFunction);
}
