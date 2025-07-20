# RichTextEditor React Component Library <span style="font-size:0.8em;color:#888;">v0.0.1</span>

A modern, customizable rich text editor React component with toolbar, link support, and list formatting. Built with TypeScript and Lucide icons.

## Features
- Bold, italic, underline, strikethrough
- Bullet and numbered lists
- Insert/edit links
- Customizable placeholder
- Accessible and keyboard-friendly
- Styled for dark backgrounds (customize as needed)

## Installation

```bash
npm install rich-text-editor-lib lucide-react
```

> **Note:** `react`, `react-dom`, and `lucide-react` are peer dependencies.

## Usage

```tsx
import React, { useState } from 'react';
import RichTextEditor from 'rich-text-editor-lib';
import 'rich-text-editor-lib/dist/rich-text-editor.css';

function MyForm() {
  const [value, setValue] = useState('');
  return (
    <RichTextEditor
      name="my-editor"
      value={value}
      onChange={setValue}
      placeholder="Type some rich text..."
      className="max-w-[600px] w-full"
    />
  );
}
```

## Props
| Prop         | Type                                      | Required | Description                       |
|--------------|-------------------------------------------|----------|-----------------------------------|
| `name`       | `string`                                  | Yes      | Name for accessibility            |
| `value`      | `string`                                  | Yes      | HTML content value                |
| `onChange`   | `(value: string) => void`                 | Yes      | Called with new HTML on change    |
| `onBlur`     | `(e: React.FocusEvent<HTMLDivElement>)`   | No       | Blur event handler                |
| `placeholder`| `string`                                  | No       | Placeholder text                  |
| `error`      | `string`                                  | No       | Error message (shows in red)      |
| `className`  | `string`                                  | No       | Custom classes for root wrapper   |
| `style`      | `React.CSSProperties`                     | No       | Custom styles for root wrapper    |

## Styling
- The editor is styled for dark backgrounds by default using included CSS (`rich-text-editor.css`).
- You can override styles by passing a `className` or `style` prop.
- The toolbar uses Lucide icons.
- **User content inside the editor is styled via global CSS selectors, not utility classes.**

## Development
- Clone the repo and run the demo app:
  ```bash
  npm install
  npm run dev
  ```
- To build the library:
  ```bash
  npm run build
  ```
- The demo imports the built library from `dist/`.

## License
MIT

## Contributors

- [Adarsh Viswam](https://github.com/adarshnub)
