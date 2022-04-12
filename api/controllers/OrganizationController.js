/**
 * OrganizationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  index: async (req, res) => {
    let organizationsCount;
    let page = 0;
    let size = 10;
    let type = req.query.type;

    req.query.page ? page = parseInt(req.query.page) : null;
    req.query.size ? size = parseInt(req.query.size) : null;
    page == 0 ? organizationsCount = await Organization.count() : null;

    let organizations = type == 'all' ? await Organization.find() : await Organization.find().paginate(page, size).sort('createdAt DESC').populateAll();
    res.ok({organizations, organizationsCount});
  },

  searchOrganizations: async (req, res) => {
    let query = req.params.query;
    
    let organizations = await Organization.find({
      name: {
        'contains': query
      }
    }).select(['id', 'name']).limit(10).meta({ makeLikeModifierCaseInsensitive: true });

    res.ok(organizations);
  },

};

