import React, { Component } from 'react'
import Header from './components/ui/Header/Header'
import { fetchBooks, addBook } from './utils/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { _title: '', _author: '', _status: '', books: []};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleBooks = this.handleBooks.bind(this);
  }

  handleSubmit(event) {
    // alert('foo bar ' + this.state._title + ' ' + this.state._author);
    // books = this.state._title + ' ' + this.state._author;
    this.setState({
      books: [...this.state.books, { author: this.state._author, title: this.state._title }]
    })
    addBook(this._title, this._author);
    event.preventDefault();
  }

  handleChangeTitle(event) {
    this.setState({ _title: event.target.value });
  }

  handleChangeAuthor(event) {
    this.setState({ _author: event.target.value });
  }
  handleBooks(result) {
    this.setState({ _status: result.status });
    console.log(result.status);
  }

  componentDidMount() {
    fetchBooks().then(this.handleBooks);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <div className="row form-section">
            <form className="book-form col-6" onSubmit={this.handleSubmit}>
              <legend>Lägg till dina favoritböcker</legend>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="title"
                  placeholder="Lägg till titel"
                  value={this.state._title}
                  onChange={this.handleChangeTitle}
                />

                <input
                  type="text"
                  className="form-control"
                  id="author"
                  rows="3"
                  data-gramm="true"
                  data-txt_gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                  data-gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                  data-gramm_editor="true"
                  placeholder="Lägg till författare"
                  value={this.state._author}
                  onChange={this.handleChangeAuthor}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                onClick = {this.handleSubmit}
              >
                Skicka
              </button>
            </form>
          </div>
        </div>
        <div className="display-books">
          <div className="container">
            <div className="col-12">
              <ul className="list-group">
              {this.state.books.map(book => (
                <li className="list-item list-group-item d-flex align-items-center">
                  <strong className="title">Titel</strong>

                  <div className="author">Författare</div>
                  <ul className="titles">{book.title}</ul>
                  <div className="authors">{book.author}</div>
                  <div className="buttons">
                    <button type="button" className="btn btn-success">
                      Editera
                    </button>
                    <button type="button" className="btn btn-danger">
                      Ta bort
                    </button>

                  </div>
                </li>))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
