const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll().then((tagData) => {
  res.json(tagData);
});
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk (req.params.id,{
      include: [Product]
});
if (!tagData) {
  res.status(404).json({ message: 'No tagData found with this id!' });
  return;
}
res.status(200).json(tagData);
  } catch (err){
   res.status(500).json(err);
}
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err){
   res.status(400).json(err);
}
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const categoryData = await Tag.update (req.body, {
      where: {
        id: req.params.id,
      },
});
if (!tagData[0]) {
  res.status(404).json({ message: 'No tag found with this id!' });
  return;
}
res.status(200).json(userData);
  } catch (err) {
   res.status(500).json(err);
}
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      tag_id: req.params.tag_id,
    },
  })
  .then((deletedTag) => {
    res.json(deletedTag);
  })
  .catch((err) => res.json(err));

});

module.exports = router;
