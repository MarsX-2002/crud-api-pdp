// CardContainer.tsx

import { DataType, PokemonType, PokemonFormPropsType } from "@/types/types";
import Image from "next/image";

type CardContainerPropsType = {
    pokemons: DataType;
    updateBtnHandler: (pokemon: PokemonType) => void;
    deleteHandler: (id: string) => void;
    formProps: PokemonFormPropsType;  // Add form props type
};

// Form component for adding new Pokemon
function PokemonForm({
    name,
    power,
    setName,
    setPower,
    newImageHandler,
    addNewPokemonHandler,
}: PokemonFormPropsType) {
    return (
        <section className="flex flex-col gap-4 p-2">
            <h1 className="text-2xl font-bold text-center">Pokemon Manager</h1>
            <input
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-gray-300 p-2 rounded"
                type="text"
                placeholder="Name of Pokemon"
                value={name}
            />
            <input
                onChange={(e) => setPower(e.target.value)}
                className="border-2 border-gray-300 p-2 rounded"
                type="text"
                placeholder="Power of Pokemon"
                value={power}
            />
            <input
                type="file"
                onChange={newImageHandler}
                className="border-2 border-gray-300 p-2 rounded"
            />
            <button
                onClick={addNewPokemonHandler}
                className="self-center p-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
                + Create a new Pokemon
            </button>
        </section>
    );
}

export default function CardContainer({
    pokemons,
    updateBtnHandler,
    deleteHandler,
    formProps,
}: CardContainerPropsType) {
    return (
        <div>
            <PokemonForm {...formProps} />

            <section className="flex gap-3 flex-wrap justify-center">
                {pokemons.map((pokemon) => (
                    <div
                        key={pokemon.id}
                        className="border-2 border-gray-300 w-60 rounded shadow-md p-4"
                    >
                        <Image
                            src={pokemon.image}
                            alt="Pokemon image"
                            width={100}
                            height={100}
                            className="w-full h-32 object-cover rounded"
                        />
                        <h2 className="text-xl font-extrabold text-center mt-2">
                            {pokemon.name}
                        </h2>
                        <p className="text-center">Power: {pokemon.power}</p>
                        <div className="flex justify-center gap-5 mt-2">
                            <button
                                className="border-2 border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
                                onClick={() => updateBtnHandler(pokemon)}
                            >
                                Update
                            </button>
                            <button
                                className="border-2 border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
                                onClick={() => deleteHandler(pokemon.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
