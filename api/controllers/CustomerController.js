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
      },
      organization: req.params.id
    }).select(['id', 'name', 'payable', 'products']).limit(10).meta({ makeLikeModifierCaseInsensitive: true });

    res.ok(customers);
  },

  getCustomersByOrganization: async (req, res) => {
    let customersCount;
    let page = 0;
    let size = 10;

    req.query.page ? page = parseInt(req.query.page) : null;
    req.query.size ? size = parseInt(req.query.size) : null;
    page == 0 ? customersCount = await Customer.count({
      organization: req.params.id
    }) : null;

    let customers = await Customer.find({
      organization: req.params.id
    }).paginate(page, size).sort('createdAt DESC').populateAll();

    res.ok({customers, customersCount});
  },

};

