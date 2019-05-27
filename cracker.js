class Cracker{//a subscriber
  constructor(namespace){
    this.processors = [];
    this.namespace = namespace;
  }
  addProcessor(processor){
    this.processors.push(processor);
  }
  beginData(){
    this.processors.forEach(function(processor){
      processor.initialize();
    });
  }
  beforeItem(index){
    //console.log(index + " ");
  }
  nextItem(item,idx){
    item._index = idx;
    let keys = Object.keys(item);
    let namespace = this.namespace;
    this.processors.forEach(function(processor){
      processor.beginItem(idx,item);
      keys.forEach(function(key){
      processor.fieldSeen(key,item[key],item,namespace);
      });
      processor.endItem();
    });
  }
  afterItem(index){
    //console.log("email printed")
  }
  endData(){
    this.processors.forEach(function(processor){
      processor.finalize();
    });
  }
}
class SimpleProcessor{
  constructor(){

  }
  beginItem(){

  }
  fieldSeen(name,value,item,ns){
    //console.log(name + "------" + value);
  }
  endItem(){

  }
}
