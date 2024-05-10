import axios, { Axios, AxiosError, isAxiosError } from "axios";
import jsonpath from "jsonpath";
import fs from "fs-extra";
import jsonData from "../api-data.json";

describe("ERRORS getting ", () => {
  test("get albums", async () => {
    const albums_response = await axios.get(
      "https://jsonplaceholder.typicode.com/albums/1045454545"
    );
    console.log(albums_response.status);
    expect(albums_response.status).toBe(200);
  });

  test("wrong url", async () => {
    try {
      const response = await axios.get("/users?id=2");
      expect(response.status).toEqual(200);
    } catch (error) {
      console.error(error);
    }
  });
});
