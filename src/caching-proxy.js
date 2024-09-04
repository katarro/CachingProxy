#!/usr/bin/env node
const express = require("express");
const {Command} = require("commander")
const responseTime = require("response-time");
const ProductsRoute = require("./routes/products")

const app = express();
const program = new Command();

app.use(responseTime());

program
    .option("caching")
    .option("--port <number>","Port of server")
    .option("--origin <url>","URL from origin for the request")

program.parse(process.argv)

const options = program.opts();
const origin = options.origin;
const port = options.port;

if(!origin || !port){
    console.error("Error: You must provide a source URL and PORT using --origin <url> and --port <port>");
    process.exit(1);
}

app.locals.origin = origin;

app.use('/',ProductsRoute);


app.listen(port,()=>{
    console.log("listen on port",port)
})