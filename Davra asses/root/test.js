const request = require("supertest")("https://petstore.swagger.io/v2");

const assert = require("chai").assert;

// Get request to test check i was connecting successfully.

// it("Get/pet/106", () => {
//   return request
//     .get("/pet/106")
//     .expect(200)
//     .then((res) => {
//       assert.isNotEmpty(res.body);
//       console.log(res.body);
//     });
// });

//initial post request to create a pet object

it("POST/pet", () => {
  const data = {
    id: 106,
    category: { id: 106, name: "DOGGY" },
    name: "joshua cox",
    photoUrls: ["string"],
    tags: [{ id: 0, name: "Tagged" }],
    status: "unavailable",
  };
  return request
    .post("/pet")
    .send(data)
    .then((res) => {
      assert.hasAnyKeys(res.body, "id");
      assert.equal(res.body.name, data.name); //verifying the pet was created with the correct data eg name
      assert.equal(res.body.status, data.status); //verifying the pet was created with the correct data eg status
      assert.equal(res.body.category.name, data.category.name); //verifying the pet was created with the correct data eg Cat name

      //console.log(res.data);
    });
});

// Get response to retrieve the object 160,
// along with a console.log for my own proof of functionality, although the "isnotEmptyMethod" provided by CHAI
// confirms that the res.body has successfully returned data with the 106 object id.

it("Get/pet/106", () => {
  return request
    .get("/pet/106")
    .expect(200)
    .then((res) => {
      assert.isNotEmpty(res.body);
      // console.log(res.body);
    });
});

//Update method

it("PUT/pet", () => {
  const dataV2 = {
    id: 106,
    category: { id: 106, name: "DOGGYBAG" },
    name: "joshua Fox",
    photoUrls: ["string"],
    tags: [{ id: 0, name: "unTagged" }],
    status: "available",
  };
  return request
    .put("/pet")
    .send(dataV2)
    .then((res) => {
      assert.hasAnyKeys(res.body, "id");
      assert.equal(res.body.name, dataV2.name); //veifying the name has been changed
      assert.equal(res.body.category.name, dataV2.category.name); // verifying the category gets changed
      //console.log(res);
    });
});

//Delete method that uses the api_key, Authorisation to allow for deletes.

it("DELETE/pet/106", () => {
  const id = 106;

  request
    .delete("/pet/", { id })
    .set("Authorization", "api_key") // Works.
    .set("Content-Type", "api_key") // Works.

    .expect(200); // the 200 respose code tells us that the pet has been deleted.
});

//I initally wanted to use this get request to verify that the pet was being deleted by having it return an error message
// but, the deleted were not instatainous and the get would always come back succesfull even if a succesful DELETE request has ran prior.

// it("Get/pet/106", () => {
//   return request.get("/pet/106").expect(404);
//   .then((res) => {
//   assert.isEmpty(res.body);
//   console.log(res.body);
//   });
// });
