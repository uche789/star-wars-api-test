import Vue from "vue";
import Vuex, { ActionTree, MutationTree } from "vuex";
import { swapiApi, Planet, People } from "@/services/api";

Vue.use(Vuex);

export interface State {
  people: People | null;
  planet: Planet | null;
}

const state = (): State => ({
  people: null,
  planet: null
});

export const storeConfig = {
  state,
  mutations: {
    setPeople(state: State, payLoad: People) {
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
    async fetchPlanet({ commit }, link: string) {
      const data = await swapiApi.fetchPlanet(link);
      commit("setPlanet", data);
    }
  } as ActionTree<State, State>,
  modules: {}
};

export type Store = typeof storeConfig;

export default new Vuex.Store(storeConfig);
