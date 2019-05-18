# datahanger
A java script library to populate a html with data using xpath addresses
You found a good looking html on the internet and want to use it inside your project this library helps you to populate this html with your own data.
This allows you to focus on html design or asking a html designer to design a good looking html without concerning about the data and then injecting
the data inside it without adding anything in html code and just by some declarations outside it.
To do so:
1) Considering the datasource. The datasource is an array of objects.
2) Consider a mapping. This maps a field of data with a node of the html, an operation that defines what operation to take place on the node value and optionally a function that performs a prior treatment on the field.
3) Designaiting a namespace. It is useful for identifying in case of nested operations.
4) Calling the data, map and namespace.
