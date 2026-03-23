import Button from "./Button.tsx";
import {useEffect, useState} from "react";
import {fetchGenres} from "../api/tmdb.ts";
import type {IGenre} from "../types/genre.ts";

interface CategoryBarProps {
    activeCategory: number | string;
    onCategoryChange: (id: string | number) => void;
}

const CategoryBar = ({activeCategory, onCategoryChange}: CategoryBarProps) => {
    const [genres, setGenres] = useState<IGenre[]>([]);

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
                    onClick={() => onCategoryChange(genre.id)}/>
                </li>
            ))}
        </ul>
    );
}

export default CategoryBar;