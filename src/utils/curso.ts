import { Curso } from "../pages/Cursos/Cursos";

export function semestresParaAnos(semestres: number) {
  if (!semestres) return 0;

  const anos = semestres / 2;
  return anos;
}

export function getSigla(nome: string) {
  if (!nome) return "";

  const nomes = nome.split(" ");

  const siglas = nomes
    .filter((nome) => nome.length > 3) // Filtrar palavras com mais de três letras
    .map((nome) => nome.charAt(0));

  return siglas.join("").toUpperCase();
}

export function getPropriedade<T extends keyof Curso>(curso: Curso, chave: T): Curso[T] {
    return curso[chave];
  }
