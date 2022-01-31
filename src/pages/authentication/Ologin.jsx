import React, { useEffect, useRef, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";

const OktaSignInWidget = ({ config, onSuccess, onError }) => {
  const widgetRef = useRef();
  useEffect(() => {
    if (!widgetRef.current) return false;

    const widget = new OktaSignIn(config);

    widget
      .showSignInToGetTokens({
        el: widgetRef.current,
      })
      .then(onSuccess)
      .catch(onError);

    return () => widget.remove();
  }, [config, onSuccess, onError]);

  return <div ref={widgetRef} />;
};

const Ologin = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();

  const onSuccess = (tokens) => {
    console.log("heeloo");
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log("heelooeerr");
    console.log("error logging in", err);
  };

  console.log(authState);

  const getRole = async () => {
    const res = await axios.post(
      `okta-nodejs/us-central1/getRolesAndPrivileges`,
      { email: authState?.idToken?.claims?.email }
    );

    res.data.data[0].customCloudRoleName.includes("admin")
      ? history.push("/iam")
      : history.push("/environmentcatelogue");
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
      getRole();
    }
  }, [authState]);

  return (
    !authState.isAuthenticated && (
      <OktaSignInWidget
        config={config}
        onSuccess={onSuccess}
        onError={onError}
      />
    )
  );
};

export default Ologin;
