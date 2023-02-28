import axios from 'axios';

//Base da url: https://api.themoviedb.org/3/
 
// Rotas: movie/now_playing?api_key=5c1b8531f276c1b62621cf16a8b00816&language=pt-BR 

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;



