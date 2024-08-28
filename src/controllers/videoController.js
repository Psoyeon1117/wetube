const fakeUser = {
	username : "parksoyeon",
	loggedIn : true,
}
export const trending = (req, res) => {
	const videos = [
		{
		  title: "Hello",
		  title: "First Video",
		  rating: 5,
		  comments: 2,
		  createdAt: "2 minutes ago",
		  views: 59,
		  id: 1,
		},
		{
		  title: "Video #2",
		  title: "Second Video",
		  rating: 5,
		  comments: 2,
		  createdAt: "2 minutes ago",
		  views: 59,
		  id: 1,
		},
		{
		  title: "Whatsup",
		  title: "Third Video",
		  rating: 5,
		  comments: 2,
		  createdAt: "2 minutes ago",
		  views: 59,
		  id: 1,
		},
	  ];
	res.render("home", {pageTitle : "Home", fakeUser : fakeUser, videos});
}
export const watch = (req,res)=> res.render("watch", {pageTitle : "Watch this video"});
export const edit = (req,res) => res.send("edit video");
export const search = (req, res) =>res.send("search video");
export const remove = (req, res) => res.send("remove video");
export const upload = (req ,res) => res.send("upload video");