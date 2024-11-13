const Customer = require("../models/Customer")

const customersController = {
  // GET /customers
  index: async (req, res) => {
    const customers = await Customer.findAll()
    res.json(customers)
  },  

  // POST /customers
  create: async (req, res) => {
    const newCustomer = await Customer.create(req.body)
    res.status(201).json(newCustomer)
  },  
  
  // GET /customers/:id
  show: async (req, res) => {
    const customer = await Customer.findByID(req.params.id)
    res.json(customer)
  },

  // PUT /customers/:id
  update: async (req, res) => {
    const updatedCustomer = await Customer.update(req.params.id, req.body)
    res.json(updatedCustomer)
  },  

  // DELETE /customers/:id
  delete: async (req, res) => {
    const deletedCustomer = await Customer.delete(req.params.id)
    res.json(deletedCustomer)
  }
}

module.exports = customersController