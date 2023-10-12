import { getUser } from "./services/User.js";
import { getRepositories } from "./services/repositories.js";
import { getEvents } from "./services/events.js";
import { getLanguages } from "./services/languages.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  if (validateEmptyInput(userName)) return;
  getUserData(userName); 
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;
  if (isEnterKeyPressed) getUserData(userName);
  if (validateEmptyInput(userName)) return;
});

function validateEmptyInput(userName) {
  if (userName.length === 0) {
    alert("Fill in the field with your GitHub user name");
    return true;
  }
}

async function getUserData(userName) {
  const userResponse = await getUser(userName);
  if (userResponse.message === "Not Found") {
    screen.renderNotFound();
    return;
  }

  const repositoriesResponse = await getRepositories(userName);
  const eventsResponse = await getEvents(userName);

  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);
  user.setEvents(eventsResponse);

  const languageResponse = await getLanguages(user.repositories);
  
  user.setLanguage(languageResponse);
  screen.renderUser(user);
};
