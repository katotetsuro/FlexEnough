import { Roboto_Flex } from "next/font/google";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./VariablePreview.module.scss";

const roboto = Roboto_Flex({
  subsets: ["latin"],
  axes: [
    "GRAD",
    "XTRA",
    "YOPQ",
    "YTAS",
    "YTDE",
    "YTFI",
    "YTLC",
    "YTUC",
    "opsz",
    "slnt",
    "wdth",
  ],
});

//const variableSettings = 'font-variation-settings: "wdth" 600, "wght" 200, "opsz" 48;';

type Axes = {
  wght: string;
  wdth: string;
  slnt: string;
  YTAS: string;
};

const init: Axes = {
  wght: "100",
  wdth: "100",
  slnt: "0",
  YTAS: "750",
};

const toString = (axes: Axes) => {
  return Object.entries(axes)
    .map((e) => `"${e[0]}" ${e[1]}`)
    .join(",");
};

type ControlProps = {
  axes: Axes;
  setAxes: Dispatch<SetStateAction<Axes>>;
  update: (style: string) => void;
  min: number;
  max: number;
  axisKey: keyof Axes;
  label: string;
};

function Control({
  axes,
  setAxes,
  update,
  min,
  max,
  axisKey,
  label,
}: ControlProps) {
  return (
    <div>
      <input
        type="range"
        defaultValue={axes[axisKey]}
        min={min}
        max={max}
        onChange={(e) => {
          update(toString({ ...axes, [axisKey]: e.target.value }));
        }}
        onMouseUp={(e) => {
          setAxes({
            ...axes,
            [axisKey]: e.currentTarget.value,
          });
        }}
      />
      <label>{label}</label>
    </div>
  );
}

export function VariablePreview({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [axes, setAxes] = useState<Axes>(init);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.fontVariationSettings = toString(axes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = useCallback((style: string) => {
    if (ref.current) {
      ref.current.style.fontVariationSettings = style;
    }
  }, []);

  const C = (props: Omit<ControlProps, "axes" | "setAxes" | "update">) => {
    return <Control axes={axes} setAxes={setAxes} update={update} {...props} />;
  };

  return (
    <div>
      <div ref={ref} className={`${roboto.className} ${styles.preview}`}>
        {text}
      </div>
      <C min={100} max={1000} axisKey="wght" label="weight" />
      <C min={25} max={151} axisKey="wdth" label="width" />
      <C min={-10} max={0} axisKey="slnt" label="slant" />
      <C min={649} max={854} axisKey="YTAS" label="Ascender Height" />
    </div>
  );
}
