/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const speakEasy = require('speakeasy');

module.exports = {

  index: async (req, res) => {
    let usersCount;
    let page = 0;
    let size = 10;

    req.query.page ? page = parseInt(req.query.page) : null;
    req.query.size ? size = parseInt(req.query.size) : null;
    page == 0 ? usersCount = await User.count() : null;

    let users = await User.find().paginate(page, size).sort('createdAt DESC').populateAll();
    res.ok({users, usersCount});
  },

  create: async (req, res) => {
    let data = req.body;
    let check = await User.find({
      email: data.email
    });

    if (check == undefined || check.length == 0) {
      let user = await User.create(data).fetch();
      let authCode = speakEasy.totp({
        digits: 8,
        secret: sails.config.session.secret + user.email,
        encoding: 'base32',
        step: 86400
      });

      EmailService.sendMail({
        email: user.email,
        subject: "Verification",
        message: `Please use this token <code>${authCode}</code> to verify your account. <br>`
      }, (err) => {
        if (err) {
          res.ok({
            message: 'Error sending email.'
          });
        } else {
          // jwt.sign(user, sails.config.session.secret, (err, token) => {
          //   RedisService.set(user.id, token, () => {
          //     console.log(`${user.email} logged in.`);
          //     delete(user.password);

          //     res.ok({
          //       token,
          //       user,
          //       message: "Logged in successfully."
          //     });
          //   });
          // });
          res.ok({
            user,
            message: 'Verification link sent to your email. Please verify.'
          });
        }
      });
    } else {
      res.ok({
        message: 'User already exists with either email/username.'
      });
    }
  },

  update: async (req, res) => {
    let body = req.body;

    if (body.oldPassword && body.newPassword) {
      let userObj = await User.findOne({
        id: req.params.id
      }).decrypt();

      if (userObj.password == body.oldPassword) {
        body.password = body.newPassword;
      }
    }

    body.oldPassword ? delete(body.oldPassword) : null;
    body.newPassword ? delete(body.newPassword) : null;

    let user = await User.update({
      id: req.params.id
    }).set(body).fetch();
    user = user[0];


    user = await User.findOne({
      id: user.id
    }).populateAll();

    res.ok(user);
  },

  getUserByAdmin: async (req, res) => {
    let user = await User.findOne({
      id: req.params.id
    }).decrypt().populate('organization');

    res.ok(user);
  },

  createUserByAdmin: async (req, res) => {
    let data = req.body;

    let userExist = await User.findOne({
      email: data.email
    });

    if (!userExist) {
      let user = await User.create(data).fetch();

      res.ok({
        user
      });
    } else {
      res.ok({
        message: 'User already exists with email.'
      });
    }
  },

  searchUsers: async (req, res) => {
    let query = req.params.query;

    let users = await User.find({
      or: [{
        name: {
          'contains': query
        }
      },
      {
        email: {
          'contains': query
        }
      }],
      organization: req.params.id
    }).select(['id', 'name', 'email']).limit(10).meta({ makeLikeModifierCaseInsensitive: true });

    res.ok(users);
  },

  usersFilter: async (req, res) => {
    let filters = req.body.filtersArray;
    let filtersObj = {};
    let usersCount;
    let page = 0;
    let size = 10;

    req.query.page ? page = parseInt(req.query.page) : null;
    req.query.size ? size = parseInt(req.query.size) : null;

    filters.forEach(filter => {
      let key = Object.keys(filter)[0];
      filtersObj[key] = filter[key];
    });

    page == 0 ? usersCount = await User.count({
      where: filtersObj
    }).meta({ enableExperimentalDeepTargets: true }) : null;

    let users = await User.find({
      where: filtersObj
    }).paginate(page, size).sort('createdAt DESC').populateAll().meta({ enableExperimentalDeepTargets: true });

    res.ok({ users, usersCount });
  },

  getUsersByOrganization: async (req, res) => {
    let usersCount;
    let page = 0;
    let size = 10;

    req.query.page ? page = parseInt(req.query.page) : null;
    req.query.size ? size = parseInt(req.query.size) : null;
    page == 0 ? usersCount = await User.count({
      organization: req.params.id
    }) : null;

    let users = await User.find({
      organization: req.params.id
    }).paginate(page, size).sort('createdAt DESC').populateAll();
    
    res.ok({users, usersCount});
  },
};
