import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FilterService } from 'src/app/services/filter.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {
[x: string]: any;
  constructor(private elementRef: ElementRef, private filterService: FilterService,private feedbackService:FeedbackService,
    private tokenStorage:TokenStorageService,
    private router:Router) {}
  contents =['Most Upvotes', 'Least Upvotes','Most Comments', 'Least Comments']
  currentContent=''
  isDropdownOpen=false
  suggestionCount=0

  @Input() route ='/'
  currentContentChanged(newValue: string) {
  
    
  }

  ngOnInit(): void {
   
    this.getSuggestionCount()
    this.filterService.getFilterBy().subscribe(data=> {
      this.getSuggestionCount()
    })
    
  }

  getSuggestionCount() {
    this.feedbackService.getFeedbackList(this.tokenStorage.getUser().id).subscribe(data=> {
      this.suggestionCount = data.filter((item:any)=> {
        if(this.filterService.filterBy.value=='All') {
          return item
        }else {
          return item.rating ==this.filterService.filterBy.value.toLocaleLowerCase()
        }
      }).length
    })
  }
 
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
    
      this.isDropdownOpen=false
    }
  }
}
