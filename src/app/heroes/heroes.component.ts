import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  
 heroes: Hero[] = [];
 selectedHero?: Hero;

 onSelect(hero: Hero): void {
  this.selectedHero = hero;
  this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
}
constructor(private heroService: HeroService, private messageService: MessagesService) {}

//creating a new method within the HeroComponent Class

add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroService.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
}

getHeroes(): void {
  //using the focused hero array and assigning it to result of the heroService method
  //this.heroes = this.heroService.getHeroes();

  //refactor to subscribe to the observed state of the hero service so it updates
  this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
}
delete(hero: Hero): void {
  this.heroes = this.heroes.filter(h => h !== hero);
  this.heroService.deleteHero(hero.id).subscribe();
}

//when page loads, run whatever is inside
ngOnInit(): void {
  this.getHeroes();
}

}
