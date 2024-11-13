const { query } = require("../database")

class Customer {
  constructor(costumerRow) {
    this.id = costumerRow.id
    this.name = costumerRow.name
    this.email = costumerRow.email
    this.createdAt = new Date(costumerRow.created_at)
    this.updatedAt = new Date(costumerRow.updated_at)
  }

  static async findAll() {
    const result = await query(`SELECT * FROM customers`)
    return result.rows.map((customer) => new Customer(customer))
  }

  static async create({name, email}) {
    const result = await query(`
      INSERT INTO customers (name, email) 
      VALUES ($1, $2)
      RETURNING *;`,
      [name, email]
    )
    return new Customer(result.rows[0])
  }

  static async findByID(id) {
    const result = await query(`SELECT * FROM customers WHERE id = $1;`, [id])
    if(!result.rows[0]) return null
    return new Customer(result.rows[0])
  }

  static async update(id, attributes) {
    const { rows } = await query(`SELECT * FROM customers WHERE id = $1;`, [id])
    if(!rows[0]) return { message: 'This customer does not exist.'}
    const customer = new Customer(rows[0])
    Object.assign(customer, attributes)
    customer.updatedAt = new Date()

    await query(`
      UPDATE customers SET
        name = $1,
        email = $2
      WHERE id = $3;`,
    [customer.name, customer.email, customer.id])

    return customer
  }

  static async delete(id) {
    const { rows } = await query ("SELECT * FROM customers WHERE id = $1;", [id])
    const customer = new Customer(rows[0])

    await query(`DELETE FROM customers WHERE id = $1;`, [id])
    return {CustomerDeleted: customer }
  }
}
module.exports = Customer