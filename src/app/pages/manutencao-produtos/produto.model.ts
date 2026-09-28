export interface Produto {
  nome: string;
  sku: string;
  categoria: string;
  preco: number;
  estoque: number;
  status: 'Ativo' | 'Inativo';
  imagem: string;
}
