import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const ContentArticle = ({ content = "" }) => {
  const sanitizedHTML = DOMPurify.sanitize(content);

  return (
    <div
      className="w-full contentProduct"
      dangerouslySetInnerHTML={{
        __html: sanitizedHTML,
      }}
    ></div>
  );
};

export default ContentArticle;
