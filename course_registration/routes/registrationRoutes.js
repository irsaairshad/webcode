const express = require('express');
const router = express.Router();
const {
  getAllRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration
} = require('../controllers/registrationController');

router.route('/')
  .get(getAllRegistrations)
  .post(createRegistration);

router.route('/:id')
  .get(getRegistrationById)
  .put(updateRegistration)
  .delete(deleteRegistration);

module.exports = router;
