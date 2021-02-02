import { Router } from "express";
import blogController from "controllers/blogController";
class BlogRouter {
  public getRouter(): Router {
    const router = Router();
    router.get("/", blogController.getAllBlogs);
    router.get("/add", (req, res) => {
      return res.render("add_blog");
    });
    router.get("/:id", blogController.findById);
    router.use("/delete/:id", blogController.deleteBlog);
    router.get("/update/:id", blogController.sendUpdateForm);
    router.post("/update/:id", blogController.updateBlog);
    router.post("/", blogController.createBlog);
    return router;
  }
}

export default new BlogRouter();
