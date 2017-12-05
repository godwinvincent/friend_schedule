import React, { Component } from 'react';
import firebase from 'firebase/app';
import { StyleSheet, css } from 'aphrodite';

export default class Login extends Component {
    loginClick(){
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_friends');
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(token, user)
            window.FB.api(
                '/me/friends',
                'GET',
                {
                    access_token:token,
                    scope:'user_friends'
                },
                function(response) {
                    console.log(response);
                    //this.props.setAuth(token, user, response.data)
                }
              );
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    render(){
        const styles = StyleSheet.create({
            loginPage : {
                width: 360,
                padding: '8% 0 0',
                margin: 'auto'
              },
              form : {
                position: 'relative',
                zIndex: 1,
                background: '#FFFFFF',
                maxWidth: 360,
                margin: '0 auto 100px',
                padding: 45,
                textAlign: 'center',
                boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'
              },
            input : {
                fontFamily: '"Roboto", sans-serif',
                outline: 0,
                background: '#f2f2f2',
                width: '100%',
                border: 0,
                margin: '0 0 15px',
                padding: 15,
                boxSizing: 'border-box',
                fontSize: 14
              },
              button : {
                fontFamily: '"Roboto", sans-serif',
                textTransform: 'uppercase',
                outline: 0,
                background: '#4CAF50',
                width: '100%',
                border: 0,
                padding: 15,
                color: '#FFFFFF',
                fontSize: 14,
                cursor: 'pointer'
              }
        });
        return(
            <div className={css(styles.loginPage)}>
            <div className={css(styles.form)}>
                <button onClick={() => this.loginClick()} className={css(styles.button)}>Login In with Facebook</button>
            </div>
          </div>
        );
    }
}