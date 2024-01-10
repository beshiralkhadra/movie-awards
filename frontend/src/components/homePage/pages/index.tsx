import React, { useEffect, useState } from "react";
import "./index.css";
import Card from "../components/nomineeCard/NomineeCard";
import { getCategories, updateVotes } from "../../../util/https";
import Spinner from "../../../shareableComponents/spinner/Spinner";
import { Nominee } from "../../../util/SharedTypes";
import SuccessModal from "../components/modal/SuccessModal";

interface Category {
  seq: number;
  id: string;
  name: string;
  nominees: Nominee[];
  selectedNominee?: Nominee;
}

const LandingPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successModalStatus, setSuccessModalStatus] = useState(false);
  const [categoriesData, setCategoriesData] = useState<Category[]>();
  const [currentPage, setCurrentPage] = useState({});
  const itemsPerPage = 4;

  const getAllData = async () => {
    try {
      setLoading(true);
      setError("");
      const categoriesResponse = (await getCategories()) as any;

      setCategoriesData(categoriesResponse?.categories || []);
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (error !== "") {
    // return <Error />;
  }
  const handleNomineeSelect = (categoryId: string, nominee: Nominee) => {
    try {
      setCategoriesData((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId
            ? { ...category, selectedNominee: nominee }
            : category
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      categoriesData.filter((category) => category.selectedNominee).length === 0
    ) {
      alert("Please select one nominee at least");
      return;
    } // Extract the IDs of the selected nominees
    const nomineeIds = categoriesData
      .filter((category) => category.selectedNominee)
      .map((category) => category.selectedNominee.id);

    try {
      const response = (await updateVotes({ recordIds: nomineeIds })) as {
        status: string;
        data: { nominee: object[] };
      };

      if (response.status === "success") {
        setSuccessModalStatus(true);
        await getAllData();
      } else {
        console.error("Submission failed:", response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const closeModal = async () => {
    try {
      setSuccessModalStatus(false);
      const resetData = categoriesData.map((category) => ({
        ...category,
        selectedNominee: null,
      }));

      setCategoriesData(resetData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {categoriesData?.map((category, index) => {
        const categoryCurrentPage = currentPage[category.id] || 1;
        const indexOfLastItem = categoryCurrentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        return (
          <div className="category-section" key={index}>
            <div className="category_title-section">
              <h2>{category.name}</h2>
            </div>

            <div className="category-section_card-list" key={category.id}>
              {category.nominees
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((nominee, index) => (
                  <Card
                    key={index}
                    name={nominee.name}
                    description={nominee.description}
                    votes={nominee.votes}
                    stars={nominee.stars.list}
                    image_url={nominee.image_url}
                    release_date={nominee.release_date}
                    onSelect={() => handleNomineeSelect(category.id, nominee)}
                    isSelected={category.selectedNominee === nominee}
                  />
                ))}
            </div>

            <div
              className="pagination"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {Array(Math.ceil(category.nominees.length / itemsPerPage))
                .fill(null)
                .map((_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage({
                        ...currentPage,
                        [category.id]: index + 1,
                      })
                    }
                    className="pagination__button"
                    style={{
                      margin: "0 8px",
                      padding: "8px 12px",
                      border: "none",
                      background:
                        categoryCurrentPage === index + 1
                          ? "#C79F27"
                          : "#ecf0f1",
                      color:
                        categoryCurrentPage === index + 1 ? "#fff" : "#333",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background 0.3s ease, color 0.3s ease",
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
            </div>
          </div>
        );
      })}

      <div className="btn-container">
        <button onClick={handleSubmit} className="btn">
          Submit
        </button>
      </div>
      {successModalStatus && <SuccessModal closeModal={closeModal} />}
    </div>
  );
};

export default LandingPage;
