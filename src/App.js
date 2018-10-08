import React, { Component } from "react";
import { connect } from "react-redux";
import store from "./store.js";
import App2 from "./App2.js";
import "./App.css";

function MovieList({ movies }) {
  return (
    <div>
      {movies.store
        .filter(element => {
          if (movies.tabs === "Watched") {
            return element.watched === "watched";
          } else {
            return element.watched === "not watched";
          }
        })
        .map((element, index) => {
          if (element.selected === "yes") {
            return (
              <div
                class="movieListSelected"
                onClick={() => titleClickHandler(element)}
              >
                <div>{element.title}</div>
                <div> {element.year}</div>
                <div>{element.runtime}</div>
                <div
                  class={
                    element.watched === "watched" ? "watched" : "notwatched"
                  }
                  onClick={() => watchedHandler(element)}
                >
                  {element.watched}
                </div>
              </div>
            );
          } else {
            return (
              <div class="movieList" onClick={() => titleClickHandler(element)}>
                {element.title}{" "}
                <div
                  class={
                    element.watched === "watched" ? "watched" : "notwatched"
                  }
                  onClick={() => watchedHandler(element)}
                >
                  {element.watched}
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <div>
          <input
            type="text"
            id="addItem"
            onKeyDown={e => addKeyHandler(e.which)}
          />
          <button onClick={this.props.addHandler.bind(this)}>Add</button>
        </div>
        <div id="inputContainer">
          <input
            type="text"
            id="inputItem"
            onChange={this.props.searchHandler}
          />
          <button>Search</button>
        </div>
        <div class="container">
          <App2 store={store} />
          <MovieList movies={this.props} />
        </div>
      </div>
    );
  }
}
function watchedHandler(element) {
  store.dispatch({
    type: "WATCHED",
    element
  });
}
function addKeyHandler(eventKey) {
  if (eventKey === 13) {
    store.dispatch({
      type: "ADD"
    });
  }
}
function titleClickHandler(element) {
  store.dispatch({ type: "TITLE_CLICK_HANDLER", element });
}

export default connect(
  function mapStateToProps(state) {
    return { store: state.store, tabs: state.tabs };
  },
  function mapDispatchToProps(dispatch) {
    return {
      searchHandler: () => dispatch({ type: "SEARCH" }),
      addHandler: () => dispatch({ type: "ADD" })
    };
  }
)(App);
