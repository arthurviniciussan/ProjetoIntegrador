import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Produto } from '../produto.model';

@Component({
  selector: 'app-tabela-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-produtos.html',
  styleUrl: './tabela-produtos.css'
})
export class TabelaProdutosComponent {
  @Input({ required: true }) produtos: Produto[] = [];

  formatarPreco(preco: number): string {
    return preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
