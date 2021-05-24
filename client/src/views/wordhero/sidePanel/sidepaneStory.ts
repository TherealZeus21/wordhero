import { BehaviorSubject } from "rxjs";
import { UserResultDetailsType } from "../../../models/wordheroResult";

const sidePanelState = new BehaviorSubject<SidePanelStore>({
  configOpen: false,
  resultOpen: false,
  questionsOpen: false,
});

export function toogleConfigPanel() {
  sidePanelState.next({
    configOpen: !sidePanelState.value.configOpen,
    resultOpen: false,
    questionsOpen: false,
  });
}

export function toogleResultPanel() {
  sidePanelState.next({
    resultOpen: !sidePanelState.value.resultOpen,
    configOpen: false,
    questionsOpen: false,
  });
}

export function showUserResult(result) {
  sidePanelState.next({
    ...sidePanelState.value,
    userResult: result,
  });
}

export function toogleQuestionsPanel() {
  sidePanelState.next({
    questionsOpen: !sidePanelState.value.questionsOpen,
    configOpen: false,
    resultOpen: false,
  });
}

export function closeAllPanels() {
  sidePanelState.next({
    resultOpen: false,
    configOpen: false,
    questionsOpen: false,
    userResult: undefined,
  });
}

export { sidePanelState };

export interface SidePanelStore {
  configOpen: boolean;
  resultOpen: boolean;
  questionsOpen: boolean;
  userResult?: UserResultDetailsType;
}
