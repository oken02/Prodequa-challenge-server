const http = require("http");
const { Server } = require("socket.io");
const { FormModel } = require("./models");

const socketLoader = (app) => {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: ["https://cruce-server.herokuapp.com"],
      methods: ["GET", "POST"],
    },
  });

  (async () => {
    const forms = await FormModel.find();

    io.on("connection", (socket) => {
      console.log(`User Connected: ${socket.id}`);

      // socket.on("disconnect", () => {
      // });

      socket.on("new-form", (newForm) => {
        forms.push(newForm);
        io.emit("new-forms", forms);
      });

      socket.on("get-forms", () => {
        socket.emit("new-forms", forms);
      });
    });
  })();

  return server;
};

module.exports = socketLoader;
