import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.DB_PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || "development"}`);
});
