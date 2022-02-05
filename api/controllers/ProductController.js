/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  index: async (req, res) => {
    let productsCount;
    let page = 0;
    let size = 10;

    req.query.page ? page = parseInt(req.query.page) : null;
    req.query.size ? size = parseInt(req.query.size) : null;
    page == 0 ? productsCount = await Product.count() : null;

    let products = await Product.find().paginate(page, size).sort('createdAt DESC').populateAll();
    res.ok({products, productsCount});
  },

  searchProducts: async (req, res) => {
    let query = req.params.query;
    
    let products = await Product.find({
      name: {
        'contains': query
      }
    }).select(['id', 'name', 'price', 'quantity', 'discount']).limit(10).meta({ makeLikeModifierCaseInsensitive: true });

    res.ok(products);
  },

};

