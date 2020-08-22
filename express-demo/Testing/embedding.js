const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

// const Author = mongoose.model("Author", authorSchema);
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({ name: String, authors: [authorSchema] })
);

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function createCourse(name, authors) {
  const course = new Course({ name, authors });
  const result = await course.save();
  console.log(result);
}

async function addAuther(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  await course.save();
  console.log(course);
}

async function removeAuther(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  // course.save();
  console.log(course);
}

// listCourses();
// addAuther("5f3fc6f0d48a6c132cc47ecf", { name: "Amy Jackson" });
removeAuther("5f3fcc43bca09b0d284c5485", "5f3fcc43bca09b0d284c5487");
// createCourse("Node Course33", [
//   { name: "Mosh", bio: "SE" },
//   { name: "Varaprasad", bio: "JE" },
// ]);
