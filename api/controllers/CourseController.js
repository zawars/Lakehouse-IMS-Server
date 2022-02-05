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
    }).limit(10).meta({ makeLikeModifierCaseInsensitive: true }).populateAll();

    res.ok(courses);
  },

};

