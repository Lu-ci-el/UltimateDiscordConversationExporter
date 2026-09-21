# UltimateDiscordConversationExporter

**UDCE 0.0.1 — BetterDiscord plugin**

Discordの会話をローカル保存し、画像はHTMLで表示、必要な添付だけブラウザから選択保存できます。  
Archive Discord conversations locally, display images in the HTML viewer, then selectively download the attachments you need.

**[日本語説明書](README_JP.md) · [English manual](README_EN.md)**

## できること / Features

- **会話 / Conversation** — 日付区切り、検索、話者・期間フィルター、返信移動、TXT保存。上下にページ送りがあります。Date headings, search, author/date filters, reply navigation, TXT export and pagination at both the top and bottom.
- **カレンダー / Calendar** — 全モード共通の日付選択、日付目次、選択解除。Shared date filtering, a date index and one-click clearing.
- **添付 / Attachments** — 画像は保存済みDiscord CDN URLから表示。画像本体のExport時自動保存は新規Jobでは使いません。Inline images use recorded Discord CDN URLs; new jobs do not automatically save image bodies during export.
- **ダウンロード / Downloads** — Explorer風一覧、Ctrl/Shift選択、毎回の確認、選択／絞り込み結果／全添付の保存。Explorer-style selection, confirmation before every operation and selected/filtered/all scopes.
- **保護 / Protection** — 個別の伏字・仮名化、パスワード保護、旧Job再開。Granular redaction/aliases, password-protected archives and compatible resumable jobs.
- **保存先 / Output folder** — Windows初回値 `C:\Discord_Exports`。手入力とネイティブな **📁 参照...** フォルダ選択に対応し、選択先を記憶。Windows first-run default `C:\Discord_Exports`, with manual entry and a native **📁 Browse...** folder picker whose selection is remembered.

## 導入 / Install

BetterDiscordのPluginsフォルダに **`UltimateDiscordConversationExporter.plugin.js` だけ**を入れ、有効にしてください。  
Place **only `UltimateDiscordConversationExporter.plugin.js`** in BetterDiscord's Plugins folder and enable it.

追加ログイン・Token入力なし。  
No additional login or token entry.

入れ替え時も、出力フォルダと `.udce_state` は残してください。詳しい手順は日英説明書を参照してください。  
Keep existing output folders and `.udce_state` when replacing the plugin. See the manuals for replacement steps.

## 状態 / Status

今回の差分はNode構文・新規Jobの画像保存OFF・URL保持・生成HTMLの上下ページャー/画像表示/ブラウザダウンロード経路を確認済みです。
**ChromeBrowserでは確認済みです。Edgeは画像が表示されません。**  
The current delta was checked for syntax, image-save-off policy with URL retention, and generated viewer pagination/image/download paths.
**It has been confirmed with ChromeBrowser. Edge does not show an image.**

[変更履歴 / Changelog](CHANGELOG.md) · [検証範囲 / Verification scope](tests/README.md) · [実行結果 / Results](tests/RESULTS.json)

非公式のBetterDiscord用プラグインです。閲覧権限のある会話に使用し、共有時は権利とプライバシーを確認してください。配布用ファイルには実会話ログを含めません。新しいLICENSEは付与していません。  
An unofficial BetterDiscord plugin. Use it for conversations you are authorized to access, and review rights and privacy before sharing. Distribution files contain no private conversation logs. No new software license is granted by this package.

[GitHub](https://github.com/Lu-ci-el/UltimateDiscordConversationExporter) · [OFUSE](https://ofuse.me/lost) · [Ko-fi](https://ko-fi.com/lost2)
