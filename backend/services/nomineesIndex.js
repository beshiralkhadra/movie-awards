const { Nominee } = require("../models");

const createNewNomineeApi = async (nomineeDTO) => {
  try {
    return await Nominee.create(nomineeDTO);
  } catch (error) {
    throw error;
  }
};
const updateNomineeApi = async (nomineeIds) => {
  try {
    const nominees = await Nominee.findAll({
      where: { id: nomineeIds },
    });
    // Check if all nominees belong to the same category
    const categories = new Set(nominees.map((nominee) => nominee.category_id));
    if (categories.size < nominees.length) {
      throw new Error(
        "Cannot vote for more than one nominee from the same category"
      );
    }

    const updatedVotes = await Promise.all(
      nominees.map(async (nominee) => {
        nominee.votes += 1;
        await nominee.save();
        return nominee.votes;
      })
    );

    return updatedVotes;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createNewNomineeApi,
  updateNomineeApi,
};
