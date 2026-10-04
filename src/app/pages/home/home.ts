import { NgOptimizedImage } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer';
import { MenuComponent } from '../../shared/menu/menu';
import { Produto } from '../manutencao-produtos/produto.model';

type ProdutoVitrine = Pick<Produto, 'nome' | 'categoria' | 'preco' | 'imagem'> & {
  id: number;
  selo: string;
  precoAnterior: number;
  estrelas: number;
  avaliacoes: number;
  seloEscuro?: boolean;
};

type Ordenacao = 'popular' | 'menor' | 'maior';

const produtosIniciais: ProdutoVitrine[] = [
  { id: 1, nome: 'Sofá 3 Lugares Retrátil e Reclinável Linho Cinza', categoria: 'Sofás & Poltronas', selo: '10% OFF', estrelas: 4, avaliacoes: 42, precoAnterior: 6599, preco: 5900, imagem: '/assets/images/sofa2lugares.jpeg' },
  { id: 2, nome: 'Sofá Retrátil Aramis - 2,90m Tecido Bouclé Café', categoria: 'Sofás & Poltronas', selo: '6% OFF', estrelas: 5, avaliacoes: 58, precoAnterior: 5899, preco: 5400, imagem: '/assets/images/sofa2lugares.jpeg' },
  { id: 3, nome: 'Sofá Retrátil e Reclinável 4 Lugares Mola Ensacada', categoria: 'Sofás & Poltronas', selo: '12% OFF', estrelas: 4, avaliacoes: 29, precoAnterior: 6199, preco: 5499, imagem: '/assets/images/sofa4lugares.jpeg' },
  { id: 4, nome: 'Cama de Casal Madeira Maciça Freijó Padrão Queen', categoria: 'Quartos & Camas', selo: 'MADEIRA NOBRE', seloEscuro: true, estrelas: 5, avaliacoes: 34, precoAnterior: 4699, preco: 4483, imagem: '/assets/images/camaNogueira.jpg' },
  { id: 5, nome: 'Cama Box Casal 138 Molas Ensacadas + Pillow Top', categoria: 'Quartos & Camas', selo: '25% OFF', estrelas: 4, avaliacoes: 67, precoAnterior: 2000, preco: 1500, imagem: '/assets/images/camaBox.jpeg' }
];

const produtosAdicionais: ProdutoVitrine[] = [
  { id: 6, nome: 'Mesa de Jantar 6 Lugares Madeira Maciça Imbuia', categoria: 'Jantar & Cadeiras', selo: '8% OFF', estrelas: 5, avaliacoes: 21, precoAnterior: 3290, preco: 2999, imagem: '/assets/images/mesa-jantar.png' },
  { id: 7, nome: 'Poltrona Decorativa Bouclé Pés Palito', categoria: 'Sofás & Poltronas', selo: '15% OFF', estrelas: 4, avaliacoes: 48, precoAnterior: 1190, preco: 999, imagem: '/assets/images/poltrona.jpg' },
  { id: 8, nome: 'Rack para TV até 65 Polegadas Freijó', categoria: 'Sofás & Poltronas', selo: 'LANÇAMENTO', seloEscuro: true, estrelas: 5, avaliacoes: 12, precoAnterior: 2390, preco: 2190, imagem: '/assets/images/mesa.jpg' },
  { id: 9, nome: 'Escrivaninha Home Office 140cm Nogueira', categoria: 'Escritório', selo: '10% OFF', estrelas: 4, avaliacoes: 36, precoAnterior: 1590, preco: 1429, imagem: '/assets/images/mesa.jpg' },
  { id: 10, nome: 'Guarda-Roupa Casal 6 Portas Madeira Clara', categoria: 'Quartos & Camas', selo: '18% OFF', estrelas: 4, avaliacoes: 53, precoAnterior: 3990, preco: 3269, imagem: '/assets/images/camaNogueira.jpg' }
];

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, FormsModule, MenuComponent, FooterComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  readonly produtos = signal(produtosIniciais);
  readonly ordenacao = signal<Ordenacao>('popular');
  readonly categoriaSelecionada = signal('');
  readonly favoritos = signal<ReadonlySet<number>>(new Set());
  readonly maisProdutosCarregados = signal(false);
  readonly produtoSelecionado = signal<ProdutoVitrine | null>(null);
  readonly emailNewsletter = signal('');
  readonly mensagemNewsletter = signal('');

  readonly produtosVisiveis = computed(() => {
    const categoria = this.categoriaSelecionada();
    const produtosFiltrados = this.produtos().filter((produto) => !categoria || produto.categoria === categoria);
    const ordenacao = this.ordenacao();

    if (ordenacao === 'menor') return [...produtosFiltrados].sort((a, b) => a.preco - b.preco);
    if (ordenacao === 'maior') return [...produtosFiltrados].sort((a, b) => b.preco - a.preco);
    return produtosFiltrados;
  });

  readonly ambientes = [
    { nome: 'Salas & Sofás', detalhe: 'Mais de 140 modelos', categoria: 'Sofás & Poltronas', imagem: '/assets/images/sofa2lugares.jpeg' },
    { nome: 'Quartos & Camas', detalhe: 'Camas box e maciças', categoria: 'Quartos & Camas', imagem: '/assets/images/camaNogueira.jpg' },
    { nome: 'Cozinha & Jantar', detalhe: 'Mesas, cadeiras e aparadores', categoria: 'Jantar & Cadeiras', imagem: '/assets/images/mesa-jantar.png' },
    { nome: 'Escritório', detalhe: 'Mesas e estantes de trabalho', categoria: 'Escritório', imagem: '/assets/images/mesa.jpg' }
  ];

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  alterarOrdenacao(event: Event): void {
    const valor = (event.target as HTMLSelectElement).value;
    if (valor === 'popular' || valor === 'menor' || valor === 'maior') {
      this.ordenacao.set(valor);
    }
  }

  alternarFavorito(id: number): void {
    this.favoritos.update((atuais) => {
      const novosFavoritos = new Set(atuais);
      if (novosFavoritos.has(id)) novosFavoritos.delete(id);
      else novosFavoritos.add(id);
      return novosFavoritos;
    });
  }

  carregarMaisProdutos(): void {
    if (this.maisProdutosCarregados()) return;
    this.produtos.update((atuais) => [...atuais, ...produtosAdicionais]);
    this.maisProdutosCarregados.set(true);
  }

  selecionarCategoria(categoria: string): void {
    this.categoriaSelecionada.set(categoria);
  }

  verDetalhes(produto: ProdutoVitrine): void {
    this.produtoSelecionado.set(produto);
  }

  fecharDetalhes(): void {
    this.produtoSelecionado.set(null);
  }

  inscreverNewsletter(event: Event): void {
    event.preventDefault();
    const email = this.emailNewsletter().trim();
    if (!email) return;

    this.mensagemNewsletter.set('O formulário está pronto, mas ainda não há um serviço de envio conectado.');
    this.emailNewsletter.set('');
  }
}
