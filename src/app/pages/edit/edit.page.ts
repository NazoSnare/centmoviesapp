import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit, OnDestroy {

  genre:string ="";
  title:string ="";
  description:string ="";
  id:string ="";
  selectedMovieSubscription: Subscription;
  movieForm: FormGroup;
  isLoadingResults: boolean = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private movieService: MoviesService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { 

  }

  ngOnInit() {
    this.movieForm = this.formBuilder.group({
      'genre' : [null, Validators.required],
      'title' : [null, Validators.required],
      'description' : [null, Validators.required]
    });
    
   this.selectedMovieSubscription = this.movieService.selectedMovie.subscribe(data => {
     console.log(data);
     this.id = data["id"];
     this.movieForm.setValue({
      title: data["title"],
      genre: data["genre"],
      description: data["description"]
    });

    });

   
  }

  ngOnDestroy(): void {
   this.selectedMovieSubscription.unsubscribe();
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

  //went with an impure function 
  onUpdateMovie(){
    this.isLoadingResults = true;
    console.log(this.movieForm.value);
    this.movieService.editMovie(this.id, this.movieForm.value)
      .subscribe((res: any) => {
        console.log("RESPONSE",res);
        if(res["success"]){
          this.router.navigate(['/list']);
        }
          this.isLoadingResults = false;
          
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );

  }

  deleteMovie(){
    this.isLoadingResults = true;
    this.movieService.deleteMovie(this.id).subscribe(data => {
       if(data["success"]){
        this.router.navigate(['/list']);
       }
       this.isLoadingResults = false;
    });
  }

}
