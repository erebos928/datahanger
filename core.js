// input as data array
class Core{
  constructor(){
    this.subscribers = [];
  }
  loadData(data){
    this.data = data;
  }
  addSubscriber(subscriber){
    this.subscribers.push(subscriber);
  }
  start(){
    this.subscribers.forEach(function(subscriber){
      subscriber.beginData();
    });
    let subs = this.subscribers;
    this.data.forEach(function(item,idx)
    {
    subs.forEach(function(subscriber){
      subscriber.beforeItem(idx);
    });
    subs.forEach(function(subscriber){
      subscriber.nextItem(item,idx);
    });
    subs.forEach(function(subscriber){
      subscriber.afterItem(idx);
    });
    });
    this.subscribers.forEach(function(subscriber){
      subscriber.endData();
    });
  }
}
class SimpleSubscriber{
  constructor(){

  }
  beginData(){
    console.log("BEGIN DATA");
  }
  beforeItem(index){
    console.log(index + " ");
  }
  nextItem(item){
    console.log(item.Email);
  }
  afterItem(index){
    console.log("email printed")
  }
  endData(){
    console.log("END DATA");
  }
}
