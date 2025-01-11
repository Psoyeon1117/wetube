import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({	//데이터 형식을 정의한다.
	title: {type: String, required: true, trim: true, maxLength: 80 },
	description: {type: String, required: true, trim: true, minLength: 20 },
	createdAt: {type: Date, required: true, default: Date.now },	
	hashtags: [{ type: String, trim: true }],
	meta:{
		views: { type: Number, default: 0, required: true },	//잘못된 형식이 입력될 경우, 해당 데이터는 document에 추가하지 않는다.
		rating: { type: Number, default: 0, required: true },
	},
	//required: 해당 데이터가 꼭 필요한 지 명시한다.
	//default: 기본값을 설정한다.
	//trim: 처음과 끝의 공백을 모두 제거한다.
	//~lengh: 길이를 설정한다. (pug와 함께 2중으로 길이를 제한하면, 해킹으로 인해 제한이 풀릴 경우를 대비할 수 있다.)
});

//입력받을 데이터들의 타입을 설정한다.
const Video = mongoose.model("Video", videoSchema);
export default Video;