import data from "./tracks.json";

// tracks.json is written by the /admin panel. Keep these fields in sync with public/admin/config.yml.
export type Track = {
  title: string;
  src: string;
  cover: string;
  volumeMultiplier?: number;
};

export const TRACKS = data as Track[];
