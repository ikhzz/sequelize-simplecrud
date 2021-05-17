const router = require("express").Router(); // Import express

const ItemController = require("../controllers/ItemController.js"); // Import TransaksiController
const ItemValidator = require("../middlewares/validators/ItemValidator"); // Import TransaksiController
const PassportMiddleware = require("../middlewares/auth"); // Import validator to validate every request from user

router.get('/', ItemController.getAll)
router.get('/:id', ItemController.getOne)
router.post('/add', ItemValidator.createValidate, ItemController.createItem)
router.put('/add/:id', ItemValidator.updateValidate, ItemController.updateItem)
router.post('/buy/:id', ItemValidator.buyValidate, ItemController.buyItem)

module.exports = router; // Export router