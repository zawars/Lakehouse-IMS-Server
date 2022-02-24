/**
 * CourseController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  index: async (req, res) => {
    let coursesCount;
    let page = 0;
    let size = 10;

    req.query.page ? page = parseInt(req.query.page) : null;
    req.query.size ? size = parseInt(req.query.size) : null;
    page == 0 ? coursesCount = await Course.count() : null;

    let courses = await Course.find().paginate(page, size).sort('createdAt DESC').populateAll();
    res.ok({ courses, coursesCount });
  },
  
  searchCourses: async (req, res) => {
    let query = req.params.query;
    
    let courses = await Course.find({
      name: {
        'contains': query
      }
    }).limit(10).meta({ makeLikeModifierCaseInsensitive: true }).populateAll();

    res.ok(courses);
  },

};

