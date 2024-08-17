import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const app = express();
const PORT = 4000;
//app이 request에 어떻게 대응할 지를 정해준다.
app.use(morgan("dev"));				//함수가 모든 url에 대해 middleware로 작용한다.

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);



//행동 양식이 모두 정해진 후, 서버를 열어 외부에 내보낸다.
app.listen(PORT, ()=>console.log("Server listening on port 4000"));
