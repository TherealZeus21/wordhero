import React from "react";

interface Props {
  createdAt: Date;
}

const CreateDate = ({ createdAt }: Props) => {
  if (!createdAt) {
    return <span />;
  }
  const rtf1 = new (Intl as any).RelativeTimeFormat("en", {
    style: "narrow",
    numeric: "auto",
  });
  const nowDate = new Date();
  const startDate = new Date(createdAt);
  const diffInTime = startDate.getTime() - nowDate.getTime();

  const diffInMin = Math.floor(diffInTime / (1000 * 60));
  if (diffInMin > -60) {
    return <span>{rtf1.format(diffInMin, "minute")}</span>;
  }

  const diffInHours = Math.floor(diffInTime / (1000 * 3600));
  const time =
    diffInHours > -24
      ? rtf1.format(diffInHours, "hour")
      : rtf1.format(Math.floor(diffInHours / 24), "day");

  return <span>{time}</span>;
};

export default CreateDate;
