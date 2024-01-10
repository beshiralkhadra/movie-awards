import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3001",
});

const handleError = (error: any): Promise<never> => {
  console.error(error);
  return Promise.reject(
    new Error("An error occurred while processing your request")
  );
};

const getCategories = async <T>(): Promise<T> => {
  try {
    let response = await api.post(`/category/getCategories`);

    if (response.data.status === "success") return response.data.row;
  } catch (error) {
    return handleError(error);
  }
};
const updateVotes = async <T>(votesDTO: object): Promise<T> => {
  try {
    let response = await api.post(`/nominee/updateVotes`, votesDTO);

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export { getCategories, updateVotes };
