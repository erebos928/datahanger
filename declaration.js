/*
There is a triple for every construction. For example if you want to build a table and at the same time a html select
you need to have two triples. Every triple uncludes
a context: that points to the pattern is to be populated
a map: that associates the members(fields) of the data item to the part of the pattern to be populated with and also the operation
to take place.
children: the inner member of the data item to be expanded. the children is an object with name value pairs that names
point to member name and value to a triple.
*/
/////////////FORFAITBUILDER/////////////////
//datasource is defined in data.js
//inner map
let mp34 = [{"field":"startDate","node":"/div/span"}];
//inner triple
let SOUSFORFAIT = {"context":"//*[@id='d34']","map":mp34};
//principal map
let mp45 = [{"field":"id","node":"@value","operation":"APPEND"},{"field":"startDate","node":".","operation":"INSERT"}];
//principal children
let ch45 = {"v":SOUSFORFAIT};
//principal triple
let FORFAITTRIPLE = {"context":"//*[@id='b45']","map":mp45,"children":ch45};
//suit declaration
const FORFAITBUILDER = {"datasource":a,"triples":[FORFAITTRIPLE]};
///////////////////////////////////////////////////
