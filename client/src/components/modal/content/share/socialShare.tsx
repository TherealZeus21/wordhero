import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";

interface Props {
  url: string;
}

export const SocialShare = ({ url }: Props) => {
  const title = "Word Hero";
  return (
    <div>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <EmailShareButton url={url} subject={title} body="Link for Word Hero:">
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  );
};
