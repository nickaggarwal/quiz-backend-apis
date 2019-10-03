import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { QuestionComponent } from "./pages/question/question.component";
import { AddQuestionComponent } from "./pages/question/add-question/add-question.component";
import { EditQuestionComponent } from "./pages/question/edit-question/edit-question.component";
import { CategoryComponent } from "./pages/category/category.component";
import { QuizComponent } from "./pages/quiz/quiz.component";
import { AddQuizComponent } from "./pages/quiz/add-quiz/add-quiz.component";
import { EditQuizComponent } from "./pages/quiz/edit-quiz/edit-quiz.component";
import { AddCategoryComponent } from "./pages/category/add-category/add-category.component";
import { EditCategoryComponent } from "./pages/category/edit-category/edit-category.component";
import { AboutComponent } from "./pages/about/about.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { UserComponent } from "./pages/user/user.component";
import { LanguageComponent } from "./pages/language/language.component";
import { AddLanguageComponent } from "./pages/language/add-language/add-language.component";
import { EditLanguageComponent } from "./pages/language/edit-language/edit-language.component";
import { ContactDetailComponent } from "./pages/contact/contact-detail/contact-detail.component";
import { ExamComponent } from "./pages/exam/exam.component";
import { ExamDetailComponent } from "./pages/exam/exam-detail/exam-detail.component";
import { AccountComponent } from "./pages/account/account.component";
import { PushComponent } from "./pages/push/push.component";
import { DevicesComponent } from "./pages/push/devices/devices.component";
import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "question/:quizKey",
    component: QuestionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "question/add-question/:quizKey",
    component: AddQuestionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "question/edit-question/:quizKey/:key",
    component: EditQuestionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "quiz",
    component: QuizComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "quiz/add-quiz",
    component: AddQuizComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "quiz/edit-quiz/:key",
    component: EditQuizComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "category",
    component: CategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "category/add-category",
    component: AddCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "category/edit-category/:key",
    component: EditCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "contact",
    component: ContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "contact/contact-detail/:key",
    component: ContactDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "language",
    component: LanguageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "language/add-language",
    component: AddLanguageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "language/edit-language/:key",
    component: EditLanguageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "auth/login",
    component: LoginComponent
  },
  {
    path: "about",
    component: AboutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "exam",
    component: ExamComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "exam/exam-detail/:key",
    component: ExamDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "account",
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "push",
    component: PushComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "push/devices",
    component: DevicesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "auth/register",
    component: RegisterComponent
  },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
