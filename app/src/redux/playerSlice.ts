import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PlayerData = {
  nickname: string;
//   score: number;
//   hp: number;
  highscore: number;
};

const initialState: PlayerData = {
  nickname: "",
//   score: 0,
//   hp: 100,
  highscore: 0,
};

const playerSlice = createSlice({
  name: "playerData",
  initialState,
  reducers: {
    setNickname(state, action: PayloadAction<string>) {
        state.nickname = action.payload;
    },
    // updateScore(state, action: PayloadAction<number>) {
    //   state.score += action.payload;
    //   if (state.score > state.highscore) {
    //     state.highscore = state.score;
    //   }
    // },
    // updateHp(state, action: PayloadAction<number>) {
    //   state.hp += action.payload;
    //   if (state.hp > 100) {
    //     state.hp = 100;
    //   } else if (state.hp <= 0) {
    //     state.hp = 0;
    //   }
    // },
    setHighscore(state, action: PayloadAction<number>) {
      state.highscore = action.payload;
    },
  },
});

export const { setNickname, setHighscore } = playerSlice.actions;

export const playerReducer = playerSlice.reducer;
