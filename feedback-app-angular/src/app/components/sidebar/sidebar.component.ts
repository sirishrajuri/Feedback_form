import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FilterService } from 'src/app/services/filter.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  filters=['All','1', '2', '3', '4', '5']
  currentFilter = ''
  plannedCount=0
  inProgressCount =0
  liveCount=0
  username:string = "";
  constructor(private filterService: FilterService, private feedbackService:FeedbackService,private tokenStorage: TokenStorageService) {}
  
  editCurrentFilter(filter:string)  {
    this.filters.forEach(item=> {
     if(filter==item) {
  
      this.filterService.filterBy.next(filter)
     }
    })
  }
  ngOnInit(): void {
    this.filterService.getFilterBy().subscribe(data=> {
      this.currentFilter=data
    })
    this.username =  this.tokenStorage.getUser().username;
    // this.feedbackService.getFeedbackList().subscribe(data=> {
    //   this.plannedCount = data.filter(item=>item.status=='planned').length
    //   this.inProgressCount = data.filter(item=>item.status=='in-progress').length
    //   this.liveCount = data.filter(item=>item.status=='live').length
    // })
  }
  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
