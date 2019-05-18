let map13 = [
//{"prefunc":fn},//the function to be called on each item, useful for generate row related function, params: index,item,contextNode
{"field":"email","node":"//*[@id='email']","operation":"INSERT"},
//{"field":"id","node":"//*[@id='phone']","operation":"INSERT"},
{"field":"gender","node":"//*[@id='gender']","operation":"INSERT"},
{"field":"ip_address","node":"//*[@id='ip']","operation":"INSERT"},
{"field":"phone","node":"//*[@id='phone']","operation":"INSERT"},
{"field":"_index","node":"//*[@id='radif']","operation":"INSERT"},
{"field":"first_name","node":"//*[@id='fname']","operation":"INSERT"},
{"field":"last_name","node":"//*[@id='lname']","operation":"INSERT"}
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
  },200);
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
  dataSource = data;
fire(firstFive(data),"//*[@id='branch']",map13,"pechenicolet.user");
//fire(regroup(data,groupSize),"//*[@id='ppp']",gp13,"pch.user.gr");//regroup generates an array based on data array in which there are item with offset field
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
