const { updateNomineeApi } = require("./nomineesIndex");
const { Nominee } = require("../models");

//mocking the Nominee model
jest.mock("../models", () => ({
  Nominee: {
    findAll: jest.fn(),
  },
}));

describe("updateNomineeApi", () => {
  it("should increment votes for each nominee and return updated votes", async () => {
    // Arrange
    const nomineeIds = [1, 2];
    const mockNominees = [
      { id: 1, category_id: "A", votes: 5, save: jest.fn() },
      { id: 2, category_id: "B", votes: 3, save: jest.fn() },
    ];
    Nominee.findAll.mockResolvedValue(mockNominees);

    // Act
    const updatedVotes = await updateNomineeApi(nomineeIds);

    // Assert
    expect(Nominee.findAll).toHaveBeenCalledWith({ where: { id: nomineeIds } });
    expect(mockNominees[0].save).toHaveBeenCalled();
    expect(mockNominees[1].save).toHaveBeenCalled();
    expect(updatedVotes).toEqual([6, 4]);
  });

  it("should throw an error when nominees are from the same category", async () => {
    // Arrange
    const nomineeIds = [1, 2];
    const mockNominees = [
      { id: 1, category_id: "A", votes: 5, save: jest.fn() },
      { id: 2, category_id: "A", votes: 3, save: jest.fn() },
    ];
    Nominee.findAll.mockResolvedValue(mockNominees);

    await expect(updateNomineeApi(nomineeIds)).rejects.toThrow(
      "Cannot vote for more than one nominee from the same category"
    );
  });
});
