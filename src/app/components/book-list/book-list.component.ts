import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit{
  Books:any = [];
  constructor(private crudApi:CrudService){}

  ngOnInit(): void {
    this.crudApi.getBooks().subscribe(res=>{
      console.log(res);
      this.Books = res;
    })
  }

  delete(id:any,i:any){
    console.log(id);
    if(window.confirm('are you sure want to delete')){
      this.crudApi.deleteBook(id).subscribe(res=>{
        this.Books.splice(i,1);
      })
    }
  }
}
