import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm, FormControl } from '@angular/forms';
import { UserService } from './register/users.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css']
})

export class NewProjectComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  usernames: string[] = [];
  storedusers: string[] = [];
  disabledDate = true;
  selectedFile: File;
  url: any = '../assets/img/scrum.png';
  firstDate: string = null;
  usersMap = new Map();
  members: string[][][] = [];

  constructor(
    public dialogRef: MatDialogRef<NewProjectComponent>,
    public userService: UserService,
    public projectService: ProjectsService) { }



  ngOnInit() {
    this.usernames = this.userService.getUsersA();
    this.usersMap = this.userService.getUsersM();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(username => this._filter(username))
    );
  }

  private _filter(value: string): string[] {
    return this.usernames.filter(username => username.includes(value));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddUser(value: string): void {
    if (this.usernames.includes(value)) {
      this.storedusers.push(value);
      this.myControl.reset();
    } else {
      alert('Can\'t find that user.');
      this.myControl.reset();
    }
  }

  changeCheck(event) {
    this.disabledDate = !event.checked;
  }

  onAddProject(form: NgForm) {
    for (let entry of this.usersMap.entries()) {
      console.log( entry[0], entry[1]);
    }
    console.log(this.projectService.getProject(form.value.inName));
    if (form.invalid) {
      return;
    }
    const imgName: string = form.value.inName + '.jpg';
    // const file: File = new File(this.selectedFile, imgName, {type: 'image/jpeg'});
    // this.savenewimg.saveImg(this.selectedFile, imgName);
    const firstDate1: Date = form.value.inDate1;
    const fixedDate: string = firstDate1.getFullYear() + '-' + firstDate1.getMonth() + '-' + firstDate1.getDate();
    if (this.projectService.setProject(
      form.value.inName,
      form.value.inDesc,
      fixedDate,
      form.value.inDate2,
      imgName)) {
        return;
    } else {
      this.storedusers.forEach((user) => {

      });
      this.projectService.setMembers(this.storedusers);
      this.dialogRef.close();
    }
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      // tslint:disable-next-line: prefer-const
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event1) => {
        this.url = event1.currentTarget;
        this.url = this.url.result;
      };
    }
    this.selectedFile = event.target.files[0];
  }

}
