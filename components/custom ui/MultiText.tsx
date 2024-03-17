"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const addValue = (item: string) => {
    onChange(item);
    setInputValue("");
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (inputValue.trim().length > 0) {
              addValue(inputValue);
            }
            return;
          }
        }}
      />
      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((item, index) => (
          <Badge key={index} className="bg-grey-1 text-white">
            {item}
            <button
              type="button"
              className="ml-1 rounded-full outline-none hover:bg-red-1 p-0 h-fit"
              onClick={() => onRemove(item)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
