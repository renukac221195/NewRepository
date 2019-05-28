<template>
  <div grid-list-xl text-xs-center class="outerTable">
    <v-layout row wrap>
      <v-layout justify-center>
        <v-flex xs8>
          <v-card>
            <v-card-title class="tableTitle">
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
                <v-btn class="btnSelect" @click="addMultipleSelects">Select</v-btn>
              </v-card-actions>
            </v-card-title>
            <v-divider></v-divider>
            <div v-if="loading" class="text-xs-center">
              <v-progress-circular indeterminate color="cyan"></v-progress-circular>
            </div>
            <v-data-table
              v-if="!loading"
              v-model="selected"
              :headers="addHeadersToTable"
              :items="addItemsToTable"
              :search="search"
              select-all
              item-key="id"
              class="elevation-1"
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
                <tr @dblclick="showItem(props.item)">
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
    <v-dialog v-model="dialog" persistent max-width="700px">
      <v-card class="pa-2">
        <v-btn icon @click.native="dialog = false" class="dialogBtn" flat>
          <v-icon>close</v-icon>
        </v-btn>
        <v-card>
          <v-card-title primary-title class="cardTitle">
            <div>
              <span>
                <strong class="cardType">{{ newItem.type }}</strong>
              </span>
            </div>
          </v-card-title>
          <v-card-media :src="newItem.image" :alt="newItem.image" height="350px"></v-card-media>

          <strong>
            <v-card-title class="cardTitle">{{newItem.title}}</v-card-title>
          </strong>
          <v-card-actions>
            <p>{{ newItem.description }}</p>
          </v-card-actions>
        </v-card>
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
      newItem: [],
      loading: false
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
    this.loading = true;
    setTimeout(() => {
      
      this.$store
        .dispatch("fetchTableItems", "/static/TableList.json")
        .then(response => {
          this.loading = false;
          this.flag = true;
          this.items = response.data.tableItems;
          this.headers = response.data.headers;
        });
    }, 1000);
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
      this.$store.dispatch("addMultipleSelects", this.selected);
      console.log(this.selected);
    }
  }
};
</script>

<style scoped>
.outerTable {
  padding:50px;
}
.tableTitle {
  color: #0097A7;
  font-size:25px
}
.btnSelect {
  color: black !important;
  background-color: #66BB6A !important;
}
.cardType {
font-size:22px;
color: #00BCD4;
}
.cardTitle {
font-size:15px;
color: #00BCD4;
}
.dialogBtn {
  color: red;
  float: right;
  z-index: 1;
}
</style>
