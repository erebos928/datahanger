class DataHanger{//a processor
  constructor(context,map){
    this.ctxPath = context;
    this.map = new Map(map);

  }
  initialize(){
    this.context = document.evaluate(this.ctxPath,document).iterateNext();
    this.hang = this.context.parentNode;
    let oldNodes = this.hang.querySelectorAll(".cloned");
    oldNodes.forEach(function(node){
      node.parentNode.removeChild(node);
    });
    this.preFunc = this.map.getPreprocessorFunction();
  }
  beginItem(index,item){
    this.clonedContext = this.context.cloneNode(true);
    if (this.context.id)
      this.clonedContext.id = this.context.id + "_" + index + '_cloned';
    this.clonedContext.classList.add('cloned');
    if (this.preFunc)
      this.preFunc(index,item,this.clonedContext);
  }
  fieldSeen(key,value,item,namespace){
    if (this.map.hasRecord(key) &&
        this.map.getOperation(key) === "EXPAND")
    {
      let ctx = this.map.getContext(key);
      let mp = this.map.getMap(key);
      if (ctx && map)
        crush(value,ctx,mp,namespace + "." + key);
      else
        throw "context and map are requireی for expanding "+ key;
    }

    let targetNode = this.map.resolveNode(key,this.clonedContext);
    if (targetNode)
    if (targetNode.nodeType === Node.ATTRIBUTE_NODE){
      if (this.map.getOperation(key) === "APPEND")
      targetNode.nodeValue += " " + item[key];
      else if (this.map.getOperation(key) === "CONCAT")
      targetNode.nodeValue += item[key];
      else
      targetNode.nodeValue = item[key];
    }
    else if (targetNode.nodeType === Node.ELEMENT_NODE){
      if (this.map.getOperation(key) === "APPEND")
      targetNode.innerHTML += " " + this.preProcessField(key,item[key],item,targetNode,this.clonedContext,namespace);
      else if (this.map.getOperation(key) === "CONCAT")
      targetNode.innerHTML += this.preProcessField(key,item[key],item,targetNode,this.clonedContext,namespace);
      else
      targetNode.innerHTML = this.preProcessField(key,item[key],item,targetNode,this.clonedContext,namespace);
    }
  }
  endItem(){
    if (this.context.getAttribute('data-initialdisplay'))
      this.clonedContext.style.display = this.context.getAttribute('data-initialdisplay');
    this.hang.appendChild(this.clonedContext);
  }
  preProcessField(key,value,item,targetNode,contextNode,namespace){
    let func = this.map.getFn(key);
    if (func)
      return func(key,value,item,targetNode,contextNode,namespace);
    else
      return value;
  }
  finalize(){
    this.context.setAttribute('data-initialdisplay', window.getComputedStyle(this.context,null).getPropertyValue('display'));
    this.context.style.display = 'none';
  }
}
class Map{
  constructor(settings){
    this.mapping = {};
    const mapp = this.mapping;
    settings.forEach(function(mapItem){
      if (!mapItem.operation)
       mapItem.operation = "INSERT";
       if (mapItem.prefunc)
         mapp["prefunc"] = mapItem.prefunc;
      else
       mapp[mapItem.field] = mapItem;
    });
  }
  getEntries(){
    return Object.keys(this.mapping);
  }
  getOperation(key){
    return this.mapping[key].operation;
  }
  getContext(key){
    return this.mapping[key].context;
  }
  getMap(key){
    return this.mapping[key].map;
  }
  hasRecord(key){
    if (this.mapping[key])
      return true;
    return false;
  }
  getPreprocessorFunction(){
    if (this.mapping['prefunc'])
      return this.mapping['prefunc'];
    else
      return null;
  }
  getFn(key){//supplementary process function
    if (this.mapping[key].fn)
      return this.mapping[key].fn;
    else
      return null;
  }
  resolveNode(key,context){
    //node is xpath address of the target node
    if (!this.mapping[key])
      return null;
    const result = document.evaluate(this.mapping[key].node,context);
    return result.iterateNext();
  }
}
function fire(data,context,map,ns){//crush data using map with root namespace ns
  let core = new Core();
  //var sub = new SimpleSubscriber();
  let cracker = new Cracker(ns);
  //core.addSubscriber(sub);
  core.addSubscriber(cracker);
  //var processor = new SimpleProcessor();
  let processor = new DataHanger(context,map);
  cracker.addProcessor(processor);
  core.loadData(data);
  core.start();
}
