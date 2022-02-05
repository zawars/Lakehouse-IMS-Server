/**
 * CourseController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  searchCourses: async (req, res) => {
    let query = req.params.query;
    
    let courses = await Course.find({
      name: {
        'contains': query
      }
    }).select(['id', 'name']).limit(10).meta({ makeLikeModifierCaseInsensitive: true });

    res.ok(courses);
  },

};

