export const trending = (req, res) => res.send("Home");
export const watch = (req,res)=> {
	res.send(`watch video ${req.params.id}`);
}
export const edit = (req,res) => res.send("edit video");
export const search = (req, res) =>res.send("search video");
export const remove = (req, res) => res.send("remove video");
export const upload = (req ,res) => res.send("upload video");