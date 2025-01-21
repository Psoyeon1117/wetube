import express from "express";
import morgan from "morgan";
import session from "express-session"
import MongoStore from "connect-mongo";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from  "./middleware";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
//app이 request에 어떻게 대응할 지를 정해준다.
app.use(morgan("dev")); 	//app.use(): 함수가 모든 url에 대해 middleware로 작용한다.
app.use(express.urlencoded({ extended: true }));

app.use(session({				//session을 생성한다.
	secret: process.env.COOKIE_SECRET,			//쿠키에 sign을 할 때 사용한다. 서버에서 쿠키를 줬다는 것을 증명하기 위해서 sign을 한다.
	resave: false,				//모든 request마다 세션에 수정사항이 있든 없든 세션을 저장한다.
	saveUninitialized: false,	//세션 초기화가 발생하지 않아도(세션이 만들어진 후 어떠한 작업도 가해지지 않은 상태) 세션을 저장한다.
	// => 이 미들웨어를 통해 사이트에 들어오는 모든 유저를 기억할 수 있다.
	//DB에 연결하지 않으면, 서버가 새로 켜질 때마다 세션의 정보가 초기화된다.
	store: MongoStore.create({mongoUrl: process.env.DB_URL})
}));

// app.use((req,res,next)=>{	//세션에 저장된 정보를 보여줌
// 	req.sessionStore.all((error,session)=>{
// 		console.log(session);
// 		next();
// 	});
// });

// app.get("/add-one", (req,res)=>{	//세션id와 각 id의 데이터들
// 	req.session.potato += 1;	//request에는 session이 담겨있다.
// 	return res.send(`id:${req.session.id}, potato:${req.session.potato}`);
// 	//각 id마다 다른 데이터(like potato..)를 저장할 수 있다.(브라우저1의 potato=20, 브라우저2의 potato=4...)
// })
app.use(localsMiddleware);
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

//행동 양식이 모두 정해진 후, 서버를 열어 외부에 내보낸다.
export default app;