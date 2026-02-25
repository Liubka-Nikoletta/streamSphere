import Button from "./Button.tsx";
import {useEffect, useState} from "react";
import {fetchGenres} from "../api/tmdb.ts";
import type {IGenre} from "../types/genre.ts";

const CategoryBar = () => {
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | number>("All");

    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchGenres();
            setGenres([{id: "All", name: "All"}, ...data]);
        }
        getCategories();
    }, [])

    return (
        <ul className="flex justify-center p-10 gap-9 flex-wrap">
            {genres.map((genre) => (
                <li key={genre.id}>
                    <Button name={genre.name}
                    variant={activeCategory === genre.id ? "primary" : "secondary"}
                    onClick={() => setActiveCategory(genre.id)}/>
                </li>
            ))}
        </ul>
    );
}

export default CategoryBar;