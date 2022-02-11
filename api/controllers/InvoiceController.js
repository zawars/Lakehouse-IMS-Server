/**
 * InvoiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  index: async (req, res) => {
    let invoicesCount;
    let page = 0;
    let size = 10;

    req.query.page ? page = parseInt(req.query.page) : null;
    req.query.size ? size = parseInt(req.query.size) : null;
    page == 0 ? invoicesCount = await Invoice.count() : null;

    let invoices = await Invoice.find().paginate(page, size).sort('createdAt DESC').populateAll();
    res.ok({invoices, invoicesCount});
  },

  create: async (req, res) => {
    let data = req.body;

    let customer = await Customer.findOne({
      id: data.customer.id
    });

    if (!customer || (customer && customer.name != data.customer.name)) {
      customer = await Customer.create({
        name: data.customer.name
      }).fetch();
    }

    let invoice = await Invoice.create({
      ...data,
      customer: customer.id
    }).fetch();

    data.products.forEach(async product => {
      await Product.update({
        id: product.id
      }).set({
        quantity: product.totalQuantity - product.quantity 
      });
    });

    invoice = await Invoice.findOne({
      id: invoice.id
    }).populateAll();

    res.ok(invoice);
  },

  invoicesFilter: async (req, res) => {
    let filters = req.body.filtersArray;
    let filtersObj = {};
    let invoicesCount;
    let page = 0;
    let size = 10;

    req.query.page ? page = parseInt(req.query.page) : null;
    req.query.size ? size = parseInt(req.query.size) : null;

    filters.forEach(filter => {
      let key = Object.keys(filter)[0];
      filtersObj[key] = filter[key];
    });

    page == 0 ? invoicesCount = await Invoice.count({
      where: filtersObj
    }).meta({ enableExperimentalDeepTargets: true }) : null;

    let invoices = await Invoice.find({
      where: filtersObj
    }).paginate(page, size).populateAll().meta({ enableExperimentalDeepTargets: true });

    // await Invoice.count().where(filtersObj);
    // let invoices = await Invoice.find({}).where(filtersObj).paginate(page, size).populateAll().meta({ enableExperimentalDeepTargets: true });

    res.ok({ invoices, invoicesCount });
  },
};

