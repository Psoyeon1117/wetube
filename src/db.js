import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/wetube");	//mongoose가 wetube라는 mongodb에 연결해줌

const db = mongoose.connection;
db.on("error", (error)=>console.log("DB error: ", error));	//on은 여러번 실행될 수 있다.
db.once("open", ()=>console.log("connection DB"));			//once는 한 번만 실행된다.