# Changelog

## 0.0.1 — Calendar viewer

### 日本語

カレンダー付きの会話ブラウザを本体のHTML出力に統合しました。

**HTML生成を正式統合**：単独の試作HTMLを同梱するだけではなく、プラグインの通常出力・保護出力がカレンダー付きレイアウトを生成します。左カレンダー、月別日付目次、会話／添付／ダウンロードの3モード、全モード共通の日付解除、Explorer風ファイル選択、ダウンロード前確認を含みます。

**表示と保存の分離**：保存済みローカル画像を優先し、許可されたDiscord CDN画像をインライン表示します。画像表示の許可とCSPを合わせました。ブラウザの選択保存は範囲要求を使わず、許可ホストへのGETとBlob保存を使い、エラー・中止・ブラウザへの引き渡しを区別します。外部通信に依存する動作の実機成功を保証するものではありません。

**保護と互換性**：既存の暗号コーデック、プライバシー変換、履歴取得・再試行・ページ保存・カーソル進行を保持。対応形式の保存済みJobの読み取りを維持しています。保護HTMLはロック中に会話を持たず、解除後の添付保存・TXT保存には平文出力の確認を出します。

**使いやすさ**：日英UIを統合し、日付・共通フィルターを全モードへ反映。会話TXT／コピー・範囲選択・返信移動を残し、進捗画面左下に明示的なフォルダ表示ボタンを追加しました。ネイティブ機能がない場合はコピーの代替を通知します。順方向で空応答に達したときの説明文を、逆方向の「履歴の先頭」表記から分けました。

**説明書**：README_JP.md／README_EN.mdを全面更新。ダウンロードの選択範囲、保存先、CDN期限、CORS、伏字の限界、再開・保護出力、検証未完了の範囲を明記しました。

**未変更・未確認**：Export側の自動メディア保存経路は未変更です。MEDIA_RANGE_MISMATCH等の自動保存エラーが解消したとは扱っていません。Windows／Discord／BetterDiscord実機、実CDN、ネイティブfile://保護Viewer確認は未完了です。GitHubへのアップロード・Release公開は本作成には含みません。

### English

The calendar-based conversation viewer is integrated into the plugin's HTML output.

- The plugin now generates the calendar/date-index/three-mode viewer for both ordinary and protected exports. This is a generator integration, not merely a bundled prototype HTML.
- Shared date filtering can be toggled off without reloading. Downloads use Explorer-style click/Ctrl/Shift selection, fixed column headings and confirmation for every save operation.
- Local images are preferred; permitted Discord CDN images can display inline. Browser downloads use bounded full GET responses and Blob saves, with cancellation/failure reporting and no automatic fallback tabs.
- Existing crypto, privacy, history, retry, page-commit and cursor behavior remains unchanged. Supported saved jobs keep their policies and boundaries.
- Japanese/English UI, original-message navigation and conversation TXT/copy/range actions are integrated. An explicit bottom-left output-folder button uses optional native reveal, otherwise reports a path-copy fallback.
- Manuals were rewritten for this release, including download scopes, browser destinations, CDN/CORS limitations and privacy boundaries.
- Export-time automatic local media saving is unchanged; known inherited runtime failures are not claimed fixed. Actual Windows/Discord/BetterDiscord, live CDN and native file:// protected-viewer verification remains pending. GitHub upload/publication is outside this build operation.

See `CURRENT.json` for this package identity and `tests/RESULTS.json` for measured results. Internal development fixtures and private conversations are not distributed.

### 表記修正 / Label correction

公開用の版表示・説明書・出力メタ情報を0.0.1へ統一しました。保存済みデータの版番号で画面の製品番号が上書きされないようにしました。履歴取得・保存・再開・伏字・暗号処理の動作は変更していません。

Public product labels, manuals and output metadata consistently use 0.0.1. Saved-data versions no longer override the viewer's product label. History retrieval, storage, resume, redaction and crypto behavior are unchanged.
### 出力フォルダ選択 / Output folder picker

0.0.1のまま、Windows初回の出力先を `C:\Discord_Exports` に統一しました。既に保存済みの出力先は上書きしません。設定画面とExport画面の両方へ **📁 参照...** を追加し、BetterDiscordのネイティブフォルダ選択ダイアログから保存先を選べるようにしました。キャンセル時は現在値を維持し、手入力も残しています。履歴取得・保存形式・ブラウザ・Privacy・Resume処理は変更していません。

Without changing the 0.0.1 version, the Windows first-run destination is now `C:\Discord_Exports`. Existing saved destinations are preserved. Both Settings and Export now include **📁 Browse...**, backed by BetterDiscord's native folder-selection dialog. Cancelling preserves the current value, and manual path entry remains available. History acquisition, output formats, viewer, privacy and resume behavior are unchanged.

### 画像保存UI整理・下部ページャー / Image-save UI cleanup and bottom pager

0.0.1のまま、新規Jobの「画像本体をローカル保存」をUIから削除し、画像のExport時自動保存を無効化しました。添付情報とDiscord CDN URLは保持するため、通常HTMLでは従来どおり画像を表示でき、必要な画像はブラウザの添付／ダウンロード画面から選択保存できます。旧Jobの保存済みポリシーとメディア状態は互換性のため読み取りを維持します。

会話モードは上部だけでなく下部にも **前へ / 次へ** とページ番号を追加しました。下部からページ移動した場合も、新しいページの会話先頭へ戻ります。進捗画面から画像保存件数と `Newest / Oldest saved` の不要表示を除き、ローカル添付を実際に要求した場合だけ添付保存状態を完了表示へ出します。

Without changing version 0.0.1, new jobs no longer expose or create export-time image-body save requests. Attachment metadata and Discord CDN URLs remain available to the HTML viewer, so images can still display and be selectively downloaded from the browser. Existing saved-job policies remain readable for compatibility.

Conversation pagination now appears at both the top and bottom. Bottom navigation advances the page and returns to the start of the conversation section. Image-save progress and the noisy `Newest / Oldest saved` lines were removed; local-media completion status is only shown when local media was actually requested.

The distribution ZIP keeps the versioned archive filename, but its **root folder is `UltimateDiscordConversationExporter/` without a version suffix**.
