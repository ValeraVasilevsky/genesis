export type TNoty = "success" | "error";

export interface INoty {
  id: string;
  message: string;
  type: TNoty;
}
