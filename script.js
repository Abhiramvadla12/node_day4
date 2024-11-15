var http = require("http");
const { json } = require("stream/consumers");
var url = require("url");
var server = http.createServer(async(req,res)=>{
    var data = url.parse(req.url,true);
    console.log(data.query);
    // var param_data = data.pathname.split('/').pop();
    // console.log(param_data);
    var response = await fetch("https://fakestoreapi.com/products");
    var api_data = await response.json();
    var cat = api_data.filter((element) => {
        if (data.query.cat == "'m'") {
            return element.category == "men's clothing";
        }
        else if(data.query.cat == "'j'"){
            return element.category == "jewelery";
        }
        else if(data.query.cat == "'e'"){
            return element.category == "electronics";
        }
        else if(data.query.cat == "'w'"){
            return element.category == "women's clothing";
        }
        else{
            res.write("please cat as 'm' or 'j' or 'e' or 'w' for men's clothing , jewelery, electronics, womans's clothing respectively other values are not allowed")
        }
        return false;
    });
    if(data.query.order == "'desc'"){
        res.write(JSON.stringify(cat.sort((a,b)=>
            b['price'] - a['price']
        ),null,2));
    }
    else if(data.query.order =="'asc'"){
        res.write(JSON.stringify(cat.sort((a,b)=>
            a['price'] - b['price']
        ),null,2))
    }
    else{
        res.write("please asc or desc for ascending and descending order ohter values are not allowed");
    }
    // }
    // else{
    //     res.write("data not found")
    // }
    res.end();
})
var port = 3001;
server.listen(port,()=>{
    console.log("server has started  "+`http://localhost:${port}`);
});