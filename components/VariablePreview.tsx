import { Roboto_Flex } from "next/font/google";
import {
  ChangeEventHandler,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./VariablePreview.module.scss";

const roboto = Roboto_Flex({ subsets: ["latin"] });

//const variableSettings = 'font-variation-settings: "wdth" 600, "wght" 200, "opsz" 48;';

type Axis = {
  wght: string;
  wdth: string;
};

const init: Axis = {
  wght: "100",
  wdth: "100",
};

const toString = (axis: Axis) => {
  return Object.entries(axis)
    .map((e) => `"${e[0]}" ${e[1]}`)
    .join(",");
};

// function Control({ axis, setAxis, update, min, max, axisKey }) {
//   return (
//     <div>
//       <input
//         type="range"
//         min={100}
//         max={1000}
//         onChange={(e) => {
//           update(toString({ ...axis, wght: e.target.value }));
//         }}
//         onMouseUp={(e) => {
//           setAxis({
//             ...axis,
//             wght: e.currentTarget.value,
//           });
//         }}
//       />
//       <label>weight</label>
//     </div>
//   );
// }

export function VariablePreview({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [axis, setAxis] = useState<Axis>(init);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.fontVariationSettings = toString(axis);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = useCallback((style: string) => {
    if (ref.current) {
      ref.current.style.fontVariationSettings = style;
    }
  }, []);

  return (
    <div>
      <div ref={ref} className={`${roboto.className} ${styles.preview}`}>
        {text}
      </div>
      <div>
        <input
          type="range"
          min={100}
          max={1000}
          onChange={(e) => {
            update(toString({ ...axis, wght: e.target.value }));
          }}
          onMouseUp={(e) => {
            setAxis({
              ...axis,
              wght: e.currentTarget.value,
            });
          }}
        />
        <label>weight</label>
      </div>
    </div>
  );
}
