import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "sliceFav",
  initialState: {
    nomEquipe: "Mon equipe",
    liste: [],
  },
  reducers: {
    modifierNomEquipe: (state, action) => {
      state.nomEquipe = action.payload;
    },
    ajouterPokemon: (state, action) => {
      if (state.liste.length < 6) {
        state.liste.push(action.payload);
      }
    },
    supprimerPokemon: (state, action) => {
      state.liste.splice(action.payload, 1);
    },
  },
});

export const { modifierNomEquipe, ajouterPokemon, supprimerPokemon } =
  favSlice.actions;
export default favSlice.reducer;
