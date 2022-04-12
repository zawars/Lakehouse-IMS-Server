/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  if (await Invoice.count() > 0) {
    let invoices = await Invoice.find();
    EmailService.invoiceCounter = invoices[invoices.length - 1].uid;
  }

  // script for super admin creation

  // if (await User.count() == 0) {
  //   await User.create({
  //     name: "Super Admin",
  //     email: "superadmin@gmail.com",
  //     role: "superadmin",
  //     password: "123456",
  //     isVerified: true,
  //     address: "Lahore",
  //     phone: "123456789",
  //     dob: "1993/09/06"
  //   });
  // }

  // script set organization of Course

  // let courses = await Course.find();

  // courses.forEach(async course => {
  //   await Course.update({
  //     id: course.id
  //   }).set({
  //     organization: '624b220bcc2ad94d00a22178'
  //   });
  // });

  // script set organization of Subject

  // let subjects = await Subject.find();

  // subjects.forEach(async subject => {
  //   await Subject.update({
  //     id: subject.id
  //   }).set({
  //     organization: '624b220bcc2ad94d00a22178'
  //   });
  // });

  // script set organization of Publisher

  // let publishers = await Publisher.find();

  // publishers.forEach(async publisher => {
  //   await Publisher.update({
  //     id: publisher.id
  //   }).set({
  //     organization: '624b220bcc2ad94d00a22178'
  //   });
  // });

  // script set organization of Customer

  // let customers = await Customer.find();

  // customers.forEach(async customer => {
  //   await Customer.update({
  //     id: customer.id
  //   }).set({
  //     organization: '624b220bcc2ad94d00a22178'
  //   });
  // });

  // script set organization of Product

  // let products = await Product.find();

  // products.forEach(async product => {
  //   await Product.update({
  //     id: product.id
  //   }).set({
  //     organization: '624b220bcc2ad94d00a22178'
  //   });
  // });

  // script set organization of Invoice

  // let invoices = await Invoice.find();

  // invoices.forEach(async invoice => {
  //   await Invoice.update({
  //     id: invoice.id
  //   }).set({
  //     organization: '624b220bcc2ad94d00a22178'
  //   });
  // });

  console.log('Seeds are ready to grow.');

  // if (await Course.count() == 0) {
  //   await Course.createEach([{
  //       name: 'Playgroup'
  //     },
  //     {
  //       name: 'Nursery'
  //     },
  //     {
  //       name: 'KG'
  //     },
  //     {
  //       name: 'One'
  //     },
  //     {
  //       name: 'Two'
  //     },
  //     {
  //       name: 'Three'
  //     },
  //     {
  //       name: 'Four'
  //     },
  //     {
  //       name: 'Five'
  //     },
  //     {
  //       name: 'Six'
  //     },
  //     {
  //       name: 'Seven'
  //     },
  //     {
  //       name: 'Eight'
  //     },
  //     {
  //       name: 'Ten'
  //     },
  //   ]);
  // }

  // script for set customers payable

  // let customers = await Customer.find();

  // customers.forEach(async customer => {
  //   let invoices = await Invoice.find({ 
  //     customer: customer.id,
  //     type: 'Credit'
  //   });

  //   let totalPayable = 0;
    
  //   invoices.forEach(invoice => {
  //     totalPayable += invoice.total;
  //   });

  //   await Customer.update({
  //     id: customer.id
  //   }).set({
  //     payable: totalPayable
  //   });

  //   console.log(customer.name, totalPayable);
  // }); 

  // script for set invoice products

  // let invoices = await Invoice.find();

  // invoices.forEach(async invoice => {
  //   let sNo = invoice.products.length;
  //   invoice.products[invoice.products.length - 1].sNo = sNo;
  //   let netPrice = invoice.products[invoice.products.length - 1].netPrice;

  //   for (let i=0; i<3; i++) {
  //     let title = i == 0 ? 'Arrears' : i == 1 ? 'Net Payable' : 'Cash Paid';

  //     sNo++;

  //     invoice.products.push({
  //       quantity: title,
  //       discount: title,
  //       netPrice: i == 2 ? netPrice : 0,
  //       sNo: sNo 
  //     });
  //   }

  //   await Invoice.update({
  //     id: invoice.id
  //   }).set({
  //     products: invoice.products
  //   });

  //   console.log('invoice.products', invoice.products);
  // });

  // script for set invoice productsCollection

  // let invoices = await Invoice.find();

  // invoices.forEach(async invoice => { 
  //   let productIds = [];

  //   invoice.products.forEach(product => {
  //     product.id ? productIds.push(product.id) : null;
  //   });

  //   await Invoice.update({
  //     id: invoice.id
  //   }).set({
  //     productsCollection: productIds
  //   });

  //   console.log('productIds', productIds);
  // });
};
