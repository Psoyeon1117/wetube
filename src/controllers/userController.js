import User from "../models/User";


export const getJoin = (req,res) => res.render("join", {pageTitle: "Create Account"});
export const postJoin = async (req, res) => {
	const { email, username, password, Rpassword, name, location } = req.body;
	const exists = await User.exists({ $or: [{username}, {email}] });	//$or: [{조건1}, {조건2}, ...] 으로 간단하게 여러 조건들을 적용시킬 수 있다.
	if(password != Rpassword){
		return res.render("join", {pageTitle: "Create Account", errorMessage: "password가 일치하지 않습니다."});

	}
	if (exists){
		return res.render("join", {pageTitle: "Create Account", errorMessage: "이미 존재하는 username/email입니다."});
	}
		await User.create({		//model.create()는 save()를 불러온다.
			email,
			username,
			password,
			name,
			location,
		})
		return res.redirect("/login");
};
export const login = (req, res) => res.send("login");
export const edit = (req, res) => res.send("edit user");
export const remove = (req,res) => res.send("Remove user");
export const logout = (req, res)=> res.send("logout");
export const see = (req,res)=>res.send("see user's profile");