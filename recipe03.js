let map03 = [
{"field":"email","node":"//*[@id='email']","operation":"INSERT"},
{"field":"gender","node":"//*[@id='gender']","operation":"INSERT"},
{"field":"ip_address","node":"//*[@id='ip']","operation":"INSERT"},
{"field":"phone","node":"//*[@id='phone']","operation":"INSERT"},
{"field":"_index","node":"//*[@id='radif']","operation":"INSERT"},
{"field":"first_name","node":"//*[@id='fname']","operation":"INSERT"},
{"field":"last_name","node":"//*[@id='lname']","operation":"INSERT"}
];
function initialConstruct(){
fire(data,"//*[@id='branch']",map03,"department.user");
}
function sortData(){
  data.sort(function(item1,item2){
    return item1.last_name.localeCompare(item2.last_name);
  });
  fire(data,"//*[@id='branch']",map03,"department.user");
}
