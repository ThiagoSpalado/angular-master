import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators}  from "@angular/forms" ;
import { ActivatedRoute, Router} from "@angular/router";

import { Category } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";

import { switchMap } from "rxjs/operators";

import toastr from "toastr";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

ngAfterContentChecked(){
  this.setPageTitle();
}

//PRIVATE MATHODS

private setCurrentAction(){
  if(this.route.snapshot.url[0].path == "new")
    this.currentAction = "new";
  else
    this.currentAction = "edit";
}

private buildCategoryForm(){
  this.categoryForm = this.formBuilder.group({
    id:[null],
    name: [null, [Validators.required, Validators.minLength(2)]],
    description:[null]
  })
}

private loadCategory(){
  if(this.currentAction == "edit"){

    this.route.paramMap.pipe(
      switchMap(params => this.categoryService.getById(+params.get("id")))
    )
    .subscribe(
      (category) => {
        this.category = category;
        this.categoryForm.patchValue(category) //binds loaded category
      },
      (error) => alert("Ocorreu um erro no servidor")
    )
  }
}

private setPageTitle(){
  if (this.currentAction == "new")
    this.pageTitle = "";
  else{
    const categoryName = this.category.name || "";
    this.pageTitle = "Editando Categoria: " + categoryName;
  }
}

}
