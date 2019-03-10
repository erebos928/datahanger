# datahanger
A java script library to populate a html with data using xpath addresses
You found a good looking html on the internet and want to use it inside your project this library helps you to populate this html with your own data.
This allows you to focus on html design or asking a html designer to design a good looking html without concerning about the data and then injecting
the data inside it without adding anything in html code and just by some declarations outside it.
To do so:
1) Considering the datasource. The datasource is an array of objects and is in the form of a promise. When it resolves, it returns an array. We can
put it in a separate file like data.js
2) Considering the name of the suit. It is a set of datasource and some triples. For example:
  EXAMPLE = {"datasource":a,"triples":[TRIP_EX]}
  we can have several triples that means a single datasource will populate multiple html fragments at the same time (context)
3) Defining triples: triples consist of three members:
  i) context: the xpath address which points to the fragment of html in witch the data will be inserted,
  ii) map: a mapping from data item's fields to a html node on the context. The map consists of 1) field that points to the field of data item 2)
    node: which is the xpath address of the target node on which will be inserted the value and the operation that determines the value should be appended (concatenate after a space) or concatenated or inserted
  iii) children: (optional) if a field in turn is going to be expanded (i.e. acts as a datasource for other html fragment) this will be set to an object with two fields that the first will point to the name of the field to be expanded and the second points to a triple (context,map,children)
  For example if we have departments as data that is an array of department object and the department object has a EmployeeList fields which is an array in turn and we want to use this array as datasource for another construction we would have:
  ch = {"EmployeeList":secondTriple}

4) Add the name of the suit (in our example EXAMPLE) in the array on top of startup.js file. Now you can start data injection by calling EXAMPLE.build()
