import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-add-feedback-page',
  templateUrl: './add-feedback-page.component.html',
  styleUrls: ['./add-feedback-page.component.scss']
})
export class AddFeedbackPageComponent implements OnInit {
    constructor(private elementRef: ElementRef, 
                private feedbackService: FeedbackService,
                private router: Router,
                private toastr: ToastrService,
                private authService: AuthService, 
                private tokenStorage: TokenStorageService) {}
    formGroup!:FormGroup
    public submitted = false;

    ngOnInit(): void {
      this.formGroup = new FormGroup({
        'title':new FormControl('', [Validators.required]),
        'description':new FormControl('', [Validators.required]),
      })
    }
    selects = ['1', '2', '3', '4', '5']
    currentSelect= '5'
    isDropdownOpen=false
    currentContentChanged(newValue: string) {
      this.currentSelect = newValue;
      this.isDropdownOpen=false
    }

    openDropdown() {
      this.isDropdownOpen=!this.isDropdownOpen
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
      if (!this.elementRef.nativeElement.contains(event.target)) {
      
        this.isDropdownOpen=false
      }
    }
    onKeyDown(event: any) {
      event.preventDefault(); 
    }
    submitForm() {
   
      this.submitted = true;
      console.log(this.formGroup.value['title']);
      if(this.formGroup.valid) {
        this.submitted=false

        this.feedbackService.createFeedback(
        this.tokenStorage.getUser().username, 
        this.tokenStorage.getUser().id,
        this.currentSelect, 
        this.formGroup.value['description'],
        this.formGroup.value['title']
        ).subscribe(
          (data)=>{
            this.toastr.success('success');
            this.router.navigate(['/']);
          },
          err=>{
            this.toastr.error('Error ocurrred: '+err.error.error);
          }
        )
      }
    }
}
