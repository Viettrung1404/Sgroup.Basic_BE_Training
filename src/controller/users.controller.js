import * as usersService from '../service/users.service.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error',
            error: error.message
        });
    }
}