let map01 = [
{"field":"email","node":"//*[@id='email']","operation":"INSERT"},
{"field":"gender","node":"//*[@id='gender']","operation":"INSERT","fn":genderDisplay},
{"field":"ip_address","node":"//*[@id='ip']","operation":"INSERT"},
{"field":"phone","node":"//*[@id='phone']","operation":"INSERT"},
{"field":"_index","node":"//*[@id='radif']","operation":"INSERT"},
{"field":"first_name","node":"//*[@id='fname']","operation":"INSERT"},
{"field":"last_name","node":"//*[@id='lname']","operation":"INSERT"}
];
function initialConstruct(){
fire(data,"//*[@id='branch']",map01,"department.user");
}
function genderDisplay(key,value,item,targetNode,contextNode,namespace){
  if (value === "Male")
    return "<i class='fa fa-mars' style='font-size:24px;color:red'></i>";
  else
    return "<i class='fa fa-venus' style='font-size:24px;color:purple'></i>";
}
