import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  constructor(private bs: BookStoreService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Auslesen der übergebenen Parameter
    // 1. mit Observable ohne snapshot
    // 2. ohne Observable mit snapshot

    // 1. mit Observable ohne snapshot
    this.route.paramMap.subscribe(params => {
      this.bs.getSingle(params.get('isbn')).subscribe(b => this.book = b);
    });

    // 2. ohne Observable mit snapshot
    // const params = this.route.snapshot.paramMap;
    // this.book = this.bs.getSingleBook(params.get('isbn'));
  }

  getRating(num: number) {
    return new Array(num);
  }

  removeBook() {
    if (confirm('Buch wirklich löschen?')) {
      this.bs.remove(this.book.isbn).subscribe(res => this.router.navigate(['../'], {relativeTo: this.route}));
    }
  }
}
