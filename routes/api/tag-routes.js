const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    })
    if(tags) {
      res.status(200).send({tags})
    } else {
      res.status(404).json({error: 'Tag data not found'})
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagId = req.params.id;
  try{
    const tags = await Tag.findByPk(tagId, {
      include: [{ model: Product, through: ProductTag }]
    })
    if(tags) {
      res.status(200).send({tags})
    } else {
      res.status(404).json({error: 'Tag data not found'})
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const createTag = await Tag.create({
      tag_name: req.body.name
    })

    if (createTag) {
      res.status(200).send(createTag)
    } else {
      res.status(400).json({ error: 'Bad tag creation request' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(
      {tag_name: req.body.name},
        {
          where: {
            id: req.params.id,
          },
        }
      )
    if(updatedTag) {
      res.status(200).json('Tag successfully updated');
    } else {
      res.status(500).json({ error: 'Failed to update tag' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    if(deleteTag) {
      res.status(200).json('Tag successfully deleted');
    } else {
      res.status(500).json({ error: 'Failed to delete tag' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
