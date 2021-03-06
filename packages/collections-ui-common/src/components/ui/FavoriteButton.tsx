import React from 'react'
import {firebase} from '../firebase'
import {EmptyStar, Star} from './svg'

export class FavoriteButton extends React.Component<any, any> {
  static writeFavorite(authUserUid, result) {
    result.timestamp = new Date().getTime()
    firebase.db.ref('/users/' + authUserUid + '/favorites/' + result._id).set({
      result,
    });
  }

  static removeFavorite(authUserUid, result) {
    firebase.db.ref('/users/' + authUserUid + '/favorites/' + result._id).remove();
  }
  state: {
    error: null;
    favorite: string;
    isFavorite: boolean;
    isLoaded: boolean;
  };
  authUser: {
    uid: string;
  }
  result: {
    _id: string;
  }
  _isMounted: boolean

  constructor(props) {
    super(props)
    this.authUser = props.authUser
    this.result = props.result
    this.state = {
      error: null,
      favorite: null,
      isFavorite: false,
      isLoaded: false,
    }
    this.getFavorite.bind(this)
  }

  getFavorite() {
    firebase.db.ref('/users/' + this.authUser.uid + '/favorites/' + this.result._id).once('value')
      .then((snapshot) =>
        this.setState({
          favorite: (snapshot.val() && snapshot.val().result._id),
          isFavorite: true,
          isLoaded: true,
        }),
      );
  }

  componentDidMount() {
    this.getFavorite()
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  setFavorite(result) {
    if (this._isMounted) {
      this.setState({
        favorite: result._id,
        isFavorite: true,
      });
    }
  }

  unsetFavorite() {
    if (this._isMounted) {
      this.setState({
        isFavorite: false,
      });
    }
  }

  render() {
    const {error, isLoaded, favorite, isFavorite} = this.state
    const {className} = this.props
    if (error) {
      return <div>Error: {error}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className='button-right'>
          {isFavorite && favorite ?
            (
              <button
                aria-label='remove favorite'
                className={className}
                onClick={() => {
                  FavoriteButton.removeFavorite(this.authUser.uid, this.result);
                  this.unsetFavorite()
                }}
                title='Favorite'
                type="button"
              >
                <Star/>
              </button>)
            : (
              <button
                aria-label='set favorite'
                className={className}
                onClick={() => {
                  FavoriteButton.writeFavorite(this.authUser.uid, this.result);
                  this.setFavorite(this.result)
                }}
                title='Favorite'
                type="button"
              >
                <EmptyStar/>
              </button>)
          }
        </div>)
    }
  }
}
