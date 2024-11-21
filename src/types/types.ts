import { StaticImageData } from "next/image";

export type PokemonType = {
    id: string;
    name: string;
    power: string;
    image: StaticImageData | string;
}

export type DataType = PokemonType[];

export type eventType = React.ChangeEvent<HTMLInputElement>;


export type PokemonFormPropsType = {
    name: string;
    power: string;
    image: string;
    setName: (value: string) => void;
    setPower: (value: string) => void;
    newImageHandler: (e: eventType) => void;
    addNewPokemonHandler: () => void;
};
