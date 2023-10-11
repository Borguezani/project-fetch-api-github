const user = {
  avatarUrl: "",
  name: "",
  bio: "",
  userName: "",
  followers: "",
  following: "",
  repositories: [],
  events: [],
  languages: [],
  setInfo(gitHubUser) {
    this.avatarUrl = gitHubUser.avatar_url;
    this.name = gitHubUser.name;
    this.bio = gitHubUser.bio;
    this.userName = gitHubUser.login;
    this.followers = gitHubUser.followers;
    this.following = gitHubUser.following;
  },
  setRepositories(repositories) {
    this.repositories = repositories;
  },
  async setEvents(events) {
    const filteredEvents = events.filter(event => event.type === "CreateEvent" || event.type === "PushEvent")
    this.events = filteredEvents;
  },
  setLanguage(languages) {
    this.languages = languages;
  },
};
export { user };
