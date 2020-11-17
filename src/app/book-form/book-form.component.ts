import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book, Thumbnail } from '../shared/book';
import { BookValidators } from '../shared/book-validators';
import { BookExistsValidatorService } from '../shared/book-exists-validator.service';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, OnChanges {
  bookForm: FormGroup;
  @Input() book: Book;
  @Input() editing: false;
  @Output() submitBook = new EventEmitter<Book>();

  constructor(private fb: FormBuilder, private bEV: BookExistsValidatorService) { }

  ngOnChanges() {
    this.initForm();
    this.setFormValues(this.book);
  }

  ngOnInit() {
    this.initForm();
  }

  submitForm() {
    const formValue = this.bookForm.value;
    const authors = formValue.authors.filter(author => author);
    const thumbnails = formValue.thumbnails.filter(thumbnail => thumbnail.url);
    const isbn = this.editing ? this.book.isbn : formValue.isbn;

    const newBook: Book = {
      ...formValue,
      isbn,
      authors,
      thumbnails
    }

    this.submitBook.emit(newBook);
    this.bookForm.reset();
  }

  private initForm() {
    if (this.bookForm) {
      return;
    }

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      isbn: [{ value: '', disabled: this.editing }, [Validators.required, BookValidators.isbnFormat], this.editing ? null : [this.bEV]],
      description: [''],
      authors: this.buildAuthorsArray(['']),
      thumbnails: this.buildThumbnailsArray([{ title: '', url: ''}]),
      published: []
    });
  }

  private buildAuthorsArray(values: string[]): FormArray {
    return this.fb.array(values, BookValidators.atLeastOneAuthor);
  }

  private buildThumbnailsArray(values: Thumbnail[]): FormArray {
    return this.fb.array(values.map(t => this.fb.group(t)));
  }

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  get thumbnails(): FormArray {
    return this.bookForm.get('thumbnails') as FormArray;
  }

  addAuthorControl() {
    this.authors.push(this.fb.control(''));
  }

  addThumbnailControl() {
    this.thumbnails.push(this.fb.group({ url: '', title: '' }));
  }

  private setFormValues(book: Book) {
    this.bookForm.patchValue(book);

    this.bookForm.setControl('authos', this.buildAuthorsArray(book.authors));
    this.bookForm.setControl('thumbnails', this.buildThumbnailsArray(book.thumbnails));
  }
}
