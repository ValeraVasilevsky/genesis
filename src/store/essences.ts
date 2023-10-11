import { defineStore } from "pinia";

import { http } from "@/api/http";

import { IEssence } from "@/store/types/IEssence";
import { IEssenceResponse } from "@/store/types/IEssenceResponse";
import { IEssenceState } from "@/store/types/IEssenceState";

import { SESSION } from "@/constants/sessionStorage";

export const useEssenceStore = defineStore("essence", {
  state: () =>
    ({
      essences: [],
    } as IEssenceState),

  actions: {
    async createEssence({ title, type }: IEssence) {
      const {
        data: {
          _embedded: {
            [type]: [{ id }],
          },
        },
      } = await http.post<IEssenceResponse>("essence", {
        title,
        type,
      });

      this.essences = [...this.essences, { id, title }];

      this.setEssencesToSessionStorage();
    },

    setEssencesToSessionStorage() {
      sessionStorage.setItem(SESSION.ESSENCES, JSON.stringify(this.essences));
    },

    getEssences() {
      const sessionEssences = sessionStorage.getItem(SESSION.ESSENCES);

      this.essences = sessionEssences?.length
        ? JSON.parse(sessionEssences)
        : [];
    },
  },
});
