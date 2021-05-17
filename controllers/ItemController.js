const { item, transaction } = require('../models')

class ItemController {
  getAll = async (req, res) => {
    try {
      const find = await item.findAll()

      return res.status(200).json({
        message: "All item data",
        data: find
      })
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      })
    }
  }

  getOne = async (req, res) => {
    try {
      const find = await item.findOne({where: req.params})

      return res.status(200).json({
        message: "One item data",
        data: find
      })
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      })
    }
  }

  createItem = async(req, res) => {
    try {
      const create = await item.create(req.body)
      await transaction.create({
        item_id: create.id,
        item_amount: req.body.amount,
        total: req.body.price * req.body.amount,
        ordered_id: req.body.suplier_id,
        order_type: req.body.order_type
      })

      return res.status(200).json({
        message: `${create.name} is created`
      })
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      })
    }
  }

  updateItem = async(req, res) => {
    try {
      await item.update(req.body, {where: req.params})
      const updates = {}
      updates.item_id = req.params.id
      updates.ordered_id = req.body.ordered_id
      updates.order_type = req.body.order_type

      if(req.body.newAmount){
        updates.item_amount = req.body.newAmount
      } else {
        updates.item_amount = 0
      }

      if(req.body.price && req.body.newAmount) {
        updates.total = req.body.price * req.body.newAmount
      } else if(req.body.newAmount) {
        updates.total = req.body.currentPrice * req.body.newAmount
      } else {
        updates.total = 0
      }

      await transaction.create(updates)

      return res.status(200).json({
        message: `item data is updated`
      })
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      })
    }
  }

  buyItem = async (req, res) => {
    try {
      
      await transaction.create(req.body)

      return res.status(200).json({
        message: `transaction is completed`
      })
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      })
    }
  }

  deleteItem = async(req, res) => {}
}

module.exports = new ItemController();