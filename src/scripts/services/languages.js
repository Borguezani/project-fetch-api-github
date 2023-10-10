async function getLanguages(userRepositories) {
    const languagesPromises = userRepositories.map(async (repo) => {
    
    const languagesUrl = repo.languages_url;
    const response = await fetch(languagesUrl);
   
    const json = await response.json();
    
    return json;
  });
  const languages = await Promise.all(languagesPromises);
  const primeirosValores = [];
  languages.forEach((language) => {
    if (Object.keys(language).length > 0) {
      // Verifica se o objeto não está vazio
      const key = Object.keys(language)[0]; // Obtém a primeira chave onde está a linguagem correta
      primeirosValores.push(key); 
    } else {
      primeirosValores.push("No language");
    }
  });
  return primeirosValores;
}
export { getLanguages };
