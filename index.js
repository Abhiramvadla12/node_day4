var http = require("http");
const { json } = require("stream/consumers");
var url = require("url");
var server = http.createServer(async(req,res)=>{
    var data = url.parse(req.url,true);
    console.log(data.query);
    var param_data = data.pathname.split('/').pop();
    console.log(param_data);
    var response = await fetch("https://fakestoreapi.com/products");
    var api_data = await response.json();
    // console.log(api_data);
    var filtered_data = api_data.filter((element,index)=>{
        return element.id == param_data;
    })
    if(filtered_data.length > 0){
        res.write(JSON.stringify(filtered_data));
    }
    else{
        res.write("data not found")
    }
    res.end();
})
var port = 3000;
server.listen(port,()=>{
    console.log("server has started  "+`http://localhost:${port}`);
});