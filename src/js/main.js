function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();

  let google_id = profile.getId();
  let token = googleUser.getAuthResponse().id_token;

  console.log('ID: ' + google_id); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log('Token: ' + token)

  document.getElementById("google_id").innerHTML=google_id;
  document.getElementById("google_token").innerHTML=token;

  let tokenParts = token.split( "." );
  let encodedTokenPayload = tokenParts[ 1 ];
  let decodedTokenPayload = atob( encodedTokenPayload );

  document.getElementById("google_token_payload").innerHTML=decodedTokenPayload;

  let tokenPayload = JSON.parse( decodedTokenPayload );
  let iat = new Date( tokenPayload.iat * 1000);

  document.getElementById("google_token_iat").innerHTML=iat.toLocaleString("en-US", {timeZone: "America/Chicago"});

  let exp = new Date(tokenPayload.exp * 1000);

  document.getElementById("google_token_exp").innerHTML=exp.toLocaleString("en-US", {timeZone: "America/Chicago"});

  setInterval( () => {

    let now = new Date();
    let seconds_left = (exp - now) / 1000;
    let minutes_left = Math.floor( seconds_left / 60 );
    seconds_left = Math.floor( seconds_left % 60 );
    seconds_left = seconds_left.toString().padStart(2, "0");

    document.getElementById("google_token_time_left").innerHTML="00:" + minutes_left + ":" + seconds_left;
  }, 1000);


}
