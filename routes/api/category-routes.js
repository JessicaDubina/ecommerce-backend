const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCatergories = await Category.findAll({
      include: {model: Product}
    });

    if (allCatergories) {
      res.status(200).send({allCatergories})
    } else {
      res.status(404).json({error: 'Category data not found'})
    }
  } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const catId = req.params.id
  try {
    const oneCatergory = await Category.findByPk(catId, {
      include: {model: Product}
    });

    if (oneCatergory) {
      res.status(200).send({oneCatergory})
    } else {
      res.status(404).json({error: 'Category data not found'})
    }
  } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
  }

});

router.post('/', async (req, res) => {
    // create a new category
  try{
    const createCategory = await Category.create({
      category_name: req.body.name
    })

    if (createCategory) {
      res.status(200).send(createCategory)
    } else {
      res.status(400).json({ error: 'Bad category creation request' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCat = await Category.update(
      {category_name: req.body.name},
        {
          where: {
            id: req.params.id,
          },
        }
      )
    if(updatedCat) {
      res.status(200).json('Category successfully updated');
    } else {
      res.status(500).json({ error: 'Failed to update category' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    if(deleteCat) {
      res.status(200).json('Category successfully deleted');
    } else {
      res.status(500).json({ error: 'Failed to delete category' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
