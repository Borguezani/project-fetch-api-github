async function getLanguages(userRepositories) {
  const languagesPromises = await Promise.all(
    userRepositories.map(async (repo) => {
    
      const languagesUrl = repo.languages_url;
      const response = await fetch(languagesUrl);
      
      const json = await response.json();
      
      return json;
    })
  )
    const filteredLanguages = languagesPromises.map(objeto => Object.keys(objeto))//Obtém o array de imagens utilizadas
    const mainLanguage = filteredLanguages.map(array => array[0])// Obtém a primeira chave onde está a linguagem correta
    console.log(mainLanguage)
    return mainLanguage;

}
export { getLanguages };
