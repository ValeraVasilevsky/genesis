export interface IEssenceResponse {
  _embedded: {
    [key: string]: { id: number }[];
  };
}
