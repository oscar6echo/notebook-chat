

# notebook-chat

## 1 - Introduction

This is a Jupyter [notebook extension](http://jupyter-notebook.readthedocs.io/en/stable/extending/frontend_extensions.html) to add a button opening a [MS Bot FrameWork Webchat](https://github.com/Microsoft/BotFramework-WebChat).  

The extension must be configured with the following params:
```bash
direct_line_secret
bot_id
```

They are not set by default, so the bot won't speak.  

This nbextension is meant to be used in a JupyterHub context where the admin determines the Support Bot location - and probably manages the bot too.


## 2 - Install

From terminal:

```bash
jupyter nbextension install notebook-chat --user
jupyter nbextension enable notebook-chat/main --user
```

_Note_: The `sys-prefix` install does not work as `notebook-chat` is not (does not need be) a Python package.
