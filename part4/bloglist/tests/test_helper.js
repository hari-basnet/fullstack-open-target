const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Hari Basnet',
    url: 'www.google.com',
    likes: 10,
  },
  {
    title: 'Palpasa cafe',
    author: 'Narayan Wagle',
    url: 'www.google.com',
    likes: 20,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
