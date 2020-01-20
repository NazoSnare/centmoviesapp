import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit, OnDestroy{

  allMovies=[];
  movieSubscription:Subscription;
  constructor(
    private movieService:MoviesService,
    private router: Router
  ) {
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.movieSubscription.unsubscribe();
  }

  ionViewWillLeave(){
    this.movieSubscription.unsubscribe();
  }

  ionViewWillEnter(){
    this.movieSubscription = this.movieService.getAllMovies().subscribe(data => {
      console.log(data);
      if(data["success"]){
         this.allMovies = data["movies"];
      }
  });
  }

  ngOnInit() {
     this.movieSubscription = this.movieService.getAllMovies().subscribe(data => {
         console.log(data);
         if(data["success"]){
            this.allMovies = data["movies"];
         }
     });
  }
  
  editMovie(movie){
    console.log(movie);
    this.movieService.selectedMovie.next(movie);
    this.router.navigate(['/edit']);

  }
}
