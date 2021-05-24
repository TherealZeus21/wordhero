import { BehaviorSubject } from "rxjs";

const authState = new BehaviorSubject<AuthStore>({
  isLogged: false,
  familyName: null,
  givenName: null,
});

export function authenticateUser(name: string, family: string): void {
  authState.next({
    ...authState.getValue(),
    isLogged: true,
    givenName: name,
    familyName: family,
  });
}

export { authState };

export interface AuthStore {
  isLogged: boolean;
  givenName: string | null;
  familyName: string | null;
}
