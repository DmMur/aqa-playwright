import axios from "axios";
import jsonpath from "jsonpath";
import fs from "fs-extra";

let userName: String;
let userPass: String;
let authToken: String;

describe("test for users", () => {
  test("get all users", async () => {
    const all_users_response = await axios.get("https://dummyjson.com/users");
    //console.log(all_users_response.data);
    let userName = String(
      jsonpath.query(all_users_response.data, "$..users[1].username")
    );
    let userPass = String(
      jsonpath.query(all_users_response.data, "$..users[1].password")
    );
    console.log(userName + "pass: " + userPass);
    expect(all_users_response.status).toEqual(200);
  });
  test("get auth token", async () => {
    const auth_token_response = await axios.post(
      "https://dummyjson.com/auth/login",
      {
        //username: `${userName}`,
        // password: `${userPass}`,
        username: "kminchelle",
        password: "0lelplR",
        //expiresInMins: 30,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    console.log(auth_token_response);

    let authToken = String(
      jsonpath.query(auth_token_response.data, "$..token")
    );
    //console.log(authToken);
    fs.writeJSONSync("api-token.json", authToken);
  });
});
