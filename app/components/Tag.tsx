"use client";

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  if (!text) {
    return null;
  }
  return (
    <div className="px-0.5 rounded border border-slate-300 w-fit bg-slate-200">
      <span className="px-1">#{text}</span>
    </div>
  );
};

export default Tag;
