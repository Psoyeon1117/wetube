import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	email: { type: String, required:true, unique:true},
	username: { type: String, required:true, unique:true},
	password: { type: String, required:true},
	name: { type: String, required:true},
	location: String,
});

userSchema.pre("save", async function(){	//save에 대한 middleware를 설정한다.
	this.password = await bcrypt.hash(this.password, 5);	//password에 5번의 hashing을 진행한다.
	console.log(this.password);	
})

const User = mongoose.model("User", userSchema);
export default User;