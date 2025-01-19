import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req,res) => res.render("join", {pageTitle: "Create Account"});
export const postJoin = async (req, res) => {
	const { email, username, password, Rpassword, name, location } = req.body;
	const exists = await User.exists({ $or: [{username}, {email}] });	//$or: [{조건1}, {조건2}, ...] 으로 간단하게 여러 조건들을 적용시킬 수 있다.
	if(password != Rpassword){
		return res.status(400).render("join", {pageTitle: "Create Account", errorMessage: "password가 일치하지 않습니다."});

	}
	if (exists){
		return res.status(400).render("join", {pageTitle: "Create Account", errorMessage: "이미 존재하는 username/email입니다."});
	}
	try{
		await User.create({		//model.create()는 save()를 불러온다.
			email,
			username,
			password,
			name,
			location,
		})
		return res.redirect("/login");
	}catch(error){
		return res.status(400).render("join", {pageTitle: "Create Account", errorMessage: "오류가 발생했습니다."});
	}
};
export const getLogin = (req, res) => {
	return res.render("login", { pageTitle: "Login"});
}
export const postLogin = async (req, res) => {
	const { username, password } = req.body;
	//username으로 생성된 계정이 존재하는지 확인한다.
	const user = await User.findOne({ username });
	if(!user){		//계정이 존재하지 않는 경우
		return res.status(400).render("login", {pageTitle: "Login", errorMessage: "계정이 존재하지 않습니다."});
	}
	//password가 일치하는지 확인한다.
	const correct = await bcrypt.compare(password, user.password);
	if(!correct){	//비번이 일치하지 않는 경우
		return res.status(400).render("login", {pageTitle: "Login", errorMessage: "비밀번호가 일치하지 않습니다."});
	}
	req.session.loggedIn = true;		//계정이 존재하고 비번도 일치하는 겅우
	req.session.user = user;
	return res.redirect("/");
}
export const edit = (req, res) => res.send("edit user");
export const remove = (req,res) => res.send("Remove user");
export const logout = (req, res)=> res.send("logout");
export const see = (req,res)=>res.send("see user's profile");