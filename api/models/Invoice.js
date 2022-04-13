/**
 * Invoice.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    uid: {
      type: 'number',
      autoIncrement: true
    },
    total: {
      type: 'number'
    },
    cashPaid: {
      type: 'number'
    },
    arrears: {
      type: 'number'
    },
    netPayable: {
      type: 'number'
    },
    type: {
      type: 'string',
      isIn: ['Cash', 'Credit']
    },
    status: {
      type: 'string',
    },
    products: {
      type: 'json'
    },
    isShipment: {
      type: 'boolean',
      defaultsTo: false
    },
    shipmentName: {
      type: 'string',
    },
    shipmentDetail: {
      type: 'string',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    user: {
      model: 'user'
    },
    customer: {
      model: 'customer'
    },
    organization: {
      model: 'organization'
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    productsCollection: {
      collection: 'product',
      // via: 'invoice',
      // through: 'productinvoice'
    }

  },

  beforeCreate: (values, cb) => {
    EmailService.invoiceCounter++;
    values.uid = EmailService.invoiceCounter;
    cb();
  }

};
