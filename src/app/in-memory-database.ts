import {InMemoryDbService} from "angular-in-memory-web-api";
import {Category} from "./pages/categories/shared/category.model";

export class InMemoryDatabase implements InMemoryDbService {
    createDb(){
        const categories: Category[] = [
            { id: 1, name: 'Moradia', description:'Pagamentos de contas da casa'},
            { id: 2, name: 'Saude', description:'Remedios'},
            { id: 3, name: 'Lazer', description:'Cinema, parques, praia, etc'},
            { id: 4, name: 'Salario', description:'Recebimento de Salario'},
            { id: 5, name: 'Freelas', description:'Trabalhos com freelancer'}
        ];

        return {categories}
    }
}