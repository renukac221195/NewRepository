<template>
  <div grid-list-xl text-xs-center style="padding=50px">
    <v-layout row wrap>
      <v-layout justify-center>
        <v-flex xs6>
          <v-card>
            <v-card-title class="cyan--text" style="font-size:25px">
              <strong>Table</strong>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-card-actions>
                <v-btn color="green darken-1" @click="addMultipleSelects">Select</v-btn>
              </v-card-actions>
            </v-card-title>
            <v-divider></v-divider>
            <v-data-table
              v-model="selected"
              :headers="addHeadersToTable"
              :items="addItemsToTable"
              :search="search"
              select-all
              item-key="id"
              class="elevation-1"
              hide-actions
            >
              <template v-slot:headers="props">
                <tr>
                  <th>
                    <v-checkbox
                      :input-value="props.all"
                      :indeterminate="props.indeterminate"
                      primary
                      hide-details
                      @click.stop="toggleAll"
                    ></v-checkbox>
                  </th>
                  <th
                    v-for="header in props.headers"
                    :key="header.text"
                    class="black--text"
                    style="font-size:20px"
                  >{{ header.text }}</th>
                </tr>
              </template>
              <template v-slot:items="props">
                <tr @click="showItem(props.item)">
                  <td>
                    <v-checkbox
                      :input-value="props.selected"
                      primary
                      hide-details
                      @click.stop="props.selected = !props.selected"
                    ></v-checkbox>
                  </td>
                  <td>{{ props.item.id }}</td>

                  <td>
                    <v-select
                      :items="props.item.type"
                      :menu-props="{ maxHeight: '400' }"
                      label="Select"
                    ></v-select>
                  </td>
                  <td>{{ props.item.title }}</td>
                  <td>
                    <v-text-field type="text" label="Input"></v-text-field>
                  </td>
                </tr>
              </template>
              <v-alert
                slot="no-results"
                :value="true"
                color="error"
                icon="warning"
              >You searched for "{{ search }}". No results found.</v-alert>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-btn icon @click.native="dialog = false" color="red" flat>
          <v-icon>close</v-icon>
        </v-btn>
        <v-container fluid style="min-height: 0; max-width: 800px" grid-list-lg>
          <v-layout column xs12>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <span>
                    <strong class="cyan--text" style="font-size:22px">{{ newItem.type }}</strong>
                  </span>
                </div>
              </v-card-title>
              <v-card-media :src="newItem.image" :alt="newItem.image" height="350px"></v-card-media>

              <strong>
                <v-card-title class="cyan--text" style="font-size:15px">{{newItem.title}}</v-card-title>
              </strong>
              <v-card-actions>
                <p>{{ newItem.description }}</p>
              </v-card-actions>
            </v-card>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [],
      items: [],
      search: "",
      dialog: false,
      selected: [],
      newItem: []
    };
  },
  computed: {
    addHeadersToTable() {
      return this.$store.getters.addHeadersToTable;
    },
    addItemsToTable() {
      return this.$store.getters.addItemsToTable;
    },
    getMultipleSelects() {
      return this.$store.getters.getMultipleSelects;
    }
  },
  created() {
    this.$store
      .dispatch("fetchTableItems", "/static/TableList.json")
      .then(response => {
        this.flag = true;
        this.items = response.data.tableItems;
        this.headers = response.data.headers;
      });
  },
  methods: {
    showItem(item) {
      this.newItem = item;
      this.dialog = true;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.addItemsToTable.slice();
    },
    addMultipleSelects() {
      let uniqueElements = [];
      uniqueElements.push(this.selected);
      this.$store.dispatch("addMultipleSelects", uniqueElements);
      console.log(uniqueElements);
    }
  }
};
</script>

<style scoped>
</style>
