const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  }).then(data => res.json(data));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk (req.params.id,{
      include: [Product]
});
if (categoryData) {
  res.status(404).json({ message: 'No categoryData found with this id!' });
  return;
}
res.status(200).json(categoryData);
  } catch (err){
   res.status(500).json(err);
}
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err){
   res.status(400).json(err);
}
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update (req.body, {
      where: {
        id: req.params.id,
      },
});
if (!categoryData[0]) {
  res.status(404).json({ message: 'No Category found with this id!' });
  return;
}
res.status(200).json(userData);
  } catch (err) {
   res.status(500).json(err);
}
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      category_id: req.params.category_id,
    },
  })
  .then((deletedCategory) => {
    res.json(deletedCategory);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
