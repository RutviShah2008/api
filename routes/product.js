const express = require("express");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const products = [];
const cart = [];

const addProducts = (name, image, price, id) => {
  products.push({
    id: id || _.toString(uuidv4()),
    name,
    image,
    price
  });
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendStatus(200).send("OK");
});
/*List product */

router.get("/api/products", (req, res) => {
  res.send(products);
});

router.post("/api/products", (req, res) => {
  if (!req.body.name || req.body.name.length < 2) {
    res.sendStatus(400);
    return;
  }
  addProducts(req.body.name, req.body.image, req.body.price);
  res.send(products);
});

router.put("/api/products/:id", (req, res) => {
  const productData = products.find((p) => p.id === Number(req.params.id));
  if (!productData) {
    res.status(404);
    return;
  }
  addProducts(req.body.name, req.body.image, req.body.price);
  res.send(products);
});

router.delete("/api/products/:id", (req, res) => {
  const productData = products.find((p) => p.id === req.params.id);
  if (!productData) {
    res.status(404);
    return;
  }
  products.splice(products.indexOf(productData), 1);
  res.send(products);
});

//---------Cart API ---------//
router.get("/api/cart", (req, res) => {
  res.send(cart);
});

router.post("/api/cart", (req, res) => {
  if (!req.body.id) {
    res.sendStatus(400);
  } else {
    const result = _.find(products, ["id", _.get(req.body, "id", null)]);
    if (!_.isUndefined(result)) {
      cart.push(result);
      res.send(cart);
    } else {
      res.sendStatus(400);
    }
  }
});

router.delete("/api/cart/:id", (req, res) => {
  console.log(req.params, _.get(req.params, "id", null));
  const itemIndex = _.indexOf(cart, _.get(req.params, "id", null));
  _.pullAt(cart, itemIndex);
  itemIndex !== -1 ? res.send(cart) : res.sendStatus(404);
});

addProducts(
  "Bandito Eagle Dog Tag",
  "https://cdn.shopify.com/s/files/1/1052/0910/products/Product_Dogtag-Bandito_1024x1024.png",
  13.99
);

addProducts(
  "Canadian Army Dog Tag",
  "https://cdn.gorillasurplus.com/images/products/large/WFDT6.jpg",
  12
);

addProducts(
  "Engraving Cat Id",
  "https://cdn.shopify.com/s/files/1/0027/4107/6077/products/GoTags_Personalized_Stainless_Steel_Cat_Tags_1196x.jpg?v=1557247894",
  50
);

module.exports = router;
