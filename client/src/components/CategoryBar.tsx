import Button from "./Button.tsx";
import {useState} from "react";

const CategoryBar = () => {
    const categories = ["All", "Action movie", "Comedy", "Drama", "Horrors", "Fantasy", "Melodrama", "Documentary"];

    const [activeCategory, setActiveCategory] = useState("All");

    return (
        <ul className="flex justify-center p-10 gap-9 flex-wrap">
            {categories.map((category) => (
                <li key={category}>
                    <Button name={category}
                    variant={activeCategory === category ? "primary" : "secondary"}
                    onClick={() => setActiveCategory(category)}/>
                </li>
            ))}
        </ul>
    );
}

export default CategoryBar;