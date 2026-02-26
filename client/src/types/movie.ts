export interface IMovie {
    id: number,
    title: string,
    poster_path: string,
    vote_average: number,
    release_date: string,
    overview: string,
    backdrop_path: string,
    runtime?: number,
    genres?: { id: number; name: string }[],
    credits?: {
        cast: {
            id: number;
            name: string;
            character: string;
        }[];
    },
    recommendations?: {
        results: IMovie[];
    },
    tagline?: string,
    videos?: {
        results: {
            key: string;
            site: string;
            type: string;
            official: boolean;
        }[];
    };
}