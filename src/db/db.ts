import p from '@/images/pikachu.jpg';
import b from "@/images/bulbasaur.jpeg";
import s from "@/images/squirtle.png";
import ch from "@/images/charmander.png"
import { StaticImageData } from 'next/image';

export const data: {id: string, name: string, power: string, image: StaticImageData  }[] = [
    {
        id: "1",
        name: 'Pikachu',
        power: '3',
        image: p,
    },
    {
        id: '2',
        name: 'Bulabasaur',
        power: '2',
        image: b
    },
    {
        id: '3',
        name: 'Squirtle',
        power: '2',
        image: s
    },
    {
        id: '4',
        name: 'charmander',
        power: '2',
        image: ch
    }
]