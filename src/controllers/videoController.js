import Video from "../models/video";
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
export const trending = async(req, res) => {	//await는 async선언이 된 함수에서만 사용가능하다.
	try{
		console.log("start");
		const videos = await Video.find({});	//해당위치에서 find를 기다린다.(기다리는 동안 진행X)
		console.log("finish");
		console.log(videos);
		// throw new Error("bad");		//throw로 error를 생성한다.
		res.render("home", {pageTitle : "Home", videos:[]});
	} catch{	//error가 발견되면 catch를 실행한다.
		res.send("server-error"); 
	}
}
export const watch = (req,res)=> {
	const { id } = req.params;
	return res.render("watch", {pageTitle : `watch`});
}
export const getEdit = (req,res) => {
	const { id } = req.params;
	return res.render("edit", {pageTitle : `Editing`})
};
export const postEdit = (req,res) => {
	const { id } = req.params;
	const { title } = req.body;
	return res.redirect(`/video/${id}`);
};
export const getUpload = (req ,res) => res.render("upload", {pageTitle:"Upload Video"});
export const postUpload = (req, res) => {
	return res.redirect("/");
};
export const search = (req, res) =>res.send("search video");
export const remove = (req, res) => res.send("remove video");