import "dotenv/config"
import "./db";
import "./models/VideoSch";
import "./models/User"
import app from "./server"
const PORT = 4000;

app.listen(PORT, () => console.log("Server listening on port 4000"));
