import "dotenv/config";
import app from "./app/app";
import { connectDB } from "./app/lib/db";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDB();
});
