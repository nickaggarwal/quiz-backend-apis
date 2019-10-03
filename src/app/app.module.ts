import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgMaterialMultilevelMenuModule } from "ng-material-multilevel-menu";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "src/environments/environment.prod";
import { QuizComponent } from "./pages/quiz/quiz.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { CategoryComponent } from "./pages/category/category.component";
import { SharedModule } from "./shared/shared.module";
import { QuestionComponent } from "./pages/question/question.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AddQuestionComponent } from "./pages/question/add-question/add-question.component";
import { EditQuestionComponent } from "./pages/question/edit-question/edit-question.component";
import { AddQuizComponent } from "./pages/quiz/add-quiz/add-quiz.component";
import { EditQuizComponent } from "./pages/quiz/edit-quiz/edit-quiz.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderComponent } from "./shared/components/header/header.component";
import { SidemenuComponent } from "./shared/components/sidemenu/sidemenu.component";
import { ConfirmModalComponent } from "./shared/components/confirm-modal/confirm-modal.component";
import { AddCategoryComponent } from "./pages/category/add-category/add-category.component";
import { EditCategoryComponent } from "./pages/category/edit-category/edit-category.component";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { ChartsModule } from "ng2-charts";
import { NgxEditorModule } from "ngx-editor";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { UserComponent } from "./pages/user/user.component";
import { AboutComponent } from "./pages/about/about.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { LanguageComponent } from "./pages/language/language.component";
import { AddLanguageComponent } from "./pages/language/add-language/add-language.component";
import { EditLanguageComponent } from "./pages/language/edit-language/edit-language.component";
import { ContactDetailComponent } from "./pages/contact/contact-detail/contact-detail.component";
import { ExamComponent } from "./pages/exam/exam.component";
import { ExamDetailComponent } from "./pages/exam/exam-detail/exam-detail.component";
import { AccountComponent } from "./pages/account/account.component";
import { PushComponent } from "./pages/push/push.component";
import { DevicesComponent } from "./pages/push/devices/devices.component";
import { AddPushComponent } from "./pages/push/add-push/add-push.component";
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidemenuComponent,
    ConfirmModalComponent,
    QuizComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    CategoryComponent,
    QuestionComponent,
    DashboardComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    AddQuizComponent,
    EditQuizComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    UserComponent,
    AboutComponent,
    ContactComponent,
    LanguageComponent,
    AddLanguageComponent,
    EditLanguageComponent,
    ContactDetailComponent,
    ExamComponent,
    ExamDetailComponent,
    AccountComponent,
    PushComponent,
    DevicesComponent,
    AddPushComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    SharedModule,
    NgMaterialMultilevelMenuModule,
    PerfectScrollbarModule,
    ChartsModule,
    NgxEditorModule,
    TooltipModule.forRoot()
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmModalComponent, AddPushComponent]
})
export class AppModule {}
