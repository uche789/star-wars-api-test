import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import People from "@/components/People.vue";
import { State, storeConfig } from "@/store";
import { swapiApi } from "@/services/api";
import { dummyPeople, dummyPlanet } from "@/dummyData";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("@/services/api");

describe("People.vue", () => {
  let store: Store<State>;
  (swapiApi.fetchPeople as jest.Mock).mockResolvedValue(dummyPeople);
  (swapiApi.fetchPlanet as jest.Mock).mockResolvedValue(dummyPlanet);

  beforeEach(() => {
    store = new Vuex.Store(storeConfig);
  });

  it("is vue instance", () => {
    const wrapper = shallowMount(People, {
      localVue,
      store
    });
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.find(".people").exists()).toBe(true);
  });

  it("displays results", async () => {
    const wrapper = shallowMount(People, {
      localVue,
      store
    });

    await flushPromises();
    expect(wrapper.find(".people__list").exists()).toBe(true);
  });
});
