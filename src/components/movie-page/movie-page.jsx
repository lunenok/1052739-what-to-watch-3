import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Tabs from "./../tabs/tabs.jsx";
import MovieLike from "./../movie-like/movie-like.jsx";
import {withRouter} from "react-router-dom";
import {Switch, Route} from "react-router-dom";
import {changeCurrentMovie, AuthorizationStatus} from "../../reducer/reducer";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {resetStore, DataOperation, reviewOperation} from "../../reducer/reducer.js";
import {getMoviesLikeThis} from "../../reducer/selectors.js";
import VideoPlayerFull from "../../hocs/with-video-controls/with-video-controls.jsx";
import {Link} from "react-router-dom";
import {AppRoute} from "../../constants.js";
import AddReview from "../add-review/add-review.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import FavoriteButton from "../favorite-button/favorite-button.jsx";

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(changeCurrentMovie(this.props.match.params.id));
    // if (this.props.movies.length === 0) {
    //   this.props.loadMovies();
    // }
  }

  componentDidUpdate(oldProps) {
    if (this.props.match.params.id !== oldProps.match.params.id) {
      this.props.dispatch(changeCurrentMovie(this.props.match.params.id));
    }
  }

  render() {
    const {currentMovie, movies, dispatch, authorizationStatus, avatarURL} = this.props;

    if (currentMovie === null) {
      return (
        <p>...loading...</p>
      );
    }

    const movieLikeThis = getMoviesLikeThis(movies, currentMovie);
    const {id, name, genre, released, backgroundImage, posterImage, backgroundColor} = currentMovie;

    return (
      <React.Fragment>
        <Switch>
          <Route exact path={`/movie/${id}`}>
            <div className="visually-hidden">
              {/* inject:svg */}<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><symbol id="add" viewBox="0 0 19 20">
                {/* Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch */}
                <title>+</title>
                <desc>Created with Sketch.</desc>
                <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                  <polygon id="+" fill="#EEE5B5" points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859" />
                </g>
              </symbol><symbol id="full-screen" viewBox="0 0 27 27">
                <path fillRule="evenodd" clipRule="evenodd" d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z" fill="#FFF9D9" fillOpacity="0.7" />
                <path fillRule="evenodd" clipRule="evenodd" d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z" fill="#FFF9D9" fillOpacity="0.7" />
                <path fillRule="evenodd" clipRule="evenodd" d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z" fill="#FFF9D9" fillOpacity="0.7" />
                <path fillRule="evenodd" clipRule="evenodd" d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z" fill="#FFF9D9" fillOpacity="0.7" />
              </symbol><symbol id="in-list" viewBox="0 0 18 14">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z" fill="#EEE5B5" />
              </symbol><symbol id="pause" viewBox="0 0 14 21">
                {/* Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch */}
                <title>Artboard</title>
                <desc>Created with Sketch.</desc>
                <g id="Artboard" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                  <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21" />
                  <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21" />
                </g>
              </symbol></svg>{/* endinject */}
            </div>
            <section className="movie-card movie-card--full" style={{backgroundColor}}>
              <div className="movie-card__hero">
                <div className="movie-card__bg">
                  <img src={backgroundImage} alt={`${name} img`} />
                </div>
                <h1 className="visually-hidden">WTW</h1>
                <header className="page-header movie-card__head">
                  <div className="logo">
                    <NavLink to="/" className="logo__link" onClick={() => dispatch(resetStore())}>
                      <span className="logo__letter logo__letter--1">W</span>
                      <span className="logo__letter logo__letter--2">T</span>
                      <span className="logo__letter logo__letter--3">W</span>
                    </NavLink>
                  </div>
                  <div className="user-block">
                    {authorizationStatus === AuthorizationStatus.AUTH ?
                      <div className="user-block__avatar">
                        <Link to={AppRoute.MY_LIST}>
                          <img src={`https://htmlacademy-react-3.appspot.com/${avatarURL}`} alt="User avatar" width={63} height={63} />
                        </Link>
                      </div> :
                      <div className="user-block">
                        <Link to={AppRoute.SIGN_IN} className="user-block__link">Sign in</Link>
                      </div>
                    }
                  </div>
                </header>
                <div className="movie-card__wrap">
                  <div className="movie-card__desc">
                    <h2 className="movie-card__title">{name}</h2>
                    <p className="movie-card__meta">
                      <span className="movie-card__genre">{genre}</span>
                      <span className="movie-card__year">{released}</span>
                    </p>
                    <div className="movie-card__buttons">

                      <Link to={`/movie/${id}/player`} className="btn btn--play movie-card__button">
                        <svg viewBox="0 0 19 19" width={19} height={19}>
                          <use xlinkHref="#play-s" />
                        </svg>
                        <span>Play</span>
                      </Link>

                      <FavoriteButton currentMovie={currentMovie}/>

                      <Link to={`/movie/${id}/review`} className="btn movie-card__button">Add review</Link>

                    </div>
                  </div>
                </div>
              </div>
              <div className="movie-card__wrap movie-card__translate-top">
                <div className="movie-card__info">
                  <div className="movie-card__poster movie-card__poster--big">
                    <img src={posterImage} alt={`${name} img`} width={218} height={327} />
                  </div>
                  <Tabs currentMovie={this.props.currentMovie}/>
                </div>
              </div>
            </section>
            <div className="page-content">
              <MovieLike movieLikeThis={movieLikeThis}/>
              <footer className="page-footer">
                <div className="logo">
                  <a href="main.html" className="logo__link logo__link--light">
                    <span className="logo__letter logo__letter--1">W</span>
                    <span className="logo__letter logo__letter--2">T</span>
                    <span className="logo__letter logo__letter--3">W</span>
                  </a>
                </div>
                <div className="copyright">
                  <p>© 2019 What to watch Ltd.</p>
                </div>
              </footer>
            </div>
          </Route>

          <PrivateRoute exact path={`/movie/${id}/review`} render={() => {
            return (
              <AddReview onSubmit={this.props.comment}/>
            );
          }}
          />

          <Route exact path={`/movie/${id}/player`} render={() => {
            return (
              <VideoPlayerFull/>
            );
          }}
          />

        </Switch>
      </React.Fragment>
    );
  }
}

MoviePage.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
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
      }).isRequired
  ).isRequired,
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
  dispatch: PropTypes.func,
  match: PropTypes.object,
  isPlaying: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
  comment: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  addToFavorite(id, status) {
    dispatch(DataOperation.addFavorite(id, status));
  },
  comment(review, id) {
    dispatch(reviewOperation.postReview(review, id));
  },
  loadMovies() {
    dispatch(DataOperation.loadMovies());
  },
  dispatch
});

const mapToState = (state) => ({
  currentMovie: state.currentMovie,
  movies: state.movieList,
  isPlaying: state.isPlaying,
  authorizationStatus: state.authorizationStatus,
  avatarURL: state.avatarURL,
});

export default connect(mapToState, mapDispatchToProps)(withRouter(MoviePage));
