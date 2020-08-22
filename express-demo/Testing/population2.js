const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

const UserSchema = new mongoose.Schema({ name: String });
const PostSchema = new mongoose.Schema({
  title: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [
    {
      text: String,
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);

function createUser(name) {
  const user = new User({ name });
  user.save();
  console.log(user);
}

// createUser("Joe");

function createPost() {
  const post = new Post({
    title: "Hello World",
    postedBy: "5f3fe5772da4d704c0b2edf6",
    comments: [
      {
        text: "Nice post!",
        postedBy: "5f3fe59e0d92df12689bf7e0",
      },
      {
        text: "Thanks :)",
        postedBy: "5f3fe5772da4d704c0b2edf6",
      },
    ],
  });
  post.save();
  console.log(post);
}

// createPost();

async function listPosts() {
  const posts = await Post.find()
    .populate("postedBy")
    .populate("comments.postedBy");
  console.log(posts);
}

listPosts();
