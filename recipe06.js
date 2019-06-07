let map04 = [
{"field":"email","node":"//*[@id='email']","operation":"INSERT"},
{"field":"gender","node":"//*[@id='gender']","operation":"INSERT"},
{"field":"ip_address","node":"//*[@id='ip']","operation":"INSERT"},
{"field":"phone","node":"//*[@id='phone']","operation":"INSERT"},
{"field":"_index","node":"//*[@id='radif']","operation":"INSERT"},
{"field":"first_name","node":"//*[@id='fname']","operation":"INSERT"},
{"field":"last_name","node":"//*[@id='fname']","operation":"APPEND"}
];
function launchSearch(){
  let elementSearch = document.getElementById('searchInput');
  let word = elementSearch.value;
  if (word.length > 1)
    startSearch(word);
  else
      startSearch('');
}
function startSearch(word){
  var options = {
    shouldSort: true,
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
        "first_name",
        "last_name",
        "ip_address"
    ]
};
var fuse = new Fuse(data, options); // "list" is the item array
var result = [];
if (word && word.length > 1) {
    let tokens = word.split(" ");
    tokens.forEach(function (token) {
        result = fuse.search(token);
        fuse = new Fuse(result, options);
    });
}
fire(result,"//*[@id='branch']",map04,"department.user");
}
