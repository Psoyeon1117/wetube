import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  //데이터 형식을 정의한다.
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true }, //잘못된 형식이 입력될 경우, 해당 데이터는 document에 추가하지 않는다.
    rating: { type: Number, default: 0, required: true },
  },
  //required: 해당 데이터가 꼭 필요한 지 명시한다.
  //default: 기본값을 설정한다.
  //trim: 처음과 끝의 공백을 모두 제거한다.
  //~lengh: 길이를 설정한다. (pug와 함께 2중으로 길이를 제한하면, 해킹으로 인해 제한이 풀릴 경우를 대비할 수 있다.)
});

//middleware: 코드 실행 중 특정 시점에 다른 작업(함수)를 수행한다.
//middleware는 schema 설정 단계에서만 정의될 수 있다.
/**
*videoSchema.pre("save", async function() {	//arrow 함수의 this는 lexical this이기 때문에 middleware에서 arrow함수 사용은 지양해야 한다.
*console.log(this);
*this.hashtags = this.hashtags[0]
*    .split(",")
*    .map((word) => (word.startsWith("#") ? word : `#${word}`));
*});
 */

//static: model에 선언된(추가된) 함수, 모델 참조를 통해서 static함수를 불러올 수 있다.
//static함수는 arrow 함수(=>)를 사용해선 안된다. arrow 함수를 사용하면 this를 사용할 수 없다.
videoSchema.static("formatHashtags", function (hashtags) {  //model에 formatHashtags라는 이름의 static함수를 추가한다.
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

//입력받을 데이터들의 타입을 설정한다.
const Video = mongoose.model("Video", videoSchema);
export default Video;
