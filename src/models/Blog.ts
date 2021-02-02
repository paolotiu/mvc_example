import { Schema, model, Document } from "mongoose";

interface IBlog {
  title: string;
  content: string;
  created?: Date | number;
  author: string;
  _id: string;
  link: string;
  deleteLink: string;
  updateLink: string;
}

const BlogSchema = new Schema({
  title: String,
  content: String,
  created: { type: Date, required: true, default: Date.now() },
  author: String,
});

BlogSchema.virtual("link").get(function (this: IBlog) {
  return "/blog/" + this._id;
});
BlogSchema.virtual("deleteLink").get(function (this: IBlog) {
  return "/blog/delete/" + this._id;
});
BlogSchema.virtual("updateLink").get(function (this: IBlog) {
  return "/blog/update/" + this._id;
});
type BlogDocument = IBlog & Document;

const BlogModel = model<BlogDocument>("Blog", BlogSchema);

class Blog {
  model = BlogModel;
  async getAll() {
    return new Promise<IBlog[]>((resolve, reject) => {
      BlogModel.find({}, (err, blogs) => {
        err ? reject(err) : resolve(blogs);
      });
    });
  }

  async addBlog({
    title,
    content,
    author,
  }: {
    title: string;
    content: string;
    author: string;
  }) {
    const newBlog = new BlogModel({
      title,
      content,
      author,
    });
    return newBlog.save().then((res) => res);
  }

  async deleteBlog(id: string) {
    return BlogModel.findByIdAndRemove(id, {}, (err, doc) => {
      if (err) return err;
      return doc;
    });
  }

  async updateBlog(id: string, { title, content, author }: Partial<IBlog>) {
    const objForUpdate: Partial<IBlog> = {};
    if (title) objForUpdate.title = title;
    if (content) objForUpdate.content = content;
    if (author) objForUpdate.author = author;

    return BlogModel.findByIdAndUpdate(
      id,
      { $set: objForUpdate },
      { new: true, runValidators: true },
      (err, doc) => (err ? err : doc)
    );
  }
}

// Export module singleton
export default new Blog();
