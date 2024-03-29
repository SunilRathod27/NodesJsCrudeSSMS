var  config = require('./dbconfig');
const  sql = require('mssql');
const { query } = require('express');


async  function  getOrders() {
    try {
      let  pool = await  sql.connect(config);
      let  products = await  pool.request().query("SELECT * from Orders");
      return  products.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }
  async  function  getOrder(productId) {
    try {
      let  pool = await  sql.connect(config);
      let  product = await  pool.request()
      .input('input_parameter', sql.Int, productId)
      .query("SELECT * from Orders where Id = @input_parameter");
      return  product.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }


  async  function  addOrder(order) {
    console.log(order)
    try {
      let  pool = await  sql.connect(config);
      // let  insertProduct = await  pool.request()
      return await pool.request()
      .input('Id', sql.Int, order.Id)
      .input('Title', sql.NVarChar, order.Title)
      .input('Quantity', sql.Int, order.Quantity)
      .input('Message', sql.NVarChar, order.Message)
      .input('City', sql.NVarChar, order.City)
      // .execute('InsertOrders')
      .query("INSERT INTO Orders(Id,Title,Quantity,Message,City)VALUES(@Id,@Title,@Quantity,@Message,@City)");
    
    }
    catch (err) {
      console.log(err);
    }

  }

  async  function  updateOrder(order) {
    console.log(order)
    try {
      let  pool = await  sql.connect(config);
      // let  insertProduct = await  pool.request()
      return await pool.request()
      .input('Id', sql.Int, order.Id)
      .input('Title', sql.NVarChar, order.Title)
      .input('Quantity', sql.Int, order.Quantity)
      .input('Message', sql.NVarChar, order.Message)
      .input('City', sql.NVarChar, order.City)
      .query("UPDATE Orders SET Title = @Title,Quantity = @Quantity,Message=@Message,City=@City WHERE Id=@Id");
    }
    catch (err) {
      console.log(err);
    }

  }

  async  function  deleteOrder(order) {
    console.log(order)
    try {
      let  pool = await  sql.connect(config);
      return await pool.request()
      .input('Id', sql.Int, order.Id)
      .input('Title', sql.NVarChar, order.Title)
      .input('Quantity', sql.Int, order.Quantity)
      .input('Message', sql.NVarChar, order.Message)
      .input('City', sql.NVarChar, order.City)
      .query("DELETE FROM Orders WHERE Id = @Id");
    }
    catch (err) {
      console.log(err);
    }

  }

module.exports = {
    getOrders: getOrders,
    getOrder : getOrder,
    addOrder : addOrder,
    updateOrder:updateOrder,
    deleteOrder:deleteOrder

}  