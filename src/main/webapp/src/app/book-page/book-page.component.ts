import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Book } from '../utils/app.types';
import { BookService } from '../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from './addbookdialog/addbookdialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '../services/dialog.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
})
export class BookPageComponent implements OnInit {
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['select', 'title', 'author', 'status', 'actions'];
  public books: any[] = [];
  public tableDataSource = new MatTableDataSource(this.books);

  // Track selected books using an object where keys are book IDs
  selectedBooks: { [key: number]: boolean } = {};
  public selection = new SelectionModel<any>(true, []);
  constructor(
    private bookService: BookService, 
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.isLoading = true;
    this.bookService.getAllBooks()
      .pipe(catchError((error) => {
        console.error('An error occured: ', error.error);
        this.isLoading = false;
        this.snackBar.open('An error has occured while loading the books.', 'Close', { duration: 3000 });
        return throwError(() => new Error(error.error));
      }))
      .subscribe((data) => {
        console.log(data);
        this.books = data;
        this.tableDataSource = new MatTableDataSource(this.books);
        this.isLoading = false;
      });
  }

  openAddBookDialog(): void {
    const dialogRef = this.dialogService.openBookDialog();

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.bookService.addBook(result.title, result.author, 'to-read')
        .pipe(catchError((error) => {
          this.isLoading = false;
          this.snackBar.open('An error has occured while trying save the note.', 'Close', { duration: 3000 });
          return throwError(() => new Error(error.error));
        })).subscribe((response: any) => {
          if (response.status === 201) {
            this.isLoading = false;
            const addedBook = response.book;
            this.books.push(addedBook);
                    this.tableDataSource = new MatTableDataSource(this.books);
            this.changeDetector.detectChanges();
            console.log('Book added:', result);
            this.snackBar.open("Book added successfully.", 'Close');
          }
        })
      }
    });
  }

  public isAllSelected(): boolean {
    const selectedRows = this.selection.selected.length;
    const totalRows = this.books.length;

    return selectedRows === totalRows;
  }
  
  // Toggle all checkboxes
  selectAll(event: any): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.books)
    }
  }

  // Update the status of selected books
  updateStatus(bookId: number, newStatus: 'to-read' | 'reading' | 'finished'): void {
    const book = this.books.find((b) => b.id === bookId);
    if (book) {
      book.status = newStatus;
    }
  }
}
