import axios from 'axios';
import type {IMovie} from "../types/movie.ts";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${API_TOKEN.trim()}`,
        'Accept': 'application/json'
    }
})

export const fetchPopularMovies = async (): Promise<IMovie[]> => {
    try{
        const response = await tmdbApi.get('/movie/popular', {
            params: {
                language: 'en-US',
                page: 1
            }
        });
        return response.data.results;
    }catch(error){
        console.error("TMDB Error:", error);
        return [];
    }
}

export const fetchTrendingMovie = async (): Promise<IMovie[]> => {
    try{
        const response = await tmdbApi.get('/trending/movie/day', {
            params: {
                language: 'en-US',
                page: 1
            }
        });
        return response.data.results;
    }catch(error){
        console.error("TMDB Error:", error);
        return [];
    }
}


export const fetchMovieDetails = async (id: number) => {
    try {
        const response = await tmdbApi.get(`/movie/${id}`, {
            params: {
                language: 'en-US'
            }
        });
        return response.data;
    }catch(error){
        console.error("TMDB Error:", error);
        return null;
    }
}