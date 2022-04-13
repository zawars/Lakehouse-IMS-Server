/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: 'string'
    },
    email: {
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      encrypt: true
    },
    address: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    country: {
      type: 'string'
    },
    dob: {
      type: 'string'
    },
    isVerified: {
      type: 'boolean',
      defaultsTo: false
    },
    isPasswordChanged: {
      type: 'boolean',
      defaultsTo: false
    },
    role: {
      type: 'string',
      isIn: ['admin', 'salesman', 'superadmin']
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    organization: {
      model: 'organization'
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    invoices: {
      collection: 'invoice',
      via: 'user'
    },
  },

};
