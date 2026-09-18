# UltimateDiscordConversationExporter

## 日本語

### 概要

**UltimateDiscordConversationExporter** は、**BetterDiscordで使用するDiscord会話保存プラグイン**です。

現在閲覧できるDiscordのDM・グループDM・テキストチャンネルの履歴を取得し、PCへローカル保存できます。

追加ログイン・Discord Tokenの入力は不要です。  
会話と選択した添付をローカル保存します。

TXT形式、ブラウザで閲覧できるHTML形式、または両方で出力できます。

---

### インストール方法

1. **BetterDiscord** をインストールしたDiscordデスクトップ版を用意します。
2. `UltimateDiscordConversationExporter.plugin.js` をBetterDiscordのPluginsフォルダへ入れます。
3. Discordの **ユーザー設定 → BetterDiscord → Plugins** を開きます。
4. `UltimateDiscordConversationExporter` をONにします。
5. 保存したいDMまたはテキストチャンネルを開き、**Export** ボタンを押します。

---

### 基本的な使い方

Export画面では、保存したい期間を**開始日時・終了日時**で指定できます。

Message URLまたはMessage IDを指定した場合は、日時よりそちらが優先されます。

期間を指定せず、取得可能な最古または最新まで取得することもできます。

出力先フォルダを指定し、出力形式を選択します。

- **TXT**
  - 会話全文をシンプルなテキストとして保存します。

- **ブラウザHTML**
  - Webブラウザで閲覧できます。
  - 日付ごとの確認、検索、保存した画像の表示に向いています。

- **両方**
  - TXTとブラウザHTMLの両方を作成します。

---

### 保存できる情報

必要に応じて個別にON/OFFできます。

- 添付ファイル情報
- Embed（リンクプレビュー・タイトル等）
- リアクション
- 画像本体
- 動画・音声
- その他の添付ファイル

---

### 履歴取得

Discordの履歴をページ単位で順番に取得します。

過去ログを見るために、手動でスクロールし続ける必要はありません。

標準の要求間隔は **1000ms** です。

取得中は以下を確認できます。

- 現在到達している日時
- 取得メッセージ数
- 取得ページ数
- 進捗率
- 残り期間

途中で停止した場合でも、再開可能なJobは **保存済み／再開** から続行できます。

---

### プライバシー機能

以下の機能を使用できます。

- 名前・IDの仮名化
- 秘密情報候補の伏字
- パスワード保護

共有用に保存する場合は、出力前に内容を確認してください。

自動伏字では、画像内の文字・顔・添付ファイル内部などを完全には処理できません。

取得した会話や添付ファイルは、指定したPC上のフォルダへ保存されます。

プラグイン自身が会話内容を外部サービスへ送信する機能はありません。

---

### 注意事項

このプラグインは **BetterDiscord向けの非公式プラグイン** です。

Discord、BetterDiscord、その他の関連サービスによって公式に提供・承認されたものではありません。

自分が閲覧権限を持つ会話の保存を目的として使用してください。

第三者の会話・画像・個人情報などを公開・再配布する場合は、それぞれの権利やプライバシーに注意してください。

---

# English

## Overview

**UltimateDiscordConversationExporter** is a **Discord conversation archiving plugin for BetterDiscord**.

It can save message history from DMs, group DMs, and text channels that you can currently access directly to your computer.

No additional login or Discord token entry is required.  
It saves conversations and selected attachments locally.

Exports can be created as plain TXT, browser-friendly HTML, or both.

---

## Installation

1. Install **BetterDiscord** for the Discord desktop client.
2. Place `UltimateDiscordConversationExporter.plugin.js` in your BetterDiscord Plugins folder.
3. Open **Discord Settings → BetterDiscord → Plugins**.
4. Enable `UltimateDiscordConversationExporter`.
5. Open the DM or text channel you want to archive and press the **Export** button.

---

## Basic Usage

The Export window lets you select a **start date/time** and **end date/time**.

You can also specify a Message URL or Message ID.

When provided, the Message URL/ID takes priority over the date setting.

You may also leave the range open to retrieve the oldest or newest history available.

Choose an output folder and output format.

- **TXT**
  - Saves the full conversation as simple readable text.

- **Browser HTML**
  - Creates a browser-friendly archive.
  - Useful for searching, browsing by date, and viewing locally saved images.

- **Both**
  - Creates both TXT and HTML output.

---

## Optional Export Data

The following can be enabled or disabled individually:

- Attachment information
- Embeds (link previews, titles, etc.)
- Reactions
- Local image files
- Video and audio files
- Other attachments

---

## History Retrieval

The plugin retrieves Discord history page by page automatically.

You do not need to continuously scroll upward to load older messages manually.

The default request interval is **1000 ms**.

During an export, the progress view can show:

- Oldest point reached
- Message count
- Page count
- Progress percentage
- Remaining range

If an export is interrupted, resumable jobs can be continued from the **Saved / Resume** section when recovery data is available.

---

## Privacy Features

Optional privacy features include:

- Pseudonymizing names and IDs
- Redacting potential sensitive information
- Password protection

If you plan to share an exported archive, review its contents first.

Automatic redaction cannot reliably remove text inside images, faces, attachment contents, or every possible piece of private information.

Conversation data and selected attachments are saved to the local folder you choose.

The plugin does not include a feature that uploads your conversation contents to an external service.

---

## Disclaimer

This is an **unofficial BetterDiscord plugin**.

It is not officially provided, endorsed, or supported by Discord, BetterDiscord, or any other related service.

Use it for conversations you are authorized to access.

If you publish or redistribute another person's messages, images, or personal information, make sure you respect applicable privacy and intellectual-property rights.
