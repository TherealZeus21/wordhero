import React, { useEffect, useState } from "react";
import { WordHeroShareGroup } from "../../../../models/wordheroResult";
import CreatableSelect from "../../../controls/creatableSelect";
import { ShareType } from "./shareType";

interface Props {
  existingGroups: WordHeroShareGroup[];
  onShare: (groupName: string, type: string) => void;
  onChange: () => void;
}
export const ShareForm = ({ onShare, existingGroups, onChange }: Props) => {
  const [groupName, setGroupName] = useState("");
  const [shareType, setShareType] = useState("spidergram");
  const [groups, setGroups] = useState(existingGroups);

  useEffect(() => {
    setGroups(existingGroups);
  }, [existingGroups]);

  const onSubmit = (event) => {
    event.preventDefault();
    onShare(groupName, shareType);
  };

  const onCreateNewGroup = (newGroup) => {
    setGroupName(newGroup);
    setGroups([...groups, { groupName: newGroup } as WordHeroShareGroup]);
    onChange();
  };

  const onSetGroupName = (newName) => {
    setGroupName(newName);
    onChange();
  };

  const onSetShareType = (type) => {
    setShareType(type);
    onChange();
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <CreatableSelect
          options={groups.map((x) => x.groupName)}
          propName={"Group name"}
          propValue={groupName}
          onChange={onSetGroupName}
          onCreateNew={onCreateNewGroup}
        />
      </div>

      <ShareType selectedType={shareType} switchType={onSetShareType} />

      <button
        className={"submit " + (groupName.length === 0 ? "disabled" : "")}
        type="submit"
        disabled={groupName.length === 0}
      >
        Share
      </button>
    </form>
  );
};
