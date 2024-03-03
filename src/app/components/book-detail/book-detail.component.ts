import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  getId: any;
  updateForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private activatedRoute: ActivatedRoute,
              private crudApi: CrudService) {}

  ngOnInit(): void {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudApi.getBook(this.getId).subscribe(res => {
      if (res) {
        this.updateForm.patchValue({ 
          name: res['name'],
          price: res['price'],
          description: res['description']
        });
      }
    });

    this.updateForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    });
  }

  onUpdate(): void {
    this.crudApi.updateBook(this.getId, this.updateForm.value).subscribe(res => {
      console.log("Data Updated Successfully");
      this.ngZone.run(() => { this.router.navigateByUrl('/books-list'); });
    }, (err) => {
      console.log(err);
    });
  }
}
