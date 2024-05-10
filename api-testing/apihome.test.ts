import axios from "axios";
import jsonpath from "jsonpath";
import fs from "fs-extra";

describe("GET, POST requests ", () => {
  test("get  users", async () => {
    const users_response = await axios.get(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    console.log(
      "Getting  users id: 1" + "," + " status:" + users_response.status,
      users_response.data
    );
  });

  test("get albums", async () => {
    const albums_response = await axios.get(
      "https://jsonplaceholder.typicode.com/albums/10"
    );
    console.log(
      "Getting  albums id: 10" + "," + " status:" + albums_response.status,
      albums_response.data
    );
    expect(albums_response.status).toEqual(200);
    //   .then(function (response) {
    //     //console.log(response);
    //   });
    // console.log(post_data);
  });

  test("POST", async () => {
    const todos_response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "clean the room",
        completed: true,
      }
    );
    console.log(todos_response.data, "status:", todos_response.status);
    //console.log(all_users_response);

    const post_data = await axios.post(
      "https://jsonplaceholder.typicode.com/posts/",
      {
        firstName: "Fred",
        lastName: "Flintstone",
      }
    );

    console.log(
      "POST data to posts" + "," + " status:",
      post_data.status,
      post_data.data
    );
  });
});
