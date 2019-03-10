class Subscriber{
  constructor(context,map,children){
    this.context = document.evaluate(context,document).iterateNext();
    this.map = new Map(map);
    this.children = children;
    if (!children)
      this.children = [];
  }
  beginProcess(){
    const hang = this.context.parentNode;
    let res = hang.querySelectorAll(".cloned");
    res.forEach(function(node){
      hang.removeChild(node);
    });
}
  processItem(item){
    const hang = this.context.parentNode;
    let clonedContext = this.context.cloneNode(true);
    if (this.context.id)
      clonedContext.id = this.context.id + '_cloned';
    clonedContext.classList.add('cloned');
    const children = this.children;
    const map = this.map;
    this.map.getEntries().forEach(function(key){
      if (item[key])
      {
        if (children[key])
        {
          let engine = new Engine(item[key]);
          let str = 'let triple = ' + children[key];
          eval(str);
          let sub = new Subscriber(triple.context,triple.map,triple.children);
          engine.addSubscriber(sub);
          engine.start();
        }
        else{//set this field on the cloned context node
          let targetNode = map.resolveNode(key,clonedContext);
          if (targetNode.nodeType === Node.ATTRIBUTE_NODE){
            if (map.getOperation(key) === "APPEND")
              targetNode.nodeValue += " " + item[key];
              else if (map.getOperation(key) === "CONCAT")
              targetNode.nodeValue += item[key];
              else
              targetNode.nodeValue = item[key];
          }
          else if (targetNode.nodeType === Node.ELEMENT_NODE){
            if (map.getOperation(key) === "APPEND")
              targetNode.innerHTML += " " + item[key];
              else if (map.getOperation(key) === "CONCAT")
              targetNode.innerHTML += item[key];
              else
              targetNode.innerHTML = item[key];
        }
      }
    }});
      hang.appendChild(clonedContext);
  }
}
class Engine{
  constructor(datasource){
    this.subscribers = [];
    this.datasource = datasource;
  }
  addSubscriber(subscriber){
    this.subscribers.push(subscriber);
  }
  start(){
    const subs = this.subscribers;
    subs.forEach(function(subscriber){
      subscriber.beginProcess();
    });
    this.datasource.then(function(iterable){
      iterable.forEach(function(item){
        subs.forEach(function(subscriber){
          subscriber.processItem(item);
        });
      });
    });
  }
}
class Map{
  constructor(settings){
    this.mapping = {};
    const mapp = this.mapping;
    settings.forEach(function(mapItem){
      if (!mapItem.operation)
       mapItem.operation = "INSERT";
    mapp[mapItem.field] = mapItem;
    });
  }
  getEntries(){
    return Object.keys(this.mapping);
  }
  getOperation(key){
    return this.mapping[key].operation;
  }
  resolveNode(key,context){
    //node is xpath address of the target node
    const result = document.evaluate(this.mapping[key].node,context);
    return result.iterateNext();
  }
}
