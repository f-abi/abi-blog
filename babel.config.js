module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "prismjs",
      {
        languages: [
          "markup",
          "css",
          "clike",
          "javascript",
          "css-extras",
          "less",
          "markup-templating",
          "nginx",
          "php",
          "python",
          "jsx",
          "tsx",
          "scss",
          "sql",
          "typescript",
        ],
        plugins: [
          "line-numbers",
          "highlight-keywords",
          "inline-color",
          "normalize-whitespace",
          "data-uri-highlight",
          "toolbar",
          "copy-to-clipboard",
        ],
        // theme: "twilight",
        // css: true,
      },
    ],
  ],
};
