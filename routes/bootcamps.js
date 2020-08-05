const expresss = require("express");
const router = expresss.Router();

// Controllers
const {
  getBootcamps,
  createBootcamps,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamps");

router.route("/").get(getBootcamps).post(createBootcamps);
router
  .route("/:id")
  .get(getBootcamp)
  .delete(deleteBootcamp)
  .put(updateBootcamp);
module.exports = router;
