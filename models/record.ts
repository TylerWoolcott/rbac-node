const mongoose2 = require('mongoose')
const Schema = mongoose2.Schema
const recordSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
})

const RecordSchema = mongoose2.model('Record', recordSchema)

module.exports = RecordSchema
