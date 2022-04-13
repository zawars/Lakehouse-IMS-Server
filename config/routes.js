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
  'GET /api/v1/user/organization/:id/search/:query': 'UserController.searchUsers',
  'PATCH /api/v1/user/filter': 'UserController.usersFilter',
  'GET /api/v1/user/organization/:id': 'UserController.getUsersByOrganization',

  // Subject Controller Routes
  'GET /api/v1/subject': 'SubjectController.index',
  'GET /api/v1/subject/organization/:id/search/:query': 'SubjectController.searchSubjects',
  'GET /api/v1/subject/organization/:id': 'SubjectController.getSubjectsByOrganization',

  // Product Controller Routes
  'GET /api/v1/product': 'ProductController.index',
  'GET /api/v1/product/organization/:id/search/:query': 'ProductController.searchProducts',
  'PATCH /api/v1/product/filter': 'ProductController.productsFilter',
  'GET /api/v1/product/organization/:id/quantity/:value': 'ProductController.getProductsCountByQuantity',
  'GET /api/v1/product/organization/:id': 'ProductController.getProductsByOrganization',

  // Course Controller Routes
  'GET /api/v1/course': 'CourseController.index',
  'GET /api/v1/course/organization/:id/search/:query': 'CourseController.searchCourses',
  'GET /api/v1/course/organization/:id': 'CourseController.getCoursesByOrganization',

  // Customer Controller Routes
  'GET /api/v1/customer': 'CustomerController.index',
  'GET /api/v1/customer/organization/:id/search/:query': 'CustomerController.searchCustomer',
  'GET /api/v1/customer/organization/:id': 'CustomerController.getCustomersByOrganization',

  // Invoice Controller Routes
  'GET /api/v1/invoice': 'InvoiceController.index',
  'POST /api/v1/invoice': 'InvoiceController.create',
  'PATCH /api/v1/invoice/:id': 'InvoiceController.update',
  'PATCH /api/v1/invoice/filter': 'InvoiceController.invoicesFilter',
  'GET /api/v1/invoice/reverse/:id': 'InvoiceController.reverseInvoice',
  'GET /api/v1/invoice/organization/:id': 'InvoiceController.getInvoicesByOrganization',

  // Publisher Controller Routes
  'GET /api/v1/publisher': 'PublisherController.index',
  'GET /api/v1/publisher/organization/:id/search/:query': 'PublisherController.searchPublishers',
  'GET /api/v1/publisher/organization/:id': 'PublisherController.getPublishersByOrganization',

  // Organization Controller Routes
  'GET /api/v1/organization': 'OrganizationController.index',
  'GET /api/v1/organization/search/:query': 'OrganizationController.searchOrganizations',
};
