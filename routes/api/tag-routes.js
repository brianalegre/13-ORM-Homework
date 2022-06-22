const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
// NOTES: Added async
router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
    })
    res.status(200).json(allTags)
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});


// find a single tag by its `id`
// be sure to include its associated Product data
// NOTES: Added async
router.get('/:id', async (req, res) => {
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!singleTag) {
      res.status(404).json({ message: 'No tag found with that id!' })
    }
    res.status(200).json(singleTag)
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});


// create a new tag
// NOTES: Added async
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag)
    console.log('New Tag Created')
  } catch (err) {
    res.status(400).json('Something went wrong', err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
