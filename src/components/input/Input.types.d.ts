import React from "react";

export interface InputTypes {
  type: string;
  id: string;
  required: boolean;
  value: string;
  placeholder: string;
  className: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}
