import type { Ingrediente } from "./ingrediente.model";

export interface Lanche {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredientes: LancheIngrediente[];
  active: boolean;
}

export interface LancheIngrediente {
  lancheId: number;
  ingredienteId: number;
  ingrediente: Ingrediente;
}

/**
 * ----- @DTOS --------
 */

export interface CreateLancheDTO {
  name: string;
  description: string;
  price: number;
  image: string;
  ingredientIds: number[];
}

export interface UpdateLancheDTO {
  lancheId: number;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredientesId: number[];
}
