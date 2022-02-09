/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const speakEasy = require('speakeasy');


module.exports = {
  login: async (req, res) => {
    let data = req.body;

    let user = await User.findOne({
      email: data.email
    }).decrypt();

    if (user) {
      if (user.isVerified) {
        // if (err) {
        //   res.ok({
        //     message: "Invalid password."
        //   });
        // } else {
        // if (result) {
        if (user.password == data.password) {
          jwt.sign(user, sails.config.session.secret, (err, token) => {
            RedisService.set(user.id, token, () => {
              console.log(`${user.email} logged in.`);
              delete(user.password);

              res.ok({
                token,
                user,
                message: "Logged in successfully."
              });
            });
          });
        } else {
          res.ok({
            message: "Invalid password."
          });
        }
        // } else {
        //   res.ok({
        //     message: "Invalid password."
        //   });
        // }
      } else {
        res.ok({
          message: "User is not verified."
        });
      }
    } else {
      res.ok({
        message: "User does not exist."
      });
    }
  },

  socialLogin: async (req, res) => {
    const body = req.body;

    let count = await User.count({
      email: body.email
    });

    if (count < 1) {
      let user = await User.create(body).fetch();

      jwt.sign(user, sails.config.session.secret, (err, token) => {
        RedisService.set(user.id, token, () => {
          console.log(`${user.email} logged in.`);
          delete(user.password);

          res.ok({
            token,
            user,
            message: "Logged in successfully.",
            isNewUser: true
          });
        });
      });
    } else {
      let user = await User.findOne({
        email: body.email
      });

      jwt.sign(user, sails.config.session.secret, (err, token) => {
        RedisService.set(user.id, token, () => {
          console.log(`${user.email} logged in.`);
          delete(user.password);

          res.ok({
            token,
            user,
            message: "Logged in successfully."
          });
        });
      });
    }
  },

  verify: async (req, res) => {
    try {
      let user = await User.findOne({
        id: req.body.id
      });

      if (user.isVerified == false) {
        let tokenValidates = speakEasy.totp.verify({
          secret: sails.config.session.secret + user.email,
          encoding: 'base32',
          token: req.body.token,
          digits: 8,
          step: 86400
        });

        if (tokenValidates) {
          // let user = await User.findOne({ email: req.body.id });
          let updatedUser = await User.update({
            id: req.body.id
          }).set({
            isVerified: true
          }).fetch();
          updatedUser = updatedUser[0];

          jwt.sign(updatedUser, sails.config.session.secret, (err, token) => {
            RedisService.set(updatedUser.id, token, () => {
              console.log(`${updatedUser.email} logged in.`);

              res.ok({
                token,
                user: updatedUser,
                message: 'User verified successfully.'
              });
            });
          });
        } else {
          res.ok({
            message: 'Token invalid or expired.'
          });
        }
      } else {
        res.ok({
          message: 'User already verified.'
        });
      }
    } catch (error) {
      res.ok({
        message: error
      });
    }
  },

  // Verify Resend
  resendToken: async (req, res) => {
    let user = await User.findOne({
      id: req.body.id
    }).populateAll();

    if (user.isVerified == false) {
      let authCode = speakEasy.totp({
        digits: 8,
        secret: sails.config.session.secret + user.email,
        encoding: 'base32',
        step: 86400
      });

      // RedisService.set(authCode, user, () => {
      EmailService.sendMail({
        email: user.email,
        subject: 'Verification',
        message: `Please use this <code>${authCode}</code> token to verify your account. `
      }, (err) => {
        if (err) {
          res.forbidden('Error sending email.');
        } else {
          res.ok({
            user,
            message: 'Verification token sent to your email. Please verify.'
          });
        }
      });
      // });
    } else {
      res.ok({
        message: 'User already verified.'
      })
    }
  },

  forgetPassword: async (req, res) => {
    let data = req.body;

    let user = await User.findOne({
      email: data.email
    }).decrypt();

    if (user) {
      // if (user.password) {
      //   EmailService.sendMail({
      //     email: user.email,
      //     subject: 'Forget Password',
      //     message: `Your Password is : <strong>${user.password}</strong>`
      //   }, (err) => {
      //     if (err) {
      //       console.log(err);
      //       res.serverError(err);
      //     } else {
      //       res.ok({
      //         message: "Email sent"
      //       });
      //     }
      //   });
      // } else {
      //   res.ok({
      //     message: "Password does not exist."
      //   });
      // }

      user = await User.update({
        email: req.body.email
      }).set({
        isVerified: false,
        isPasswordChanged: true
      }).fetch();
      user = user[0];

      let authCode = speakEasy.totp({
        digits: 8,
        secret: sails.config.session.secret + user.email,
        encoding: 'base32',
        step: 90,
        window: 10
      });

      EmailService.sendMail({
        email: user.email,
        subject: 'Verification',
        message: `Please use this <code>${authCode}</code> token to verify your account. `
      }, (err) => {
        if (err) {
          res.forbidden('Error sending email.');
        } else {

          res.ok({
            user,
            message: 'Verification token sent to your email. Please verify.'
          });
        }
      });

    } else {
      res.ok({
        message: "User does not exist."
      });
    }
  },

  forgetVerify: async (req, res) => {
    try {
      let user = await User.findOne({
        email: req.body.email
      });

      if (user.isVerified == false) {
        let tokenValidates = speakEasy.totp.verify({
          secret: sails.config.session.secret + req.body.email,
          encoding: 'base32',
          token: req.body.token,
          digits: 8,
          step: 90,
          window: 10
        });

        if (tokenValidates) {
          let updatedUser = await User.update({
            email: req.body.email
          }).set({
            isVerified: true
          }).fetch();
          updatedUser = updatedUser[0];

          res.ok({
            // token,
            user: updatedUser,
            message: 'User verified successfully.'
          });
        } else {
          res.status(200).json({
            message: 'Invalid authentication token'
          });
        }
      } else {
        res.status(200).json({
          message: 'User already verified.'
        });
      }
    } catch (error) {
      res.status(200).json({
        message: error
      });
    }
  },

  updateForgetPassword: async (req, res) => {
    let user = await User.findOne({
      email: req.body.email
    });

    if (user) {
      if (user.isPasswordChanged) {
        if (user.isVerified) {
          user = await User.update({
            email: user.email
          }).set({
            password: req.body.password,
            isPasswordChanged: false
          }).fetch();
          user = user[0];

          jwt.sign(user, sails.config.session.secret, (err, token) => {
            RedisService.set(user.id, token, () => {
              console.log(`${user.email} logged in.`);
              res.ok({
                token,
                user,
                message: 'Password changed successfully.'
              });
            });
          });
        } else {
          res.ok({
            message: 'User is not verified.'
          });
        }
      } else {
        res.ok({
          message: 'Invalid request for password change.'
        });
      }
    } else {
      res.status(200).json({
        message: 'User does not exist.'
      });
    }
  },

  logout: async (req, res) => {
    let id = req.params.id;

    let user = await User.findOne({
      id
    });

    RedisService.del(id, () => {
      console.log(`${user.email} logged out.`);

      res.ok({
        email: user.email,
        message: "Logged out successfully."
      });
    });
  },

  authenticate: async (req, res) => {
    let id = req.params.id;
    let token = req.headers['authorization'].split(' ')[1];

    let user = await User.findOne({
      id
    });

    if (user) {
      jwt.verify(token, sails.config.session.secret, (err, authData) => {
        if (err) {
          res.ok({
            isAuthorized: false,
            message: 'You are Unauthorized, Invalid request.'
          });
        } else {
          RedisService.get(authData.id, (result) => { 
            if (user.id == authData.id  && token == result) { 
              res.ok({
                isAuthorized: true,
                user: user
              });
            } else {
              res.ok({
                isAuthorized: false,
                message: 'You are Unauthorized, Invalid request.'
              });
            }
          });
        }
      });
    } else {
      res.ok({
        isAuthorized: false,
        message: 'You are Unauthorized, Invalid request.'
      });
    }
  },

};
