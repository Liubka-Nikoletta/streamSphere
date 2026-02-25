export interface IMovie {
    id: number,
    title: string,
    poster_path: string,
    vote_average: number,
    release_date: string,
    overview: string,
    backdrop_path: string,
    runtime?: number;
    genres?: { id: number; name: string }[];
}