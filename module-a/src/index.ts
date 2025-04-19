import express from 'express';
import { BaseError, NotFoundError } from './lib/error';
import { adminAuth } from './lib/middleware';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  console.log(req.method, req.path);
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else next();
})

const router = express.Router();
app.use("/api/v1", router);

app.use(((err, req, res, next) => {
  if (err instanceof BaseError) {
    res.status(err.code).json({
      success: false,
      message: err.message,
      validations: (err as any).validations
    });
  } else {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}) as express.ErrorRequestHandler);

router.get("/", adminAuth, (req, res) => {
  res.status(200).json({
    message: "Hello, World!"
  });
});

router.use("/admin", (await import("./routes/admin")).default);

app.use((req, res) => {
  throw new NotFoundError();
});

app.listen(
  process.env.PORT || 80,
  (err) => err ? console.error(err) : console.log("app listening")
);