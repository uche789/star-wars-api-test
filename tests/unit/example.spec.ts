import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import People from "@/components/People.vue";
import { State, storeConfig } from "@/store";
import { swapiApi } from "@/services/api";
import { dummyPeople, dummyPlanet } from "@/dummyData";
// import Modal from "@/components/People.vue";

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

  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(People, {
      propsData: { msg },
      localVue,
      store
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
