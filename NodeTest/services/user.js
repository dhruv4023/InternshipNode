// services/user.js
import { Users } from '../db.js';
import { Op } from 'sequelize';

export const getUserData = async ({ id, delPassword = true }) => {
  const query = isNaN(id) ? { [Op.or]: [{ email: id }, { username: id }] } : { id: id };

  try {
    const user = await Users.findOne({
      where: query,
      attributes: { exclude: ['_id'] }, // Exclude the "_id" field from the result
    });

    if (user) {
      // Remove "password" field if delPassword is true
      if (delPassword) {
        user.password = undefined;
      }

      return user;
    } else {
      console.log('User not found.');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};


export
  const getUserIdsByName = async ({firstName, lastName}) => {
    const users = await Users.findAll({
      where: {
        [Op.or]: [
          {
            firstName: { [Op.iLike]: `%${firstName || ''}%` },
            lastName: { [Op.iLike]: `%${lastName || ''}%` },
          },
          {
            [Op.and]: [
              { firstName: { [Op.iLike]: `%${firstName}%` } },
              { lastName: { [Op.eq]: null } },
            ],
          },
          {
            [Op.and]: [
              { firstName: { [Op.eq]: null } },
              { lastName: { [Op.iLike]: `%${lastName}%` } },
            ],
          },
        ],
      },
    });
    return users.map(u => u.id);
  }