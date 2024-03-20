import React, { useRef, useState } from "react";
import CustomEmojies from "./CustomEmojies";

const ContentEditable = () => {
  const [content] = useState<string>("");

  const contentRef = useRef<HTMLDivElement>(null);

  const fetchImage = async (src: string): Promise<string> => {
    const response = await fetch(src);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleEmojiSelect = async (emoji: any) => {
    let insertText: string;
    if (emoji.native) {
      insertText = emoji.native;
    } else if (emoji.src) {
      const imageBase64 = await fetchImage(emoji.src);
      insertText = `<img src=${imageBase64} class="emoji"/>`;
    } else {
      return;
    }

    insertTextAtCursor(insertText);
  };
  const insertTextAtCursor = async (textToInsert: string) => {
    const contentDiv = contentRef.current;
    if (!contentDiv) return;

    contentDiv.focus();

    document.execCommand("insertHTML", false, textToInsert);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      return;
    }
  };

  return (
    <>
      <div className="container">
        <div
          className="textarea"
          contentEditable
          ref={contentRef}
          onKeyDown={handleKeyDown}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <CustomEmojies onEmojiSelect={handleEmojiSelect} />
      </div>
    </>
  );
};

export default ContentEditable;
