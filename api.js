var Db  = require('./dboperations');
var Order = require('./order');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
   console.log('middleware');
   next();
})

router.route('/orders').get((request,response)=>{

    dboperations.getOrders().then(result => {
       response.json(result[0]);
    })

})

router.route('/orders/:id').get((request,response)=>{

    dboperations.getOrder(request.params.id).then(result => {
       response.json(result[0]);
    })

})

// router.route('/orders').post((request,response)=>{
//    console.log(request.body)

//     let order = {...request.body}

//     dboperations.addOrder(request.body).then(result => {
//        console.log("err");
//        response.status(201).json(result);
//     })

// })

router.route('/orders').post((request, response) => {
   console.log(request.body)
   let  order = { ...request.body }
   dboperations.addOrder(order).then(data  => {
     response.status(201).json(data);
   })
 })


 
router.route('/orders/:id').post((request, response) => {
   console.log(request.body)
   let  order = { ...request.body }
   dboperations.updateOrder(order).then(data  => {
     response.status(201).json(data);
   })
 })

 router.route('/orders/:id').delete((request, response) => {
   console.log(request.body)
   let  order = { ...request.body }
   dboperations.deleteOrder(order).then(data  => {
     response.status(201).json(data);
   })
 })




var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);



