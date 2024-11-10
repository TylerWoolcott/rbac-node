const express = require('express')
const app = express()
const port = 3000

//create endpoints that user can add, delete, update products

type Category = {
  name: string,
  description: string,
}

type Product = {
  id: string,
  name: string,
  price: number,
  description: string,
  unit: number,
  category: Category,
  active: boolean,
  sku: string,
}

const products: Product[] = []

app.get('/products', (req, res) => {
  res.send(products)
})

app.post('/products', (req, res) => {
  const { name, price, description, unit, category, active, sku } = req.body
  const product = products.push({ id: Math.random().toString(), name, price, description, unit, category, active, sku })
  res.send(product)
})

app.patch('/products/:id', (req, res) => {
  const { id } = req.params
  const data = req.body

  res.send('Hello World!')
})

app.delete('/products/:id', (req, res) => {
  const { id } = req.params
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
