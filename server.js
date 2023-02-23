const express = require("express");
const app = express();
const port = 3000;
const { Restaurant, Menu, Item } = require("./models/index");
const { sequelize } = require("./db");

//TODO:

app.get("/restaurants", async (req, res) => {
  const restaurant = await Restaurant.findAll({
    include: Menu, //Which model should we add here?
    include: [
      {
        model: Menu,
        include: [
          {
            model: Item, //Which model should we add here?
          },
        ],
      },
    ],
  });

  //     //Argument 2

  //     include: [(model: Menu), (include: [item])],

  res.json(restaurant);
});

app.listen(port, () => {
  sequelize.sync();
  console.log("App listening on port " + port);
});
