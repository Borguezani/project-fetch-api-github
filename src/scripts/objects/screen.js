const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info"> <img src= "${
      user.avatarUrl
    }" alt="Foto do Perfil do usuário"/>
                                    <div class="data">
                                         <h1>${
                                           user.name ??
                                           "Não possui nome cadastrado 😢"
                                         }</h1>
                                         <p>${
                                           user.bio ??
                                           "Não possui bio cadastrada 😢"
                                         }</p>
                                          <div class ="followers">
                                            <p><i>👥</i> <strong>Followers:</strong> ${
                                              user.followers
                                            }<br></p>
                                            <p><i>👥</i> <strong>Following:</strong> ${
                                              user.following
                                            }</p>
                                          </div>
                                    </div>
                                  </div>`;
    let repositoriesItems = "";
    user.repositories.forEach((repo, index) => {
      repositoriesItems += `<li><a href="${repo.html_url}"target="_blank">${repo.name}</a>
                            <div class="repos-info">
                                <span>🍴${repo.forks_count}</span><span>⭐${repo.stargazers_count}</span><span>👀${repo.watchers_count}</span><span>🖥️${user.languages[index]}</span>
                                </div></li>`;
    });
    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
                                    <h2>Repositories</h2>
                                     <ul>${repositoriesItems}</ul>
                                     </div>`;
    }

    let eventsItems = "";
    user.events.forEach((events, index) => {
      const eventName = events.repo.name;
      const eventsCommitMessage = events.payload.commits;
      let eventMessage = "";
      if (eventsCommitMessage) {
        eventMessage = `<p> ${eventsCommitMessage[0].message}</p>`;
      } else {
        eventMessage = `<p>EventCreate without description</p>`;
      }
      eventsItems += `<li><p><strong>${eventName}</strong> - ${user.processedEvents[index]}</p></li><hr>`;
    });
    if (user.events.length > 0) {
      this.userProfile.innerHTML += `<div class="events section">
                                          <h2>Events</h2>
                                          <ul>${eventsItems}</ul>
                                       </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};
export { screen };
