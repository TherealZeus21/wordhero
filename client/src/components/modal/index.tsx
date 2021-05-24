import React, { PureComponent } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
  onClose: () => void;
  isOpen: boolean;
}

export default class Modal extends PureComponent<Props, {}> {
  componentDidMount(): void {
    document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "Esc" || e.key === "Escape") {
      const { onClose } = this.props;
      onClose();
    }
  };

  closeModal = (e: any): void => {
    const { onClose } = this.props;
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  render(): JSX.Element | null {
    const { children, isOpen } = this.props;
    if (!isOpen) {
      return null;
    }

    return (
      <div className="modal-container" onClick={this.closeModal}>
        <div className="modal">
          <button
            className="middle eclipse close-btn"
            onClick={this.closeModal}
            type="button"
          >
            close
          </button>
          <div className="content">{children}</div>
        </div>
      </div>
    );
  }
}
