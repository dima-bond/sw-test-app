export const getAllFilms = () => fetch('https://swapi.dev/api/films/')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });
