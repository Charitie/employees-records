import express from "express";
import morgan from "morgan";
import cors from "cors";
import { globalErrorHandler } from "./lib/middlewares/globalErrorHandler.js";
import { getEmployeeRouter } from "./employees/employees.routes.js";

export class App {
  constructor() {
    this.app = this.createExpressApp();
  }

  createExpressApp() {
    const application = express();

    application.use(cors());
    application.use(express.json());
    if (application.get("env") === "development") {
      application.use(morgan("combined"));
    }

    application.get("/", (req, res) => {
      res.json({ message: "I'm ruuning here..." });
    });

    application.use("/", getEmployeeRouter());

    //this should be the last middleware to be passed to the app
    application.use(globalErrorHandler());
    return application;
  }

  start(port) {
    this.appServer = this.app.listen(port, () => {
      console.info(`app running on port ${port}`); // this could use a custom logger or library like winston
    });
  }

  async stop() {
    this.appServer.close(() => {
      console.info("app server stoped");
    });
  }
}

export default App;
