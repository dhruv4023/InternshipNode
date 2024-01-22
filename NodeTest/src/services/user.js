import cache from 'memory-cache';
import { Op } from 'sequelize';
import db from '../models/index.js';
const { Users, Roles } = db;

export const getUserData = async (id, attributes = {}) => {
  const query = isNaN(id) ? { [Op.or]: [{ email: id }, { username: id }] } : { id: id };

  try {
    const cachedUser = cache.get(id);
    if (cachedUser) {
      // console.log("cached")
      // console.log(cachedUser)
      return cachedUser;
    } else {
      // console.log("db")

      // If not cached, fetch the user data and store it in the cache
      // Store the user data in the cache with a specified expiration time (e.g., 5 minutes)
      const user = await Users.findOne({
        where: query,
        include: [{ model: Roles }],
        attributes: attributes
      });
      // console.log(user)
      cache.put(id, (user), 5 * 60 * 1000); // 5 minutes in milliseconds
      return user;
    }
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};


export const getUserIdsByName = async ({ firstName, lastName }) => {
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