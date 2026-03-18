const BASE_URL = 'http://localhost:3000';

let authToken = null;

// ================= TOKEN =================

const setToken = (token) => {
  authToken = token;
};

const getToken = () => authToken;

// ================= HELLO =================

const getHello = async () => {
  const response = await fetch(`${BASE_URL}/posts/hello`);

  if (!response.ok) {
    throw new Error(
      `Failed to get hello: HTTP ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
};

// ================= AUTH =================

const loginUser = async (name, password) => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to login: HTTP ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
};

const createUser = async (name, password) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create user: HTTP ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
};

const getMe = async () => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to get user: HTTP ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
};

// ================= POSTS =================

const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to get posts: HTTP ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
};

const createPost = async (text) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create post: HTTP ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
};

const updatePost = async (id, text) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to update post: HTTP ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
};

const deletePost = async (id) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to delete post: HTTP ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
};

// ================= USER DELETE =================

const deleteUser = async () => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to delete user: HTTP ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
};

// ================= EXPORTS =================

export {
  createPost,
  createUser,
  deletePost,
  deleteUser,
  getHello,
  getMe,
  getPosts,
  getToken,
  loginUser,
  setToken,
  updatePost,
};