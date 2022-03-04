const sequelize = require('../config/connection');
const { User, Posts, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Posts.create({
      ...post,
    });

    
  }
  const commentsData = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
