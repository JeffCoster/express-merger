import {customFunctions} from "./examples/custom-functions.js";
import {dataSources} from "./examples/simpleProductList/content/data-sources.js"
import {dataSources as dataSourcesLevels} from "./examples/levels/content/data-sources.js"
import express from "express"
import { test } from "merger";

global.debug = true;

var dataSources4View;

var app = express();

app.set("views", "./examples") // specify the views directory
app.set("view engine", "merger") // register the template engine

app.get("/products", (req, res) => {
   dataSources4View = dataSources;  
   res.render("simpleProductList/pl-merger-map", {dataSources4View, customFunctions});
})

app.get("/taxonomy", (req, res) => {
   dataSources4View = dataSourcesLevels;
   res.render("levels/tx-merger-map", {dataSources4View, customFunctions});
})

app.get("/ex1test", (req, res) => {
   dataSources4View = dataSources;  
   res.render("simpleProductList/pl-merger-map", {dataSources4View, customFunctions}, function (err, renderedHtml) {
      res.send(renderedHtml);
   });
})

app.get("/ex2test", (req, res) => {
   dataSources4View = dataSourcesLevels;
   res.render("levels/tx-merger-map", {dataSources4View, customFunctions}, function (err, renderedHtml) {
      //res.send(renderedHtml);

      // compare newly rendered with baseline html
      test(renderedHtml, "examples/test/ex2baseline.html", function (answer) {
      res.send(answer);
      });
   });
})

app.use(express.static("static"));

app.listen(3000);

console.log("Node listening on port 3000");