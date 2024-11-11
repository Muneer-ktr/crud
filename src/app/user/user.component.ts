import { Component } from '@angular/core';
import { User, UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users : User[] =[]
  user : User = {name:'',email:'',place:''}
  isEdit = false

  // constructor(private userService: UserServiceService){}
  
  // addUserDetails(){
  //  if(!this.user.name || !this.user.email || !this.user.place){
  //   alert("Please fill the form")
  //  }else{
  //     this.userService.adduser(this.user).subscribe(res=>{
  //       console.log(res);
  //     })
  //  }
  // }
  constructor(private userService:UserServiceService){}

  addUserDetails(){
    if(!this.user.name || !this.user.email || !this.user.place){
      alert("Fill all section in the form")
    }else{
      this.userService.adduser(this.user).subscribe(res=>{
        this.users.push(res);
        this.user ={name:'',email:'',place:''}
        console.log(res);
      })
    } 
  }
ngOnInit(){
  this.userService.getUsers().subscribe(res=>{
    console.log(res);
    this.users=res
  })
}

  // userDelete(id:any){
  //   this.userService.deletuser(id).subscribe(()=>{
  //     this.users = this.users.filter(user=>user.id!=id)
  //   })
  // }

  userDelete(id:any){
    this.userService.deletuser(id).subscribe(()=>{
      this.users=this.users.filter(user=>user.id!=id)
    })
  }

  // editUser(user:User){
  //   this.user = {...user}
  //   this.isEdit = true
  // }

  // updateDetails(){
  //   this.userService.edituser(this.user).subscribe((updatedUser)=>{
  //     const index = this.users.findIndex(user=>user.id == updatedUser.id)
  //     if(index !== -1) this.users[index] = updatedUser
  //   })
  // }

  editUser(user:User){
    this.user ={...user}
    this.isEdit = true    
  }
  updateDetails(){
    if(!this.user.name || !this.user.email || !this.user.place){
      alert("Fill all field and continue")
    }else{
      this.userService.edituser(this.user).subscribe((updatedUser)=>{
        const index = this.users.findIndex(user=>user.id == updatedUser.id)
        if(index !== -1)this.users[index] =updatedUser
        this.user ={name:'',email:'',place:''}
        this.isEdit = false
      })
    }
  }
  cancelDeatils(){
    this.user ={name:'',email:'',place:''}
    this.isEdit=false
  }
}
