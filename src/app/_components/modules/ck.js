"use client";
import React, { useState, useEffect, useRef, memo } from "react";

const Editor = memo(({ articleText, setArticleText }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    setEditorLoaded(true);

    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  return (
    <>
      {editorLoaded ? (
        <CKEditor
          type=""
          id="editor"
          name={name}
          editor={ClassicEditor}
          config={{
            language: { ui: "en", content: "fa" },
            toolbar: [
              "heading",
              "undo",
              "redo",
              "italic",
              "blockQuote",
              "link",
              "numberedList",
            ],
          }}
          data={articleText}
          onChange={(event, editor) => {
            const data = editor.getData();
            setArticleText(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  );
});

export default Editor;
