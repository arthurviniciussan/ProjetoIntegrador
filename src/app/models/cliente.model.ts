export type StatusCliente = 'Ativo' | 'Inativo';

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cadastro: string;
  status: StatusCliente;
}

export type DadosCliente = Pick<Cliente, 'nome' | 'email' | 'telefone' | 'status'>;
