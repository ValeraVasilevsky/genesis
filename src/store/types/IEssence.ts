import { IDropdownItem } from "@/types/IDropdownItem";

export type TEssence = "leads" | "contacts" | "companies";

export interface IEssence extends IDropdownItem {
  type: TEssence;
}
