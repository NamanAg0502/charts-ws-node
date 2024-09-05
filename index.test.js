const request = require("supertest");
const express = require("express");
const pg = require("pg");
const { WebSocket } = require("ws");

let server;

describe("Real-Time Chart Server", () => {
  beforeAll(() => {
    server = require("./index");
  });

  it("should connect to PostgreSQL", async () => {
    const client = new pg.Client({
      user: "naman",
      host: "localhost",
      database: "postgres",
      port: 5432,
    });

    await expect(client.connect()).resolves.toBeUndefined();
    client.end();
  });

  it("should serve the home page", async () => {
    const res = await request(server).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Real-Time Chart");
  });

  //   it("should upgrade connection to WebSocket", async ({ clock }) => {
  //     const ws = new WebSocket("ws://localhost:3000");
  //     let closed = false;

  //     ws.on("open", () => {
  //       expect(ws.readyState).toBe(WebSocket.OPEN);
  //     });

  //     ws.on("close", () => {
  //       expect(closed).toBe(true);
  //     });

  //     ws.on("message", () => {
  //       closed = true;
  //     });

  //     await new Promise((resolve) => setTimeout(resolve, 5000));
  //     expect(closed).toBe(true);
  //   }, 10000);
});
