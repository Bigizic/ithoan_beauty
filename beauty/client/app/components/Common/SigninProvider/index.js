import React, { useEffect } from 'react';

const SigninProvider = (props) => {
  const { googleSignin } = props;
  useEffect(() => {
    window.handleToken = (response) => {
      googleSignin(response);
    };
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      if (script) document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='signup-provider'>
      <div id="g_id_onload"
          data-client_id="1068865622807-ltrik6mlcj32tncv303v950r8jmrt3ct.apps.googleusercontent.com"
          // data-login_uri={`${API_URL}/auth/google_signin`}
          data-callback='handleToken'
      >
      </div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-theme="outline"
        data-text="signin_with"
        data-shape="pill"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </div>
  );
};

export default SigninProvider;


