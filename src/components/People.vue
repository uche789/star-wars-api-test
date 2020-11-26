<template>
  <div class="people">
    <Message v-if="error" @close="error = ''"
      ><template #body>{{ error }}</template></Message
    >

    <Pagination
      :count="pages"
      :previous="people.previous"
      :next="people.next"
      @selected="selectedPage"
      v-if="results.length > 0"
    >
      Pages {{ count }} of {{ pages }}
    </Pagination>

    <Search @search="search" />

    <div class="people__list" v-if="results.length > 0">
      <button class="button" @click="fetchAll">Fetch all</button>
      <table class="table">
        <thead>
          <tr>
            <th
              scope="col"
              v-for="heading in headings"
              :key="heading"
              class="people__list-heading"
              @click="sort(heading)"
            >
              {{ heading }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results" :key="index">
            <td>{{ result.name }}</td>
            <td>{{ result.height }}</td>
            <td>{{ result.mass }}</td>
            <td>{{ getDateString(result.created) }}</td>
            <td>{{ getDateString(result.edited) }}</td>
            <td>
              <a @click="getPlanet(result.homeworld, result.name)">Link</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal @close="show = false" :show="show">
      <template #title>{{ planet.name }}</template>
      <template #body>
        <PlanetInfo :planet="planet" />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "@/components/Modal.vue";
import { People, Person, Planet } from "@/services/api";
import { State } from "@/store";
import { cloneDeep, sortBy } from "lodash";
import PlanetInfo from "@/components/PlanetInfo.vue";
import Pagination from "@/components/Pagination.vue";
import Message from "@/components/Message.vue";
import Search from "@/components/Search.vue";

const headings = {
  name: "Name",
  height: "Height",
  mass: "Mass",
  created: "Created",
  edited: "Edited",
  homeworld: "Planet"
};

export default Vue.extend({
  components: {
    Modal,
    PlanetInfo,
    Pagination,
    Message,
    Search
  },
  data: () => ({
    show: false,
    results: [] as Person[],
    error: "" as string,
    count: 1,
    headings: Object.values(headings)
  }),
  computed: {
    planet(): Planet | null {
      return cloneDeep((this.$store.state as State).planet);
    },
    people(): People | null {
      return cloneDeep((this.$store.state as State).people);
    },
    pages(): number {
      return Math.ceil(this.people ? this.people.count / 10 : 0);
    }
  },
  watch: {
    people(value: People) {
      if (!value) return;

      this.results = value.results;
    }
  },
  async created(): Promise<void> {
    await this.fetch();
  },
  methods: {
    getDateString(date: Date) {
      return date.toLocaleDateString();
    },
    sort(heading: string) {
      if (heading === headings.homeworld) {
        return;
      }

      this.results = sortBy(this.results, [heading.toLowerCase()]).reverse();
    },
    async fetchAll() {
      await this.fetch();
    },
    async selectedPage(value: string) {
      const count = parseInt(
        value.replace("http://swapi.dev/api/people/?page=", "")
      );
      this.count = Number.isNaN(count) ? 1 : count;
      await this.fetch(value);
    },
    async search(query?: string): Promise<void> {
      this.count = 1;
      try {
        await this.$store.dispatch("search", query);
      } catch {
        this.error = `Something must have happend! We couldn't fetch the list of Star Wars aliens!!`;
      }
    },
    async fetch(value?: string): Promise<void> {
      try {
        await this.$store.dispatch("fetchPeople", value);
      } catch {
        this.error = `Something must have happend! We couldn't fetch the list of Star Wars aliens!!`;
      }
    },
    async getPlanet(link: string, name: string): Promise<void> {
      try {
        await this.$store.dispatch("fetchPlanet", link);
        this.show = true;
      } catch {
        this.error = `Something must have happend! We couldn't fetch the planet details for ${name}`;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.people {
  &__list {
    overflow: auto;

    .table {
      margin: auto;
    }
  }
}
</style>
