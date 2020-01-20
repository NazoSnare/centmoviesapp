import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ServerResponse } from '../models/server-response';

const serverUrl = "http://127.0.0.1:3000/api/v1/movies";
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private http: HttpClient
  ) { 

  }

  selectedMovie = new BehaviorSubject({});

  /**
   * Returns all movies as observable
   */
  getAllMovies(){
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    return this.http.get(`${serverUrl}`);
  }

  /**
   * Edits the movie with the passed in id
   * @param id the id of the movie  -string 
   */
  editMovie(id:string,body){
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    return this.http.put(`${serverUrl}/${id}`,body, {headers});
  }

  /**
   * Deletes the movie with the passed in id
   * @param id the id of the movie - string
   */
  deleteMovie(id:string){
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    return this.http.delete(`${serverUrl}/${id}`);
  }

  


  addMovie(body){
   
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    return this.http.post(`${serverUrl}`,body,{
      headers
    });
  }

  /**
   * Returns a movie by the given id from the api
   * @param id Id of the movie - string
   */
  getSingleMovie(id:string){
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    headers.append
    return this.http.get(`${serverUrl}/${id}`);
  }

}
