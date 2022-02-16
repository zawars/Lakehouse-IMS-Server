/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },


  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/

  // Auth Controller Routes 
  'POST /api/v1/auth/login': 'AuthController.login',
  // 'POST /api/v1/auth/login/social': 'AuthController.socialLogin',
  'POST /api/v1/auth/forgetPassword': 'AuthController.forgetPassword',
  'POST /api/v1/auth/forget/verify': 'AuthController.forgetVerify',
  'POST /api/v1/auth/forget/renew': 'AuthController.updateForgetPassword',
  'POST /api/v1/auth/verify': 'AuthController.verify',
  'POST /api/v1/auth/verify/resend': 'AuthController.resendToken',
  'GET /api/v1/auth/user/:id/logout': 'AuthController.logout',
  'GET /api/v1/auth/user/:id/authenticate': 'AuthController.authenticate',
  

  // User Controller Routes
  'GET /api/v1/user': 'UserController.index',
  'POST /api/v1/user': 'UserController.create',
  'PATCH /api/v1/user/:id': 'UserController.update',
  'GET /api/v1/user/:id/admin': 'UserController.getUserByAdmin',
  'POST /api/v1/user/admin': 'UserController.createUserByAdmin',
  'GET /api/v1/user/search/:query': 'UserController.searchUsers',

  // Subject Controller Routes
  'GET /api/v1/subject': 'SubjectController.index',
  'GET /api/v1/subject/search/:query': 'SubjectController.searchSubjects',

  // Product Controller Routes
  'GET /api/v1/product': 'ProductController.index',
  'GET /api/v1/product/search/:query': 'ProductController.searchProducts',
  'PATCH /api/v1/product/filter': 'ProductController.productsFilter',
  'GET /api/v1/product/quantity/:value': 'ProductController.getProductsCountByQuantity',

  // Course Controller Routes
  'GET /api/v1/course/search/:query': 'CourseController.searchCourses',

  // Customer Controller Routes
  'GET /api/v1/customer': 'CustomerController.index',
  'GET /api/v1/customer/search/:query': 'CustomerController.searchCustomer',

  // Invoice Controller Routes
  'GET /api/v1/invoice': 'InvoiceController.index',
  'POST /api/v1/invoice': 'InvoiceController.create',
  'PATCH /api/v1/invoice/filter': 'InvoiceController.invoicesFilter',

  // Publisher Controller Routes
  'GET /api/v1/publisher': 'PublisherController.index',
  'GET /api/v1/publisher/search/:query': 'PublisherController.searchPublishers',
};
