import React, { useRef, useState, useEffect } from "react";
import WordCloud from "react-d3-cloud";
import { LessonConfigType, WordType } from "../../models/Wordhero";

interface Props {
  words: WordType[];
  config: LessonConfigType;
  title: string;
}

const CloudWords = ({ words, config, title }: Props) => {
  const [width, setWidth] = useState(0);
  const inputEl = useRef(null);

  useEffect(() => {
    setWidth(inputEl.current ? (inputEl as any).current.offsetWidth : 0);
  }, []);

  const data = words.map((word) => ({
    text: word.value,
    // value: word.id.length * 100,
    value: Math.floor(Math.random() * 1000),
  }));
  const fontSizeMapper = (word) => Math.log2(word.value) * 5;
  const rotate = (word) => (Math.random() > 0.5 ? 0 : 0);

  return (
    <div
      ref={inputEl}
      className="wordcloud-container full-height"
      style={{ ...config.preferences }}
    >
      <h2>
        <span className="wordcloud-title">{title}</span>
      </h2>
      {width !== 0 && (
        <WordCloud
          width={width}
          data={data}
          fontSizeMapper={fontSizeMapper}
          rotate={rotate}
          font={config.preferences?.font}
        />
      )}
    </div>
  );
};

export default CloudWords;
