# TODO: Integrate MongoDB into CRUD App

- [x] Add mongoose to backend/package.json dependencies
- [x] Run npm install in backend directory to install mongoose
- [x] Create backend/models directory
- [x] Create backend/models/User.js with Mongoose schema
- [x] Create backend/models/Item.js with Mongoose schema
- [x] Create backend/models/Project.js with Mongoose schema
- [x] Create backend/models/Task.js with Mongoose schema
- [x] Update backend/server.js to establish MongoDB connection
- [x] Update backend/routes/auth.js to use User model instead of in-memory array
- [x] Update backend/routes/items.js to use Item model instead of in-memory array
- [x] Update backend/routes/projects.js to use Project model (assuming similar structure)
- [x] Update backend/routes/tasks.js to use Task model (assuming similar structure)
- [x] Test backend to ensure MongoDB connection and CRUD operations work (Note: Requires local MongoDB instance running on port 27017)
- [x] Verify data persistence and CRUD operations through API testing
