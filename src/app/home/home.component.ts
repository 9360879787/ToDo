import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home_service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  category:any;
  // defaultcategorylist:any;
  category_name:any;
  selected_category:any;
  tasklist:any;
  task:any;
  task_data:any;
  name:any;
  profile_pic:any;
  email:any;
  user_id:any;
  
  constructor(private homeservice:HomeService) { }
 
  ngOnInit(): void {
    this.getCategory();
    // this.getdefaultTasks();
    this.fetchingUserData()
    // const testdata = localStorage.getItem('data')
    // console.log("test data",testdata);
  }

  fetchingUserData(){
    const data = localStorage.getItem('data');
    const parsedata = JSON.parse(data || '{}');
    this.name = parsedata.data[0].u_name;
    this.profile_pic = parsedata.data[0].profile_pic;
    this.email = parsedata.data[0].email_id;
    this.user_id = parsedata.data[0].Id;
    
    
    
    
   
  }

  getCategory(){
    const data = {
      'user_id':this.user_id
      
    }
    this.homeservice.getuserCategory(data).subscribe({
      next:(res:any)=>{
        this.category = res;
        this.selected_category = this.category[0];
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  addcategory(){
    
    const data ={
      'user_id':this.user_id,
      'title':this.category_name

    }
    this.category_name='';
    
    this.homeservice.addcategory(data).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.getCategory();
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
//   getdefaultTasks(){
//       const data={
//       'user_id':this.selected_category.user_id,
//       'category_id':this.selected_category.category_id
//     }
//     this.homeservice.getuserTasks(data).subscribe({
//       next:(res:any)=>{
//         this.tasklist = res;
//         console.log(res)
//       },
//       error:(err)=>{
//         console.log(err)
//       }
//     })
// }
  

getTasks(cat:any){
    const data={
      'user_id':cat.user_id,
      'category_id':cat.category_id
    }
    this.homeservice.getuserTasks(data).subscribe({
      next:(res:any)=>{
        this.tasklist = res;
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
}


addTask(){
  
  const data = {
    'user_id':this.selected_category.user_id,
    'category_id':this.selected_category.category_id,
    'tasks':this.task,
    'task_data':this.task_data

  }
  console.log(data);
  this.task='';
  this.task_data='';
  this.homeservice.addUserTask(data).subscribe({
    next:(res:any)=>{
      console.log(res)
      this.getTasks(this.selected_category[0]);
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}

