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

};

