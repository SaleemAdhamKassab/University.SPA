import { Component } from '@angular/core';
import { NavBarComponent } from '../navBar/nav-bar.component';
import { RegisterForCoursesComponent } from '../../../students/registerStudent/registerForCourses/register-for-courses.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, RegisterForCoursesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  slides = [
    {
      image: 'assets/images/hero1.jpg',
      alt: 'Slide 1',
      title: 'Unlock Your Potential with Angular',
      description:
        'Join us and learn the skills you need to become a top Angular developer.',
    },
    {
      image: 'assets/images/hero2.jpg',
      alt: 'Slide 2',
      title: 'Build Modern Applications',
      description:
        'Stay ahead with the latest Angular features and best practices.',
    },
    {
      image:
        'https://www.theladders.com/wp-content/uploads/study_college_190612.jpg',
      alt: 'Slide 3',
      title: 'Join the Angular Community',
      description:
        'Connect with developers and learn from the best in the industry.',
    },
  ];

  currentSlideIndex = 0;

  prevSlide(): void {
    this.currentSlideIndex =
      this.currentSlideIndex > 0
        ? this.currentSlideIndex - 1
        : this.slides.length - 1;
  }

  nextSlide(): void {
    this.currentSlideIndex =
      this.currentSlideIndex < this.slides.length - 1
        ? this.currentSlideIndex + 1
        : 0;
  }
}
