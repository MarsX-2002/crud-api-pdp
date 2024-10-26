// page.tsx

"use client";
import CardContainer from "@/components/CardContainer";
import { data } from "@/db/db";
import { DataType, PokemonType, eventType } from "@/types/types";
import { useState } from "react";

export default function Home() {
  const [pokemons, setPokemons] = useState<DataType>(data);

  const [name, setName] = useState<string>("");
  const [power, setPower] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const [showModal, setShowModal] = useState(false);
  const [updatePokemon, setUpdatePokemon] = useState<PokemonType>({
    id: "",
    name: "",
    power: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState<string>("");

  const newImageHandler = (e: eventType) => {
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

  const updateBtnHandler = (pokemon: PokemonType) => {
    setUpdatePokemon(pokemon);
    setPreviewImage(pokemon.image as string);
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
      <CardContainer
        pokemons={pokemons}
        deleteHandler={deleteHandler}
        updateBtnHandler={updateBtnHandler}
        formProps={{
          name,
          power,
          image,
          setName,
          setPower,
          newImageHandler,
          addNewPokemonHandler,
        }}
      />

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Modal content */}
        </div>
      )}
    </div>
  );
}
