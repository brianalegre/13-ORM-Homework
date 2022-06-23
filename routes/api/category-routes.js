const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
// NOTES: added async
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    })
    res.status(200).json(allCategories)
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});


// find one category by its `id` value
// be sure to include its associated Products
// NOTES: added async
router.get('/:id', async (req, res) => {
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!singleCategory) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }
    res.status(200).json(singleCategory)
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});

router.post('/', (req, res) => {
  // create a new category
});

// update a category by its `id` value
/* req.body
{
  "category_name": "newTagFor15"
}
*/
// NOTES: Added async
router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    })
    if (!updateCategory) {
      res.status(404).json('No Category found with this id!');
      return;
    }
    res.status(200).json({ message: 'Category has been updated' })
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});

// delete a category by its `id` value
// NOTES: Added async
router.delete('/:id', async (req, res) => {
  try {
    const delCategory = await Category.destroy({
      where: {
        id: req.params.id
      },
    })
    if (!delCategory) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }
    res.status(200).json('Category has been deleted')
  } catch (err) {
    res.status(500).json('Something went wrong', err);
  }
});

module.exports = router;
