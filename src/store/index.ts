import Vue from "vue";
import Vuex, { ActionTree, MutationTree } from "vuex";
import { swapiApi, Planet, People, Person } from "@/services/api";

Vue.use(Vuex);

export interface State {
  people: People | null;
  planet: Planet | null;
}

const state = (): State => ({
  people: null,
  planet: null
});

export function formatResult(result: Person) {
  result.created = new Date(result.created);
  result.edited = new Date(result.edited);
  result.height = Number(result.height);
  result.mass = Number(result.mass);
  return result;
}

export const storeConfig = {
  state,
  mutations: {
    setPeople(state: State, payLoad: People) {
      payLoad.results.map((result: Person) => formatResult(result));
      state.people = payLoad;
    },
    setPlanet(state: State, payLoad: Planet) {
      state.planet = payLoad;
    }
  } as MutationTree<State>,
  actions: {
    async fetchPeople({ commit }, link: string) {
      const data = await swapiApi.fetchPeople(link);
      commit("setPeople", data);
    },
    async search({ commit }, query: string) {
      const data = await swapiApi.search(query);
      commit("setPeople", data);
    },
    async fetchPlanet({ commit }, link: string) {
      const data = await swapiApi.fetchPlanet(link);
      commit("setPlanet", data);
    }
  } as ActionTree<State, State>,
  modules: {}
};

export type Store = typeof storeConfig;

export default new Vuex.Store(storeConfig);
