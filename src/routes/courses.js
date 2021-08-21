const express = require('express');
const router = express.Router();
const coursesController = require('../app/controllers/CoursesController');

router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.get('/:id/edit', coursesController.editCourse);
router.post('/handle-form-actions', coursesController.handleFormActions);
router.put('/:id/', coursesController.update);
router.patch('/:id/restore', coursesController.restore);
router.delete('/:id/', coursesController.delete);
router.delete('/:id/destroy', coursesController.destroy);
router.get('/:slug', coursesController.show);

module.exports = router;
