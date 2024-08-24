export const trending = (req, res) => res.render("home");
export const watch = (req,res)=> res.render("watch");
export const edit = (req,res) => res.send("edit video");
export const search = (req, res) =>res.send("search video");
export const remove = (req, res) => res.send("remove video");
export const upload = (req ,res) => res.send("upload video");