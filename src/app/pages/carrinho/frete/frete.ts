import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-frete',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './frete.html',
  styleUrl: './frete.css'
})
export class FreteComponent {
  @Input({ required: true }) cep!: string;
  @Input({ required: true }) frete!: number;
  @Output() cepChange = new EventEmitter<string>();
  @Output() freteChange = new EventEmitter<number>();

  atualizarCep(valor: string): void {
    const digitos = valor.replace(/\D/g, '').slice(0, 8);
    const cepFormatado = digitos.length > 5 ? `${digitos.slice(0, 5)}-${digitos.slice(5)}` : digitos;
    this.cepChange.emit(cepFormatado);
  }

  calcularFrete(): void {
    if (!/^\d{5}-\d{3}$/.test(this.cep)) {
      window.alert('Informe um CEP válido no formato 00000-000.');
    }
  }
}
