export const localsMiddleware = (req, res, next) =>{
	//res의 locals객체는 middleware에서만 제어할 수 있다.
	//locals객체는 전역변수이고 pug에서도 부가적인 작업없이 바로 사용할 수 있다.
	res.locals.siteName = "Wetube";
	res.locals.loggedIn = Boolean(req.session.loggedIn);	//Boolean()으로 내부값이 T인지 F인지 판단한다.
	res.locals.loggedInUser = req.session.user;
	// console.log(res.locals);
	next();
}