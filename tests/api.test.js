const request = require("supertest")
const baseURL = "http://localhost:3000"

ids = [];
const firstMessage = {
    "type": "transaction",
    "umti": "UMTI12345",
    "merchantId": "Merchant123",
    "timestamp": "2023-09-06T14:30:00Z",
    "body": {
        "amount": 100.50,
        "currency": "USD",
        "description": "Payment received"
    }
};
const secondMessage = {
    "type": "event",
    "umti": "UMTI67890",
    "merchantId": "Merchant456",
    "timestamp": "2023-09-06T15:45:00Z",
    "body": {
        "eventName": "User Registration",
        "userId": "user123"
    }
};

jest.setTimeout(30000);

describe("messages APIs", () => {
    it("should add new messages to db", async () => {
        const response = await request(baseURL).post("/messages").send([firstMessage, secondMessage]);
        expect(response.statusCode).toBe(201);
        expect(response.body.insertedCount).toBe(2);
        ids.push(response.body.insertedIds['0']);
        ids.push(response.body.insertedIds['1']);
    });

    it("should get messages and return 200", async () => {
        const response = await request(baseURL).get("/messages/");
        expect(response.statusCode).toBe(200);
    });
    it("should return messages", async () => {
        const response = await request(baseURL).get("/messages/");
        expect(response.body.length >= 1).toBe(true);
    });
    it("should return message with given id", async () => {
        const response = await request(baseURL).get(`/messages?id=${ids[0]}`);
        expect(response.body[0]._id).toBe(ids[0]);
    });

    it("should delete first message", async () => {
        const response = await request(baseURL).delete(`/messages?id=${ids[0]}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.acknowledged).toBe(true);
        expect(response.body.deletedCount).toBe(1);
    });

    it("should delete second message", async () => {
        const response = await request(baseURL).delete(`/messages?id=${ids[1]}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.acknowledged).toBe(true);
        expect(response.body.deletedCount).toBe(1);
    });
});
