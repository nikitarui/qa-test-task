var assert = chai.assert;

describe("DOM Test", function () {

    it("has the right title", function () {
        assert.equal(document.title, "QA Test");
    });

});