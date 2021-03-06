import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  location = {
    lat: '', 
    lng: ''
  };
  random: any = {
    color: '',
    font: '',
    url: '',
    places: '',
  }
  // show: any = {
  //   logo: true,
  //   about: false,
  //   faqs: false,
  //   privacy: false,
  //   contact: false, 
  //   question: false
  // }
  question : any = {
    user: '',
    question: '',
  }
  display = "logo";
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router, private meta: Meta, private title: Title) { 
    this.title.setTitle('Randomizer | Find something to do in your area');  
    this.meta.updateTag({name:'description',content:"The randomizer takes in your current location and specified parameters to give a random place in your area. Connect, review and enjoy totally random restaurants, bars, and more."});   
    this.meta.updateTag({name:'keywords',content:'places, random, find, good restaurants, bars, reviews'});    
  }


  ngOnInit() {
    this.getLocation(this.location);
    this.getRandomDesign();
  }
  getLocation(location){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess);
    } else { 
      alert('geolocation isnt supoorted in this browser, check your privacy settings')
    }
    function geoSuccess(position) {
      location.lat = position.coords.latitude;
      location.lng = position.coords.longitude;
      console.log('getLocation()', location)
    }
  }

  giveLocation(location){
    this._httpService.saveLocation(location); 
    this._router.navigate(['place']);
  }
  showDisplay(block){
    this.getRandomDesign();
    this.display = block;
  }
  getRandomDesign(){
    var font = this.getFont();
    var color = this.getColor();
    $(".icon").css("background-color" , color);
    $(".icon").css("color" , color);
    $("#shell").css("border-left" , "0.5vw solid" + color);
    $("#shell").css("border-right" , "0.5vw solid" + color);
    $("#shell").css("border-top" , "0.5vh solid" + color);
    $("#shell").css("border-bottom" , "0.5vw solid" + color);
    $("#main").css("font-family" , font);
    $("#main").css("color" , color);
    $(".blocks").css("font-family" , font);
    $(".blocks").css("color" , color);

    this.random.color = color;
    var color_two = this.getColor();
    $("#shell").css("background-color" , color_two);
    $("#topNav").css("background-color" , color_two);
    $("#bottomNav").css("background-color" , color_two);
  }
  getFont(){
    var fonts = [
      'Pacifico', 
      'Oswald', 
      'Lobster',
      'Roboto', 
      "'Indie Flower', cursive",
      "'Modern Antiqua', cursive",
    ]
    var random = Math.floor((Math.random() * fonts.length));
    var font = fonts[random];
    return font;
  }
  getColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  submitQuestion(){
    let obs = this._httpService.addQuestion(this.question);
    obs.subscribe(data=>{
      // this.showBlocks('logo');
      this.display = "logo";
      this.question = {user: '', question: ''};
    });

  }
}
