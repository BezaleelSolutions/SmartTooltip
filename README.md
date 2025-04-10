# 🧩 Generic Tooltip Plugin

A lightweight, framework-agnostic JavaScript and CSS solution that adds rich, customizable tooltips to any HTML element using data attributes. Supports both plain text and full HTML content (images, videos, iframes), ideal for enhancing UX on inputs, buttons, forms, and more.

---

## ✨ Features

- ✅ Lightweight (pure JS, no dependencies)
- 🎨 Supports plain text and full HTML content
- 🖱️ Click and hover triggers
- 🧱 Non-intrusive and self-contained
- 📱 Responsive and mobile-friendly
- 🔧 Fully customizable via `data-*` attributes

---

## 🔧 Installation

**Method 1: Embed directly**

Include the script and style in your HTML page:

```html
<link rel="stylesheet" href="tooltip.css">
<script src="tooltip.js"></script>
```

> You can also inline the CSS/JS for standalone use.

---

## 🚀 Usage

### Basic Example:

```html
<input 
  type="text" 
  placeholder="Email" 
  data-tooltip="Enter a valid email address" 
  data-show="click" />
```

### With HTML Content:

```html
<div 
  data-tooltip-html="<img src='https://i.pravatar.cc/150' style='border-radius:8px;'/><p>User profile image</p>" 
  data-show="hover">
  Hover to view profile
</div>
```

---

## 🧩 Attributes

| Attribute         | Description                                                |
|------------------|------------------------------------------------------------|
| `data-tooltip`    | Plain text tooltip with typing animation                   |
| `data-tooltip-html` | Full HTML tooltip content (rich formatting)              |
| `data-show`       | Trigger type: `"click"` (default) or `"hover"`             |

---

## ⚙️ Behavior & Options

- `data-tooltip`: Monospaced font tooltip with typing animation
- `data-tooltip-html`: Injects raw HTML into the tooltip
- `data-show="click"`: Tooltip appears on click (default)
- `data-show="hover"`: Tooltip appears on hover, disappears on leave

---

## 💻 Example Use Cases

- Form helper tooltips  
- Profile previews  
- Embedded video previews  
- Documentation hints  
- Product quick-views

---

## 📐 Positioning

Tooltips are auto-positioned above the target element. If space is limited, they appear below.

---

## 📦 API (Internal)

Automatically initializes:

```js
new GenericTooltip({
  speed: 60, // Typing animation speed (ms per character)
});
```

To manually re-initialize (e.g. after DOM changes):

```js
new GenericTooltip();
```

---

## 💡 Best Practices

- Keep HTML tooltip content concise
- Ensure accessibility in production environments
- Avoid large inline blocks
- Use CSS styles like `max-width`, `object-fit`, `resize` within your content

---

## 🛠️ Technical Details

- **Language**: JavaScript (ES6)
- **Dependencies**: None
- **Encapsulation**: Scoped CSS (`.generic-tooltip`), JS wrapped in IIFE
- **Events**: `click`, `mouseenter`, `mouseleave`, `scroll`, `resize`

---

## 🧪 Browser Support

| Browser  | Supported |
|----------|-----------|
| Chrome   | ✅        |
| Firefox  | ✅        |
| Safari   | ✅        |
| Edge     | ✅        |
| IE 11+   | ⚠️ Not tested |

---

## 📁 Folder Structure (if exported)

```
tooltip-plugin/
├── tooltip.css       # Scoped CSS
├── tooltip.js        # Standalone JS module
└── demo.html        # Sample demo
```

---

> Feel free to fork, enhance, or contribute to this plugin to fit your custom use cases!
