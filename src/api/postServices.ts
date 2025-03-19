export const fetchPosts = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  return response.json();
};

export const createPost = async (title: string, body: string) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({ title, body }),
    headers: { "Content-Type": "application/json" },
  });
  console.log("response.json()");
  const data = await response.json();
  console.dir(data, { depth: null });
  return data;
};

export const deletePost = async (id: number) => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  });
};
export const updatePost = async (id: number, title: string, body: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};
