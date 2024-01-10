const crypto = require("crypto");
const {
  createNewNomineeApi,
  updateNomineeApi,
} = require("../../services/nomineesIndex");

const createNewNominee = async (req, res) => {
  const {
    categoryId,
    name,
    description,
    votes,
    director,
    stars,
    image_url,
    release_date,
  } = req.body;
  try {
    let nomineeDTO = {
      id: `NOMINESS-LIST-${crypto.randomUUID()}`,
      category_id: categoryId,
      name,
      description: description ? description : null,
      image_url,
      director,
      stars,
      votes,
      release_date: new Date(release_date),
    };

    let response = await createNewNomineeApi(nomineeDTO);
    res.status(201).json({
      status: "success",
      row: {
        response,
      },
    });
  } catch (error) {
    console.error(error, "error comes from creating new nominee");
    res.status(402).json({
      status: "failed",
      message: error.message,
      stack: error.stack,
    });
  }
};

const updateVotes = async (req, res) => {
  //update votes by 1
  try {
    const { recordIds } = req.body;
    let response = await updateNomineeApi(recordIds);

    res.status(200).json({
      status: "success",
      data: {
        response,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
      stack: error.stack,
    });
  }
};
module.exports = {
  createNewNominee,
  updateVotes,
};
