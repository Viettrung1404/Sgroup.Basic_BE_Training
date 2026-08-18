import { readData } from "../../utils/readData.js";

export const getAllUsers = async () => {
  try {
    const data = await readData();
    return data.users;
  }
  catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}