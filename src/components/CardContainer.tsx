export default function CardContainer() {


  return (
    <section className="flex gap-3 flex-wrap justify-center">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="border-2 border-gray-300 w-60 rounded shadow-md p-4">
            <Image
              src={pokemon.image}
              alt="Pokemon image"
              width={100}
              height={100}
              className="w-full h-32 object-cover rounded"
            />
            <h2 className="text-xl font-extrabold text-center mt-2">{pokemon.name}</h2>
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
  );
}