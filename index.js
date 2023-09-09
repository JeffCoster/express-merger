//import express from "express"
import express from "/Users/jeff/.npm-global/lib/node_modules/express/lib/express.js"
import {customFunctions} from "./examples/custom-functions.js"
import {compose} from "../merger/built/src/merger-functions.js"
import {
   validateMergeMapToSchema
} from "../merger/built/src/merger-map-validate.js"

import jsdom from "jsdom"
import fs from "fs"

import {
   dataSources
} from "./examples/simpleProductList/content/data-sources.js"

//import {
//   mergerMap
//} from "./examples/simpleProductList/merger-map.js"

import {
   dataSources as dataSourcesLevels
} from "./examples/levels/content/data-sources.js"

//import {
//   mergerMap as mergeMapLevels
//} from "./examples/levels/merger-map.js"

global.debug = true;

var mergeMap4View;
var dataSources4View;

var app = express();

app.engine("json", (filePath, options, callback) => { // define the template engine

   const mappingJson = fs.readFileSync(filePath);
   console.log(mappingJson);
   const mergeMap4View = JSON.parse(mappingJson.toString());
   const htmlTemplatePath = mergeMap4View.templatePath;
   dataSources4View = dataSources; 

   const {JSDOM} = jsdom;
   var document;
   var dom = JSDOM.fromFile(htmlTemplatePath, {
      includeNodeLocations: true
   }).then(dom => {
 //     validateMergeMapToSchema(options.mergeMap4View);
      document = dom.window.document;
      compose(mergeMap4View, dataSources4View, document);

      // regression test
      // TODO regressionTest(dom, baselineRenderedHtmlPath)
      return callback(null, dom.serialize());
   });
})

app.set("views", "./examples") // specify the views directory
app.set("view engine", "json") // register the template engine module

app.get("/products", (req, res) => {
   // const mappingJson = fs.readFileSync("examples/simpleProductList/pl-merger-map.json");
   // console.log(mappingJson);
   // const mergeMap4View = JSON.parse(mappingJson.toString());
   // const htmlTemplatePath = mergeMap4View.templatePath;
   // dataSources4View = dataSources;   
   res.render("simpleProductList/pl-merger-map.json", {mergeMap4View, dataSources4View});
})

app.get("/taxonomy", (req, res) => {
   mergeMap4View = mergeMapLevels;
   dataSources4View = dataSourcesLevels;
   res.render("levels/levels.html", {mergeMap4View, dataSources4View});
})

app.use(express.static("static"));

app.listen(3000);

console.log("Node listening on port 3000");