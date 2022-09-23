import { BetterStorage } from "@/util/BetterStorage";
const util = {
    betterStorage: (key: string) => new BetterStorage(key),
};
export default util;
