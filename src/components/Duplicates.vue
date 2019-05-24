<template>
  <div grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-layout justify-center>
        <v-flex xs6>
          <v-card>
            <v-card-title class="cyan--text" style="font-size:25px">
              <strong>Duplicate Table</strong>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              v-model="selected"
              :headers="addHeadersToDuplicateTable"
              :items="addItemsToDuplicateTable"
              :search="search"
              select-all
              item-key="item"
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
                <tr>
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
                    <v-text-field type="text" label="Input"></v-text-field>
                  </td>
                  <td>
                    <v-select
                      :items="props.item.type"
                      :menu-props="{ maxHeight: '400' }"
                      label="Select"
                    ></v-select>
                  </td>
                  <td>{{ props.item.title }}</td>
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

    <!-- <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-container fluid style="min-height: 0; max-width: 1000px" grid-list-lg>
          <v-layout column xs12>
            <v-layout row wrap xs12 offset-sm3>
              <v-flex xs2></v-flex>
              <v-flex xs10>
                <v-card class="my-3">
                  <v-card-title primary-title>
                    <div>
                      <span>
                        <v-avatar size="40px">
                          <img :src="callUserInfo.dp" :alt="callUserInfo.name">
                        </v-avatar>
                      </span>
                      <span>
                        <strong class="blue--text">{{ getClickedFeed.type }}</strong>
                      </span>
                      <br>
                    </div>
                  </v-card-title>
                  <v-card-title class="black--text">{{getClickedFeed.title}}</v-card-title>
                  <v-card-media height="500px">
                    <img :src="getClickedFeed.image" :alt="getClickedFeed.image">
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox></v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-media>
                  <v-card-actions>
                    <p>{{ getClickedFeed.description }}</p>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>-->
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
    addHeadersToDuplicateTable() {
      return this.$store.getters.addHeadersToDuplicateTable;
    },
    addItemsToDuplicateTable() {
      return this.$store.getters.addItemsToDuplicateTable;
    }
  },
  created() {
    this.$store
      .dispatch("fetchDuplicateTableItems", "/static/TableList.json")
      .then(response => {
        this.flag = true;
        this.items = response.data.tableItems;
        this.headers = response.data.headers;
      });
  },
  methods: {
    // arrItem(items) {
    //   this.newItem = items;
    //   // this.dialog = true;
    // },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.addItemsToDuplicateTable.slice();
    }
  }
};
</script>