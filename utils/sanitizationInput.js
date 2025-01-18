import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const SanitizeHtmlContent = (content) => {
  const window = new JSDOM("").window;

  const DOMPurifyServer = DOMPurify(window);

  const sanitizedContent = DOMPurifyServer.sanitize(content);

  return sanitizedContent;
};

export default SanitizeHtmlContent;
