import Button from "../components/Button";

const Hero = () => {
    return(
        <section className="relative h-[85vh] w-full bg-black overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center"
                 style={{ backgroundImage: "url('banner.jpg')" }}>

                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 flex h-full flex-col justify-center px-12 lg:w-2/3">
                <div className="flex items-center gap-2 bg-red-600/20 text-red-600 text-[10px] font-bold px-2 py-1 rounded w-fit mb-4">
                    <span>TOP OF THE DAY</span>
                </div>

                <h1 className="text-7xl font-bebas text-white mb-4 tracking-wider uppercase drop-shadow-md">
                    Oppenheimer
                </h1>

                <div className="flex items-center gap-4 text-gray-300 text-sm mb-6">
                    <span className="text-yellow-400 font-bold">★ 8.9</span>
                    <span>2023</span>
                    <span>180 хв</span>
                    <span>Драма / Біографія</span>
                    <span className="border border-gray-600 px-1 text-[10px] rounded">16+</span>
                </div>

                <p className="text-gray-300 text-base leading-relaxed max-w-xl mb-8">
                    Захоплива розповідь про J. Robert Oppenheimer — фізика, що очолив Manhattan Project і змінив хід Другої світової війни, створивши найпотужнішу зброю в історії людства.
                </p>

                <div className="flex gap-4">
                    <Button name="Trailer" size="lg"/>
                    <Button name="+ Add to list" size="lg" variant="secondary"/>
                </div>
            </div>
        </section>
    );
}

export default Hero;