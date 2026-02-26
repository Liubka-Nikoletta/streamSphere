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

export const fetchPopularMovies = async (page: number = 1): Promise<IMovie[]> => {
    try{
        const today = new Date().toISOString().split('T')[0];

        const response = await tmdbApi.get('/discover/movie', {
            params: {
                language: 'en-US',
                page: page,
                sort_by: 'popularity.desc',
                'release_date.lte': today,
                with_release_type: '2|3',
                include_video: true
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
                language: 'en-US',
                append_to_response: 'credits,recommendations,videos'
            }
        });
        return response.data;
    }catch(error){
        console.error("TMDB Error:", error);
        return null;
    }
}

export const fetchGenres = async () => {
    try{
        const response = await tmdbApi.get('genre/movie/list', {
            params: {
                language: 'en-US'
            }
        });
        return response.data.genres;
    }catch(error){
        console.error("TMDB Error:", error);
        return [];
    }
}