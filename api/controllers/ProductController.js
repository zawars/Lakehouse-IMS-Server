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
    }).limit(10).meta({ makeLikeModifierCaseInsensitive: true }).populateAll();

    res.ok(products);
  },

  productsFilter: async (req, res) => {
    let filters = req.body.filtersArray;
    let filtersObj = {};
    let productsCount;
    let page = 0;
    let size = 10;

    req.query.page ? page = parseInt(req.query.page) : null;
    req.query.size ? size = parseInt(req.query.size) : null;

    filters.forEach(filter => {
      let key = Object.keys(filter)[0];
      filtersObj[key] = filter[key];
    });

    page == 0 ? productsCount = await Product.count({
      where: filtersObj
    }).meta({ enableExperimentalDeepTargets: true }) : null;

    let products = await Product.find({
      where: filtersObj
    }).paginate(page, size).sort('createdAt DESC').populateAll().meta({ enableExperimentalDeepTargets: true });

    res.ok({ products, productsCount });
  },

  getProductsCountByQuantity: async (req, res) => { 
    let counts = await Product.count({ 
      quantity: {
        '<=' : parseInt(req.params.value)
      }
    });

    res.ok(counts);
  }

};

