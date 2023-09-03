//import express from "express"
import express from "/Users/jeff/.npm-global/lib/node_modules/express/lib/express.js"
import {
  compose 
} from "../merger/built/src/merger-functions.js"
import {
   validateMergeMapToSchema
} from "../merger/built/src/merger-map-validate.js"

import jsdom from "jsdom"

import {
   dataSources
} from "./examples/simpleProductList/content/data-sources.js"
import {
   mergerMap
} from "./examples/simpleProductList/merger-map.js"

import {
   dataSources as dataSourcesLevels
} from "./examples/levels/content/data-sources.js"
import {
   mergerMap as mergeMapLevels
} from "./examples/levels/merger-map.js"

global.debug = true;

var mergeMap4View;
var dataSources4View;

var app = express();

// const fs = require("fs") // this engine requires the fs module
app.engine("html", (filePath, options, callback) => { // define the template engine
   const {JSDOM} = jsdom;
   var document;
   var dom = JSDOM.fromFile(filePath, {
      includeNodeLocations: true
   }).then(dom => {
 //     validateMergeMapToSchema(options.mergeMap4View);
      document = dom.window.document;
      compose(options.mergeMap4View, options.dataSources4View, document);
      return callback(null, dom.serialize());
   });
})

app.set("views", "./examples") // specify the views directory
//app.set("view engine", "merge") // register the template engine module

app.get("/products", (req, res) => {
   mergeMap4View = mergerMap;
   dataSources4View = dataSources;   
   res.render("simpleProductList/product-lister-template.html", {mergeMap4View, dataSources4View});
})

app.get("/taxonomy", (req, res) => {
   mergeMap4View = mergeMapLevels;
   dataSources4View = dataSourcesLevels;
   res.render("levels/levels.html", {mergeMap4View, dataSources4View});
})

app.use(express.static("static"));

app.listen(3000);

console.log("Node listening on port 3000");