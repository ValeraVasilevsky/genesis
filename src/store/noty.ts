import { INoty, TNoty } from "@/store/types/INoty";
import { INotyState } from "@/store/types/INotyState";

import { NOTY_TIMEOUT } from "@/constants/noty";

import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useNotyStore = defineStore("noty", {
  state: () =>
    ({
      notyList: [],
    } as INotyState),

  actions: {
    createNoty(noty: INoty) {
      this.notyList.push(noty);
    },
    disposeNoty(notyId: string) {
      const list: INoty[] = JSON.parse(JSON.stringify(this.notyList));
      const index = list.findIndex(({ id }) => id === notyId);

      this.notyList = [...list.slice(0, index), ...list.slice(index + 1)];
    },

    createTemp({ message, type }: { message: string; type: TNoty }): Promise<{
      id: string;
      t: number;
    }> {
      const id = uuidv4();

      this.createNoty({ message, type, id });

      return new Promise((resolve) => {
        const t = setTimeout(() => {
          resolve({ id, t });
        }, NOTY_TIMEOUT);
      });
    },
    async msgTemp({ message, type }: { message: string; type: TNoty }) {
      const { id, t } = await this.createTemp({
        message,
        type,
      });
      clearTimeout(t);

      this.disposeNoty(id);
    },
  },

  getters: {
    notifications: (state) => state.notyList,
  },
});
