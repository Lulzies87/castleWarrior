import { useSelector } from "react-redux";
import { RootState } from "./store";

export function getPlayerData() {
    return useSelector(({ player }: RootState) => player);
}