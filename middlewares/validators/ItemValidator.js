const { user, item } = require("../../models");

class ItemValidator {
  createValidate = async (req, res, next) => {
    try {
      const suplier = await user.findOne({ where: { id: req.body.suplier_id } });

      if (!suplier.type.includes("suplier")) {
        return res.status(400).json({
          message: "Wrong suplier",
        });
      }
      
      req.body.order_type = 'add'
      
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  updateValidate = async (req, res, next) => {
    try {
      const find = await item.findOne({ where: req.params });

      if (!find) {
        return res.status(400).json({
          message: "Data not found",
        });
      }

      const suplier = await user.findOne({where: {id : find.suplier_id}})
      
      if (!suplier.type.includes("suplier")) {
        return res.status(400).json({
          message: "Wrong suplier",
        });
      }
      
      req.body.ordered_id = find.suplier_id
      req.body.order_type = 'add'

      if(req.body.amount && req.body.amount - find.amount > 0){
        req.body.currentPrice = find.price
        req.body.newAmount = req.body.amount - find.amount
      }
      
      next()
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  buyValidate = async (req, res, next) => {
    try {
      const price = await item.findOne({where: {id: req.params.id}})
      const costumer = await user.findOne({where: {id: req.body.ordered_id}})
      req.body.order_type = 'buy'

      if(price.amount < req.body.item_amount){
        return res.status(400).json({
          message: "item is over the stock",
        });
      } else {
        await item.update(
          {amount: price.amount - req.body.item_amount},
          {where: {id: req.params.id}}
        )
      }
      if (!costumer.type.includes("costumer")) {
        return res.status(400).json({
          message: "You are not a costumer",
        });
      }

      req.body.item_id = req.params.id
      // req.body.ordered_id = req.user.id
      req.body.total = price.price * req.body.item_amount

      next()
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error,
      });
    }
  }
}

module.exports = new ItemValidator();
