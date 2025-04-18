import express from 'express';
import { BaseError, ValidationError } from './lib/error';
import { adminAuth } from './lib/middleware';

const app = express();
app.use(express.json());
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
  res.status(404).json({
    success: false,
    message: "Not found"
  });
});

app.listen(80, (err) => err ? console.error(err) : console.log("app listening on 80"));