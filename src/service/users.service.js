import { readData } from "../repository/readData.js";

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

export const getUserById = async (userId) => {
  try {
    const data = await readData();

    const user = data.users.find(user => user.id === parseInt(userId));
    return user || null;
  }
  catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
}