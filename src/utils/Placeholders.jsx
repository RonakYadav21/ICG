// Helper to detect placeholder patterns
const isPlaceholderText = (text) => {
  const regex = /{{\s*([a-zA-Z0-9_.]+)\s*}}/g;
  return regex.test(text);
};

// Constants for styling
const PLACEHOLDER_COLOR = "#999999";
const DEFAULT_TEXT_COLOR = "#000000";
const PLACEHOLDER_IMAGE_STYLES = {
  border: "2px dashed #999999",
  backgroundColor: "#f3f4f6",
  borderRadius: "8px",
  opacity: 0.7,
  filter: "grayscale(100%)",
  label: "Photo Placeholder",
  labelColor: "#666666",
  fontSize: 14,
  fontStyle: "italic",
};

export function replacePlaceholders(elements, data) {
  const regex = /{{\s*([a-zA-Z0-9_.]+)\s*}}/g;

  return elements.map((el) => {
    const copy = JSON.parse(JSON.stringify(el));

    // Handle text placeholders
    if (copy.type === "text" && copy.props?.text) {
      // Store original color if not already stored
      if (!copy.props.originalFill) {
        copy.props.originalFill = copy.props.fill || DEFAULT_TEXT_COLOR;
      }

      // Force placeholder color for placeholder text
      if (isPlaceholderText(copy.props.text)) {
        copy.props.fill = PLACEHOLDER_COLOR;
        copy.props.fontStyle = "italic";
      }

      // Replace placeholders with actual data
      copy.props.text = copy.props.text.replace(regex, (_, key) => {
        const val = key
          .split(".")
          .reduce((o, k) => (o ? o[k] : undefined), data);
        return val != null ? String(val) : `{{${key}}}`;
      });

      // Reset styles if no longer a placeholder
      if (!isPlaceholderText(copy.props.text)) {
        copy.props.fill = copy.props.originalFill;
        copy.props.fontStyle = "normal";
      }
    }

    // Handle image placeholders
    if (copy.type === "image") {
      if (copy.props?.placeholder === "photo") {
        // Store original properties
        if (!copy.props.originalSrc) {
          copy.props.originalSrc = copy.props.src;
          copy.props.originalStyles = {
            opacity: copy.props.opacity || 1,
            border: copy.props.border || "none",
            backgroundColor: copy.props.backgroundColor || "transparent",
          };
        }

        if (!data?.photo) {
          // Apply placeholder styles
          copy.props = {
            ...copy.props,
            ...PLACEHOLDER_IMAGE_STYLES,
            src: copy.props.originalSrc,
            showPlaceholderOverlay: true,
          };
        } else {
          // Reset to original styles with actual photo
          copy.props = {
            ...copy.props,
            ...copy.props.originalStyles,
            src: data.photo,
            showPlaceholderOverlay: false,
          };
        }
      }
    }

    return copy;
  });
}

export const mergeTemplateWithData = (template, studentData = {}) => {
  // deep clone template so original saved template is not mutated
  const merged = JSON.parse(JSON.stringify(template || { elements: [] }));

  merged.elements = (merged.elements || []).map((el) => {
    // clone element to be safe
    const e = JSON.parse(JSON.stringify(el));

    // text placeholders
    if (e.type === "text" && e.props?.text) {
      // replace {{key}} occurrences, supports nested keys
      e.props.text = e.props.text.replace(
        /\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g,
        (_, key) => {
          const val = key
            .split(".")
            .reduce((o, k) => (o ? o[k] : undefined), studentData);
          return val != null ? String(val) : "";
        }
      );
      // set placeholder color if left empty
      if (!e.props.text) e.props.fill = PLACEHOLDER_COLOR;
      else if (e.props.originalFill) e.props.fill = e.props.originalFill;
    }

    // image placeholders
    if (e.type === "image") {
      if (e.props?.placeholder === "photo") {
        e.props.src =
          studentData.photo || e.props.originalSrc || e.props.src || "";
      }
    }

    return e;
  });

  return merged;
};

// Export constants for use in other components
export const PLACEHOLDER_STYLES = {
  PLACEHOLDER_COLOR,
  DEFAULT_TEXT_COLOR,
  PLACEHOLDER_IMAGE_STYLES,
};
