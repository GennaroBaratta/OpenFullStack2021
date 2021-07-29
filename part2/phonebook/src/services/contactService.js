import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  try {
    return (await axios.get(baseUrl)).data;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

const create = async (newObject) => {
  try {
    return (await axios.post(baseUrl, newObject)).data;
  } catch (error) {
    console.error(error.message);
  }
};

const update = async (id, newObject) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/${id}`,
      newObject
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const remove = async (id) => {
  try {
    return await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    throw new Error(error.message);
  }
};

const contactService = { getAll, create, update, remove };

export default contactService;
