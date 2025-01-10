document.addEventListener("DOMContentLoaded", () => {
    const hideButtons = document.querySelectorAll(".sidebar-title a");

    hideButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            const section = btn.closest(".sidebar-title").nextElementSibling;

            if (section) {
                if (section.style.display === "none") {
                    section.style.display = "block";
                    btn.textContent = btn.textContent.includes("Show") ? "Hide" : "Close";
                } else {
                    section.style.display = "none";
                    btn.textContent = btn.textContent.includes("Hide") ? "Show" : "Show";
                }
            }
        });
    });
  
    const searchBox = document.querySelector(".search-box input");
    searchBox.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const posts = document.querySelectorAll(".post-container");
      posts.forEach((post) => {
        const postText = post.querySelector(".post-text").textContent.toLowerCase();
        if (postText.includes(searchTerm)) {
          post.style.display = "block";
        } else {
          post.style.display = "none";
        }
      });
    });
  
    const likeButtons = document.querySelectorAll(".activity-icons div:first-child");
    likeButtons.forEach((likeDiv) => {
      likeDiv.addEventListener("click", () => {
        const likeCount = likeDiv.querySelector("img + span") || likeDiv.lastChild;
        let count = parseInt(likeCount.textContent) || 0;
        likeCount.textContent = ` ${++count}`;
      });
    });
  
    const postContainers = document.querySelectorAll(".post-container");
    postContainers.forEach((post) => {
      const commentSection = document.createElement("div");
      commentSection.className = "comment-section";
      const commentInput = document.createElement("input");
      commentInput.type = "text";
      commentInput.placeholder = "Add a comment...";
      const addButton = document.createElement("button");
      addButton.textContent = "Add Comment";
      commentSection.append(commentInput, addButton);
      post.append(commentSection);
  
      addButton.addEventListener("click", () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
          const comment = document.createElement("p");
          comment.className = "comment";
          comment.textContent = commentText;
          post.append(comment);
          commentInput.value = "";
        }
      });
    });
  });
  