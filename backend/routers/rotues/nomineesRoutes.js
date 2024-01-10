const router = require('express').Router();
const { createNewNominee, updateVotes } = require('../controllers/nominees');
///create new nominee
router.post('/createNewNominee', createNewNominee);
//update votes
router.post('/updateVotes', updateVotes);

module.exports = router;
