import { GetterTree, ActionTree, MutationTree, Store } from 'vuex'

export const state = () => ({
  encodedListName: "" as string,
  lists: [] as object[],
  books: [] as object[],
  listDescription: {} as object,
  loading: false as boolean
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    getLists: state => state.lists,
    getListDescription: state => state.listDescription,
    getBooks: state => state.books,
    getEncodedListName: state => state.encodedListName,
    getLoadingState: state => state.loading
}

export const mutations: MutationTree<RootState> = {
    setLists: (state, lists: object[]) => (state.lists = lists),
    setListDescription: (state, listDescription: object) => (state.listDescription = listDescription),
    setBooks: (state, books: object[]) => (state.books = books),
    setEncodedList: (state, name) => (state.encodedListName = name),
    setLoading: (state, value) => (state.loading = value) 
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchList({ commit }) {
    commit("setLoading", true);
    const { results: lists } = await this.$axios.$get("lists/names?api-key=CGzMNMWVG9aioFrGGbt54sfJTEQXW7iq");

    commit("setLists", lists);
    commit("setLoading", false);
  },
  async fetchBooks({ commit, getters }) {
    commit("setLoading", true);
    // Check if no books are present
    if (!getters.getBooks.length) {
      const rand = Math.floor(Math.random() * (getters.getLists.length - 0) + 0);
      const { list_name_encoded: listNameEncoded } = getters.getLists[rand]
      
      commit("setEncodedList", listNameEncoded);
    }
    // Get the books
    const { results: { books }, results: listDescription } = await this.$axios.$get(`lists/current/${getters.getEncodedListName}.json?api-key=CGzMNMWVG9aioFrGGbt54sfJTEQXW7iq`);
    
    commit("setBooks", books);
    commit("setListDescription", listDescription);
    commit("setLoading", false);
  },
  getNewBooksFromList({ commit, dispatch }, list) {
    const {  list_name_encoded: listNameEncoded } = list;
    
    commit("setEncodedList", listNameEncoded);
    dispatch("fetchBooks");
  }
}
