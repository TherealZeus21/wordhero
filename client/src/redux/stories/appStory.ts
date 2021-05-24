import { BehaviorSubject } from "rxjs";

const appState = new BehaviorSubject<AppStore>({
  isSidePanelOpen: false,
});

export function toogleSidePanel(isOpen) {
  appState.next({
    ...appState,
    isSidePanelOpen: isOpen,
  });
}

export { appState as authState };

export interface AppStore {
  isSidePanelOpen: boolean;
}
