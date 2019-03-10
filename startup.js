const builders = [FORFAITBUILDER];
function startup(){
    builders.forEach(function(builder){
      const engine = new Engine(builder.datasource);
      builder.triples.forEach(function(triple){
          engine.addSubscriber(new Subscriber(triple.context,triple.map,triple.children));
          builder.build = function(){
            engine.start();
          }
    });

    });
  }
