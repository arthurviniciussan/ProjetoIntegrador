import { Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro';
import { CarrinhoComponent } from './pages/carrinho/carrinho';
import { HomeComponent } from './pages/home/home';
import { ManutencaoProdutosComponent } from './pages/manutencao-produtos/manutencao-produtos';
import { LoginComponent } from './pages/login/login';
import { ClientesComponent } from './pages/clientes/clientes';
import { Produtos } from './pages/produtos/produtos';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'cadastro', component: CadastroComponent },
	{ path: 'carrinho', component: CarrinhoComponent },
	{ path: 'manutencao-produtos', component: ManutencaoProdutosComponent },
	{ path: 'clientes', component: ClientesComponent },
	{ path: 'login', component: LoginComponent },
  { path: 'produtos', component: Produtos },
	{ path: '**', redirectTo: '' }
];
