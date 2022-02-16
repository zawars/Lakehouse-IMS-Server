/**
 * PublisherController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  index: async (req, res) => {
    let publishersCount;
    let page = 0;
    let size = 10;

    req.query.page ? page = parseInt(req.query.page) : null;
    req.query.size ? size = parseInt(req.query.size) : null;
    page == 0 ? publishersCount = await Publisher.count() : null;

    let publishers = await Publisher.find().paginate(page, size).sort('createdAt DESC').populateAll();
    res.ok({ publishers, publishersCount });
  },

  searchPublishers: async (req, res) => {
    let query = req.params.query;
    
    let publishers = await Publisher.find({
      name: {
        'contains': query
      }
    }).select(['id', 'name']).limit(10).meta({ makeLikeModifierCaseInsensitive: true });

    res.ok(publishers);
  },

};

