const accessToken = "227d983a3811b5f5d8d842643453b98c7a437bec";
const query = `{
  viewer {
    name
    bio
    login
    avatarUrl
    status {
      emojiHTML
      message
    }
    repositories(first: 20, orderBy: {direction: DESC, field: NAME}) {
      totalCount
      nodes {
        name
        description
        url
        updatedAt
        stargazerCount
        parent {
          forkCount
          resourcePath
        }
        primaryLanguage {
          color
          name
        }
      }
    }
  }
}
`;
let profileName = document.querySelector(".profile-name");
let username = document.querySelector(".username");
let avatar = document.querySelector(".avatar");
let repoHeaderAvatar = document.querySelector(".repo-header-avatar");
let status = document.querySelector(".status");
let statusEmoji = document.querySelector(".status-emoji");
let bio = document.querySelector(".bio");
let headerImg = document.querySelector(".header-image");
let profileImg = document.querySelector(".profile-image-md");
let profileImageMobile = document.querySelector(".profile-image-mobile");
let profileNameMobile = document.querySelector(".profile-name-mobile");
let profileUsernameMobile = document.querySelector(".profile-username-mobile");
let profileStatEmoji = document.querySelector(".profile-status-emoji-mobile");
let profileBioMobile = document.querySelector(".profile-bio-mobile");
let statusHtml = document.querySelector(".status-html");
let repocount = document.querySelector(".repocount");
let repocountMobile = document.querySelector(".repo-count-mobile");
let repos = document.querySelector(".repositories");
let reposMobile = document.querySelector(".repository-mobile");
let result = document.querySelector(".result");
let resultMobile = document.querySelector(".result-mobile");
let mobileMenu = document.querySelector(".mobile-menu");
let repoavatar = document.querySelector(".repo-header-avatar");
let reponame = document.querySelector(".repo-header-name");
let repoHeader = document.querySelector(".repos");
let statusemoji = document.querySelector(".status-emoji");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 320) {
    repoavatar.style.display = "block";
    reponame.style.display = "block";
    repoHeader.style.zIndex = 7;
  } else {
    repoavatar.style.display = "none";
    reponame.style.display = "none";
    repoHeader.style.zIndex = 0;
  }
});

fetch("https://api.github.com/graphql", {
  method: "POST",
  body: JSON.stringify({ query }),
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then((res) => res.text())
  .then((body) => {
    return JSON.parse(body);
  })
  .then((data) => {
    console.log(data.data.viewer);
    profileName.innerHTML = data.data.viewer.name;
    profileNameMobile.innerHTML = data.data.viewer.name;
    profileUsernameMobile.innerHTML = data.data.viewer.login;
    username.innerHTML = data.data.viewer.login;
    avatar.src = data.data.viewer.avatarUrl;
    repoHeaderAvatar.src = data.data.viewer.avatarUrl;
    headerImg.src = data.data.viewer.avatarUrl;
    profileImg.src = data.data.viewer.avatarUrl;
    profileImageMobile.src = data.data.viewer.avatarUrl;
    statusEmoji.innerHTML = data.data.viewer.status.emojiHTML;
    profileStatEmoji.innerHTML = data.data.viewer.status.emojiHTML;
    bio.innerHTML = data.data.viewer.bio;
    profileBioMobile.innerHTML = data.data.viewer.bio;
    result.innerHTML = `<strong>${data.data.viewer.repositories.totalCount}</strong> results for <strong>public</strong> repositories`;
    resultMobile.innerHTML = `<strong>${data.data.viewer.repositories.totalCount}</strong> results for <strong>public</strong> repositories`;
    repocount.innerHTML = data.data.viewer.repositories.totalCount;
    repocountMobile.innerHTML = data.data.viewer.repositories.totalCount;
    let repositories = data.data.viewer.repositories.nodes;
    for (let i = 0; i < repositories.length; i++) {
      let repoDate = new Date(Date.parse(repositories[i].updatedAt))
        .toDateString()
        .split(" ");

      if (
        repositories[i].parent !== null &&
        repositories[i].description !== null &&
        repositories[i].primaryLanguage !== null
      ) {
        repos.innerHTML += `
       <div class="repository">
                   <div class="repo-details">
                   <div class="repo-deets">
                   <h1 class="repo-name"> <a class="repo-link" href="${
                     repositories[i].url
                   }">${repositories[i].name}</a></h1>
                        <p class="repo-fork">Forked from ${repositories[
                          i
                        ].parent.resourcePath.substring(1)}</p>
                   </div>
                        <p class="repo-desc">${repositories[i].description}</p>
                       <div class="repo-lang">
                        <span style="background-color: ${
                          repositories[i].primaryLanguage.color
                        }" class="repo-lang-color"></span>
                        <p class="repo-lang-name">${
                          repositories[i].primaryLanguage.name
                        }</p>
                        <p class="repo-lang-fork"><svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg> ${
                          repositories[i].parent.forkCount
                        }</p>
                        <p class="repo-update">Updated on ${repoDate[1]} ${
          repoDate[2]
        }
                        </p>
                       </div>
                        
                   </div>
                   <button class="repo-star">
                    <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                        </path>
                    </svg> Star
                   </button>
               </div>
      `;

        reposMobile.innerHTML += `
       <div class="repository">
                   <div class="repo-details">
                   <div class="repo-deets">
                   <h1 class="repo-name"> <a class="repo-link" href="${
                     repositories[i].url
                   }">${repositories[i].name}</a></h1>
                        <p class="repo-fork">Forked from ${repositories[
                          i
                        ].parent.resourcePath.substring(1)}</p>
                   </div>
                       
                        <p class="repo-desc">${repositories[i].description}</p>
                       <div class="repo-lang">
                        <span style="background-color: ${
                          repositories[i].primaryLanguage.color
                        }" class="repo-lang-color"></span>
                        <p class="repo-lang-name">${
                          repositories[i].primaryLanguage.name
                        }</p>
                        <p class="repo-lang-fork"><svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg> ${
                          repositories[i].parent.forkCount
                        }</p>
                        <p class="repo-update">Updated on ${repoDate[1]} ${
          repoDate[2]
        }
                        </p>
                       </div>
                        
                   </div>
                   <button class="repo-star">
                    <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                        </path>
                    </svg> Star
                   </button>
               </div>
      `;
      } else if (
        repositories[i].parent !== null &&
        repositories[i].description === null
      ) {
        repos.innerHTML += `
       <div class="repository">
                   <div class="repo-details">
                    <div class="repo-deets">
                    <h1 class="repo-name"> <a class="repo-link" href="${
                      repositories[i].url
                    }">${repositories[i].name}</a></h1>
                        <p class="repo-fork">Forked from ${repositories[
                          i
                        ].parent.resourcePath.substring(1)}</p>
                    </div>
                        
                       <div class="repo-lang">
                        <span style="background-color: ${
                          repositories[i].primaryLanguage.color
                        }" class="repo-lang-color"></span>
                        <p class="repo-lang-name">${
                          repositories[i].primaryLanguage.name
                        }</p>
                        <p class="repo-lang-fork"><svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg> ${
                          repositories[i].parent.forkCount
                        }</p>
                        <p class="repo-update">Updated on ${repoDate[1]} ${
          repoDate[2]
        }
                        </p>
                       </div>
                        
                   </div>
                   <button class="repo-star">
                    <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                        </path>
                    </svg> Star
                   </button>
               </div>
      `;

        reposMobile.innerHTML += `
       <div class="repository">
                   <div class="repo-details">
                       <div class="repo-deets">
                    <h1 class="repo-name"> <a class="repo-link" href="${
                      repositories[i].url
                    }">${repositories[i].name}</a></h1>
                        <p class="repo-fork">Forked from ${repositories[
                          i
                        ].parent.resourcePath.substring(1)}</p>
                    </div>
                       <div class="repo-lang">
                        <span style="background-color: ${
                          repositories[i].primaryLanguage.color
                        }" class="repo-lang-color"></span>
                        <p class="repo-lang-name">${
                          repositories[i].primaryLanguage.name
                        }</p>
                        <p class="repo-lang-fork"><svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg> ${
                          repositories[i].parent.forkCount
                        }</p>
                        <p class="repo-update">Updated on ${repoDate[1]} ${
          repoDate[2]
        }
                        </p>
                       </div>
                        
                   </div>
                   <button class="repo-star">
                    <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                        </path>
                    </svg> Star
                   </button>
               </div>
      `;
      } else {
        repos.innerHTML += `
       <div class="repository">
                   <div class="repo-details">
                       <h1 class="repo-name"> <a class="repo-link" href="${repositories[i].url}">${repositories[i].name}</a></h1>
                        <p class="repo-update">Updated on ${repoDate[1]} ${repoDate[2]}</p>
                   </div>
                   <button class="repo-star">
                    <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                        </path>
                    </svg> Star
                   </button>
               </div>
      `;

        reposMobile.innerHTML += `
       <div class="repository">
                   <div class="repo-details">
                       <h1 class="repo-name"> <a class="repo-link" href="${repositories[i].url}">${repositories[i].name}</a></h1>
                        <p class="repo-update">Updated on ${repoDate[1]} ${repoDate[2]}</p>
                   </div>
                   <button class="repo-star">
                    <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                        </path>
                    </svg> Star
                   </button>
               </div>
      `;
      }
    }
  })
  .catch((error) => console.error(error));
