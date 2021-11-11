const mongoose = require("mongoose");

// const connectionString = `mongodb+srv://kev02:mRPol1iCl7cq1gko@cluster0.ryo50.mongodb.net/prodequa`
const connectionString = `mongodb://localhost:27017/prodequa`;

module.exports = async () => {
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
