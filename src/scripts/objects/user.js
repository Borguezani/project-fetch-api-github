const user = {
  avatarUrl: "",
  name: "",
  bio: "",
  userName: "",
  followers: "",
  following: "",
  repositories: [],
  events: [],
  processedEvents: [],
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
    this.events = events;
    await this.processingGitHubEvents(events);
  },
  async processingGitHubEvents(events) {
    const processedEvents = [];
    events.forEach((event) => {
      console.log(event);
      switch (event.type) {
        case "PushEvent":
          processedEvents.push(
            `Push Event: ${event.payload.commits[0].message}`
          );
          break;
        case "CreateEvent":
          if (!event.payload.description) {
            processedEvents.push(`Create Event: No description`);
          } else {
            processedEvents.push(`Create Event: ${event.payload.description}`);
          }
          break;
        case "PublicEvent":
          processedEvents.push(`Public Event: Public repository`);
          break;
        case "WatchEvent":
          processedEvents.push(`Watch Event: Watching`);
          break;
        default:
          processedEvents.push("Unknown event");
      }
    });
    this.processedEvents = processedEvents;
  },
  setLanguage(languages) {
    this.languages = languages;
  },
};
export { user };
