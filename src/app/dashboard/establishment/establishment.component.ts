import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.scss'],
})
export class EstablishmentComponent implements OnInit {


  private restaurants = [
    {
      name:"Burger Donalds",
      description: "O melhor Hamburguer para as pessoas que trabalham de home office. O lanche é feito dentro da casa e distribuído via google hangouts!"
    },
    {
      name: "Tenda",
      description: "Venha conhecer a melhor lanchonete da UFU! Preços baratos e agora focados para a pandemia!"
    }
  ];

  public getRestaurants() : any {
    return this.restaurants;
  }

  constructor() { }

  ngOnInit() {}

}
