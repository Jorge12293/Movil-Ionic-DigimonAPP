import { Pageable } from "./pageable";

export interface Digimons {
  content:  DigimonItem[];
  pageable: Pageable;
}

export interface DigimonItem {
  id:    number;
  name:  string;
  href:  string;
  image: string;
}

