import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, BaseChartDirective, Label } from "ng2-charts";
import { QuizService } from "src/app/services/quiz.service";
import { CategoryService } from "src/app/services/category.service";
import { ExamService } from "src/app/services/exam.service";
import { UserService } from "src/app/services/user.service";
import { Exam } from "src/app/models/exam.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  monthlyData = [];
  public lineChartData: ChartDataSets[] = [
    {
      data: this.monthlyData,
      label: "Count"
    }
  ];
  public lineChartLabels: Label[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: "March",
          borderColor: "orange",
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: "orange",
            content: "LineAnno"
          }
        }
      ]
    }
  };
  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];
  public lineChartLegend = false;
  public lineChartType = "line";
  exams: Exam[];
  quizCount: number = 0;
  categoryCount: number = 0;
  examCount: number = 0;
  userCount: number = 0;
  isLoading: boolean = true;
  currentYear: string = new Date().getFullYear().toString();
  month1: number = 0;
  month2: number = 0;
  month3: number = 0;
  month4: number = 0;
  month5: number = 0;
  month6: number = 0;
  month7: number = 0;
  month8: number = 0;
  month9: number = 0;
  month10: number = 0;
  month11: number = 0;
  month12: number = 0;
  @ViewChild(BaseChartDirective, { static: true })
  private chart: BaseChartDirective;
  @ViewChild("resizedDiv", { static: true }) resizedDiv: ElementRef;
  previousWidthOfResizedDiv;

  constructor(
    private quizService: QuizService,
    private categoryService: CategoryService,
    private examService: ExamService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getQuizCount();
    this.getCategoryCount();
    this.getUserCount();
    this.getExamCount();
    this.getExams();
  }

  getQuizCount() {
    this.quizService.getAll().subscribe(data => {
      this.quizCount = data.length;
    });
  }

  getCategoryCount() {
    this.categoryService.getAll().subscribe(data => {
      this.categoryCount = data.length;
    });
  }

  getExamCount() {
    this.examService.getAll().subscribe(data => {
      this.examCount = data.length;
    });
  }

  getUserCount() {
    this.userService.getAll().subscribe(data => {
      this.userCount = data.length;
    });
  }

  getExams() {
    this.examService.getAll().subscribe(data => {
      this.exams = data;
      this.exams.forEach(element => {
        if (
          new Date(element.insertDate).getFullYear().toString() ==
          new Date().getFullYear().toString()
        ) {
          var month = (new Date(element.insertDate).getMonth() + 1).toString();
          if (month == "1") {
            this.month1++;
          } else if (month == "2") {
            this.month2++;
          } else if (month == "3") {
            this.month3++;
          } else if (month == "4") {
            this.month4++;
          } else if (month == "5") {
            this.month5++;
          } else if (month == "6") {
            this.month6++;
          } else if (month == "7") {
            this.month7++;
          } else if (month == "8") {
            this.month8++;
          } else if (month == "9") {
            this.month9++;
          } else if (month == "10") {
            this.month10++;
          } else if (month == "11") {
            this.month11++;
          } else if (month == "12") {
            this.month12++;
          }
        }
      });
      this.monthlyData = [
        this.month1,
        this.month2,
        this.month3,
        this.month4,
        this.month5,
        this.month6,
        this.month7,
        this.month8,
        this.month9,
        this.month10,
        this.month11,
        this.month12
      ];
      var datas = [
        {
          data: this.monthlyData,
          label: "Count"
        }
      ];
      this.lineChartData = datas;
      this.isLoading = false;
    });
  }

  ngAfterViewChecked() {
    if (
      this.previousWidthOfResizedDiv !=
      this.resizedDiv.nativeElement.clientWidth
    ) {
      if (document.getElementById("chartt") != null) {
        document.getElementById("chartt").style.width = "400px";
      }
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }
}
