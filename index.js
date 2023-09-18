

import {customFunctions} from "./examples/custom-functions.js";
import {dataSources} from "./examples/simpleProductList/content/data-sources.js"
import {dataSources as dataSourcesLevels} from "./examples/levels/content/data-sources.js"
// import {extFunctions} from "merger";
import {__express, extFunctions} from "merger";
import express from "express"

extFunctions.customFunctions = customFunctions;

global.debug = true;

var mergeMap4View;
var dataSources4View;

var app = express();

// app.engine("json", (filePath, options, callback) => { // define the template engine

//    const mappingJson = fs.readFileSync(filePath);
//    console.log(mappingJson);
//    const mergeMap4View = JSON.parse(mappingJson.toString());
//    const htmlTemplatePath = mergeMap4View.templatePath;
//    dataSources4View = dataSources; 

//    const {JSDOM} = jsdom;
//    var document;
//    var dom = JSDOM.fromFile(htmlTemplatePath, {
//       includeNodeLocations: true
//    }).then(dom => {
//  //     validateMergeMapToSchema(options.mergeMap4View);
//       document = dom.window.document;
//       compose(mergeMap4View, dataSources4View, document);

//       // regression test
//       // TODO regressionTest(dom, baselineRenderedHtmlPath)
//       return callback(null, dom.serialize());
//    });
// })

app.set("views", "./examples") // specify the views directory
app.set("view engine", "merger") // register the template engine

app.get("/products", (req, res) => {
   // const mappingJson = fs.readFileSync("examples/simpleProductList/pl-merger-map.json");
   // console.log(mappingJson);
   // const mergeMap4View = JSON.parse(mappingJson.toString());
   // const htmlTemplatePath = mergeMap4View.templatePath;
   // dataSources4View = dataSources; 
   dataSources4View = dataSources;  
   res.render("simpleProductList/pl-merger-map", {dataSources4View});
})

app.get("/taxonomy", (req, res) => {
   dataSources4View = dataSourcesLevels;
   res.render("levels/levels", {dataSources4View});
})

app.use(express.static("static"));

app.listen(3000);

console.log("Node listening on port 3000");