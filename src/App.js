import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import { useState } from 'react';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App () {
  const [ user, setUser ] = useState( {} );
  const [ errors, setErrors ] = useState( {} );
  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup( auth, googleProvider )
      .then( result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          image: photoURL
        };
        setUser( loggedInUser );
      } )
      .catch( error => {
        const { message } = error;
        const errorMessage = {
          message: message
        };
        setErrors( errorMessage );
      } );
  }

  const handleGithubSingIn = () => {
    signInWithPopup( auth, githubProvider )
      .then( result => {
        const { displayName, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          image: photoURL
        };
        setUser( loggedInUser );
      } )
      .catch( error => {
        const { message } = error;
        const errorMessage = {
          message: message
        };
        setErrors( errorMessage );
      } );
  }

  const handleSignOut = () => {
    signOut( auth )
      .then( () => {
        // Sign-out successful.
        setUser( {} );
      } ).catch( ( error ) => {
        // An error happened.
      } );
  }

  return (
    <div className="App">
      { !user.name ?
        <div>
          <button onClick={ handleGoogleSignIn }>Google Sign In</button>
          <button onClick={ handleGithubSingIn }>Github Sign In</button>
        </div> :
        <button onClick={ handleSignOut }>Sign Out</button>
      }

      <br />
      {
        user.name && <div>
          <h2>Welcome { user.name }</h2>
          <p>I know your email address: { user.email }</p>
          <img src={ user.image } alt="" />
        </div>
      }
      {
        errors.message && <div>
          <h2>{ errors.message }</h2>
        </div>
      }
    </div>
  );
}

export default App;
