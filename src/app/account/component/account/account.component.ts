import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, takeUntil } from 'rxjs';
import { AccountService } from 'src/app/account/core/account.service';
import { Account } from 'src/app/entity/account';
import { CustomerAccount } from 'src/app/entity/customer-account';
import { User } from 'src/app/entity/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account = new Account;
  user = new User;
  customerAccount=new CustomerAccount;
  typeArr : string[] = [];
  param1: string = "";
  count = 0;
  
  constructor(private service : AccountService,private router:Router,private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.param1 = params['type'];
  });
  }

  page = 0;
  pageSize=2;

  ngOnInit(): void {
    this.getAccountDetails();
    const user_id=localStorage.getItem("userId") == null ? "" : localStorage.getItem("userId");
    this.getUserDetails(user_id!);
  }

  previousTransaction(): void {
    if(this.page > 0){
      this.page=this.page-1;
    this.service.getTransaction(this.account._id,this.page,this.pageSize).pipe(take(1)).subscribe(
      data => { 
        this.account.transaction=data;
        var transHtml="";
        for(var i=0;i< this.account.transaction.length;i++){
        
        transHtml="<tr><td>"+this.account.transaction[i]._id+"</td><td>"+this.account.transaction[i].createdAt+"</td>";
        transHtml +=" <td>"+this.account.transaction[i].type== 'DEBIT' ? this.account.transaction[i].amount : "" +"</td>";
        transHtml += "<td>"+this.account.transaction[i].type== 'CREDIT' ? this.account.transaction[i].amount : "" +"</td></tr>";
        }

        const table = document.getElementById("transaction");
        if (table != null) {
          table.innerHTML="";
          table.innerHTML = transHtml;
        }
      }
  )
    }
  }

  nextTransaction(): void {
    this.page=this.page+1;
    this.service.getTransaction(this.account._id,this.page,this.pageSize).pipe(take(1)).subscribe(
      data => { 
        this.account.transaction=data;
        var transHtml="";
        for(var i=0;i< this.account.transaction.length;i++){
        
        transHtml="<tr><td>"+this.account.transaction[i]._id+"</td><td>"+this.account.transaction[i].createdAt+"</td>";
        transHtml +=" <td>"+this.account.transaction[i].type== 'DEBIT' ? this.account.transaction[i].amount : "" +"</td>";
        transHtml += "<td>"+this.account.transaction[i].type== 'CREDIT' ? this.account.transaction[i].amount : "" +"</td></tr>";
        }

        const table = document.getElementById("transaction");
        if (table != null) {
          table.innerHTML="";
          table.innerHTML = transHtml;
        }
      }
  )
  }

  

  getAccountDetails(){
    this.service.accountDetailsFromClient().pipe(take(1)).subscribe(
       
      data => { 
        let iddd = "";
        let encoded: string="";
        this.customerAccount.account=data;
        for(var i=0;i<this.customerAccount.account.length;i++){

          this.typeArr[i]= this.customerAccount.account[i].type;
          if(this.param1 == undefined){
            iddd=data[0]._id;
          }else{
            encoded = atob(this.param1);
            if(encoded == this.customerAccount.account[i].type){
              iddd=this.customerAccount.account[i]._id;
              this.count=i;
            }
          }
        }

        // console.log("ttttttt",this.typeArr);
        this.getAccBalance(iddd).then((data:any)=>{
         this.account.balance=data.balance;
         this.account._id=data._id;
         this.account.type=data.type;
         this.account.customerId=data.customerId;
         this.account.createdAt=data.createdAt;
         this.account.updatedAt=data.updatedAt;
        

       })
        this.getTransaction(iddd,0,2).then((data:any)=>{
          this.account.transaction=data;
      })
      
      },
      error => {
      }
    );
  }

  getAccountDetail(id:string){
    this.getAccBalance(id).then((data:any)=>{
      this.account.balance=data.balance;
      this.account._id=data._id;
      this.account.type=data.type;
      this.account.customerId=data.customerId;
      this.account.createdAt=data.createdAt;
      this.account.updatedAt=data.updatedAt;
     

    })
     this.getTransaction(id,0,2).then((data:any)=>{
       this.account.transaction=data;
   })
  }

  

  getUserDetails(user_id:string){
    this.service.getUser(user_id).subscribe(
      (data:User) => {
      this.user.firstName=data.firstName;
      this.user.lastName=data.lastName;
      this.user.middleName=data.middleName;
      }
    )
  }

    getAccBalance(id:string){
      return new Promise(resolve=>{
    this.service.getAccountAndBalance(id).pipe(take(1)).subscribe(
     (data:Account) => {
      resolve(data);} 
     
    );
      })
  }

  getTransaction(id:string,page:number,pageSize:number){
    return new Promise(resolve=>{
    this.service.getTransaction(id,page,pageSize).pipe(take(1)).subscribe(
      (data:Account) => {
        resolve(data);} ,
      error => {return error} 
      
     );
  })
}

}
