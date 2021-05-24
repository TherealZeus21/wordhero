/* eslint-disable no-console */
import { UserAgentApplication, AuthenticationParameters, Account } from "msal";
import { authenticateUser } from "../redux/stories/authStory";

export const userAgentApplication = new UserAgentApplication({
  auth: {
    clientId: "620de173-74ac-4be5-9058-a66a40775574",
    authority:
      "https://wordhero.b2clogin.com/wordhero.onmicrosoft.com/B2C_1_SignUpAndSignIn",
    redirectUri: window.location.origin,
    // redirectUri: "https://wordhero-dev.web.app",
    validateAuthority: false,
  },
  system: { loadFrameTimeout: 90000 },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
});

userAgentApplication.handleRedirectCallback(authCallback);

function tokenRequest(): AuthenticationParameters {
  return {
    scopes: ["https://wordhero.onmicrosoft.com/web/user"],
  };
}

function authCallback(error, response): void {
  console.log(error, response);

  if (response) {
    updateStore(response);
  }
}

export function loginRedirect(): void {
  userAgentApplication.loginRedirect(tokenRequest());
}

export function logout(): void {
  userAgentApplication.logout();
}

export function getUser(): Account {
  return userAgentApplication.getAccount();
}

export function getUserEmail(): any {
  const { emails } = userAgentApplication.getAccount().idTokenClaims;
  return emails ? emails[0].toLocaleLowerCase() : undefined;
}

export function getTokenPopup(): Promise<any> {
  return userAgentApplication
    .acquireTokenSilent(tokenRequest())
    .then((tokenResponse) => {
      return tokenResponse.accessToken;
    })
    .catch((error) => {
      console.log(error);
      loginRedirect();
    });
}

(function setStore(): void {
  const user = getUser();
  if (user) {
    updateStore(user);
  }
})();

function updateStore(user): void {
  const { given_name: name, family_name: surname } = user.idTokenClaims;
  authenticateUser(name, surname);
}
