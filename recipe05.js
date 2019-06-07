let map04 = [
{"field":"email","node":"//*[@id='email']","operation":"INSERT"},
{"field":"gender","node":"//*[@id='gender']","operation":"INSERT"},
{"field":"ip_address","node":"//*[@id='ip']","operation":"INSERT"},
{"field":"phone","node":"//*[@id='phone']","operation":"INSERT"},
{"field":"_index","node":"//*[@id='radif']","operation":"INSERT"},
{"field":"first_name","node":"//*[@id='fname']","operation":"INSERT"},
{"field":"last_name","node":"//*[@id='fname']","operation":"APPEND"}
];
let map00 = [
{"prefunc":applyEventListener},
  {"field":"tag","node":".","operation":"INSERT"}
];
let size = 50;
function initialConstruct(){
fire(data,"//*[@id='branch']",map04,"department.user");
}
