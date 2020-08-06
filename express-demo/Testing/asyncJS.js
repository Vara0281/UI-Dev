function loginUser(email, pass) {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      if (email) {
        resovle({ email, pass });
      } else {
        reject("Please Provide valid email and password");
      }
    }, 1000);
  });
}

function getUserVideos(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email) {
        resolve(["video1", "video2", "video3"]);
      } else {
        reject("No Videos for this Mail");
      }
    }, 1000);
  });
}

function videosDetails(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (video) {
        resolve("Magadheera");
      } else {
        reject("Title Of The Videos....");
      }
    }, 1000);
  });
}

async function displayUser() {
  try {
    const user = await loginUser("varaPrasad", 1234);
    const videos = await getUserVideos(user.email);
    const details = await videosDetails(videos[0]);
    console.log(details);
  } catch (err) {
    console.log(err);
  }
}

displayUser();
