import React, { useState } from "react";
import Picker from "@emoji-mart/react";
import standart from "./custom.json";
import premium from "./premium.json";

interface CustomEmojiesProps {
  onEmojiSelect: (emoji: any) => void;
}

const CustomEmojies: React.FC<CustomEmojiesProps> = ({ onEmojiSelect }) => {
  const handleEmojiSelect = (emojiSrc: string) => {
    onEmojiSelect(emojiSrc);
  };

  const [iconPack, setIconPack] = useState<"standart" | "premium">("standart");

  const isStandart = iconPack === "standart";

  const pack = isStandart ? premium : standart;

  const categories = isStandart
    ? [
        "frequent",
        "people",
        "nature",
        "foods",
        "activity",
        "places",
        "objects",
        "symbols",
        "flags",
        "dev",
      ]
    : ["valentines"];

  return (
    <div>
      <Picker
        onEmojiSelect={handleEmojiSelect}
        custom={pack}
        locale="ru"
        theme="light"
        emojiSize={24}
        categories={categories}
      />
      <div className="emoji-footer">
        <button
          type="button"
          className={`icon-button ${iconPack === "standart" ? "active" : ""}`}
          onClick={() => setIconPack("standart")}
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2478_15334)">
              <path
                d="M20.1932 10.5009C20.1932 11.7737 19.9425 13.0341 19.4554 14.21C18.9683 15.3859 18.2544 16.4544 17.3544 17.3544C16.4544 18.2544 15.3859 18.9683 14.21 19.4554C13.0341 19.9425 11.7737 20.1932 10.5009 20.1932C7.93034 20.1932 5.46507 19.1721 3.6474 17.3544C1.82974 15.5367 0.808594 13.0715 0.808594 10.5009C0.808594 7.93034 1.82974 5.46507 3.6474 3.64741C5.46507 1.82974 7.93034 0.808594 10.5009 0.808594C11.7737 0.808594 13.0341 1.05929 14.21 1.54638C15.3859 2.03346 16.4544 2.74739 17.3544 3.64741C18.2544 4.54742 18.9683 5.61589 19.4554 6.79182C19.9425 7.96774 20.1932 9.22809 20.1932 10.5009ZM18.5826 10.5009C18.5826 8.35751 17.7311 6.30191 16.2155 4.78631C14.6999 3.2707 12.6443 2.41924 10.5009 2.41924C8.35751 2.41924 6.30191 3.2707 4.78631 4.78631C3.2707 6.30191 2.41924 8.35751 2.41924 10.5009C2.41924 12.6443 3.2707 14.6999 4.78631 16.2155C6.30191 17.7311 8.35751 18.5826 10.5009 18.5826C12.6443 18.5826 14.6999 17.7311 16.2155 16.2155C17.7311 14.6999 18.5826 12.6443 18.5826 10.5009Z"
                fill="#285471"
              />
              <path
                d="M7.35141 11.197C7.92949 11.197 8.39813 10.7283 8.39813 10.1502C8.39813 9.57215 7.92949 9.10352 7.35141 9.10352C6.77332 9.10352 6.30469 9.57215 6.30469 10.1502C6.30469 10.7283 6.77332 11.197 7.35141 11.197Z"
                fill="#285471"
              />
              <path
                d="M13.6483 11.197C14.2264 11.197 14.695 10.7283 14.695 10.1502C14.695 9.57215 14.2264 9.10352 13.6483 9.10352C13.0702 9.10352 12.6016 9.57215 12.6016 10.1502C12.6016 10.7283 13.0702 11.197 13.6483 11.197Z"
                fill="#285471"
              />
              <path
                d="M12.9327 14.592C11.475 15.6223 9.74821 15.6584 8.24294 14.7068C8.01544 14.5635 7.86586 14.4129 7.79422 14.2548C7.56618 13.7553 8.02555 13.2048 8.5686 13.3074C8.75563 13.3435 8.97711 13.5116 9.16333 13.6166C10.0197 14.1028 10.8876 14.1217 11.767 13.6732C11.9778 13.5658 12.2001 13.3426 12.4675 13.3139C13.2222 13.2352 13.5446 14.1588 12.9327 14.592Z"
                fill="#285471"
              />
            </g>
            <defs>
              <clipPath id="clip0_2478_15334">
                <rect width="21" height="21" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <button
          type="button"
          className={`icon-button ${iconPack === "premium" ? "active" : ""}`}
          onClick={() => setIconPack("premium")}
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.72745 20C5.36492 20 5.00089 19.8805 4.68519 19.6398C4.05229 19.1601 3.79853 18.3501 4.04172 17.5747L5.39664 13.232C5.43894 13.0983 5.39362 12.9521 5.28336 12.8687L1.73517 10.1839C1.10227 9.70414 0.848503 8.89412 1.09018 8.11871C1.33187 7.3433 1.99498 6.84313 2.77742 6.84313H7.16243C7.29837 6.84313 7.41619 6.75347 7.45849 6.61821L8.81341 2.27558C9.05509 1.50016 9.7182 1 10.5006 1C11.2831 1 11.9447 1.50016 12.1864 2.27558L13.5413 6.61821C13.5836 6.7519 13.7014 6.84313 13.8374 6.84313H18.2224C19.0048 6.84313 19.6664 7.3433 19.9096 8.11871C20.1513 8.89412 19.899 9.70414 19.2646 10.1839L15.7164 12.8687C15.6062 12.9521 15.5608 13.0968 15.6031 13.2305L16.9581 17.5731C17.1997 18.3485 16.9475 19.1585 16.3131 19.6382C15.6787 20.118 14.8615 20.118 14.2286 19.6382L10.6804 16.9534C10.5701 16.87 10.4236 16.87 10.3149 16.9534L6.76667 19.6382C6.454 19.8805 6.09148 20 5.72745 20ZM2.77742 8.36721C2.58106 8.36721 2.50704 8.50721 2.48136 8.59214C2.45568 8.6755 2.43605 8.83436 2.59465 8.95389L6.14284 11.6387C6.76667 12.1106 7.02497 12.9411 6.78782 13.7039L5.43289 18.0465C5.37247 18.2416 5.47821 18.3579 5.54618 18.4083C5.61416 18.4602 5.75312 18.5278 5.91173 18.4083L9.45991 15.7234C10.0837 15.2516 10.9221 15.2516 11.5459 15.7234L15.0941 18.4067C15.2527 18.5262 15.3917 18.4586 15.4596 18.4067C15.5276 18.3548 15.6334 18.2384 15.5729 18.0434L14.218 13.7007C13.9793 12.9379 14.2392 12.1075 14.863 11.6356L18.4112 8.95074C18.5713 8.82963 18.5501 8.67235 18.5245 8.58742C18.4988 8.50406 18.4248 8.36407 18.2284 8.36407H13.8434C13.073 8.36407 12.3948 7.85133 12.1562 7.0885L10.8012 2.74586C10.7408 2.55082 10.5898 2.52252 10.5052 2.52252C10.4206 2.52252 10.2695 2.55083 10.2091 2.74743L8.85419 7.09006C8.61553 7.85289 7.93883 8.36565 7.16696 8.36565H2.77742V8.36721Z"
              fill="#285471"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomEmojies;
