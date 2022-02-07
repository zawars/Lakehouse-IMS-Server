/**
 * InvoiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
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

    invoice = await Invoice.findOne({
      id: invoice.id
    }).populateAll();

    res.ok(invoice);
  },

};

