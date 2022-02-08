/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  index: async (req, res) => {
    let customersCount;
    let page = 0;
    let size = 10;

    req.query.page ? page = parseInt(req.query.page) : null;
    req.query.size ? size = parseInt(req.query.size) : null;
    page == 0 ? customersCount = await Customer.count() : null;

    let customers = await Customer.find().paginate(page, size).sort('createdAt DESC').populateAll();
    res.ok({customers, customersCount});
  },

  searchCustomer: async (req, res) => {
    let query = req.params.query;
    
    let customers = await Customer.find({
      name: {
        'contains': query
      }
    }).select(['id', 'name']).limit(10).meta({ makeLikeModifierCaseInsensitive: true });

    res.ok(customers);
  },

};

