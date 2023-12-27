import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { IComments, IReplies } from '../models/IFeedback'
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl = 'http://localhost:8080';
  constructor(private db: AngularFireDatabase,private http: HttpClient) {}
  getFeedbackList(id:number): Observable<any> {
    return this.http.get<any[]>(`http://localhost:8080/submitForm/showFeedback?id=`+id).pipe(
      map(data => data.map(item => ({
        id: item.id,
        title: item.title || '', 
        userId: item.userId,
        userName: item.userName,
        rating: item.rating.toString(),
        comment: item.comment,
        commentDate: item.commentDate
      })))
    );
  }
  
  createFeedback(userName: string,
    userId:number, 
    rating: string,
    comment:string,
    title:string) {
    return this.http.post(`http://localhost:8080/submitForm/submit`, {
      userName,
      userId,
      rating,
      comment,
      title
    },httpOptions);
     
  }

  upvotedFeedback(id:number, upvoted:boolean,upvotes:number) {
    return this.db.object(`${id}`).update({
      upvoted: !upvoted,
      upvotes: !upvoted ? upvotes+1: upvotes-1
    })
  }

  
  deleteFeedback(id:number) {
    return this.db.object(`/${id}`).remove()
  }
  addComment(id:number,comments:IComments,lastIndex:number) {
    return this.db.object(`${id+'/comments'+"/"+lastIndex}`).update({
        content:comments.content,
        id: comments.id,
        user: {
          image:"./assets/user-images/image-victoria.jpg",
          name:"Victoria Mejia",
          username:"arlen_the_marlin"
        },
        replies:[]
    })
  }

  addReplyComment(id:number, commentIndex:number, replyIndex:number, data:IReplies) {
    return this.db.object(`${id}/comments/${commentIndex}/replies/${replyIndex}`).update({
      content:data.content,
      replyingTo: data.replyingTo,
      user: {
        image:"./assets/user-images/image-victoria.jpg",
        name:"Victoria Mejia",
        username:"arlen_the_marlin"
      }
  })
  }
}
