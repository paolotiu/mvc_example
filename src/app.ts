import express, { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import path from "path";
const app = express();

// Import routes
import BlogRouter from "./routes/blogRouter";

// Mongoose setup
import "config/mongooseSetup";

// Setup middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Setup routes
app.use("/blog", BlogRouter.getRouter());
app.use("/", (req, res) => {
  res.redirect("/blog");
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, "Endpoint not found"));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json("error");
});

export default app;
