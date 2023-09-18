import {customFunctions} from "./examples/custom-functions.js";
import {dataSources} from "./examples/simpleProductList/content/data-sources.js"
import {dataSources as dataSourcesLevels} from "./examples/levels/content/data-sources.js"
import express from "express"

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

app.use(express.static("static"));

app.listen(3000);

console.log("Node listening on port 3000");