import React, {PureComponent} from "react";
import {Switch, Route, Router} from "react-router-dom";
import {AppRoute} from "../../constants.js";
import {connect} from "react-redux";
import {DataOperation, UserOperation} from "../../reducer/reducer.js";
import history from "../../history.js";
import PropTypes from "prop-types";
import MainPage from "./../main-screen/main-screen.jsx";
import MoviePage from "./../movie-page/movie-page.jsx";
import AuthScreen from "../sign-in/sign-in.jsx";
import VideoPlayerFull from "../../hocs/with-video-controls/with-video-controls.jsx";
import Mylist from "../my-list/my-list.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadPromoMovie();
    this.props.loadMovies();
    this.props.checkAuth();
    this.props.loadFavoriteMovies();
  }

  render() {
    const {movieList, currentMovie, promoFilm} = this.props;

    if (movieList.length === 0 || Object.keys(promoFilm).length === 0) {
      return (
        <div>
          ...loading...
        </div>
      );
    } else {
      return (
        <Router history={history}>
          <Switch>

            <Route exact path="/">
              <MainPage
                promoFilm={promoFilm}
                movieList={movieList}
              />
            </Route>

            <Route exact path={AppRoute.PLAYER}>
              <VideoPlayerFull/>
            </Route>

            <Route path="/movie/:id">
              <MoviePage
                currentMovie={currentMovie}
              />
            </Route>

            <Route exact path={AppRoute.SIGN_IN}>
              <AuthScreen
                onSubmit={this.props.login}
              />
            </Route>

            <PrivateRoute exact path={AppRoute.MY_LIST} render={() => {
              return (
                <Mylist/>
              );
            }}
            />

          </Switch>
        </Router>
      );
    }
  }
}

App.propTypes = {
  promoFilm: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    scoresCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string),
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    videoLink: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired
  }).isRequired,
  currentMovie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    scoresCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string),
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    videoLink: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired
  }),
  movieList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    scoresCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string),
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    videoLink: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired
  })).isRequired,
  login: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  loadPromoMovie: PropTypes.func.isRequired,
  loadMovies: PropTypes.func.isRequired,
  loadFavoriteMovies: PropTypes.func.isRequired,
  checkAuth: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },

  checkAuth() {
    dispatch(UserOperation.checkAuth());
  },

  loadMovies() {
    dispatch(DataOperation.loadMovies());
  },

  loadFavoriteMovies() {
    dispatch(DataOperation.loadFavoriteMovies());
  },

  loadPromoMovie() {
    dispatch(DataOperation.loadPromoMovie());
  },
});

const mapToState = (state) => ({
  movieList: state.movieList,
  promoFilm: state.promoFilm,
  authorizationStatus: state.authorizationStatus,
  favoriteMovieList: state.favoriteMovieList
});

export default connect(mapToState, mapDispatchToProps)(App);
