import { RequestHandler } from "express";
import Blog from "../models/Blog";
interface IBlogController {
  findById: RequestHandler;
  getAllBlogs: RequestHandler;
  deleteBlog: RequestHandler;
  updateBlog: RequestHandler;
  createBlog: RequestHandler;
  sendUpdateForm: RequestHandler;
}
class BlogController implements IBlogController {
  public findById: RequestHandler = async (req, res) => {
    const blog = await Blog.model.findById(req.params.id);
    if (!blog) return res.redirect("/blog");
    res.render("blog", { blog });
  };

  public getAllBlogs: RequestHandler = async (req, res) => {
    const blogs = await Blog.getAll();
    return res.render("all_blogs", { title: "Hey", blogs: blogs });
  };

  public deleteBlog: RequestHandler = async (req, res) => {
    await Blog.deleteBlog(req.params.id);
    return res.redirect("/blog");
  };

  public updateBlog: RequestHandler = async (req, res) => {
    const { title, content, author } = req.body;
    const blog = await Blog.updateBlog(req.params.id, {
      title,
      content,
      author,
    });
    if (!blog) return res.redirect("/blog");

    return res.redirect(blog.link);
  };

  public sendUpdateForm: RequestHandler = async (req, res) => {
    const blog = await Blog.model.findById(req.params.id);
    if (!blog) return res.redirect("/blog");
    return res.render("update_form", { blog });
  };

  public createBlog: RequestHandler = async (req, res) => {
    const { title, content, author } = req.body;

    const blog = await Blog.addBlog({ title, content, author });
    return res.redirect(blog.link);
  };
}

export default new BlogController();
