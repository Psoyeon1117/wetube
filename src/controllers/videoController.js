const fakeUser = {
	username : "parksoyeon",
	loggedIn : true,
}

export const trending = (req, res) => res.render("home", {pageTitle : "Home", fakeUser : fakeUser});
export const watch = (req,res)=> res.render("watch", {pageTitle : "Watch this video"});
export const edit = (req,res) => res.send("edit video");
export const search = (req, res) =>res.send("search video");
export const remove = (req, res) => res.send("remove video");
export const upload = (req ,res) => res.send("upload video");