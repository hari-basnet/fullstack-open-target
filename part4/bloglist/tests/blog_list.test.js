const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "Hari Basnet",
    url: "www.google.com",
    likes: 10,
  },
  {
    title: "HTML is easy",
    author: "Ram Thapa",
    url: "www.google.com",
    likes: 20,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blog list are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map((e) => e.content);
  assert.strictEqual(contents.includes("HTML is easy"), true);
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "HTML is not so much easy",
    author: "Hari Basnet",
    url: "www.google.com",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.content);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);

  assert(contents.includes("async/await simplifies making async calls"));
});

test("blog without content is not added", async () => {
  const newBlog = {
    url: "www.google.com",
    likes: 10,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length);
});

after(async () => {
  await mongoose.connection.close();
});
