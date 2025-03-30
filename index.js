document.addEventListener("DOMContentLoaded", function () {
  const boxBody = document.querySelector(".box-body");
  const box = document.querySelector(".box");
  const surpriseVideo = document.getElementById("surpriseVideo");
  const videoContainer = document.getElementById("videoContainer");

  // Hide video container initially
  videoContainer.style.display = "none";

  // Start shaking the box after 0.5 seconds
  setTimeout(() => {
    boxBody.classList.add("shake");

    // Stop shaking and open the box after 1.5 seconds of shaking
    setTimeout(() => {
      boxBody.classList.remove("shake");
      boxBody.classList.add("open");

      // Wait for the box opening animation to complete (1.1s for box-lid animation)
      setTimeout(() => {
        // Show video container
        videoContainer.style.display = "flex";
        videoContainer.classList.add("show");

        // Make sure video is visible and play it
        surpriseVideo.style.display = "block";
        surpriseVideo.currentTime = 0;

        // Force video to play
        const playVideo = async () => {
          try {
            await surpriseVideo.play();
            console.log("Video started playing successfully");
            // Unmute after playback starts
            surpriseVideo.muted = false;
          } catch (error) {
            console.log("Video playback failed:", error);
            // Try again
            setTimeout(playVideo, 100);
          }
        };

        playVideo();

        // Fade out the gift box while video is playing
        box.classList.add("fade-out");
      }, 1100); // Wait for the box to open
    }, 1500); // Shake for 1.5 seconds
  }, 500); // Start shaking after 0.5 seconds

  // Add event listener for video errors
  surpriseVideo.addEventListener("error", function (e) {
    console.log("Video error occurred:", e);
    alert("Có lỗi xảy ra khi phát video. Vui lòng thử lại!");
  });
});
