import Video from "../models/VideoSch";
/**
//callback(지금은 사용불가)
export const trending = (req, res) => {
console.log("1: start");
Video.find({}, (error, videos)=>{	//콜백함수는 trending에서 가장 마지막에 실행된다.
		res.render("home", {pageTitle : "Home", videos:[]});
		console.log("3: rendering finish");
	});
	console.log("2: end");
	//1,2,3 순서대로 실행된다.
}
*/
//async&await
export const trending = async (req, res) => {
  //await는 async선언이 된 함수에서만 사용가능하다.
  try {
    const videos = await Video.find({}); //DB에서 데이터를 찾아온다.
    //해당위치에서 find를 기다린다.(기다리는 동안 진행X)
    // throw new Error("bad");		//throw로 error를 생성한다.
    res.render("home", { pageTitle: "Home", videos: videos });
  } catch {
    //error가 발견되면 catch를 실행한다.
    res.send("server-error");
  }
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "video not found" });
  }
  return res.render("watch", { pageTitle: video.title, video: video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "video not found" });
  }
  console.log(video);
  return res.render("edit", {
    pageTitle: `Editing ${video.title}`,
    video: video,
  });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { description, title, hashtags } = req.body;
  const video = await Video.exists({ _id: id }); //특정 데이터가 존재하는지 확인한다. (T/F를 반환함)
  try {
    if (!video) {
      return res.render("404", { pageTitle: "video not found" });
    }
    await Video.findByIdAndUpdate(id, {
      //id로 데이터를 찾고 새로운 내용으로 업데이트한다.
      title,
      description,
      hashtags: Video.formatHashtags(hashtags), //모델 참조를 사용해서 static함수를 불러온다.
    });
    return res.redirect(`/video/${id}`);
  } catch (error) {
    res.render("edit", { pageTitle: `Editing ${video.title}`, video: video });
  }
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload Video" });

export const postUpload = async (req, res) => {
  const { title, hashtags, description } = req.body;
  try {
    const video = new Video({
      //database에 보낼 document(object)를 생성한다.
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    await video.save(); //DB에 데이터를 저장한다.
    //DB에 저장하는데 시간이 걸리기 때문에, 기다려줘야한다.
    return res.redirect("/");
  } catch (error) {
    res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),   //JS에서 regular expression을 사용한다.
      },
    }).sort({"createdAt": "desc"});   //원하는 조건으로 값들을 정렬한다.
  }
  res.render("search", { pageTitle: "Search", videos });
};
export const remove = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};
