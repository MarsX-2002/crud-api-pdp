"use client";
import CardContainer from "@/components/CardContainer";
import { data } from "@/db/db";
import Image, { StaticImageData } from "next/image";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [pokemons, setPokemons] = useState<{
    id: string;
    name: string;
    power: string;
    image: StaticImageData | string;
  }[]>(data);

  const [name, setName] = useState<string>("");
  const [power, setPower] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const [showModal, setShowModal] = useState(false);
  const [updatePokemon, setUpdatePokemon] = useState<{
    id: string;
    name: string;
    power: string;
    image: StaticImageData | string;
  }>({
    id: "",
    name: "",
    power: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState<string>("");

  const newImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setImage(URL.createObjectURL(files[0]));
  };

  const addNewPokemonHandler = () => {
    if (!name || !power || !image) return;

    setPokemons((prev) => [
      ...prev,
      { id: `${Date.now()}`, name, power, image },
    ]);

    setName("");
    setPower("");
    setImage("");
  };

  const deleteHandler = (id: string) => {
    setPokemons((prev) => prev.filter((pokemon) => pokemon.id !== id));
  };

  const updateBtnHandler = (pokemon: {
    id: string;
    name: string;
    power: string;
    image: StaticImageData | string;
  }) => {
    setUpdatePokemon(pokemon);
    setPreviewImage(pokemon.image as string); // Set preview to current image
    setShowModal(true);
  };

  const updatePokemonHandler = () => {
    setPokemons((prev) =>
      prev.map((pokemon) =>
        pokemon.id === updatePokemon.id ? updatePokemon : pokemon
      )
    );
    setShowModal(false);
  };

  return (
    <div className="space-y-6 p-4">
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

      <CardContainer pokemons={pokemons} deleteHandler={deleteHandler} updateBtnHandler={updateBtnHandler} />
      
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 id="modal-title" className="text-xl font-bold mb-4 text-center">
              Update Pokemon
            </h2>

            <label className="block mb-1" htmlFor="pokemon-name">
              Name
            </label>
            <input
              id="pokemon-name"
              type="text"
              placeholder="Name"
              value={updatePokemon.name}
              onChange={(e) =>
                setUpdatePokemon({ ...updatePokemon, name: e.target.value })
              }
              className="border-2 border-gray-300 p-2 w-full rounded"
              required
            />

            <label className="block mb-1 mt-2" htmlFor="pokemon-power">
              Power
            </label>
            <input
              id="pokemon-power"
              type="text"
              placeholder="Power"
              value={updatePokemon.power}
              onChange={(e) =>
                setUpdatePokemon({ ...updatePokemon, power: e.target.value })
              }
              className="border-2 border-gray-300 p-2 w-full rounded"
              required
            />

            <label className="block mb-1 mt-2" htmlFor="pokemon-image">
              Image
            </label>
            <input
              id="pokemon-image"
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  setUpdatePokemon({
                    ...updatePokemon,
                    image: URL.createObjectURL(file),
                  });
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
              className="border-2 border-gray-300 p-2 w-full rounded"
              accept="image/*"
            />

            {previewImage && (
              <div className="mt-2">
                <h3 className="text-md font-semibold">Image Preview:</h3>
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-full h-32 mt-2 rounded"
                />
              </div>
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={updatePokemonHandler}
                className="border-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Update Pokemon
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
