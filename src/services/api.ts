import { dummyPeople, dummyPlanet } from "@/dummyData";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface People {
  count: number;
  next: string | null;
  previous: any | null;
  results: Person[];
}

export interface Person {
  name: string;
  height: string | number;
  mass: string | number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string | Date;
  edited: string | Date;
  url: string;
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export const swapiApi = {
  async fetchPeople(link?: string): Promise<People> {
    const response = await fetch(link || "https://swapi.dev/api/people");
    return (await response.json()) as People;
  },
  async fetchPlanet(planet: string): Promise<Planet> {
    const response = await fetch(planet);
    return (await response.json()) as Planet;
  },
  async search(query: string): Promise<People> {
    const response = await fetch(`https://swapi.dev/api/people/?search=${query}`);
    return (await response.json()) as People;
  }
};