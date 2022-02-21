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

  if (await User.count() == 0) {
    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      role: "admin",
      password: "123456",
      isVerified: true,
      address: "Lahore",
      phone: "123456789",
      dob: "1993/09/06"
    });
  }

  if (await Course.count() == 0) {
    await Course.createEach([{
        name: 'Playgroup'
      },
      {
        name: 'Nursery'
      },
      {
        name: 'KG'
      },
      {
        name: 'One'
      },
      {
        name: 'Two'
      },
      {
        name: 'Three'
      },
      {
        name: 'Four'
      },
      {
        name: 'Five'
      },
      {
        name: 'Six'
      },
      {
        name: 'Seven'
      },
      {
        name: 'Eight'
      },
      {
        name: 'Nine'
      },
      {
        name: 'Ten'
      },
    ]);
  }

  console.log('Seeds are ready to grow.');

};
