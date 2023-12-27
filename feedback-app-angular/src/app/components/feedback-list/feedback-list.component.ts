import { Component, OnInit } from '@angular/core';
import { Feedback, IComments } from 'src/app/models/IFeedback';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FilterService } from 'src/app/services/filter.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {
  feedbackList:Feedback[]= []
  feedbackListfiltered: Feedback[]=[]
  error=false
  loading=false
  constructor(private feedbackService: FeedbackService, private filterService: FilterService, private tokenStorage : TokenStorageService) {}

  ngOnInit() {
    this.loading=true
    this.getFeedbackList()
    console.log(this.feedbackList);

    this.filterService.getFilterBy().subscribe(data=> {
      this.getFeedbackList()
    })

  }
  

  getFeedbackList() {
    this.feedbackService.getFeedbackList(this.tokenStorage.getUser().id).subscribe(
      (data) => {
        this.feedbackList=data;
        this.feedbackListfiltered = data.filter((item:any)=> {
          if(this.filterService.filterBy.value=='All') {
            return item
          }else {
            return item.rating ==this.filterService.filterBy.value.toLocaleLowerCase()
          }
        }); 
        console.log(this.feedbackListfiltered);
        this.loading=false
    }, (error)=> {
      if(error.error.error = "Unauthorized"){
        this.tokenStorage.signOut();
        window.location.reload();
      }
      this.error=true
      this.loading=false
    });
  }

  countComments(item:IComments[]) {
    let commentsCount  =0
    let totalRepliesCount = 0;
    if(item?.length!=0 &&  item?.length!=undefined) {
      commentsCount = item?.length
       for (let i = 0; i < item.length; i++) {
        if (item[i].replies) {
          totalRepliesCount += item[i].replies.length;
        }
       }
      return totalRepliesCount +  commentsCount
    }
    return 0
  }
}
