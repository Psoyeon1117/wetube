import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({	//데이터 형식을 정의한다.
	title: String,
	description: String,
	createdAt: Date,
	hashtags: [{ type: String }],
	meta:{
		views: Number,
		rating: Number,
	},
});
//입력받을 데이터들의 타입을 설정한다.
const Video = mongoose.model("Video", videoSchema);
export default Video;