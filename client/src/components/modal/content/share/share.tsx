import React, { Component } from "react";
import QRCode from "qrcode.react";
import { ShareForm } from "./form";
import {
  addShareGroup,
  getHeroGroups,
} from "../../../../services/wordheroShareService";
import { WordHeroShareGroup } from "../../../../models/wordheroResult";
import { generateUrl } from "./helpers/helper";
import { toast } from "react-toastify";
import { SocialShare } from "./socialShare";

interface Props {
  wordHeroId?: string;
}
interface State {
  url: string;
  groups: WordHeroShareGroup[];
}

export default class ShareContent extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      url: "",
    };
  }

  async componentDidMount() {
    await this.fetchGroups();
  }

  async fetchGroups() {
    const groups = await getHeroGroups(this.props.wordHeroId || "");
    this.setState({
      groups,
    });
  }

  onShare = async (groupName: string, type: string) => {
    if (!this.state.groups.find((x) => x.groupName === groupName)) {
      await addShareGroup({
        groupName,
        type,
        wordHeroId: this.props.wordHeroId,
      } as WordHeroShareGroup);
    }
    const url = generateUrl(this.props.wordHeroId, groupName, type);
    this.setState({
      url,
    });

    await this.fetchGroups();
  };

  copyIntoClipboard = async () => {
    await navigator.clipboard.writeText(this.state.url);
    toast.success("Copied to the clipboard");
  };

  hideShare = () => {
    if (this.state.url.length > 0) {
      this.setState({
        url: "",
      });
    }
  };

  render() {
    const { url, groups } = this.state;
    return (
      <section className="share-content">
        <h1>SHARE</h1>
        <ShareForm
          onShare={this.onShare}
          onChange={this.hideShare}
          existingGroups={groups}
        />

        {url.length !== 0 ? (
          <section className="share-links">
            <div>
              {"URL: "}
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
              <div
                className="copy"
                title="copy"
                onClick={this.copyIntoClipboard}
              >
                <img
                  src={require(`../../../../assets/icons/copy.svg`)}
                  alt="word hero img"
                  className="copy-icon wh-icon"
                />
                <span>Copy</span>
              </div>

              <SocialShare url={url} />
            </div>
            <h4>QR Code:</h4>
            <QRCode value={url} size={256} renderAs="svg" />
          </section>
        ) : null}
      </section>
    );
  }
}
