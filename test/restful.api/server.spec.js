'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const chai = require('chai');
const Client = require('node-rest-client').Client;

let assert = chai.assert;
let client = new Client();

describe('POST /login', function () {

    this.slow(200);

    it('it should POST valid user', (done) => {

        let args = {
            data: { username: "test", password: "test" },
            headers: { "Content-Type": "application/json" }
        };

        client.post("https://localhost:8080/login", args, function (data, response) {
            assert.equal(response.statusCode, 200);
            assert.equal(data.id, 1);
            assert.equal(data.username, 'test');
            done();
        });

    });

    it('it should POST invalid user', (done) => {

        let args = {
            data: { username: "invalid", password: "invalid" },
            headers: { "Content-Type": "application/json" }
        };

        client.post("https://localhost:8080/login", args, function (data, response) {
            assert.equal(response.statusCode, 401);
            assert.equal(data.success, false);
            done();
        });

    });
});

describe('GET /logout', function () {

    this.slow(200);

    it('it should GET success status', (done) => {

        client.get("https://localhost:8080/logout", function (data, response) {
            assert.equal(response.statusCode, 200);
            assert.equal(data.success, true);
            done();
        });

    });

});


