/**
 * SubjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  index: async (req, res) => {
    let subjectsCount;
    let page = 0;
    let size = 10;

    req.query.page ? page = parseInt(req.query.page) : null;
    req.query.size ? size = parseInt(req.query.size) : null;
    page == 0 ? subjectsCount = await Subject.count() : null;

    let subjects = await Subject.find().paginate(page, size).sort('createdAt DESC').populateAll();
    res.ok({subjects, subjectsCount});
  },

  searchSubjects: async (req, res) => {
    let query = req.params.query;
    
    let subjects = await Subject.find({
      name: {
        'contains': query
      },
      organization: req.params.id
    }).select(['id', 'name']).limit(10).meta({ makeLikeModifierCaseInsensitive: true });

    res.ok(subjects);
  },

  getSubjectsByOrganization: async (req, res) => {
    let subjectsCount;
    let page = 0;
    let size = 10;

    req.query.page ? page = parseInt(req.query.page) : null;
    req.query.size ? size = parseInt(req.query.size) : null;
    page == 0 ? subjectsCount = await Subject.count({
      organization: req.params.id
    }) : null;

    let subjects = await Subject.find({
      organization: req.params.id
    }).paginate(page, size).sort('createdAt DESC').populateAll();

    res.ok({subjects, subjectsCount});
  },
};

