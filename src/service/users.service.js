import { readData } from "../repository/readData.js";
import { writeData } from "../repository/writeData.js";
import { parseId } from "../utils/parseId.js";
import { NotFoundError, ConflictError } from "../core/error.response.js";

export const getAllUsers = async () => {
    const data = await readData();
    return data.users;
};

export const getUserById = async (userId) => {
    const id = parseId(userId);
    const data = await readData();
    const user = data.users.find((u) => u.id === id);

    if (!user) {
        throw new NotFoundError('User not found');
    }

    return user;
};

export const createUser = async (userData) => {
    const data = await readData();

    // Check duplicate email
    const isExistingEmail = data.users.some((u) => u.email === userData.email);
    if (isExistingEmail) {
        throw new ConflictError('Email already exists');
    }

    const maxId = data.users.reduce((max, u) => (u.id > max ? u.id : max), 0);
    const newUser = {
        id: maxId + 1,
        ...userData,
    };

    data.users.push(newUser);
    await writeData(data);

    return newUser;
};

export const updateUser = async (userId, updateData) => {
    const id = parseId(userId);
    const data = await readData();

    const userIndex = data.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
        throw new NotFoundError('User not found');
    }

    if (updateData.email && updateData.email !== data.users[userIndex].email) {
        const isExistingEmail = data.users.some((u) => u.id !== id && u.email === updateData.email);
        if (isExistingEmail) {
            throw new ConflictError('Email already exists');
        }
    }

    // Update user fields (prevent overwriting ID)
    const updatedUser = {
        ...data.users[userIndex],
        ...updateData,
        id,
    };

    data.users[userIndex] = updatedUser;
    await writeData(data);

    return updatedUser;
};

export const deleteUser = async (userId) => {
    const id = parseId(userId);
    const data = await readData();

    const userIndex = data.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
        throw new NotFoundError('User not found');
    }

    const [deletedUser] = data.users.splice(userIndex, 1);
    await writeData(data);

    return deletedUser;
};