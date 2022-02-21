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
    processInvoice(req, res, 'create');
  },

  update: async (req, res) => {
    processInvoice(req, res, 'update');
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
    }).paginate(page, size).sort('createdAt DESC').populateAll().meta({ enableExperimentalDeepTargets: true });

    // await Invoice.count().where(filtersObj);
    // let invoices = await Invoice.find({}).where(filtersObj).paginate(page, size).populateAll().meta({ enableExperimentalDeepTargets: true });

    res.ok({ invoices, invoicesCount });
  },

  reverseInvoice: async (req, res) => {
    let invoice = await Invoice.findOne({
      id: req.params.id
    });

    if (invoice && invoice.status != 'Reverse' && invoice.products) {
      invoice.products.forEach(async (prod, index) => {
        if (index != invoice.products.length - 1) {
          let product = await Product.findOne({
            id: prod.id
          });

          await Product.update({
            id: product.id
          }).set({
            quantity: product.quantity + prod.quantity
          });

          await Invoice.update({
            id: invoice.id
          }).set({
            status: 'Reverse'
          });

          invoice.status = 'Reverse';
        }
      });
    }

    res.ok(invoice);
  },
};

const processInvoice = async (req, res, type) => {
  let data = req.body;

  let customer = await Customer.findOne({
    id: data.customer.id
  });

  if (!customer || (customer && customer.name != data.customer.name)) {
    customer = await Customer.create({
      name: data.customer.name
    }).fetch();
  }

  let invoice = type == 'create' ? await Invoice.create({
    ...data,
    customer: customer.id
  }).fetch() : await Invoice.update({
    id: req.params.id
  }).set({
    ...data,
    customer: customer.id
  }).fetch();

  invoice = type == 'update' ? invoice[0] : invoice;

  if (data.status == 'Billed') {
    data.products.forEach(async (product, index) => {
      index < data.products.length - 4 ?
        await Product.update({
          id: product.id
        }).set({
          quantity: product.totalQuantity - product.quantity
        }) : null;
    });

    await Customer.update({
      id: customer.id
    }).set({
      payable: data.netPayable
    });
  }

  invoice = await Invoice.findOne({
    id: invoice.id
  }).populateAll();

  res.ok(invoice);
}
