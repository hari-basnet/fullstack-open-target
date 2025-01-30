const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('Testing blog list backend', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(helper.initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(helper.initialBlogs[1]);
    await blogObject.save();
  });

  describe('Testing get blogs endpoint', () => {
    test('blog list are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('there are two blogs', async () => {
      const response = await api.get('/api/blogs');

      assert.strictEqual(response.body.length, helper.initialBlogs.length);
    });

    test('the first note is about HTTP methods', async () => {
      const response = await api.get('/api/blogs');

      const title = response.body.map((e) => e.title);
      assert.strictEqual(title.includes('HTML is easy'), true);
    });
  });

  describe('viewing a specific note', () => {
    test('id should be present in the blog', async () => {
      const blogsAtStart = await helper.blogsInDb();

      const blogToView = blogsAtStart[0];
      assert.ok(blogToView.hasOwnProperty('id'));
    });

    test('a specific blog can be viewed', async () => {
      const blogsAtStart = await helper.blogsInDb();

      const blogToView = blogsAtStart[0];

      const viewedBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
  });

  describe('Adding a new blog', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: 'HTML is not so much easy',
        author: 'Hari Basnet',
        url: 'www.google.com',
        likes: 10,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsInDb = await helper.blogsInDb();
      assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1);

      const title = blogsInDb.map((r) => r.title);
      assert.strictEqual(title.includes('HTML is easy'), true);
    });

    test('blog without content is not added', async () => {
      const newBlog = {
        url: 'www.google.com',
        likes: 10,
      };

      await api.post('/api/blogs').send(newBlog).expect(400);

      const blogsInDb = await helper.blogsInDb();

      assert.strictEqual(blogsInDb.length, helper.initialBlogs.length);
    });

    test('if likes property is missing then it is set to 0', async () => {
      // const blogsAtStart = await helper.blogsInDb();

      const newBlog = {
        title: 'What if likes is missing',
        author: 'Hari Basnet',
        url: 'www.google.com',
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const currentBlogs = await helper.blogsInDb();
      const blogToTest = currentBlogs[currentBlogs?.length - 1];
      assert.equal(blogToTest.likes, 0);
    });

    test('if title or url is missing', async () => {
      const titleMissingBlog = {
        author: 'Hari Basnet',
        url: 'www.google.com',
        likes: 10,
      };

      const urlMissingBlog = {
        title: 'HTML is not so much easy',
        author: 'Hari Basnet',
        likes: 10,
      };

      await api.post('/api/blogs').send(titleMissingBlog).expect(400);
      await api.post('/api/blogs').send(urlMissingBlog).expect(400);
    });
  });

  describe('Deletion of a blog', () => {
    test('succeeds with status code of id is valid', async () => {
      const blogAtStart = await helper.blogsInDb();
      const blogToDelete = blogAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAfterDeletion = await helper.blogsInDb();
      assert.strictEqual(blogAtStart.length - 1, blogsAfterDeletion.length);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
