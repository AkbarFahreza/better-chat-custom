import React from "react";

interface BooleanEditorProps {
  title: string;
  val: boolean;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function BooleanEditor({ title, val, change }: BooleanEditorProps) {
  return (
    <div className="flex flex-row items-center">
      <label className=" mr-5">{title}</label>
      <input
        type="checkbox"
        className="scale-125"
        checked={val}
        onChange={change}
      />
    </div>
  );
}

export default BooleanEditor;
{
  /* <div className="flex flex-row items-center">
  <label className=" mr-5">Show avatar</label>
  <input
    type="checkbox"
    className="scale-125"
    checked={data.content_config.content_show_avatar}
    onChange={(e) =>
      updateField({
        content_config: {
          content_show_avatar: e.target.checked,
        },
      })
    }
  />
</div>; */
}
