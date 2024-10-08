
const videos = [
	{
	  title: "First Video",
	  rating: 5,
	  comments: 2,
	  createdAt: "2 minutes ago",
	  views: 1,
	  id: 1,
	},
	{
	  title: "Second Video",
	  rating: 5,
	  comments: 2,
	  createdAt: "2 minutes ago",
	  views: 59,
	  id: 2,
	},
	{
	  title: "Third Video",
	  rating: 5,
	  comments: 2,
	  views: 59,
	  createdAt: "2 minutes ago",
	  id: 3,
	},
  ];
export const trending = (req, res) => {
	res.render("home", {pageTitle : "Home", videos});
}
export const watch = (req,res)=> {
	const { id } = req.params;
	const video = videos[id-1];
	return res.render("watch", {pageTitle : `watch ${video.title} video`, video});
}
export const getEdit = (req,res) => {
	const { id } = req.params;
	const video = videos[id-1];
	return res.render("edit", {pageTitle : `Editing :${video.title}`, video})
};
export const postEdit = (req,res) => {
	const { id } = req.params;
	const { title } = req.body;
	videos[id - 1].title = title; 
	return res.redirect(`/video/${id}`);
};
export const getUpload = (req ,res) => res.render("upload", {pageTitle:"Upload Video"});
export const postUpload = (req, res) => {
	const newVideo = {
		title: req.body.title,
		rating: 0,
		comments: 0,
		views: 0,
		createdAt: "just now",
		id: videos.length + 1,
	  };
	  videos.push(newVideo);
	return res.redirect("/");
};
export const search = (req, res) =>res.send("search video");
export const remove = (req, res) => res.send("remove video");