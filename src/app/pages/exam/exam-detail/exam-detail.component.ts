import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';
import { ActivatedRoute } from '@angular/router';
import { Exam } from 'src/app/models/exam.model';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit {
  exam: Exam;
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private examService: ExamService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if (data["key"]) {
        this.getExam(data["key"]);
      }
    })
  }

  getExam(key: string) {
    this.examService.get(key).subscribe(data => {
      this.exam = data;
      this.isLoading = true;
    })
  }

}
