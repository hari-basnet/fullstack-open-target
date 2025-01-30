const _ = require('lodash');

const dummy = (blogs) => {
  // ...
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length > 0 ? blogs.reduce((acc, curr) => acc + curr.likes, 0) : 0;
};

const favouriteBlog = (blogs) => {
  return blogs.reduce(
    (maxBlog, blog) => {
      return blog.likes > maxBlog.likes ? { title: blog.title, author: blog.author, likes: blog.likes } : maxBlog;
    },
    { title: '', author: '', likes: 0 }
  );
};

const maxBlog = (blogs) => {
  const authorWithMostBlogs = _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({
      author,
      blogs: blogs.length,
    }))
    .maxBy('blogs');
  return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  const authorWithMostLikes = _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({
      author,
      likes: _.sumBy(blogs, 'likes'),
    }))
    .maxBy('likes');

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  maxBlog,
  mostLikes,
};
