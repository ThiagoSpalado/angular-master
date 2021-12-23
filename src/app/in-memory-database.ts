import {InMemoryDbService} from "angular-in-memory-web-api";
import {Category} from "./pages/categories/shared/category.model";
import { Entry } from "./pages/entries/shared/entry.model";


export class InMemoryDatabase implements InMemoryDbService {
    createDb(){
        const categories: Category[] = [
            { id: 1, name: 'Moradia', description:'Pagamentos de contas da casa'},
            { id: 2, name: 'Saude', description:'Remedios'},
            { id: 3, name: 'Lazer', description:'Cinema, parques, praia, etc'},
            { id: 4, name: 'Salario', description:'Recebimento de Salario'},
            { id: 5, name: 'Freelas', description:'Trabalhos com freelancer'}
        ];

        const entries: Entry[] = [
            { id: 1, name: 'Moradia', categoryId: categories[0].id, category: categories[0], paid: true, date: "10/10/2018", amount: "70,00", type: "expense", description: "descricao da despesa" } as Entry
        ];

        return {categories, entries}
    }
}