const app = require("./index");
const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`Local server is listening on port ${port}`));

// https://dev.to/mhmdlotfy96/testing-nodejs-express-api-with-jest-and-supertest-1bk0
// For development or production, you can listen to your app in a different file.