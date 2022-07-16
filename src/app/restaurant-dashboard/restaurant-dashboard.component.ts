import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestaurantModel } from 'restaurant.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.scss']
})
export class RestaurantDashboardComponent implements OnInit {

  formValue!: FormGroup
  editValue: boolean = false;
  restaurantModel: RestaurantModel = new RestaurantModel();
  restaurants: RestaurantModel[] = [];
  @ViewChild('myModal') myModal: { nativeElement: { className: string; }; } = { nativeElement: { className: '' } };
  constructor(private builder: FormBuilder, private api: ApiService) { }
  ngOnInit(): void {
    this.formValue = this.builder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: [''],
    })
    this.getRestaurants();
  }

  openModal() {
    this.myModal.nativeElement.className = 'modal fade show';
  }

  onCloseHandled() {
    this.myModal.nativeElement.className = 'modal hide';
  }

  openEditModal(data: any) {
    this.restaurantModel.id = data.id;
    this.editValue = true;
    this.myModal.nativeElement.className = 'modal fade show';
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['service'].setValue(data.service);
  }

  updateRes() {
    this.restaurantModel.name = this.formValue.value.name;
    this.restaurantModel.email = this.formValue.value.email;
    this.restaurantModel.mobile = this.formValue.value.mobile;
    this.restaurantModel.address = this.formValue.value.address;
    this.restaurantModel.service = this.formValue.value.service;
    this.api.updateRestaurant(this.restaurantModel,this.restaurantModel.id).subscribe(res=>{
      alert("Data updated successfully");
      this.formValue.reset();
      this.getRestaurants();
    });
  }

  addRestaurant() {
    this.restaurantModel.name = this.formValue.value.name;
    this.restaurantModel.email = this.formValue.value.email;
    this.restaurantModel.mobile = this.formValue.value.mobile;
    this.restaurantModel.address = this.formValue.value.address;
    this.restaurantModel.service = this.formValue.value.service;

    this.api.postRestaurant(this.restaurantModel).subscribe(res=>{
      console.log(res);
      alert("restaurant added successfully");
      this.formValue.reset();
      this.getRestaurants();
    },
    err=> {
      alert("Something went wrong :(");
    }
    )
  }

  getRestaurants() {
    this.api.getRestaurant().subscribe(res=>{
      this.restaurants = res;
    })
  }

  deleteRes(data: any) {
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert("deleted successfully");
      this.getRestaurants();
    });
  }
}
