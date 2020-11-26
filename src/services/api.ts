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
  height: string;
  mass: string;
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
  created: string;
  edited: string;
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

// export const swapiApi = {
//   async fetchPeople(link?: string): Promise<People> {
//     const response = await fetch(link || "https://swapi.dev/api/people");
//     return (await response.json()) as People;
//   },
//   async fetchPlanet(planet: string): Promise<Planet> {
//     const response = await fetch(planet);
//     return (await response.json()) as Planet;
//   }
// };

export const swapiApi = {
  async fetchPeople(link: string): Promise<People> {
    if (link === 'http://swapi.dev/api/people/?page=2') {
      dummyPeople.next = 'http://swapi.dev/api/people/?page=3'
      dummyPeople.previous = 'http://swapi.dev/api/people'
    }

    if (link === 'http://swapi.dev/api/people/?page=3') {
      dummyPeople.next = null
      dummyPeople.previous = 'http://swapi.dev/api/people/?page=2'
    }
    return new Promise((resolve, reject) => {
      // reject(new Error('mistake'))
      resolve(dummyPeople);
    });
  },
  async fetchPlanet(_planet: string): Promise<Planet> {
    return new Promise((resolve, reject) => {
      reject(new Error('mistake'))
      // resolve(dummyPlanet);
    });
  }
};
