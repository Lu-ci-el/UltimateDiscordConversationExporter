/**
 * @name UltimateDiscordConversationExporter
 * @author 𓆩†𓆪 𝕷𝖚𝖈𝖎𝖊𝖑 𓆩†𓆪 / 𓆩✦𓆪 ASTER 𓆩✦𓆪
 * @authorLink https://github.com/Lu-ci-el
 * @website https://github.com/Lu-ci-el/UltimateDiscordConversationExporter
 * @source https://github.com/Lu-ci-el/UltimateDiscordConversationExporter
 * @supportJP https://ofuse.me/lost
 * @supportGlobal https://ko-fi.com/lost2
 * @description BetterDiscord plugin. Save conversations and selected attachments locally. No additional login or token entry. Unofficial.
 * @version 0.0.1
 */

// Public product version. Resume data retains its original internal version.
const UDCE_VERSION = '0.0.1';

// Local UI dictionary. Source message text and persisted field names are not translated.
const UDCE_I18N = Object.freeze({
  "openOutputFolder": ["フォルダを開く", "Open folder"],
  "folderUnavailable": ["この環境ではフォルダを開けません。保存先をコピーしました。", "Folder opening is unavailable here. The output path was copied."],
  "folderMissing": ["保存先がまだありません。書き出し後に開いてください。", "The output folder does not exist yet. Try again after exporting."],
  "folderCopyFailed": ["フォルダを開けません。保存先: {0}", "Cannot open the folder. Output path: {0}"],
  "forwardResponseEnd": ["\n完了理由: 最新側の履歴応答が空になりました", "\nFinished reason: the newer-side history response was empty"],

  "intro": [
    "追加ログイン・Token入力なし。\n会話と選択した添付をローカル保存します。",
    "No additional login or token entry.\nConversations and selected attachments are saved locally."
  ],
  "privacyTitle": [
    "伏字にする項目",
    "Choose what to hide"
  ],
  "privacyNote": [
    "ONの項目だけ処理します。名前・ID・パスワードは別々に選べます。",
    "Only checked categories are processed. Names, IDs and passwords are independent."
  ],
  "privacyCount": [
    "{count} / {total} 項目がON（独自ルールは入力がある時のみ）",
    "{count} / {total} categories ON (custom rules require entered values)"
  ],
  "group_identity": [
    "名前・識別情報",
    "Names / identifiers"
  ],
  "group_secrets": [
    "秘密情報の候補",
    "Sensitive information candidates"
  ],
  "group_custom": [
    "独自指定",
    "Custom rules"
  ],
  "privacyScope": [
    "対象と制限を確認",
    "What each option covers"
  ],
  "privacyLimit": [
    "自動判定には見逃し・誤検出があります。本文中の人名は推測しません。画像・顔・EXIF・添付の中身は加工しません。伏字とファイルのパスワード保護は別機能です。",
    "Detection can miss or misclassify information. Names in prose are not guessed. Images, faces, EXIF and attachment contents are not modified. Redaction and archive password protection are separate features."
  ],
  "uiLanguage": [
    "表示言語",
    "Interface language"
  ],
  "languageAuto": [
    "自動（Discordの表示言語）",
    "Automatic (Discord language)"
  ],
  "outputFolder": [
    "出力フォルダ",
    "Output folder"
  ],
  "browseFolder": [
    "📁 参照...",
    "📁 Browse..."
  ],
  "chooseOutputFolder": [
    "出力フォルダを選択",
    "Choose output folder"
  ],
  "folderPickerUnavailable": [
    "この環境ではフォルダ選択ダイアログを開けません。パスを手入力してください。",
    "The folder picker is unavailable in this environment. Enter the path manually."
  ],
  "folderPickerFailed": [
    "フォルダ選択を開けませんでした。現在の保存先は変更していません。",
    "Could not open the folder picker. The current output folder was not changed."
  ],
  "stateFolderNote": [
    "再開材料は出力先の .udce_state に保存します。共有しないでください。",
    "Resume data is saved in .udce_state inside the output folder. Do not share it."
  ],
  "requestInterval": [
    "ページ・画像の要求間隔 (ms)",
    "Request interval (ms)"
  ],
  "intervalNote": [
    "500～10000。初期1000。アカウント制限を防ぐ保証はありません。",
    "500–10000 ms; default 1000. No guarantee against account restrictions."
  ],
  "outputFormat": [
    "出力形式",
    "Output format"
  ],
  "formatBoth": [
    "TXT＋ブラウザHTML（両方）",
    "TXT + browser HTML (both)"
  ],
  "formatHTML": [
    "ブラウザHTMLのみ",
    "Browser HTML only"
  ],
  "formatTXT": [
    "TXTのみ",
    "TXT only"
  ],
  "attachments": [
    "添付ファイル情報",
    "Attachment information"
  ],
  "embeds": [
    "Embed（Link preview・Title等）",
    "Embeds (link previews, titles)"
  ],
  "reactions": [
    "リアクション情報",
    "Reactions"
  ],
  "presetArchive": [
    "自分用の初期値",
    "Personal defaults"
  ],
  "presetShare": [
    "共有用の初期値",
    "Sharing defaults"
  ],
  "privacyOff": [
    "伏字をすべてOFF",
    "Turn all redaction off"
  ],
  "copyOutput": [
    "出力先をコピー",
    "Copy output path"
  ],
  "savedResume": [
    "保存済み／再開",
    "Saved / Resume"
  ],
  "protectArchive": [
    "出力ファイルをパスワード保護",
    "Protect exported files with a password"
  ],
  "protectedNote": [
    "保護ONでは .udce＋閲覧HTMLを出力します。平文TXTは保存しません。解除後にHTMLからTXT保存できます。",
    "Protection exports an encrypted .udce archive plus viewer HTML, not plain TXT. After unlocking, TXT can be saved from the viewer."
  ],
  "currentChoices": [
    "現在の個別設定",
    "Current individual choices"
  ],
  "privacy_names": [
    "名前・表示名",
    "Names / display names"
  ],
  "help_names": [
    "投稿者名・表示名・Embed著者・会話タイトルを仮名化します。本文中の人名は独自文字列で指定してください。User IDは別項目です。",
    "Aliases author/display names, embed authors and the conversation title. Use custom text for names in prose. User IDs are separate."
  ],
  "privacy_userIds": [
    "User ID",
    "User IDs"
  ],
  "help_userIds": [
    "投稿者ID・認識できるユーザーMentionを一貫した別名にします。名前は別項目です。",
    "Aliases author IDs and recognized user mentions consistently. Display names are separate."
  ],
  "privacy_messageIds": [
    "Message ID・返信ID",
    "Message / reply IDs"
  ],
  "help_messageIds": [
    "発言ID・返信元IDを同じ対応表で仮名化。含まれるDiscord発言リンクも隠し、HTML内の返信ジャンプは維持します。",
    "Aliases message/reply IDs with one mapping. Related Discord message links are hidden; local reply navigation still works."
  ],
  "privacy_mentions": [
    "Mention・Channel / Role ID",
    "Mention / channel / role IDs"
  ],
  "help_mentions": [
    "認識できるMentionとチャンネル・サーバーID、そのIDを含むリンクを隠します。",
    "Aliases recognized mentions, channel/server/role IDs and hides associated identifying links."
  ],
  "privacy_attachmentNames": [
    "添付ファイル名",
    "Attachment filenames"
  ],
  "help_attachmentNames": [
    "添付名を内部の資産名へ変更します。元の名前が含まれるCDNリンクも隠します。画像の中身は変更しません。",
    "Replaces filenames with asset names and hides related CDN links. File contents are unchanged."
  ],
  "privacy_urls": [
    "URL",
    "URLs"
  ],
  "help_urls": [
    "本文・Embed・添付の外部リンクを隠します。保存済み画像とHTML内の移動は残します。",
    "Hides external links in text, embeds and attachments. Local media and archive navigation remain available."
  ],
  "privacy_passwords": [
    "パスワード",
    "Passwords"
  ],
  "help_passwords": [
    "password=、pwd:、パスワード：等のラベル付き候補を伏字。ラベルのない合言葉等は独自指定してください。",
    "Matches labelled candidates such as password=, pwd: or パスワード：. Use custom text for unlabelled passphrases."
  ],
  "privacy_apiKeys": [
    "API Key / Secret",
    "API keys / secrets"
  ],
  "help_apiKeys": [
    "api_key=、client_secret=、secret=等のラベル付き候補。任意のキー形式を完全検出するものではありません。",
    "Matches labelled api_key, client_secret and secret values; it cannot recognize every possible key format."
  ],
  "privacy_tokens": [
    "Token",
    "Tokens"
  ],
  "help_tokens": [
    "access_token・refresh_token・token等のラベル付き候補とDiscord Tokenに似た形式。",
    "Matches labelled access/refresh/token values and Discord-token-like patterns."
  ],
  "privacy_authorization": [
    "Authorization / Bearer",
    "Authorization / Bearer"
  ],
  "help_authorization": [
    "AuthorizationヘッダーとBearer認証情報の候補。",
    "Matches Authorization headers and Bearer credentials."
  ],
  "privacy_privateKeys": [
    "Private Key",
    "Private keys"
  ],
  "help_privateKeys": [
    "BEGIN / END PRIVATE KEYで囲まれた秘密鍵ブロック。",
    "Matches private-key blocks delimited by BEGIN / END PRIVATE KEY."
  ],
  "privacy_webhooks": [
    "Discord Webhook",
    "Discord webhooks"
  ],
  "help_webhooks": [
    "秘密の送信用情報を含むDiscord Webhook URL。",
    "Matches Discord webhook URLs containing a secret sending credential."
  ],
  "privacy_emails": [
    "メールアドレス",
    "Email addresses"
  ],
  "help_emails": [
    "メールアドレス形式の候補。",
    "Matches email-address-like strings."
  ],
  "privacy_cards": [
    "カード番号候補",
    "Card-number candidates"
  ],
  "help_cards": [
    "13～19桁とチェック計算による候補。認識済みのDiscord IDはカード扱いしません。",
    "Matches 13–19 digit candidates with a checksum. Recognized Discord IDs are not treated as card numbers."
  ],
  "privacy_customLiterals": [
    "独自文字列",
    "Custom text"
  ],
  "help_customLiterals": [
    "Export画面の「詳細・独自伏字」で入力した文字列だけを一致置換します。",
    "Replaces exact text entered under Advanced / custom redaction in the export dialog."
  ],
  "privacy_customRegex": [
    "独自正規表現",
    "Custom regular expressions"
  ],
  "help_customRegex": [
    "入力済みの正規表現だけをWorkerで実行。時間超過は停止し、ルールを飛ばしません。",
    "Runs entered regex rules in a time-limited Worker. A timeout stops processing rather than skipping rules."
  ],
  "ui_001": [
    "全員 / Everyone",
    "Everyone"
  ],
  "ui_002": [
    "ロックしました。 / Locked.",
    "Locked."
  ],
  "ui_003": [
    "画像を開いています…",
    "Opening image…"
  ],
  "ui_004": [
    "平文で画像を保存 / Save decrypted image",
    "Save decrypted image"
  ],
  "ui_005": [
    "画像を保存 / Download image",
    "Download image"
  ],
  "ui_006": [
    "画像を復号・読込みできません。 / Media unavailable.",
    "Cannot decrypt or open this image."
  ],
  "ui_007": [
    "復号した内容を平文TXTとして保存します。 / Save decrypted text?",
    "Save decrypted content as a plain TXT file?"
  ],
  "ui_008": [
    "選択内容を平文でクリップボードへコピーします。 / Copy decrypted text?",
    "Copy decrypted content to the clipboard?"
  ],
  "ui_009": [
    "コピーしました。 / Copied.",
    "Copied."
  ],
  "ui_010": [
    "この欄を手動でコピーしてください。",
    "Copy the text in this box manually."
  ],
  "ui_011": [
    "前後10件の会話。検索に戻るには「絞込み解除」または条件を変更。",
    "Showing 10 messages before and after. Reset filters or change a filter to return to search."
  ],
  "ui_012": [
    "返信元は保存範囲外です。 / Reply outside archive.",
    "The original message is outside this archive."
  ],
  "ui_013": [
    "編集済 / Edited",
    "Edited"
  ],
  "ui_014": [
    "復号失敗 / Invalid media",
    "Invalid media"
  ],
  "ui_015": [
    "読み込む / Load",
    "Load"
  ],
  "ui_016": [
    "添付を開けません。",
    "Cannot open attachment."
  ],
  "ui_017": [
    "平文で保存 / Save decrypted",
    "Save decrypted"
  ],
  "ui_018": [
    "保存 / Download",
    "Download"
  ],
  "ui_019": [
    "添付を平文で保存します。 / Save decrypted attachment?",
    "Save decrypted attachment?"
  ],
  "ui_020": [
    "添付を保存できません。",
    "Cannot save attachment."
  ],
  "ui_021": [
    "元の添付を外部で開く ↗",
    "Open original attachment ↗"
  ],
  "ui_022": [
    "前後の会話",
    "Conversation context"
  ],
  "ui_023": [
    "ここから選択",
    "Select from here"
  ],
  "ui_024": [
    "ここまで選択",
    "Select to here"
  ],
  "ui_025": [
    "Discordで開く ↗",
    "Open in Discord ↗"
  ],
  "ui_026": [
    "{0} / {1} 件 — {2} / {3} ページ",
    "{0} / {1} messages — page {2} / {3}"
  ],
  "ui_027": [
    "検索中… / Searching…",
    "Searching…"
  ],
  "ui_028": [
    "オフライン表示 / Offline — ",
    "Offline — "
  ],
  "ui_029": [
    "識別情報の加工あり",
    "Privacy filters enabled"
  ],
  "ui_030": [
    "自分用",
    "Personal archive"
  ],
  "ui_031": [
    "伏字あり",
    "Redaction enabled"
  ],
  "ui_032": [
    "伏字なし",
    "No redaction"
  ],
  "ui_033": [
    "日付へ移動 / Jump to day",
    "Jump to date"
  ],
  "ui_034": [
    "02_ARCHIVE.udce を選択してください。",
    "Select 02_ARCHIVE.udce."
  ],
  "ui_035": [
    "保護ファイルの対応容量を超えています。",
    "This archive exceeds the supported file size."
  ],
  "ui_036": [
    "保護ファイルを確認中…",
    "Verifying protected archive…"
  ],
  "ui_037": [
    "パスワード違い、改変、破損、未対応形式、またはWebCrypto非対応です。",
    "Incorrect password, modified/damaged file, unsupported format, or WebCrypto unavailable."
  ],
  "ui_038": [
    "02_ARCHIVE.udce とパスワードを指定してください。",
    "Select 02_ARCHIVE.udce and enter its password."
  ],
  "ui_039": [
    "本文・添付を検索 / Search",
    "Search messages / attachments"
  ],
  "ui_040": [
    "話者",
    "Author"
  ],
  "ui_041": [
    "開始日",
    "Start date"
  ],
  "ui_042": [
    "終了日",
    "End date"
  ],
  "ui_043": [
    "日付目次",
    "Date index"
  ],
  "ui_044": [
    "コピー用の平文",
    "Plain text for copying"
  ],
  "ui_045": [
    "保護アーカイブ / Protected archive",
    "Protected archive"
  ],
  "ui_046": [
    "ファイルは外部へ送信されません。 / Files stay in this browser.",
    "Files stay in this browser."
  ],
  "ui_047": [
    "開く / Unlock",
    "Unlock"
  ],
  "ui_048": [
    "添付",
    "Attachments"
  ],
  "ui_049": [
    "画像",
    "Images"
  ],
  "ui_050": [
    "返信",
    "Replies"
  ],
  "ui_051": [
    "絞込み・選択解除",
    "Reset filters / selection"
  ],
  "ui_052": [
    "選択範囲／検索結果をコピー",
    "Copy selection / results"
  ],
  "ui_053": [
    "TXT保存",
    "Save TXT"
  ],
  "ui_054": [
    "前後表示へ戻る",
    "Back to previous view"
  ],
  "ui_055": [
    "再ロック",
    "Lock again"
  ],
  "ui_056": [
    "前へ",
    "Previous"
  ],
  "ui_057": [
    "次へ",
    "Next"
  ],
  "ui_058": [
    "UltimateDiscordConversationExporter — Local archive / 非公式・無料・支援は任意。",
    "UltimateDiscordConversationExporter — Local archive. Unofficial, free; support is optional."
  ],
  "ui_059": [
    "外部ページへ移動: ",
    "External links: "
  ],
  "ui_060": [
    "前の画像",
    "Previous image"
  ],
  "ui_061": [
    "次の画像",
    "Next image"
  ],
  "ui_062": [
    "閉じる",
    "Close"
  ],
  "ui_063": [
    "別のUDCEが有効です。先にOFFにしてください。",
    "Another UDCE instance is enabled. Disable it first."
  ],
  "ui_064": [
    "旧DiscordConversationExporter / UltimateDiscordConversationExporte をOFFにしてから新しいExporterをONにしてください。旧ファイル・設定は削除しません。",
    "Disable the old DiscordConversationExporter / UltimateDiscordConversationExporte before enabling this plugin. Old files and settings are not deleted."
  ],
  "ui_065": [
    "UDCE: 準備完了",
    "UDCE: Ready"
  ],
  "ui_066": [
    "Discordの履歴取得モジュールを確認できません。互換性を確認してください。",
    "The Discord history module is unavailable. Check client compatibility."
  ],
  "ui_067": [
    "{0} が見つかりません。",
    "{0} is unavailable."
  ],
  "ui_068": [
    "Discord内部の fetchMessages を取得できませんでした。",
    "The internal Discord fetchMessages module is unavailable."
  ],
  "ui_069": [
    "{0} を書き出す",
    "Export {0}"
  ],
  "ui_070": [
    "現在のDM/チャンネルを書き出す",
    "Export the current DM/channel"
  ],
  "ui_071": [
    "⏳ Export中",
    "⏳ Exporting"
  ],
  "ui_072": [
    "{0}{1} ({2}) — 開始対象を固定",
    "{0}{1} ({2}) — target fixed when started"
  ],
  "ui_073": [
    "チャンネル未選択",
    "No channel selected"
  ],
  "ui_074": [
    "DMまたはテキストチャンネルを開いてください。",
    "Open a DM or text channel first."
  ],
  "ui_075": [
    " — 会話をローカル保存",
    " — Save conversations locally"
  ],
  "ui_076": [
    "範囲",
    "Range"
  ],
  "ui_077": [
    "開始日時（空欄＝最古）",
    "Start (blank = oldest)"
  ],
  "ui_078": [
    "24時間",
    "24 hours"
  ],
  "ui_079": [
    "7日",
    "7 days"
  ],
  "ui_080": [
    "30日",
    "30 days"
  ],
  "ui_081": [
    "最古",
    "Oldest"
  ],
  "ui_082": [
    "終了日時（空欄＝開始時の最新）",
    "End (blank = latest at start)"
  ],
  "ui_083": [
    "現在",
    "Now"
  ],
  "ui_084": [
    "最新",
    "Latest"
  ],
  "ui_085": [
    "開始 Message URL / ID（日時より優先・含む）",
    "Start Message URL / ID (inclusive; overrides date)"
  ],
  "ui_086": [
    "終了 Message URL / ID（含む）",
    "End Message URL / ID (inclusive)"
  ],
  "ui_087": [
    "保存・画像",
    "Output / media"
  ],
  "ui_088": [
    "出力フォルダ",
    "Output folder"
  ],
  "ui_089": [
    "出力形式",
    "Output format"
  ],
  "ui_090": [
    "TXT＋ブラウザHTML（両方）",
    "TXT + browser HTML (both)"
  ],
  "ui_091": [
    "ブラウザHTMLのみ",
    "Browser HTML only"
  ],
  "ui_092": [
    "TXTのみ",
    "TXT only"
  ],
  "ui_093": [
    "ブラウザHTMLは日付目次・検索・画像表示に対応。TXTは全文をそのまま読みたい時向けです。",
    "HTML supports a date index, search and images. TXT is a readable full-text archive."
  ],
  "ui_094": [
    " 添付ファイル情報",
    " Attachment information"
  ],
  "ui_095": [
    " Embed情報",
    " Embeds"
  ],
  "ui_096": [
    " リアクション情報",
    " Reactions"
  ],
  "ui_097": [
    "Embed：Link preview・Title・説明等。",
    "Embeds: link previews, titles and descriptions."
  ],
  "ui_099": [
    " 動画・音声本体",
    " Video / audio files"
  ],
  "ui_100": [
    " その他添付本体",
    " Other attachment files"
  ],
  "ui_101": [
    " 埋め込みカード画像",
    " Embed images"
  ],
  "ui_102": [
    "Discord CDNの添付のみ。自動で外部サイトは巡回しません。1ファイル最大16MiB、合計最大128MiB。サイズ不明のものはHEADで確認できた場合だけ取得します。",
    "Discord CDN only; external websites are not crawled. Up to 16 MiB per file and 128 MiB total. Unknown sizes require HEAD verification."
  ],
  "ui_103": [
    "プライバシー・保護",
    "Privacy / protection"
  ],
  "ui_104": [
    "保存Profile",
    "Preset"
  ],
  "ui_105": [
    "自分用 / Archive",
    "Personal archive"
  ],
  "ui_106": [
    "共有用 / Private Share",
    "Sharing"
  ],
  "ui_107": [
    "保護用パスワード（8文字以上）",
    "Archive password (at least 8 characters)"
  ],
  "ui_108": [
    "パスワードを再入力",
    "Repeat password"
  ],
  "ui_109": [
    "自動伏字には見逃し・誤検出があります。画像内の文字・顔・EXIF・添付内容は対象外。共有用では画像は初期OFF。保護OFFの再開材料には元ID等が残るため .udce_state は共有しないでください。",
    "Automatic redaction can miss or misclassify information. Images, faces, EXIF and attachment contents are not filtered. Sharing defaults disable media. Resume data can retain original IDs; do not share .udce_state."
  ],
  "ui_110": [
    "詳細・独自伏字",
    "Advanced / custom redaction"
  ],
  "ui_111": [
    "要求間隔プリセット",
    "Request interval preset"
  ],
  "ui_112": [
    "標準 1000ms",
    "Standard 1000 ms"
  ],
  "ui_113": [
    "低負荷 2000ms",
    "Lower load 2000 ms"
  ],
  "ui_114": [
    "カスタム",
    "Custom"
  ],
  "ui_115": [
    "間隔(ms) 500～10000",
    "Interval (ms), 500–10000"
  ],
  "ui_116": [
    "1添付の上限 (MiB) 最大16",
    "Per-file limit (MiB), up to 16"
  ],
  "ui_117": [
    "画像・添付合計 (MiB) 最大128",
    "Total media (MiB), up to 128"
  ],
  "ui_118": [
    " 正方向の揺らぎ 0～250ms（初期OFF）",
    " Extra delay of 0–250 ms (default OFF)"
  ],
  "ui_119": [
    "独自の伏字文字列（1行1個、最大100個）",
    "Custom text (one per line, up to 100)"
  ],
  "ui_120": [
    "上級: 正規表現ルール JSON（最大16個）",
    "Advanced: regex rules as JSON (up to 16)"
  ],
  "ui_121": [
    "独自ルールはこのJobの再開材料に保存されます。秘密の文字列を登録する場合はパスワード保護を使ってください。危険な正規表現はWorkerの時間制限で止め、伏字を飛ばして出力しません。",
    "Custom rules are stored in this job's resume data. Use password protection for secret rules. Excessive regex processing stops at a time limit; rules are never silently skipped."
  ],
  "ui_122": [
    "本文→画像の順に確定保存。高速化ではなく負荷軽減を優先。非公式ツールで、アカウント上の安全を保証しません。",
    "Text is committed before media. This unofficial tool prioritizes lower load, not maximum speed, and cannot guarantee account safety."
  ],
  "ui_123": [
    "待機中",
    "Ready"
  ],
  "ui_124": [
    "保存済み／再開",
    "Saved / Resume"
  ],
  "ui_125": [
    "出力先をコピー",
    "Copy output path"
  ],
  "ui_126": [
    "書き出し開始",
    "Start export"
  ],
  "ui_127": [
    "UDCE — 進捗",
    "UDCE — Progress"
  ],
  "ui_128": [
    "一時停止",
    "Pause"
  ],
  "ui_129": [
    "停止して部分出力",
    "Stop and export saved data"
  ],
  "ui_130": [
    "隠す",
    "Hide"
  ],
  "ui_131": [
    "先に一時停止を押してください。",
    "Pause the active job first."
  ],
  "ui_132": [
    "開始できません: ",
    "Cannot start: "
  ],
  "ui_133": [
    "最古まで",
    "Oldest available"
  ],
  "ui_134": [
    "\n指定開始: {0}（チャンネル作成前のため補正）",
    "\nRequested start: {0} (adjusted to channel creation time)"
  ],
  "ui_135": [
    "\n完了理由: チャンネル履歴の先頭に到達",
    "\nFinished: reached the start of the channel history"
  ],
  "ui_136": [
    "\n残り期間: {0}",
    "\nRemaining range: {0}"
  ],
  "ui_137": [
    "取得中",
    "Retrieving"
  ],
  "ui_138": [
    "現在到達: {0}\n",
    "Reached: {0}\n"
  ],
  "ui_139": [
    "開始目標: {0}",
    "Start target: {0}"
  ],
  "ui_140": [
    "{0}日 {1}時間 {2}分",
    "{0}d {1}h {2}m"
  ],
  "ui_141": [
    "{0}時間 {1}分",
    "{0}h {1}m"
  ],
  "ui_142": [
    "{0}分",
    "{0}m"
  ],
  "ui_143": [
    "出力先を作成できません: {0}",
    "Cannot create output folder: {0}"
  ],
  "ui_144": [
    "出力先をコピーしました: {0}",
    "Output path copied: {0}"
  ],
  "ui_145": [
    "出力先:\n{0}",
    "Output path:\n{0}"
  ],
  "ui_146": [
    "部分出力を要求しました。確定済みデータは保持します。",
    "Partial output requested. Committed data is preserved."
  ],
  "ui_147": [
    "一時停止を要求しました。現在の保存境界まで確定します。",
    "Pause requested. The current save boundary will be committed."
  ],
  "ui_148": [
    "再試行待ち: {0}秒 ({1})",
    "Retry in {0}s ({1})"
  ],
  "ui_149": [
    "会話取得中",
    "Retrieving conversation"
  ],
  "ui_150": [
    "アカウント変更で停止。以前の保存点は保持。",
    "Stopped because the account changed. Previous checkpoints are preserved."
  ],
  "ui_151": [
    "一時停止: {0}\n保存済み: {1}件。保存済み／再開から確認できます。",
    "Paused: {0}\nSaved: {1} messages. Open Saved / Resume to continue."
  ],
  "ui_152": [
    "画像・添付を保存中: {0}",
    "Saving media: {0}"
  ],
  "ui_153": [
    "保存データを読戻し検証中",
    "Reading back and verifying saved data"
  ],
  "ui_154": [
    "保護アーカイブ＋ブラウザHTML",
    "Protected archive + browser HTML"
  ],
  "ui_155": [
    "TXT＋ブラウザHTML",
    "TXT + browser HTML"
  ],
  "ui_156": [
    "会話: {0}\n形式: {1}\n保存先: {2}",
    "Conversation: {0}\nFormat: {1}\nSaved: {2}"
  ],
  "ui_156_media": [
    "会話: {0}\nローカル添付: {1}\n形式: {2}\n保存先: {3}",
    "Conversation: {0}\nLocal media: {1}\nFormat: {2}\nSaved: {3}"
  ],
  "ui_157": [
    "UDCE: {0}件保存 / 会話 {1}",
    "UDCE: saved {0} messages / Conversation {1}"
  ],
  "ui_157_media": [
    "UDCE: {0}件保存 / 会話 {1} / ローカル添付 {2}",
    "UDCE: saved {0} messages / Conversation {1} / Local media {2}"
  ],
  "ui_158": [
    "JP お布施 / OFUSE",
    "JP Support / OFUSE"
  ],
  "ui_159": [
    "UDCE — 保存済み／再開",
    "UDCE — Saved / Resume"
  ],
  "ui_160": [
    "自動では再開しません。共有用コピーは保存済みの文字情報だけを加工し、画像を含めず別出力します。差分は完了Jobの開始時点より新しい発言だけで、過去の編集・削除の同期ではありません。",
    "Jobs never resume automatically. A sharing copy transforms saved text into a separate export without media. New-message export starts after the completed job's snapshot; it does not synchronize edits or deletions."
  ],
  "ui_161": [
    "保護Jobのパスワード（必要な場合のみ）",
    "Password for protected jobs (only if needed)"
  ],
  "ui_162": [
    "Jobを選んでください。",
    "Choose a saved job."
  ],
  "ui_163": [
    "🔒 保護",
    "🔒 Protected"
  ],
  "ui_164": [
    "通常",
    "Unprotected"
  ],
  "ui_165": [
    "再開",
    "Resume"
  ],
  "ui_166": [
    "取得済みだけ出力",
    "Export saved messages"
  ],
  "ui_167": [
    "失敗添付だけ再試行",
    "Retry failed attachments"
  ],
  "ui_168": [
    "新着差分",
    "New messages"
  ],
  "ui_169": [
    "共有用コピー",
    "Sharing copy"
  ],
  "ui_170": [
    "伏字件数・Preview",
    "Redaction counts / Preview"
  ],
  "ui_171": [
    "再開材料を破棄",
    "Delete resume data"
  ],
  "ui_172": [
    "処理できません: ",
    "Cannot continue: "
  ],
  "ui_173": [
    "このフォルダには対応する再開データがありません。",
    "No supported resume data was found in this folder."
  ],
  "ui_174": [
    "このJobの再開材料だけを削除します。完成出力は残ります。\n{0}\n続行しますか？",
    "Delete only this job's resume data? Finished exports will remain.\n{0}\nContinue?"
  ],
  "ui_175": [
    "変換OFFのため、この画面では本文を表示しません。",
    "Transformation is OFF; message content is not previewed here."
  ],
  "ui_176": [
    "会話: {0} / ローカル添付: {1}\n取得済み: {2}件\n伏字候補（保存時の変換件数）:\n{3}\n{4}\n変換OFFで保存した内容の新規伏字は「共有用コピー」で実行できます。\n\n保存済み変換後Preview（最大3件・各200文字）:\n{5}\n※自動検出対象外の個人情報が残る可能性があります。",
    "Conversation: {0} / Media: {1}\nSaved: {2} messages\nReplacements applied at save time:\n{3}\n{4}\nUse Sharing copy to redact previously unfiltered saved content.\n\nSaved transformed preview (up to 3 messages, 200 characters each):\n{5}\nAutomatic detection may miss personal information."
  ],
  "ui_177": [
    "保存世代の一部が不整合のため検証済み世代を採用。",
    "Some checkpoint generations were inconsistent. A verified generation was selected."
  ],
  "ui_178": [
    "期間進捗",
    "Range progress"
  ],
  "ui_179": [
    "\n進行日数: {0} / {1}日",
    "\nDays: {0} / {1}"
  ],
  "noReplacements": [
    "置換なし",
    "No replacements"
  ],
  "errorGeneric": [
    "処理を続行できません。エラーコードを確認してください。",
    "The operation could not continue. Check the error code."
  ],
  "error_INVALID_MESSAGE_URL": [
    "Message URLの形式またはリンク先を確認してください。",
    "Check the message URL format and destination."
  ],
  "error_MESSAGE_CHANNEL_MISMATCH": [
    "現在のチャンネルに属するメッセージを指定してください。",
    "Choose a message from the selected channel."
  ],
  "error_CUSTOM_REGEX_JSON_INVALID": [
    "正規表現のJSONを確認してください。使わない場合は独自正規表現をOFFにできます。",
    "Check the regex JSON, or turn off custom regular expressions."
  ],
  "error_PASSWORD_MINIMUM_8": [
    "保護用パスワードは8文字以上にしてください。",
    "Use an archive password with at least 8 characters."
  ],
  "error_PASSWORD_CONFIRM_MISMATCH": [
    "2つのパスワードが一致しません。",
    "The two passwords do not match."
  ],
  "error_ABSOLUTE_OUTPUT_PATH_REQUIRED": [
    "出力フォルダを絶対パスで指定してください。",
    "Choose an absolute output-folder path."
  ],
  "error_RANGE_REVERSED_OR_FUTURE": [
    "開始・終了日時の順序と未来の指定を確認してください。",
    "Check the start/end order and any future dates."
  ],
  "error_INVALID_DATE": [
    "日時を確認してください。",
    "Check the selected dates."
  ],
  "error_RESUME_IDENTITY_OR_INTEGRITY_FAILED": [
    "再開データの版・アカウント・パスワード・破損を確認してください。既存データは保持します。",
    "Check the resume version, account, password and file integrity. Existing data is preserved."
  ],
  "error_REGEX_TIMEOUT": [
    "正規表現が時間制限を超えました。伏字を飛ばさず停止しました。",
    "A regex exceeded the time limit. Processing stopped without bypassing redaction."
  ],
  "privacy_legacyLabelled": [
    "旧版のラベル付き秘密情報（内訳なし）",
    "Legacy labelled secrets (not split)"
  ]
});
function udceResolveLocale(preference = 'auto', discord = true) {
    if (preference === 'ja' || preference === 'en') return preference;
    let locale = '';
    if (discord) {
        try {const store=globalThis.BdApi?.Webpack?.getStore?.('LocaleStore');const value=store?.locale || store?.getLocale?.();if(typeof value==='string')locale=value;} catch (_) {}
        if(!locale) {try {locale=globalThis.document?.documentElement?.lang||'';} catch (_) {}}
    }
    if(!locale)locale=globalThis.navigator?.language||'en';
    return /^ja(?:[-_]|$)/i.test(locale)?'ja':'en';
}
function udceTranslate(locale, key, values = {}) {
    const pair=UDCE_I18N[key];
    const text=pair ? pair[locale==='ja'?0:1] : String(key);
    // Replace only dictionary placeholders, never user-provided message content.
    return text.replace(/\{([A-Za-z0-9_]+)\}/g,(all,name)=>Object.hasOwn(values,name)?String(values[name]):all);
}

// Bounded, dependency-free storage/crypto/privacy primitives.
// Only WebCrypto primitives are used; no cryptographic algorithm is implemented here.
function udceCodec() {
    const enc = new TextEncoder(), dec = new TextDecoder('utf-8', {fatal: true});
    const bytes = v => v instanceof Uint8Array ? v : typeof v === 'string' ? enc.encode(v) : new Uint8Array(v);
    const concat = list => {const out = new Uint8Array(list.reduce((n, b) => n + b.length, 0)); let p = 0; for (const b of list) {out.set(b, p); p += b.length;} return out;};
    const hex = b => Array.from(bytes(b), n => n.toString(16).padStart(2, '0')).join('');
    const unhex = s => {if (typeof s !== 'string' || !/^(?:[a-f0-9]{2})+$/.test(s)) throw Error('INVALID_HEX'); return Uint8Array.from(s.match(/../g), h => parseInt(h, 16));};
    const canonical = x => JSON.stringify(x === null || typeof x !== 'object' ? x : Array.isArray(x) ? x.map(v => JSON.parse(canonical(v))) : Object.fromEntries(Object.keys(x).sort().map(k => [k, JSON.parse(canonical(x[k]))])));
    const cryptoAPI = () => {if (!globalThis.crypto?.subtle || !globalThis.crypto?.getRandomValues) throw Error('WEBCRYPTO_UNAVAILABLE'); return globalThis.crypto;};
    const random = n => cryptoAPI().getRandomValues(new Uint8Array(n));
    const hash = async v => hex(await cryptoAPI().subtle.digest('SHA-256', bytes(v)));
    const limit = (v, min, max, code = 'SIZE_LIMIT') => {if (!Number.isSafeInteger(v) || v < min || v > max) throw Error(code); return v;};
    const safeName = n => typeof n === 'string' && n.length <= 200 && /^[A-Za-z0-9_./-]+$/.test(n) && !n.startsWith('/') && !n.split('/').some(p => !p || p === '.' || p === '..') && !/(^|\/)(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|\/|$)/i.test(n);
    const config = c => {if (!c || c.v !== 1 || c.alg !== 'AES-256-GCM' || c.kdf !== 'PBKDF2-SHA256' || c.rounds !== 600000 || !/^[a-f0-9]{32}$/.test(c.salt) || !/^[a-f0-9]{32}$/.test(c.id)) throw Error('CRYPTO_HEADER_INVALID'); return c;};
    const newConfig = () => ({v: 1, alg: 'AES-256-GCM', kdf: 'PBKDF2-SHA256', rounds: 600000, salt: hex(random(16)), id: hex(random(16))});
    async function derive(password, c) {
        config(c); if (typeof password !== 'string' || password.length < 1 || password.length > 1024) throw Error('PASSWORD_REQUIRED');
        const material = await cryptoAPI().subtle.importKey('raw', bytes(password), 'PBKDF2', false, ['deriveKey']);
        return cryptoAPI().subtle.deriveKey({name: 'PBKDF2', hash: 'SHA-256', iterations: c.rounds, salt: unhex(c.salt)}, material, {name: 'AES-GCM', length: 256}, false, ['encrypt', 'decrypt']);
    }
    const crypt = async (op, key, iv, aad, data) => new Uint8Array(await cryptoAPI().subtle[op]({name: 'AES-GCM', iv: bytes(iv), additionalData: bytes(aad), tagLength: 128}, key, bytes(data)));
    function pack(magic, header, payload) {
        const h = bytes(canonical(header)); limit(h.length, 2, 16384, 'HEADER_SIZE'); const n = new Uint8Array(4); new DataView(n.buffer).setUint32(0, h.length, true);
        return concat([bytes(magic), n, h, bytes(payload)]);
    }
    function unpack(data, magic) {
        data = bytes(data); if (data.length < 12 || dec.decode(data.slice(0, 8)) !== magic) throw Error('FORMAT_INVALID');
        const n = limit(new DataView(data.buffer, data.byteOffset + 8, 4).getUint32(0, true), 2, 16384, 'HEADER_SIZE');
        if (data.length < 12 + n) throw Error('TRUNCATED');
        return {header: JSON.parse(dec.decode(data.slice(12, 12 + n))), payload: data.slice(12 + n)};
    }
    async function seal(data, ctx, label) {
        const h = {config: ctx.config, label, iv: hex(random(12))};
        return pack('UDCEST1\n', h, await crypt('encrypt', ctx.key, unhex(h.iv), canonical(h), data));
    }
    async function unseal(data, ctx, label) {
        const {header: h, payload} = unpack(data, 'UDCEST1\n');
        config(h.config); if (canonical(h.config) !== canonical(ctx.config) || h.label !== label || !/^[a-f0-9]{24}$/.test(h.iv)) throw Error('STATE_IDENTITY_MISMATCH');
        return crypt('decrypt', ctx.key, unhex(h.iv), canonical(h), payload);
    }
    // Archive limits deliberately bound in-memory assembly and hostile-file work.
    const MAX_ARCHIVE = 192 * 1024 * 1024, MAX_RECORD = 32 * 1024 * 1024, MAX_TOC = 8 * 1024 * 1024;
    async function archive(entries, ctx) {
        limit(entries.length, 1, 20000, 'RECORD_LIMIT'); const names = new Set(); let offset = 0;
        const toc = [];
        for (let i = 0; i < entries.length; i++) {
            const e = entries[i]; if (!safeName(e.name) || names.has(e.name)) throw Error('ENTRY_NAME'); names.add(e.name);
            const b = bytes(e.data); limit(b.length, 0, MAX_RECORD); limit(offset + b.length + 16, 0, MAX_ARCHIVE);
            toc.push({name: e.name, mime: String(e.mime || 'application/octet-stream').slice(0, 100), size: b.length, stored: b.length + 16, offset, sha256: await hash(b), iv: hex(random(12))}); offset += b.length + 16;
        }
        const t = bytes(canonical(toc)); limit(t.length, 2, MAX_TOC);
        const h = {config: ctx.config, tocIV: hex(random(12)), tocSize: t.length + 16, records: toc.length, payloadSize: offset};
        const aad = canonical(h), parts = [await crypt('encrypt', ctx.key, unhex(h.tocIV), aad + '\ntoc', t)];
        for (let i = 0; i < entries.length; i++) parts.push(await crypt('encrypt', ctx.key, unhex(toc[i].iv), aad + '\nrecord:' + i + ':' + toc[i].name, entries[i].data));
        return pack('UDCEAR1\n', h, concat(parts));
    }
    async function openArchive(data, password, suppliedKey) {
        limit(bytes(data).length, 12, MAX_ARCHIVE + MAX_TOC + 20000);
        const {header: h, payload} = unpack(data, 'UDCEAR1\n'); config(h.config);
        limit(h.records, 1, 20000); limit(h.tocSize, 18, MAX_TOC + 16); limit(h.payloadSize, 16, MAX_ARCHIVE);
        if (payload.length !== h.tocSize + h.payloadSize || !/^[a-f0-9]{24}$/.test(h.tocIV)) throw Error('ARCHIVE_LENGTH');
        const key = suppliedKey || await derive(password, h.config), aad = canonical(h);
        const toc = JSON.parse(dec.decode(await crypt('decrypt', key, unhex(h.tocIV), aad + '\ntoc', payload.slice(0, h.tocSize))));
        if (!Array.isArray(toc) || toc.length !== h.records) throw Error('TOC_INVALID');
        const names = new Map(), ivs = new Set([h.tocIV]); let end = 0;
        for (let i = 0; i < toc.length; i++) {
            const e = toc[i]; if (!safeName(e.name) || names.has(e.name) || !/^[a-f0-9]{64}$/.test(e.sha256) || !/^[a-f0-9]{24}$/.test(e.iv) || ivs.has(e.iv)) throw Error('TOC_INVALID');
            limit(e.size, 0, MAX_RECORD); if (e.offset !== end || e.stored !== e.size + 16) throw Error('TOC_OFFSET');
            end += e.stored; names.set(e.name, i); ivs.add(e.iv);
        }
        if (end !== h.payloadSize) throw Error('TOC_TOTAL');
        async function read(name) {
            const i = names.get(name); if (i === undefined) throw Error('ENTRY_MISSING'); const e = toc[i], p = h.tocSize + e.offset;
            const plain = await crypt('decrypt', key, unhex(e.iv), aad + '\nrecord:' + i + ':' + e.name, payload.slice(p, p + e.stored));
            if (plain.length !== e.size || await hash(plain) !== e.sha256) throw Error('ENTRY_HASH'); return plain;
        }
        return {toc, read, verify: async () => {for (const e of toc) await read(e.name);}};
    }
    return {bytes, text: b => dec.decode(bytes(b)), concat, hex, unhex, canonical, random, hash, limit, safeName, newConfig, derive, seal, unseal, archive, openArchive, config, unpack};
}
const UDCE = udceCodec();
const UDCE_LIMITS = Object.freeze({maxMessages: 100000, maxPages: 10000, maxTextBytes: 24 * 1024 * 1024, maxFileBytes: 16 * 1024 * 1024, maxMediaBytes: 128 * 1024 * 1024});
function udceError(code) {const e = new Error(code); e.code = code; return e;}
function udceCode(e) {return /^[A-Z][A-Z0-9_]{2,80}$/.test(e?.code || e?.message || '') ? (e.code || e.message) : 'OPERATION_FAILED';}
function udceClone(v) {return JSON.parse(JSON.stringify(v));}
function udceFreeze(o) {if (o && typeof o === 'object') {Object.freeze(o); for (const v of Object.values(o)) udceFreeze(v);} return o;}
function udceSafeURL(value, media = false) {
    try {const u = new URL(String(value)); if (u.username || u.password || !['https:', 'http:'].includes(u.protocol)) return '';
        if (media && (u.protocol !== 'https:' || u.port || !['cdn.discordapp.com', 'media.discordapp.net'].includes(u.hostname) || !/^\/(attachments|ephemeral-attachments|external)\//.test(u.pathname))) return '';
        return u.href;
    } catch (_) {return '';}
}
function udceLuhn(value) {
    const s = value.replace(/\D/g, ''); if (!/^\d{13,19}$/.test(s) || /^(\d)\1+$/.test(s)) return false;
    let sum = 0, double = false; for (let i = s.length - 1; i >= 0; i--) {let n = Number(s[i]); if (double && (n *= 2) > 9) n -= 9; sum += n; double = !double;} return sum % 10 === 0;
}
function udceRedactLegacy(text, policy, counts) {
    let s = String(text ?? '');
    const replace = (type, re, fn) => {s = s.replace(re, (...a) => {if (fn && !fn(a[0])) return a[0]; counts[type] = (counts[type] || 0) + 1; return '[REDACTED]';});};
    if (policy.redact) {
        replace('privateKey', /-----BEGIN (?:[A-Z0-9]+ )?PRIVATE KEY-----[\s\S]*?-----END (?:[A-Z0-9]+ )?PRIVATE KEY-----/g);
        replace('webhook', /https?:\/\/(?:(?:canary|ptb)\.)?discord(?:app)?\.com\/api(?:\/v\d+)?\/webhooks\/\d+\/[A-Za-z0-9_.-]+/gi);
        replace('labelledSecret', /(?:password|passwd|pwd|パスワード|api[_ -]?key|access[_ -]?token|refresh[_ -]?token|token|client[_ -]?secret|secret|authorization)\s*[=:：]\s*(?:"[^"\r\n]*"|'[^'\r\n]*'|[^\s,;<>]+)/gi);
        replace('bearer', /\bBearer\s+[A-Za-z0-9_.~+\/-]+=*/gi);
        replace('tokenCandidate', /\b(?:mfa\.[A-Za-z0-9_-]{20,}|[A-Za-z0-9_-]{20,30}\.[A-Za-z0-9_-]{6,10}\.[A-Za-z0-9_-]{25,110})\b/g);
        replace('email', /[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,63}/g);
        replace('cardCandidate', /\b(?:\d[ -]?){12,18}\d\b/g, udceLuhn);
    }
    for (const word of policy.literals || []) {if (!word) continue; const parts = s.split(word); if (parts.length > 1) {counts.customLiteral = (counts.customLiteral || 0) + parts.length - 1; s = parts.join('[REDACTED]');}}
    return s;
}
function udceRegexWorker() {
    self.onmessage = e => {
        try {
            const {fields, rules} = e.data; let count = 0;
            const compiled = rules.map(r => new RegExp(r.pattern, [...new Set((r.flags || '').replace(/[^gimsu]/g, '') + 'g')].join('')));
            const out = fields.map(s => {for (const re of compiled) {re.lastIndex = 0; s = s.replace(re, () => {count++; return '[REDACTED]';});} return s;});
            self.postMessage({fields: out, count});
        } catch (_) {self.postMessage({error: 'CUSTOM_REGEX_INVALID'});}
    };
}
async function udceApplyRegex(records, rules) {
    if (!rules.length) return 0;
    if (typeof Worker !== 'function' || typeof Blob !== 'function' || !URL.createObjectURL) throw udceError('REGEX_WORKER_UNAVAILABLE');
    if (rules.length > 16 || rules.some(r => typeof r.pattern !== 'string' || r.pattern.length > 256)) throw udceError('REGEX_RULE_LIMIT');
    const fields = [], slots = [];
    const walk = v => {for (const k of Object.keys(v)) {if (typeof v[k] === 'string' && !['id','replyToMessageId','timestamp','timestampLocal','localPath','assetId','mime','day','kind'].includes(k)) {if (v[k].length > 262144) throw udceError('REGEX_INPUT_LIMIT'); fields.push(v[k]); slots.push([v,k]);} else if (v[k] && typeof v[k] === 'object') walk(v[k]);}};
    walk(records); if (fields.join('').length > 2097152) throw udceError('REGEX_INPUT_LIMIT');
    const url = URL.createObjectURL(new Blob(['(' + udceRegexWorker.toString() + ')()'], {type: 'text/javascript'})); let worker;
    try {
        worker = new Worker(url);
        const result = await new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(udceError('REGEX_TIMEOUT')), 800);
            worker.onmessage = e => {clearTimeout(timer); e.data.error ? reject(udceError(e.data.error)) : resolve(e.data);};
            worker.onerror = () => {clearTimeout(timer); reject(udceError('REGEX_WORKER_FAILED'));};
            worker.postMessage({fields, rules});
        });
        if (!Array.isArray(result.fields) || result.fields.length !== slots.length) throw udceError('REGEX_RESULT_INVALID');
        result.fields.forEach((s, i) => {slots[i][0][slots[i][1]] = s;}); return result.count;
    } finally {worker?.terminate(); URL.revokeObjectURL(url);}
}
function udceAlias(state, type, id) {
    if (!id) return ''; const key = type + ':' + String(id);
    if (!Object.hasOwn(state.aliases, key)) {state.aliasCounters[type] = (state.aliasCounters[type] || 0) + 1; state.aliases[key] = type + '_' + String(state.aliasCounters[type]).padStart(6, '0');}
    return state.aliases[key];
}
function udceTransformLegacy(n, state) {
    const p = state.policy, count = state.redactions, a = (type, id) => udceAlias(state, type, id);
    const clean = s => udceRedact(s, p, count);
    const structural = new Set(['id','replyToMessageId','timestamp','timestampLocal','editedTimestamp','day','assetId','mime','safeExt','kind','localPath','status']);
    const walk = v => {for (const k of Object.keys(v)) {
        if (typeof v[k] === 'string' && !structural.has(k)) {
            let text = v[k];
            if (p.anonymize) text = k === 'url' ? '' : text.replace(/<@!?(\d+)>/g, (_, id) => '@' + a('User', id)).replace(/<@&(\d+)>/g, (_, id) => '@' + a('Role', id)).replace(/<#(\d+)>/g, (_, id) => '#' + a('Channel', id)).replace(/https?:\/\/\S+/g, '[LINK REMOVED]');
            v[k] = clean(text);
        } else if (v[k] && typeof v[k] === 'object') walk(v[k]);
    }};
    if (p.anonymize) {
        n.id = a('Message', n.id); n.author.id = a('User', n.author.id); n.author.username = n.author.id; n.author.globalName = n.author.id;
        if (n.replyToMessageId) n.replyToMessageId = a('Message', n.replyToMessageId);
        n.content = n.content.replace(/<@!?(\d+)>/g, (_, id) => '@' + a('User', id)).replace(/<@&(\d+)>/g, (_, id) => '@' + a('Role', id)).replace(/<#(\d+)>/g, (_, id) => '#' + a('Channel', id)).replace(/https?:\/\/\S+/g, '[LINK REMOVED]');
        for (const attachment of n.attachments) {attachment.id = attachment.assetId; attachment.filename = attachment.assetId + (attachment.safeExt || '.bin'); attachment.url = '';}
        for (const e of n.embeds) {e.url = ''; if (e.author) e.author = '[ANONYMIZED]';}
        for (const r of n.reactions) if (/\d{15,22}/.test(r.emoji)) r.emoji = '[CUSTOM EMOJI]';
    }
    walk(n);
    // URL values are not regex-rewritten into an executable alternative.
    for (const a of n.attachments) a.url = p.anonymize ? '' : udceSafeURL(a.url);
    for (const e of n.embeds) e.url = p.anonymize ? '' : udceSafeURL(e.url);
    return n;
}

// Privacy v2: independent choices. Legacy jobs keep their original transform and policy hash.
const UDCE_PRIVACY_KEYS = Object.freeze(['names','userIds','messageIds','mentions','attachmentNames','urls','passwords','apiKeys','tokens','authorization','privateKeys','webhooks','emails','cards','customLiterals','customRegex']);
const UDCE_IDENTITY_KEYS = Object.freeze(UDCE_PRIVACY_KEYS.slice(0,6));
const UDCE_SECRET_KEYS = Object.freeze(UDCE_PRIVACY_KEYS.slice(6,14));
function udcePrivacyPreset(profile = 'archive') {
    return Object.fromEntries(UDCE_PRIVACY_KEYS.map(k => [k, profile === 'share' || ['passwords','apiKeys','tokens','authorization','privateKeys','webhooks','customLiterals','customRegex'].includes(k)]));
}
function udcePrivacySettings(saved) {
    if (saved?.privacySchema === 2 && saved.privacy && typeof saved.privacy === 'object') {
        const defaults = udcePrivacyPreset();
        return Object.fromEntries(UDCE_PRIVACY_KEYS.map(k => [k, typeof saved.privacy[k] === 'boolean' ? saved.privacy[k] : defaults[k]]));
    }
    if (saved && (typeof saved.anonymize === 'boolean' || typeof saved.redact === 'boolean')) {
        // An upgrade must not silently disable previously selected email/card protection.
        return Object.fromEntries(UDCE_PRIVACY_KEYS.map(k => [k, UDCE_IDENTITY_KEYS.includes(k) ? !!saved.anonymize : UDCE_SECRET_KEYS.includes(k) ? saved.redact !== false : true]));
    }
    return udcePrivacyPreset();
}
function udcePrivacyEnabled(policy, key) {
    if (policy?.privacySchema === 2) return policy.privacy?.[key] === true;
    return UDCE_IDENTITY_KEYS.includes(key) ? !!policy?.anonymize : UDCE_SECRET_KEYS.includes(key) ? !!policy?.redact : true;
}
function udceHasIdentity(policy) {return UDCE_IDENTITY_KEYS.some(k => udcePrivacyEnabled(policy,k));}
function udceHasRedaction(policy) {
    return UDCE_SECRET_KEYS.some(k => udcePrivacyEnabled(policy,k)) || (udcePrivacyEnabled(policy,'customLiterals') && !!policy.literals?.length) || (udcePrivacyEnabled(policy,'customRegex') && !!policy.regexRules?.length);
}
function udcePolicyRegex(policy) {return udcePrivacyEnabled(policy,'customRegex') ? (policy.regexRules || []) : [];}
function udceRedact(text, policy, counts = {}, preservedNumbers = new Set()) {
    if (policy.privacySchema !== 2) return udceRedactLegacy(text, policy, counts);
    let s = String(text ?? ''); const on = k => udcePrivacyEnabled(policy,k);
    const replace = (type, re, accept) => {s = s.replace(re, (...args) => {
        if (accept && !accept(args[0])) return args[0];
        counts[type] = (counts[type] || 0) + 1; return '[REDACTED]';
    });};
    const labelled = label => new RegExp('(?:^|(?<=[^\\p{L}\\p{N}_]))(?:'+label+')\\s*[=:：]\\s*(?:"[^"\\r\\n]*"|\'[^\'\\r\\n]*\'|[^\\s,;<>]+)','giu');
    if (on('privateKeys')) replace('privateKeys', /-----BEGIN (?:[A-Z0-9]+ )?PRIVATE KEY-----[\s\S]*?-----END (?:[A-Z0-9]+ )?PRIVATE KEY-----/g);
    if (on('webhooks')) replace('webhooks', /https?:\/\/(?:(?:canary|ptb)\.)?discord(?:app)?\.com\/api(?:\/v\d+)?\/webhooks\/\d+\/[A-Za-z0-9_.-]+(?:\?[^\s<>"']*)?/gi);
    if (on('passwords')) replace('passwords', labelled('password|passwd|pwd|パスワード'));
    if (on('apiKeys')) replace('apiKeys', labelled('api[_ -]?key|client[_ -]?secret|secret'));
    if (on('tokens')) {
        replace('tokens', labelled('access[_ -]?token|refresh[_ -]?token|token'));
        replace('tokens', /\b(?:mfa\.[A-Za-z0-9_-]{20,}|[A-Za-z0-9_-]{20,30}\.[A-Za-z0-9_-]{6,10}\.[A-Za-z0-9_-]{25,110})\b/g);
    }
    if (on('authorization')) {
        replace('authorization', /\bAuthorization\s*[=:：]\s*(?:"[^"\r\n]*"|'[^'\r\n]*'|(?:Basic|Digest)\s+[^\r\n]+|[^\r\n]+)/gi);
        replace('authorization', /\bBearer\s+[A-Za-z0-9_.~+\/-]+=*/gi);
    }
    if (on('emails')) replace('emails', /[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,63}/g);
    if (on('cards')) replace('cards', /\b(?:\d[ -]?){12,18}\d\b/g, v => !preservedNumbers.has(v.replace(/\D/g,'')) && udceLuhn(v));
    if (on('customLiterals')) for (const word of policy.literals || []) {
        if (!word) continue; const parts = s.split(word);
        if (parts.length > 1) {counts.customLiteral = (counts.customLiteral || 0) + parts.length - 1; s = parts.join('[REDACTED]');}
    }
    return s;
}
function udceTransform(n, state) {
    if (state.policy.privacySchema !== 2) return udceTransformLegacy(n, state);
    const p = state.policy, counts = state.redactions, on = k => udcePrivacyEnabled(p,k);
    const rawUser = n.author.id, rawMessage = n.id, rawReply = n.replyToMessageId;
    const known = new Map(), preserved = new Set([rawUser,rawMessage,rawReply,state.ctx?.channelId,state.ctx?.guildId].filter(Boolean));
    const alias = (type,id,category) => {if (!id) return ''; counts[category] = (counts[category] || 0) + 1; return udceAlias(state,type,id);};
    if (on('userIds')) known.set(rawUser,udceAlias(state,'User',rawUser));
    if (on('messageIds')) {known.set(rawMessage,udceAlias(state,'Message',rawMessage)); if (rawReply) known.set(rawReply,udceAlias(state,'Message',rawReply));}
    if (on('mentions')) for (const [id,type] of [[state.ctx?.channelId,'Channel'],[state.ctx?.guildId,'Guild']]) if(id)known.set(id,udceAlias(state,type,id));
    const cleanLink = value => {
        if (on('urls')) {counts.urls=(counts.urls||0)+1; return '';}
        let u; try {u=new URL(value);} catch (_) {return '';}
        // A checked identifier/name must not survive in its associated source URL.
        const host=u.hostname.toLowerCase(), discord=/^(?:(?:canary|ptb)\.)?discord(?:app)?\.com$/.test(host);
        const parts=u.pathname.split('/');
        if (discord && parts[1]==='channels' && ((on('messageIds') && /^\d{15,22}$/.test(parts[4]||'')) || (on('mentions') && /^\d{15,22}$/.test(parts[3]||'')))) return '';
        if (discord && parts[1]==='users' && (on('userIds') || on('names'))) return '';
        if (['cdn.discordapp.com','media.discordapp.net'].includes(host) && (on('attachmentNames') || on('mentions') || (on('userIds') && /^\/(avatars|banners)\//.test(u.pathname)))) return '';
        if ([...known.keys()].some(id => id && u.href.includes(id))) return '';
        const cleaned=udceRedact(value,p,counts,preserved);
        return cleaned===value ? udceSafeURL(value) : ''; // Never create an executable replacement URL.
    };
    const cleanText = value => {
        let s=String(value??'');
        s=s.replace(/https?:\/\/[^\s<>"']+/gi, url => cleanLink(url) || '[LINK REMOVED]');
        s=s.replace(/<@!?(\d+)>/g, (all,id)=>{preserved.add(id);return on('userIds')||on('mentions')||on('names')?'@'+alias('User',id,'mentions'):all;})
            .replace(/<@&(\d+)>/g,(all,id)=>{preserved.add(id);return on('mentions')?'@'+alias('Role',id,'mentions'):all;})
            .replace(/<#(\d+)>/g,(all,id)=>{preserved.add(id);return on('mentions')?'#'+alias('Channel',id,'mentions'):all;});
        if(known.size) s=s.replace(/\b\d{15,22}\b/g,id=>known.get(id)||id);
        return udceRedact(s,p,counts,preserved);
    };
    if(on('names')) {const name=alias('User',rawUser,'names');n.author.username=name;n.author.globalName=name;}
    if(on('userIds')) n.author.id=alias('User',rawUser,'userIds');
    if(on('messageIds')) {n.id=alias('Message',rawMessage,'messageIds');if(rawReply)n.replyToMessageId=alias('Message',rawReply,'messageIds');}
    n.content=cleanText(n.content);
    n.author.username=cleanText(n.author.username);n.author.globalName=cleanText(n.author.globalName);
    for(const a of n.attachments) {
        a.filename=on('attachmentNames') ? (counts.attachmentNames=(counts.attachmentNames||0)+1,a.assetId+(a.safeExt||'.bin')) : cleanText(a.filename);
        a.url=a.url ? cleanLink(a.url) : '';
        // Asset identifiers/local paths are not user-facing secrets and are never pattern-redacted.
    }
    for(const e of n.embeds) {
        for(const k of ['title','description','provider']) e[k]=cleanText(e[k]);
        e.author=on('names')&&e.author ? (counts.names=(counts.names||0)+1,'[ANONYMIZED]') : cleanText(e.author);
        e.url=e.url?cleanLink(e.url):'';
        for(const f of e.fields||[]) {f.name=cleanText(f.name);f.value=cleanText(f.value);}
    }
    for(const r of n.reactions) r.emoji=on('mentions') && /\d{15,22}/.test(r.emoji) ? '[CUSTOM EMOJI]' : cleanText(r.emoji);
    return n;
}

function udceFinalizePrivacyLinks(records, policy) {
    if(policy.privacySchema!==2)return;
    for(const n of records) for(const item of [...(n.attachments||[]),...(n.embeds||[])]) {
        if(item.url && (item.url.includes('[REDACTED]') || item.url.includes('[LINK REMOVED]') || !udceSafeURL(item.url)))item.url='';
    }
}

// Self-contained offline browser. Serialized into the exported HTML, never fetched remotely.
const UDCE_VIEWER_I18N = Object.freeze({
  "カレンダー": "Calendar",
  "日付解除": "Clear date",
  "日": "Sun",
  "月": "Mon",
  "火": "Tue",
  "水": "Wed",
  "木": "Thu",
  "金": "Fri",
  "土": "Sat",
  "日付目次": "Date index",
  "保存データの状態": "Archive status",
  "会話": "Conversation",
  "添付": "Attachments",
  "ダウンロード": "Downloads",
  "リセット": "Reset",
  "添付あり": "Has attachments",
  "画像あり": "Has images",
  "返信": "Replies",
  "オンライン画像": "Online images",
  "再ロック": "Lock",
  "前へ": "Previous",
  "次へ": "Next",
  "選択・検索結果をコピー": "Copy selection / results",
  "TXT保存": "Save TXT",
  "範囲解除": "Clear range",
  "前の表示へ": "Back to previous view",
  "添付フィルター解除": "Reset attachment filters",
  "画像": "Images",
  "動画": "Video",
  "音声": "Audio",
  "その他": "Other",
  "表示中を全選択": "Select filtered items",
  "選択解除": "Clear selection",
  "選択反転": "Invert selection",
  "選択をダウンロード": "Download selected",
  "選択URLをコピー": "Copy selected URLs",
  "添付ダウンロード": "Attachment downloads",
  "Windowsのフォルダと同じ感覚で選択できます。選択しただけではダウンロードされません。": "Select items like in Windows Explorer. Selecting does not start a download.",
  "表示中を一括ダウンロード": "Download filtered items",
  "全添付を一括ダウンロード": "Download all attachments",
  "全添付": "All attachments",
  "表示中": "Filtered",
  "選択中": "Selected",
  "保存元あり": "Source available",
  "フィルター解除": "Reset filters",
  "ダウンロードを中止": "Cancel downloads",
  "取得上限: 1ファイル256 MiB。保存先と複数ダウンロードの許可はブラウザの設定に従います。": "Limit: 256 MiB per file. Your browser controls the save location and multiple-download permission.",
  "クリック": "Click",
  "選択 / 解除": "Select / deselect",
  "Ctrl + クリック": "Ctrl + click",
  "追加・解除": "Add / remove",
  "Shift + クリック": "Shift + click",
  "範囲選択": "Select range",
  "名前": "Name",
  "種類": "Type",
  "サイズ": "Size",
  "日付": "Date",
  "投稿者": "Author",
  "状態": "Status",
  "操作": "Actions",
  "日付を検索 例: 05/26": "Find a date, e.g. 05/26",
  "本文・添付・話者・Message IDを検索": "Search messages, attachments, authors or message IDs",
  "開始日": "From date",
  "終了日": "To date",
  "コピー用テキスト": "Text to copy",
  "ファイル名・拡張子を検索": "Search filename or extension",
  "拡張子 例: zip dat lua": "Extensions: zip dat lua",
  "添付ファイル一覧": "Attachment list",
  "ローカル保存済み": "Saved locally",
  "URLあり（未取得）": "URL present (not fetched)",
  "URLなし": "No URL",
  "表示日: {0}": "Date: {0}",
  "全期間": "All dates",
  "開く ↗": "Open ↗",
  "保護された添付を別タブに表示しますか？": "Open this decrypted attachment in a new tab?",
  "添付を表示できません": "Unable to display the attachment",
  "保存時の詳細": "Export-time details",
  "コピーしました": "Copied",
  "コピー欄を表示しました。Ctrl+Cでコピーしてください": "Copy field shown. Press Ctrl+C to copy.",
  "{0}年 {1}月": "{0}-{1}",
  "画像を表示できません。通信・有効期限、またはオンライン画像設定を確認してください。": "Cannot display this image. Check connectivity, URL expiry and the Online images setting.",
  "この画像の表示用URLがありません。": "No display URL is available for this image.",
  "参照先メッセージはこのアーカイブ内にありません": "The referenced message is not in this archive",
  "{0} / {1} 件": "{0} / {1} messages",
  "{0} / {1} ページ": "Page {0} / {1}",
  "選択範囲: {0}件": "Selected range: {0} messages",
  "検索結果がTXT・コピーの対象": "TXT and copy use the filtered results",
  "該当するメッセージはありません": "No matching messages",
  "IDコピー": "Copy ID",
  "ここから": "From here",
  "ここまで": "To here",
  "表示 {0} / {1} · 選択 {2}": "Filtered {0} / {1} · Selected {2}",
  "該当する添付はありません": "No matching attachments",
  "{0}を選択": "Select {0}",
  "プレビューなし": "No preview",
  "元メッセージ": "Source message",
  "（表示外 {0}）": " ({0} hidden by filters)",
  "ファイル": "File",
  "開く": "Open",
  "元へ": "Source",
  "中止": "Cancelled",
  "タイムアウト": "Timed out",
  "容量上限（256 MiB）": "Size limit (256 MiB)",
  "空ファイル": "Empty file",
  "取得失敗（通信・CORS・期限切れ等）": "Fetch failed (network, CORS, expiry, etc.)",
  "ダウンロード処理中です": "Downloads are already running",
  "ダウンロード可能なURLまたは保存済みファイルがありません": "No downloadable URL or saved file is available",
  "{0}の {1}件（合計 約{2}）をダウンロードしますか？": "Download {1} files from {0} (about {2} total)?",
  "\nURLなし等 {0}件は対象外です。": "\n{0} items without a usable source are excluded.",
  "\nサイズ不明の添付を含みます。": "\nSome attachments have an unknown size.",
  "\n保護解除した平文ファイルが保存されます。": "\nDecrypted, unencrypted files will be saved.",
  "\n保存先と複数ダウンロードの許可はブラウザの設定に従います。": "\nYour browser controls the destination and multiple-download permission.",
  "取得中: {0} / {1} · {2}": "Fetching {0} / {1} · {2}",
  "ブラウザへ渡しました": "Handed to browser",
  "中止。 ": "Cancelled. ",
  "ブラウザへ渡した件数: {0} / 失敗: {1}": "Handed to browser: {0} / Failed: {1}",
  "\n保存完了はブラウザのダウンロード一覧で確認してください。": "\nCheck your browser download list to confirm files were saved.",
  "ダウンロードを中止しました": "Downloads cancelled",
  "処理結果を表示しました": "Results shown",
  "日付フィルターを解除しました": "Date filter cleared",
  "URLがある添付を選択してください": "Select an attachment with a URL",
  "保護された添付のURLをコピーしますか？": "Copy the decrypted attachment URLs?",
  "選択": "selection",
  "{0}日": "{0} days",
  "全員": "Everyone",
  "選択（表示外の選択も含む）": "selection (including hidden selected items)",
  "フィルター結果": "filtered results",
  "全添付（フィルターを無視）": "all attachments (ignoring filters)",
  "選択範囲・検索結果を平文TXTとして保存しますか？": "Save selected messages / results as an unencrypted TXT file?",
  "選択範囲・検索結果をTXTとして保存しますか？": "Save selected messages / results as a TXT file?",
  "選択範囲・検索結果の平文をコピーしますか？": "Copy the decrypted selected messages / results?",
  "会話 {0}": "Messages {0}",
  "添付 {0}件": "{0} attachments",
  "画像 {0}件": "{0} images",
  "本文・検索はローカル処理。オンライン画像はDiscord CDNへ接続します。表示とファイル保存は別です。": "Message viewing and search run locally. Online images contact Discord CDN. Viewing is not file saving.",
  "記録された会話状態: {0} / 添付保存: {1}": "Recorded message status: {0} / Media saved: {1}",
  "この画面は保存済みデータを表示します。元のDiscord履歴との全件一致を保証する表示ではありません。": "This screen displays saved data. The status is not a guarantee that every source Discord message was captured."
});
function udceViewerTranslate(locale,key,...values){const s=locale==='en' ? (UDCE_VIEWER_I18N[key] ?? key) : key;return String(s).replace(/\{(\d+)\}/g,(all,n)=>Number(n)<values.length?String(values[Number(n)]):all);}

function udceViewerContent(raw, ctx) {
  "use strict";
  const v=(key,...values)=>udceViewerTranslate(ctx.language,key,...values);
  const meta = raw.meta || {};
  const messages = Array.isArray(raw.messages) ? raw.messages : [];
  const $ = id => document.getElementById(id);
  const pad = n => String(n).padStart(2,"0");
  const fmtSize = n => {
    n = Number(n)||0;
    if(n < 1024) return n+" B";
    if(n < 1048576) return (n/1024).toFixed(n<10240?1:0)+" KB";
    return (n/1048576).toFixed(n<10485760?1:0)+" MB";
  };
  const safeHttp = url => {
    try { const u = new URL(url); return !u.username && !u.password && (u.protocol==="https:" || u.protocol==="http:") ? u.href : ""; }
    catch { return ""; }
  };
  const escExt = name => {
    const m = String(name||"").toLowerCase().match(/\.([a-z0-9]{1,12})$/);
    return m ? m[1] : "";
  };
  const dayOf = m => m.day || String(m.timestamp||"").slice(0,10);
  const authorOf = m => m.author?.globalName || m.author?.username || m.author?.id || "Unknown";
  const initials = name => Array.from(String(name||"?").trim())[0] || "?";
  const allDays = [...new Set(messages.map(dayOf).filter(Boolean))].sort();
  const dayCounts = new Map(); for(const d of allDays) dayCounts.set(d,0);
  messages.forEach(m => dayCounts.set(dayOf(m),(dayCounts.get(dayOf(m))||0)+1));
  const byId = new Map(messages.map((m,i)=>[String(m.id),i]));
  const authors = [...new Map(messages.map(m=>[String(m.author?.id||authorOf(m)),authorOf(m)])).entries()].sort((a,b)=>a[1].localeCompare(b[1],ctx.language));
  const attachments = [];
  messages.forEach((m,mi) => (m.attachments||[]).forEach((a,ai) => attachments.push({m,mi,a,ai,uid:`${mi}:${ai}`})));

  let activeDay = "";
  let filtered = [];
  let page = 0;
  const pageSize = 100;
  let calendarMonth = allDays.length ? allDays[0].slice(0,7) : new Date().toISOString().slice(0,7);
  let attachKind = "";
  let dlKind = "";
  let downloadAnchorUid = null;
  let downloadFocusUid = null;
  const selectedAttachments = new Set();
  // Sources are taken only from the transformed export. Never reconstruct redacted URLs.
  const authorKey = m => String(m.author?.id || authorOf(m));
  const remoteURL = value => {
    try {const u=new URL(value);return u.protocol==='https:' && !u.username && !u.password && !u.port && ['cdn.discordapp.com','media.discordapp.net'].includes(u.hostname) && /^\/(attachments|ephemeral-attachments|external)\//.test(u.pathname) ? u.href : '';}
    catch {return '';}
  };
  const localPath = a => a.status==='SAVED' && /^media\/[a-f0-9]{64}\.[a-z0-9]+$/.test(a.localPath||'') ? a.localPath : '';
  const downloadable = item => !!localPath(item.a) || !!remoteURL(item.a.url);
  const events = new AbortController();
  const objectURLs = new Set(), downloadURLs = new Set(), secureURLs = new Map();
  let alive=true, downloadBusy=false, downloadAbort=null, cancelled=false, previewEpoch=0;
  let previewOnline=!ctx.protected && !meta.anonymized;
  let rangeStart=null,rangeEnd=null,navHistory=[];
  const downloadResults = new Map();
  const downloadLimit=256*1024*1024;
  const btn=(text,fn,cls='')=>{const b=document.createElement('button');b.type='button';b.textContent=text;b.className=cls;b.onclick=fn;return b;};
  function sourceState(a){return localPath(a)?v("ローカル保存済み"):remoteURL(a.url)?v("URLあり"):v("URLなし");}
  function syncDateState(){
    $('activeDayLabel').textContent=activeDay?v("表示日: {0}",activeDay.replaceAll('-','/')):'';
    $('clearDay').classList.toggle('active-filter',!!activeDay||!!$('from').value||!!$('to').value);
    $('clearDay').textContent=activeDay||$('from').value||$('to').value?v("日付解除"):v("全期間");
  }
  function refreshVisible(){
    syncDateState();applyConversationFilter();
    if($('attachPanel').classList.contains('active'))renderAttachments();
    if($('downloadPanel').classList.contains('active'))renderDownload();
  }
  function releasePreviews(){previewEpoch++;for(const u of objectURLs)URL.revokeObjectURL(u);objectURLs.clear();secureURLs.clear();}
  async function assetURL(a){
    const p=localPath(a);if(!p)return '';
    if(!ctx.archive)return p;
    if(secureURLs.has(p))return secureURLs.get(p);
    const own=previewEpoch,bytes=await ctx.archive.read(p);
    if(!alive||own!==previewEpoch)return '';
    if(secureURLs.has(p))return secureURLs.get(p);
    const url=URL.createObjectURL(new Blob([bytes],{type:a.mime||'application/octet-stream'}));
    objectURLs.add(url);secureURLs.set(p,url);return url;
  }
  function showPreview(img,a,error){
    const own=previewEpoch;
    img.loading='lazy';img.decoding='async';img.alt=a.filename||'Image';img.referrerPolicy='no-referrer';
    const remote=()=>previewOnline ? remoteURL(a.url) : '';
    let usedRemote=false;
    const unavailable=()=>{img.hidden=true;if(error){error.hidden=false;error.style.display='block';}};
    img.onerror=()=>{if(!alive||own!==previewEpoch)return;const u=remote();if(u&&!usedRemote){usedRemote=true;img.src=u;}else unavailable();};
    if(localPath(a))assetURL(a).then(url=>{if(!alive||own!==previewEpoch)return;if(url)img.src=url;else img.onerror();}).catch(()=>img.onerror());
    else if(remote()){usedRemote=true;img.src=remote();}
    else unavailable();
  }
  function makeOpen(a,label=v("開く ↗")){
    const p=localPath(a),remote=remoteURL(a.url);
    if(!p&&!remote)return null;
    if(p&&ctx.archive)return btn(label,async e=>{e.stopPropagation();if(!confirm(v("保護された添付を別タブに表示しますか？")))return;const w=window.open('about:blank','_blank');if(w)w.opener=null;try{const url=await assetURL(a);if(w&&alive&&url)w.location.replace(url);else w?.close();}catch{w?.close();toast(v("添付を表示できません"));}});
    const link=document.createElement('a');link.href=p||remote;link.target='_blank';link.rel='noopener noreferrer';link.textContent=label;link.onclick=e=>e.stopPropagation();return link;
  }
  function attachDetail(host,a){
    if(!a.status || ['SAVED','NOT_REQUESTED','PENDING'].includes(a.status))return;
    const d=document.createElement('details'),s=document.createElement('summary');s.textContent=v("保存時の詳細");
    const code=document.createElement('code');code.textContent=String(a.status);d.append(s,code);host.append(d);
  }
  function selectedMessageIndices(){
    if(rangeStart!==null&&rangeEnd!==null){const lo=Math.min(rangeStart,rangeEnd),hi=Math.max(rangeStart,rangeEnd);return Array.from({length:hi-lo+1},(_,i)=>lo+i);}
    return filtered;
  }
  function textOf(m){
    let s=`[${m.timestampLocal||m.timestamp}] ${authorOf(m)} [MSG:${m.id}]\n`;
    if(m.replyToMessageId)s+=`↳ ReplyTo: ${m.replyToMessageId}\n`;
    s+=(m.content||'')+'\n';
    for(const a of m.attachments||[])s+=`[Attachment] ${a.filename||a.assetId} ${localPath(a)||safeHttp(a.url)||''}\n`;
    for(const e of m.embeds||[])s+=`[Embed] ${[e.title,e.description,e.url,...(e.fields||[]).map(f=>f.name+': '+f.value)].filter(Boolean).join(' | ')}\n`;
    if(m.reactions?.length)s+='[Reactions] '+m.reactions.map(r=>`${r.emoji}×${r.count}`).join(' ')+'\n';return s;
  }
  function currentText(){let prev='';return selectedMessageIndices().map(i=>{const m=messages[i],d=dayOf(m),head=d!==prev?`\n${'='.repeat(48)}\n${d}\n${'='.repeat(48)}\n`:'';prev=d;return head+textOf(m);}).join('\n');}
  function saveBlob(blob,name){
    const url=URL.createObjectURL(blob);downloadURLs.add(url);
    const a=document.createElement('a');a.href=url;a.download=name;a.hidden=true;document.body.append(a);a.click();a.remove();
    setTimeout(()=>{URL.revokeObjectURL(url);downloadURLs.delete(url);},30000);
  }
  async function copyValue(text){
    try{if(!navigator.clipboard?.writeText)throw Error('CLIPBOARD');await navigator.clipboard.writeText(text);toast(v("コピーしました"));}
    catch{const a=$('copyArea');a.hidden=false;a.value=text;a.focus();a.select();toast(v("コピー欄を表示しました。Ctrl+Cでコピーしてください"));}
  }
  function saveViewState(){return {activeDay,page,values:Object.fromEntries(['query','author','from','to'].map(id=>[id,$(id).value])),checks:Object.fromEntries(['hasAttachment','hasImage','hasReply','isBot'].map(id=>[id,$(id).checked]))};}
  function restoreViewState(state){activeDay=state.activeDay;page=state.page;for(const [k,v]of Object.entries(state.values))$(k).value=v;for(const[k,v]of Object.entries(state.checks))$(k).checked=v;syncDateState();renderCalendar();renderToc();applyConversationFilter();}


  function toast(text){
    const e=$("toast"); e.textContent=text; e.style.display="block";
    clearTimeout(toast._t); toast._t=setTimeout(()=>e.style.display="none",2400);
  }
  function linkify(container,text){
 const s=String(text||''),re=/(https?:\/\/[^\s<>"']+)/g;let pos=0,m;
 const append=(host,value)=>{const q=$('query').value.toLocaleLowerCase();if(!q){host.append(document.createTextNode(value));return;}const low=value.toLocaleLowerCase();let from=0,index,hits=0;while((index=low.indexOf(q,from))>=0&&hits++<1000){host.append(document.createTextNode(value.slice(from,index)));const mark=document.createElement('mark');mark.textContent=value.slice(index,index+q.length);host.append(mark);from=index+q.length;}host.append(document.createTextNode(value.slice(from)));};
 while((m=re.exec(s))){if(m.index>pos)append(container,s.slice(pos,m.index));const url=safeHttp(m[0]);if(url){const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';append(a,m[0]);container.append(a);}else append(container,m[0]);pos=m.index+m[0].length;}if(pos<s.length)append(container,s.slice(pos));
}
  function sourceUrl(m){if(!(meta.sourceLinksAllowed ?? !meta.anonymized)||meta.privacy?.messageIds||meta.privacy?.mentions)return '';if(!/^\d{15,22}$/.test(String(m.id||''))||!/^\d{15,22}$/.test(String(meta.channelId||'')))return '';const guild=/^\d{15,22}$/.test(String(meta.guildId||''))?meta.guildId:'@me';return `https://discord.com/channels/${guild}/${meta.channelId}/${m.id}`;}
  function setActiveDay(day){activeDay=day||'';if(activeDay)calendarMonth=activeDay.slice(0,7);page=0;rangeStart=rangeEnd=null;renderCalendar();renderToc();refreshVisible();}
  function renderCalendar(){
    const [y,m]=calendarMonth.split("-").map(Number);
    $("calTitle").textContent=v("{0}年 {1}月",y,m);
    const first=new Date(y,m-1,1), last=new Date(y,m,0);
    const frag=document.createDocumentFragment();
    for(let i=0;i<first.getDay();i++){const b=document.createElement("button");b.className="day-cell empty";frag.append(b);}
    for(let d=1;d<=last.getDate();d++){
      const key=`${y}-${pad(m)}-${pad(d)}`;
      const b=document.createElement("button"); b.className="day-cell";
      b.textContent=d;
      if(dayCounts.has(key)){b.classList.add("has");b.title=`${dayCounts.get(key)} messages`;b.onclick=()=>setActiveDay(activeDay===key?"":key);}
      else b.disabled=true;
      if(key===activeDay)b.classList.add("active");
      frag.append(b);
    }
    $("calendar").replaceChildren(frag);
  }
  function shiftMonth(delta){
    const [y,m]=calendarMonth.split("-").map(Number), d=new Date(y,m-1+delta,1);
    calendarMonth=`${d.getFullYear()}-${pad(d.getMonth()+1)}`; renderCalendar();
  }
  function renderToc(){
    const q=$("tocSearch").value.trim().toLowerCase();
    const groups=new Map();
    for(const d of allDays){
      if(q && !d.includes(q.replaceAll("/","-")) && !d.slice(5).includes(q.replaceAll("/","-"))) continue;
      const month=d.slice(0,7); if(!groups.has(month))groups.set(month,[]); groups.get(month).push(d);
    }
    const frag=document.createDocumentFragment();
    for(const [month,days] of groups){
      const lab=document.createElement("div");lab.className="month-label";lab.textContent=v("{0}年 {1}月",month.slice(0,4),Number(month.slice(5)));frag.append(lab);
      for(const d of days){
        const b=document.createElement("button"); b.className="date-link"+(d===activeDay?" active":"");
        const span=document.createElement("span");span.textContent=d.replaceAll("-","/");
        const count=document.createElement("b");count.textContent=dayCounts.get(d);
        b.append(span,count);b.onclick=()=>setActiveDay(activeDay===d?"":d);frag.append(b);
      }
    }
    $("dateToc").replaceChildren(frag);
  }
  function buildAuthorOptions(select,allText){select.replaceChildren();const all=document.createElement('option');all.value='';all.textContent=allText;select.append(all);for(const [id,name]of authors){const o=document.createElement('option');o.value=id;o.textContent=name;select.append(o);}}

  function messageMatches(m){
    const q=$("query").value.trim().toLocaleLowerCase();
    const author=$("author").value, from=$("from").value, to=$("to").value, day=dayOf(m);
    if(activeDay && day!==activeDay)return false;
    if(author && authorKey(m)!==author)return false;
    if(from && day<from)return false;if(to && day>to)return false;
    if($("hasAttachment").checked && !(m.attachments||[]).length)return false;
    if($("hasImage").checked && !(m.attachments||[]).some(a=>a.kind==="image"))return false;
    if($("hasReply").checked && !m.replyToMessageId)return false;
    if($("isBot").checked && !m.author?.bot)return false;
    if(q){
      const hay=[m.id,m.replyToMessageId,m.content,authorOf(m),m.author?.username,
        ...(m.attachments||[]).map(a=>a.filename),
        ...(m.embeds||[]).flatMap(e=>[e.title,e.description,e.url,...(e.fields||[]).map(f=>`${f.name} ${f.value}`)])
      ].filter(Boolean).join("\n").toLocaleLowerCase();
      if(!hay.includes(q))return false;
    }
    return true;
  }
  function applyConversationFilter(){
    filtered=[];
    for(let i=0;i<messages.length;i++) if(messageMatches(messages[i])) filtered.push(i);
    const maxPage=Math.max(0,Math.ceil(filtered.length/pageSize)-1); page=Math.min(page,maxPage);
    renderConversation();
  }
  function renderAttachment(a,m){
    const kind=a.kind||'file',name=a.filename||a.assetId||'attachment',ext=escExt(name)||kind;
    if(kind==='image'){
      const fig=document.createElement('figure');fig.className='image-card';const img=document.createElement('img');
      const error=document.createElement('div');error.className='image-error';error.hidden=true;error.textContent=remoteURL(a.url)?v("画像を表示できません。通信・有効期限、またはオンライン画像設定を確認してください。"):v("この画像の表示用URLがありません。");
      const cap=document.createElement('figcaption');const n=document.createElement('span');n.textContent=name;
      const state=document.createElement('span');state.textContent=`${fmtSize(a.size)} · ${sourceState(a)}`;cap.append(n,state);
      const open=makeOpen(a);if(open)cap.append(open);fig.append(img,error,cap);showPreview(img,a,error);attachDetail(fig,a);return fig;
    }
    const card=document.createElement('div');card.className='file-card';
    const line=document.createElement('div');line.className='file-line';
    const icon=document.createElement('div');icon.className='file-icon';icon.textContent=ext.slice(0,5);
    const metaD=document.createElement('div');metaD.className='file-meta';const n=document.createElement('span');n.className='file-name';n.textContent=name;n.title=name;
    const sub=document.createElement('span');sub.className='file-sub';sub.textContent=`${fmtSize(a.size)} · ${sourceState(a)}`;
    metaD.append(n,sub);line.append(icon,metaD);card.append(line);
    const act=document.createElement('div');act.className='file-actions';const open=makeOpen(a);if(open)act.append(open);card.append(act);
    if(kind==='video'||kind==='audio'){
      const media=document.createElement(kind);media.controls=true;media.preload='none';
      const p=localPath(a);if(p)assetURL(a).then(u=>{if(alive&&u)media.src=u;}).catch(()=>{});
      else if(previewOnline&&remoteURL(a.url))media.src=remoteURL(a.url);card.append(media);
    }
    attachDetail(card,a);return card;
}
  function jumpToMessage(id){const idx=byId.get(String(id));if(idx==null){toast(v("参照先メッセージはこのアーカイブ内にありません"));return;}navHistory.push(saveViewState());if(navHistory.length>10)navHistory.shift();const target=messages[idx];activeDay=dayOf(target);calendarMonth=activeDay.slice(0,7);for(const id of ['query','author','from','to'])$(id).value='';for(const id of ['hasAttachment','hasImage','hasReply','isBot'])$(id).checked=false;filtered=[];for(let i=0;i<messages.length;i++)if(dayOf(messages[i])===activeDay)filtered.push(i);page=Math.floor(Math.max(0,filtered.indexOf(idx))/pageSize);syncDateState();renderCalendar();renderToc();renderConversation();requestAnimationFrame(()=>{if(!alive)return;const el=document.getElementById('msg-'+id);el?.scrollIntoView({block:'center'});el?.classList.add('range-selected');});}
  function renderConversation(){
    const maxPage=Math.max(1,Math.ceil(filtered.length/pageSize));page=Math.max(0,Math.min(page,maxPage-1));
    const slice=filtered.slice(page*pageSize,(page+1)*pageSize);
    const resultText=v("{0} / {1} 件",filtered.length.toLocaleString(),messages.length.toLocaleString());
    const pageText=v("{0} / {1} ページ",filtered.length?page+1:0,filtered.length?maxPage:0);
    $('resultInfo').textContent=$('resultInfoBottom').textContent=resultText;
    $('pageInfo').textContent=$('pageInfoBottom').textContent=pageText;
    const prevDisabled=page<=0,nextDisabled=page>=maxPage-1||!filtered.length;
    $('prevPage').disabled=$('prevPageBottom').disabled=prevDisabled;
    $('nextPage').disabled=$('nextPageBottom').disabled=nextDisabled;
    $('rangeInfo').textContent=rangeStart!==null&&rangeEnd!==null?v("選択範囲: {0}件",Math.abs(rangeEnd-rangeStart)+1):v("検索結果がTXT・コピーの対象");
    const root=$('conversationList'),frag=document.createDocumentFragment();
    if(!slice.length){const e=document.createElement('div');e.className='empty';e.textContent=v("該当するメッセージはありません");frag.append(e);root.replaceChildren(frag);return;}
    let currentDay='';
    for(const idx of slice){
      const m=messages[idx],day=dayOf(m);
      if(day!==currentDay){currentDay=day;const sec=document.createElement('div');sec.className='day-heading';const strong=document.createElement('strong');strong.textContent=day.replaceAll('-','/');const span=document.createElement('span');span.textContent=`${dayCounts.get(day)||0} messages`;sec.append(strong,span);frag.append(sec);}
      const article=document.createElement('article');article.className='message';article.id='msg-'+m.id;
      if(rangeStart!==null&&rangeEnd!==null&&idx>=Math.min(rangeStart,rangeEnd)&&idx<=Math.max(rangeStart,rangeEnd))article.classList.add('range-selected');
      const av=document.createElement('div');av.className='avatar';av.textContent=initials(authorOf(m));article.append(av);
      const head=document.createElement('div');head.className='msg-head';const au=document.createElement('span');au.className='author';au.textContent=authorOf(m);
      const tm=document.createElement('span');tm.className='time';tm.textContent=m.timestampLocal||m.timestamp||'';
      const acts=document.createElement('div');acts.className='msg-actions';acts.append(btn(v("IDコピー"),()=>copyValue(String(m.id))));
      const src=sourceUrl(m);if(src)acts.append(btn('Discord ↗',()=>window.open(src,'_blank','noopener,noreferrer')));
      acts.append(btn(v("ここから"),()=>{rangeStart=idx;if(rangeEnd===null)rangeEnd=idx;renderConversation();}),btn(v("ここまで"),()=>{rangeEnd=idx;if(rangeStart===null)rangeStart=idx;renderConversation();}));
      head.append(au,tm,acts);article.append(head);
      if(m.replyToMessageId){const origin=messages[byId.get(String(m.replyToMessageId))];const rp=btn(origin?`↳ ${authorOf(origin)}: ${(origin.content||'').slice(0,80)}`:`↳ Reply ${m.replyToMessageId}`,()=>jumpToMessage(m.replyToMessageId),'reply');article.append(rp);}
      const content=document.createElement('div');content.className='content';linkify(content,m.content||'');article.append(content);
      for(const e of m.embeds||[]){const b=document.createElement('div');b.className='embed';linkify(b,[e.title,e.description,e.author,...(e.fields||[]).map(f=>`${f.name}: ${f.value}`)].filter(Boolean).join('\n'));const url=safeHttp(e.url);if(url){const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=url;b.append(document.createElement('br'),a);}article.append(b);}
      if(m.attachments?.length){const box=document.createElement('div');box.className='attachments';for(const a of m.attachments)box.append(renderAttachment(a,m));article.append(box);}
      if(m.reactions?.length){const re=document.createElement('div');re.className='reactions';for(const r of m.reactions){const s=document.createElement('span');s.className='reaction';s.textContent=`${r.emoji} × ${r.count}`;re.append(s);}article.append(re);}
      frag.append(article);
    }
    root.replaceChildren(frag);
}

  function getVisibleAttachments(){
    const q=$("attachQuery").value.trim().toLocaleLowerCase();
    const extTokens=$("attachExt").value.toLocaleLowerCase().split(/[\s,;]+/).map(x=>x.replace(/^\./,"")).filter(Boolean);
    const author=$("attachAuthor").value;
    const from=$("from").value,to=$("to").value;
    return attachments.filter(item=>{
      const {m,a}=item;if(!messageMatches(m))return false;const day=dayOf(m),name=String(a.filename||a.assetId||"").toLocaleLowerCase(),ext=escExt(name);
      if(activeDay && day!==activeDay)return false;
      if(attachKind && (a.kind||"file")!==attachKind)return false;
      if(author && authorKey(m)!==author)return false;
      if(from && day<from)return false;if(to && day>to)return false;
      if(q && !`${name} ${ext} ${authorOf(m)} ${day}`.toLocaleLowerCase().includes(q))return false;
      if(extTokens.length && !extTokens.includes(ext))return false;
      return true;
    });
  }
  function renderAttachments(){
    const list=getVisibleAttachments(),root=$('attachmentList'),frag=document.createDocumentFragment();
    $('attachResultInfo').textContent=v("表示 {0} / {1} · 選択 {2}",list.length,attachments.length,selectedAttachments.size);
    if(!list.length){const e=document.createElement('div');e.className='empty';e.textContent=v("該当する添付はありません");frag.append(e);root.replaceChildren(frag);return;}
    for(const item of list){
      const {m,a,uid}=item,name=a.filename||a.assetId||'attachment',ext=escExt(name)||a.kind||'file';
      const card=document.createElement('article');card.className='attach-item';
      const lab=document.createElement('div');lab.className='attach-select-row';const cb=document.createElement('input');cb.type='checkbox';cb.setAttribute('aria-label',v("{0}を選択",name));cb.checked=selectedAttachments.has(uid);
      cb.onclick=e=>e.stopPropagation();cb.onchange=()=>{cb.checked?selectedAttachments.add(uid):selectedAttachments.delete(uid);renderAttachments();updateDownloadButtons();};
      const box=document.createElement('div');box.style.minWidth='0';box.style.flex='1';const strong=document.createElement('strong');strong.textContent=name;box.append(strong);
      const info=document.createElement('div');info.className='attach-info';info.textContent=`.${ext} · ${fmtSize(a.size)} · ${dayOf(m)} ${m.timestampLocal?.split(' ')[1]||''} · ${authorOf(m)}`;box.append(info);lab.append(cb,box);card.append(lab);
      if(a.kind==='image'){const img=document.createElement('img');img.className='attach-thumb';const err=document.createElement('div');err.className='attach-info';err.hidden=true;err.textContent=v("プレビューなし");card.append(img,err);showPreview(img,a,err);}
      const acts=document.createElement('div');acts.className='attach-actions';const open=makeOpen(a);if(open)acts.append(open);acts.append(btn(v("元メッセージ"),()=>{showConversation();jumpToMessage(m.id);}));card.append(acts);attachDetail(card,a);frag.append(card);
    }
    root.replaceChildren(frag);
}
  function showConversation(){ $("conversationPanel").classList.remove("hidden");$("attachPanel").classList.remove("active");hideDownload();$("tabConversation").classList.add("active");$("tabAttachments").classList.remove("active"); }
  function showAttachments(){ $("conversationPanel").classList.add("hidden");$("attachPanel").classList.add("active");hideDownload();$("tabConversation").classList.remove("active");$("tabAttachments").classList.add("active");renderAttachments(); window.scrollTo({top:0,behavior:"auto"}); }


  function getDownloadVisible(){
    const q=$("dlQuery").value.trim().toLocaleLowerCase();
    const extTokens=$("dlExt").value.toLocaleLowerCase().split(/[\s,;]+/).map(x=>x.replace(/^\./,"")).filter(Boolean);
    const author=$("dlAuthor").value,from=$("from").value,to=$("to").value;
    return attachments.filter(item=>{
      const {m,a}=item;if(!messageMatches(m))return false;const day=dayOf(m),name=String(a.filename||a.assetId||"").toLocaleLowerCase(),ext=escExt(name);
      if(activeDay && day!==activeDay)return false;
      if(from&&day<from)return false;if(to&&day>to)return false;
      if(dlKind && (a.kind||"file")!==dlKind)return false;
      if(author && authorKey(m)!==author)return false;
      if(q && !`${name} ${ext} ${authorOf(m)} ${day}`.toLocaleLowerCase().includes(q))return false;
      if(extTokens.length && !extTokens.includes(ext))return false;
      return true;
    });
  }
  function applyExplorerSelection(item,index,event,visible){
    const ctrl=!!(event.ctrlKey||event.metaKey),shift=!!event.shiftKey;
    if(shift){
      let anchorIndex=downloadAnchorUid ? visible.findIndex(x=>x.uid===downloadAnchorUid) : -1;
      if(anchorIndex<0){anchorIndex=index;downloadAnchorUid=item.uid;}
      if(!ctrl) selectedAttachments.clear();
      const lo=Math.min(anchorIndex,index),hi=Math.max(anchorIndex,index);
      for(let i=lo;i<=hi;i++) selectedAttachments.add(visible[i].uid);
      if(!downloadAnchorUid) downloadAnchorUid=item.uid;
    }else if(ctrl){
      selectedAttachments.has(item.uid)?selectedAttachments.delete(item.uid):selectedAttachments.add(item.uid);
      downloadAnchorUid=item.uid;
    }else{
      if(selectedAttachments.has(item.uid)){
        selectedAttachments.delete(item.uid);
      }else{
        selectedAttachments.clear();
        selectedAttachments.add(item.uid);
      }
      downloadAnchorUid=item.uid;
    }
    downloadFocusUid=item.uid;
    renderDownload();
  }
  function renderDownload(){
    const body=$('downloadList'),shell=body.closest('.explorer-shell'),scrollTop=shell.scrollTop,scrollLeft=shell.scrollLeft;
    const visible=getDownloadVisible(),visibleSet=new Set(visible.map(i=>i.uid));
    $('dlTotal').textContent=attachments.length.toLocaleString();$('dlFiltered').textContent=visible.length.toLocaleString();$('dlSelected').textContent=selectedAttachments.size.toLocaleString();$('dlAvailable').textContent=attachments.filter(downloadable).length.toLocaleString();
    const hidden=[...selectedAttachments].filter(id=>!visibleSet.has(id)).length;
    $('dlResultInfo').textContent=v("表示 {0} / {1} · 選択 {2}",visible.length,attachments.length,selectedAttachments.size)+(hidden?v("（表示外 {0}）",hidden):'');
    updateDownloadButtons();const frag=document.createDocumentFragment();
    if(!visible.length){const e=document.createElement('div');e.className='download-empty';e.textContent=v("該当する添付はありません");frag.append(e);body.replaceChildren(frag);shell.scrollTop=0;return;}
    visible.forEach((item,index)=>{
      const {m,a,uid}=item,name=a.filename||a.assetId||'attachment',ext=escExt(name)||a.kind||'file';
      const row=document.createElement('div');row.className='explorer-row'+(selectedAttachments.has(uid)?' selected':'')+(downloadFocusUid===uid?' focused':'');row.dataset.uid=uid;row.tabIndex=-1;row.setAttribute('role','row');row.setAttribute('aria-selected',String(selectedAttachments.has(uid)));
      row.onclick=e=>{if(e.target.closest('a,button,input'))return;e.preventDefault();applyExplorerSelection(item,index,e,visible);body.focus({preventScroll:true});};
      const cells=Array.from({length:8},()=>{const c=document.createElement('div');c.className='explorer-cell';c.setAttribute('role','gridcell');return c;});
      cells[0].classList.add('explorer-check');const cb=document.createElement('input');cb.type='checkbox';cb.checked=selectedAttachments.has(uid);cb.setAttribute('aria-label',v("{0}を選択",name));cb.onclick=e=>e.stopPropagation();cb.onchange=()=>{cb.checked?selectedAttachments.add(uid):selectedAttachments.delete(uid);downloadAnchorUid=downloadFocusUid=uid;renderDownload();body.focus({preventScroll:true});};cells[0].append(cb);
      cells[1].classList.add('explorer-name');const icon=document.createElement('div');icon.className='explorer-file-icon';if(a.kind==='image'){const im=document.createElement('img');showPreview(im,a);icon.append(im);}else icon.textContent=ext.slice(0,5)||'FILE';
      const nt=document.createElement('div');nt.className='explorer-name-text';nt.textContent=name;nt.title=name;cells[1].append(icon,nt);
      cells[2].textContent=a.kind==='image'?v("画像"):a.kind==='video'?v("動画"):a.kind==='audio'?v("音声"):v("ファイル");cells[3].textContent=fmtSize(a.size);cells[4].textContent=dayOf(m);cells[5].textContent=authorOf(m);
      cells[6].classList.add('explorer-status');cells[6].classList.add(downloadable(item)?'ok':'ng');cells[6].textContent=downloadResults.get(uid)||sourceState(a);cells[6].title=String(a.status||'');
      cells[7].classList.add('explorer-actions');const open=makeOpen(a,v("開く"));if(open)cells[7].append(open);cells[7].append(btn(v("元へ"),e=>{e.stopPropagation();showConversation();jumpToMessage(m.id);}));row.append(...cells);frag.append(row);
    });
    body.replaceChildren(frag);shell.scrollTop=scrollTop;shell.scrollLeft=scrollLeft;
}
  function showDownload(){
    $("conversationPanel").classList.add("hidden");
    $("attachPanel").classList.remove("active");
    $("downloadPanel").classList.add("active");
    $("tabConversation").classList.remove("active");
    $("tabAttachments").classList.remove("active");
    $("tabDownload").classList.add("active");
    renderDownload();window.scrollTo({top:0,behavior:"auto"});
  }
  function hideDownload(){
    $("downloadPanel").classList.remove("active");
    $("tabDownload").classList.remove("active");
  }

  async function fetchAndDownload(item){
    const a=item.a,p=localPath(a),url=remoteURL(a.url),name=String(a.filename||a.assetId||'attachment').replace(/[\x00-\x1f<>:"/\\|?*]/g,'_').slice(0,180)||'attachment';
    if(!p&&!url)return {ok:false,reason:v("URLなし")};
    const controller=new AbortController();downloadAbort=controller;const timer=setTimeout(()=>controller.abort(),45000);
    try{
      if(p){
        if(ctx.archive){const bytes=await ctx.archive.read(p);if(!alive||cancelled)return {ok:false,reason:v("中止")};saveBlob(new Blob([bytes],{type:a.mime||'application/octet-stream'}),name);}
        else {if(!alive||cancelled)return {ok:false,reason:v("中止")};const link=document.createElement('a');link.href=p;link.download=name;link.hidden=true;document.body.append(link);link.click();link.remove();}
        return {ok:true};
      }
      // A GET, never a Range request; reject partial or redirected data, keep a bounded reader.
      if(Number(a.size)>downloadLimit)throw Error('DOWNLOAD_SIZE_LIMIT');
      const response=await fetch(url,{method:'GET',mode:'cors',credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer',redirect:'error',signal:controller.signal});
      if(response.status!==200)return {ok:false,reason:`HTTP ${response.status}`};
      if(response.url&&remoteURL(response.url)!==url)throw Error('DOWNLOAD_REDIRECT');
      const length=Number(response.headers.get('content-length'));if(Number.isFinite(length)&&length>downloadLimit)throw Error('DOWNLOAD_SIZE_LIMIT');
      if(!response.body?.getReader)throw Error('DOWNLOAD_STREAM_UNAVAILABLE');
      const reader=response.body.getReader(),parts=[];let count=0;
      try{while(true){const {done,value}=await reader.read();if(done)break;count+=value.byteLength;if(count>downloadLimit){await reader.cancel();throw Error('DOWNLOAD_SIZE_LIMIT');}parts.push(value);}}
      finally{reader.releaseLock();}
      if(!count&&Number(a.size)!==0)throw Error('EMPTY_FILE');
      if(!alive||cancelled)return {ok:false,reason:v("中止")};
      saveBlob(new Blob(parts,{type:response.headers.get('content-type')||a.mime||'application/octet-stream'}),name);
      return {ok:true};
    }catch(e){return {ok:false,reason:cancelled?v("中止"):e?.name==='AbortError'?v("タイムアウト"):e?.message==='DOWNLOAD_SIZE_LIMIT'?v("容量上限（256 MiB）"):e?.message==='EMPTY_FILE'?v("空ファイル"):v("取得失敗（通信・CORS・期限切れ等）")};}
    finally{clearTimeout(timer);if(downloadAbort===controller)downloadAbort=null;}
}
  async function batchDownload(items,label){
    if(downloadBusy){toast(v("ダウンロード処理中です"));return;}
    const seen=new Set(),list=items.filter(x=>{if(seen.has(x.uid)||!downloadable(x))return false;seen.add(x.uid);return true;});
    if(!list.length){toast(v("ダウンロード可能なURLまたは保存済みファイルがありません"));return;}
    const totalBytes=list.reduce((sum,x)=>sum+(Number(x.a.size)||0),0),unknown=list.filter(x=>!Number.isFinite(Number(x.a.size))).length;
    const prompt=v("{0}の {1}件（合計 約{2}）をダウンロードしますか？",label,list.length,fmtSize(totalBytes))+
      (items.length>list.length?v("\nURLなし等 {0}件は対象外です。",items.length-list.length):'')+
      (unknown?v("\nサイズ不明の添付を含みます。"):'')+
      (ctx.protected?v("\n保護解除した平文ファイルが保存されます。"):'')+
      v("\n保存先と複数ダウンロードの許可はブラウザの設定に従います。");
    if(!confirm(prompt))return;
    downloadBusy=true;cancelled=false;updateDownloadButtons();let handed=0,failed=0;
    const status=$('downloadStatus');status.hidden=false;$('downloadCancel').hidden=false;
    try{
      for(let i=0;i<list.length;i++){
        if(!alive||cancelled)break;
        status.textContent=v("取得中: {0} / {1} · {2}",i+1,list.length,list[i].a.filename||list[i].a.assetId);
        const result=await fetchAndDownload(list[i]);if(!alive)break;
        if(result.ok)handed++;else if(!cancelled)failed++;
        downloadResults.set(list[i].uid,result.ok?v("ブラウザへ渡しました"):result.reason);
        if($('downloadPanel').classList.contains('active'))renderDownload();
        if(i+1<list.length&&!cancelled)await new Promise(r=>setTimeout(r,300));
      }
      if(alive){status.textContent=(cancelled?v("中止。 "):'')+v("ブラウザへ渡した件数: {0} / 失敗: {1}",handed,failed)+v("\n保存完了はブラウザのダウンロード一覧で確認してください。");toast(cancelled?v("ダウンロードを中止しました"):v("処理結果を表示しました"));}
    }finally{downloadBusy=false;if(alive){$('downloadCancel').hidden=true;updateDownloadButtons();}}
}
  function updateDownloadButtons(){
    const checked=attachments.filter(x=>selectedAttachments.has(x.uid)&&downloadable(x)).length;
    $('downloadChecked').disabled=downloadBusy||!checked;$('downloadSelected').disabled=downloadBusy||!checked;
    $('downloadFiltered').disabled=downloadBusy||!getDownloadVisible().some(downloadable);
    $('downloadAll').disabled=downloadBusy||!attachments.some(downloadable);
}

  function resetAll(){activeDay='';rangeStart=rangeEnd=null;page=0;for(const id of ['query','author','from','to','attachQuery','attachExt','attachAuthor','dlQuery','dlExt','dlAuthor'])$(id).value='';for(const id of ['hasAttachment','hasImage','hasReply','isBot'])$(id).checked=false;attachKind=dlKind='';downloadAnchorUid=downloadFocusUid=null;selectedAttachments.clear();document.querySelectorAll('[data-kind]').forEach(x=>x.classList.toggle('active',!x.dataset.kind));document.querySelectorAll('[data-dl-kind]').forEach(x=>x.classList.toggle('active',!x.dataset.dlKind));renderCalendar();renderToc();refreshVisible();}

  $('calPrev').onclick=()=>shiftMonth(-1);$('calNext').onclick=()=>shiftMonth(1);
  $('clearDay').onclick=()=>{$('from').value='';$('to').value='';setActiveDay('');toast(v("日付フィルターを解除しました"));};
  $('tocSearch').oninput=renderToc;
  $('tabConversation').onclick=showConversation;$('tabAttachments').onclick=showAttachments;$('tabDownload').onclick=showDownload;
  for(const id of ['query','author','from','to','hasAttachment','hasImage','hasReply','isBot']){
    const e=$(id);e.addEventListener(e.tagName==='SELECT'||e.type==='checkbox'?'change':'input',()=>{page=0;rangeStart=rangeEnd=null;refreshVisible();});
  }
  $('reset').onclick=resetAll;
  const moveConversationPage=delta=>{
    const next=page+delta,max=Math.max(0,Math.ceil(filtered.length/pageSize)-1);
    if(next<0||next>max||next===page)return;
    page=next;renderConversation();
    requestAnimationFrame(()=>$('conversationPanel').scrollIntoView({block:'start',behavior:'smooth'}));
  };
  $('prevPage').onclick=$('prevPageBottom').onclick=()=>moveConversationPage(-1);
  $('nextPage').onclick=$('nextPageBottom').onclick=()=>moveConversationPage(1);
  for(const b of document.querySelectorAll('[data-kind]'))b.onclick=()=>{attachKind=b.dataset.kind||'';document.querySelectorAll('[data-kind]').forEach(x=>x.classList.toggle('active',x===b));renderAttachments();};
  ['attachQuery','attachExt'].forEach(id=>$(id).addEventListener('input',renderAttachments));$('attachAuthor').onchange=renderAttachments;
  $('attachReset').onclick=()=>{$('attachQuery').value='';$('attachExt').value='';$('attachAuthor').value='';attachKind='';document.querySelectorAll('[data-kind]').forEach(x=>x.classList.toggle('active',!x.dataset.kind));renderAttachments();};
  $('selectVisible').onclick=()=>{getVisibleAttachments().forEach(x=>selectedAttachments.add(x.uid));renderAttachments();updateDownloadButtons();};
  $('clearSelected').onclick=()=>{selectedAttachments.clear();renderAttachments();updateDownloadButtons();};
  $('invertSelected').onclick=()=>{getVisibleAttachments().forEach(x=>selectedAttachments.has(x.uid)?selectedAttachments.delete(x.uid):selectedAttachments.add(x.uid));renderAttachments();updateDownloadButtons();};
  $('copyUrls').onclick=async()=>{const urls=attachments.filter(x=>selectedAttachments.has(x.uid)).map(x=>safeHttp(x.a.url)).filter(Boolean);if(!urls.length){toast(v("URLがある添付を選択してください"));return;}if(ctx.protected&&!confirm(v("保護された添付のURLをコピーしますか？")))return;await copyValue(urls.join('\n'));};
  $('downloadSelected').onclick=()=>batchDownload(attachments.filter(x=>selectedAttachments.has(x.uid)),v("選択"));
  $('sideChannel').textContent=meta.channel||'UDCE Archive';$('mainTitle').textContent=`${meta.channel||'UDCE Archive'} — Conversation Browser`;
  $('sideRange').textContent=allDays.length?`${allDays[0].replaceAll('-','/')} ～ ${allDays.at(-1).replaceAll('-','/')}`:'';
  $('metricMessages').textContent=messages.length.toLocaleString();$('metricDays').textContent=allDays.length.toLocaleString();$('metricAttachments').textContent=attachments.length.toLocaleString();$('metricImages').textContent=attachments.filter(x=>x.a.kind==='image').length.toLocaleString();
  $('dayCount').textContent=v("{0}日",allDays.length);$('attachmentTabCount').textContent=`(${attachments.length})`;
  for(const id of ['author','attachAuthor','dlAuthor'])buildAuthorOptions($(id),v("全員"));
  ['dlQuery','dlExt'].forEach(id=>$(id).addEventListener('input',renderDownload));$('dlAuthor').onchange=renderDownload;
  document.querySelectorAll('[data-dl-kind]').forEach(b=>b.onclick=()=>{dlKind=b.dataset.dlKind||'';document.querySelectorAll('[data-dl-kind]').forEach(x=>x.classList.toggle('active',x===b));renderDownload();});
  $('dlReset').onclick=()=>{$('dlQuery').value='';$('dlExt').value='';$('dlAuthor').value='';dlKind='';document.querySelectorAll('[data-dl-kind]').forEach(x=>x.classList.toggle('active',!x.dataset.dlKind));renderDownload();};
  $('dlSelectVisible').onclick=()=>{const visible=getDownloadVisible();visible.forEach(x=>selectedAttachments.add(x.uid));downloadAnchorUid=downloadFocusUid=visible.at(-1)?.uid||null;renderDownload();};
  $('dlClearSelected').onclick=()=>{selectedAttachments.clear();downloadAnchorUid=downloadFocusUid=null;renderDownload();};
  $('dlInvertSelected').onclick=()=>{getDownloadVisible().forEach(x=>selectedAttachments.has(x.uid)?selectedAttachments.delete(x.uid):selectedAttachments.add(x.uid));renderDownload();};
  $('downloadChecked').onclick=()=>batchDownload(attachments.filter(x=>selectedAttachments.has(x.uid)),v("選択（表示外の選択も含む）"));
  $('downloadFiltered').onclick=()=>batchDownload(getDownloadVisible(),v("フィルター結果"));
  $('downloadAll').onclick=()=>batchDownload(attachments,v("全添付（フィルターを無視）"));
  $('downloadCancel').onclick=()=>{cancelled=true;downloadAbort?.abort();};
  document.addEventListener('keydown',e=>{
    if(!$('downloadPanel').classList.contains('active')||e.target.isContentEditable)return;
    const tag=String(e.target?.tagName||'').toLowerCase();if(['input','textarea','select'].includes(tag))return;
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='a'){e.preventDefault();const visible=getDownloadVisible();visible.forEach(x=>selectedAttachments.add(x.uid));downloadAnchorUid=downloadFocusUid=visible.at(-1)?.uid||null;renderDownload();}
    else if(e.key==='Escape'){e.preventDefault();selectedAttachments.clear();downloadAnchorUid=downloadFocusUid=null;renderDownload();}
  },{signal:events.signal});
  $('onlineImages').checked=previewOnline;
  $('onlineImages').onchange=()=>{previewOnline=$('onlineImages').checked;releasePreviews();refreshVisible();};
  $('lockViewer').hidden=!ctx.protected;$('lockViewer').onclick=()=>ctx.onLock();
  $('textDownload').onclick=()=>{if(!selectedMessageIndices().length)return;if(!confirm(ctx.protected?v("選択範囲・検索結果を平文TXTとして保存しますか？"):v("選択範囲・検索結果をTXTとして保存しますか？")))return;saveBlob(new Blob([currentText()],{type:'text/plain;charset=utf-8'}),'UDCE_selected_messages.txt');};
  $('textCopy').onclick=()=>{if(ctx.protected&&!confirm(v("選択範囲・検索結果の平文をコピーしますか？")))return;copyValue(currentText());};
  $('clearRange').onclick=()=>{rangeStart=rangeEnd=null;renderConversation();};
  $('backView').onclick=()=>{const state=navHistory.pop();if(state)restoreViewState(state);};
  const status=$('statusRow');
  const values=[[v("会話 {0}",meta.messageCoverage||'UNKNOWN'),meta.messageCoverage==='COMPLETE'],[v("添付 {0}件",attachments.length),false],[v("画像 {0}件",attachments.filter(x=>x.a.kind==='image').length),false],[`UDCE ${ctx.version}`,false]];
  for(const [text,ok] of values){const b=document.createElement('span');b.className='badge'+(ok?' ok':'');b.textContent=text;status.append(b);}
  $('viewerNotice').textContent=v("本文・検索はローカル処理。オンライン画像はDiscord CDNへ接続します。表示とファイル保存は別です。");
  $('sourceNotice').textContent=v("記録された会話状態: {0} / 添付保存: {1}",meta.messageCoverage||'UNKNOWN',meta.mediaCoverage||'UNKNOWN')+'\n'+v("この画面は保存済みデータを表示します。元のDiscord履歴との全件一致を保証する表示ではありません。");
  const resize=new ResizeObserver(entries=>{const h=entries[0]?.target.getBoundingClientRect().height||150;document.documentElement.style.setProperty('--udce-top-height',h+'px');});resize.observe(document.querySelector('.topbar'));
  renderCalendar();renderToc();syncDateState();applyConversationFilter();updateDownloadButtons();
  if(location.hash==='#download')showDownload();
  return ()=>{alive=false;cancelled=true;downloadAbort?.abort();events.abort();resize.disconnect();clearTimeout(toast._t);releasePreviews();for(const u of downloadURLs)URL.revokeObjectURL(u);downloadURLs.clear();};
}

async function udceViewerMain(){
    const initial=JSON.parse(document.getElementById('udce-data').textContent);
    const language=initial.language==='ja'?'ja':'en',t=(key,values)=>udceTranslate(language,key,values);
    const codec=udceCodec(),host=document.getElementById('udce-app'),layout=document.getElementById('udce-layout');
    const unlock=document.getElementById('unlock'),status=document.getElementById('unlockStatus');let archive=null,dispose=null,generation=0;
    function clear(){generation++;dispose?.();dispose=null;host.replaceChildren();archive=null;document.getElementById('password').value='';document.getElementById('archive-file').value='';}
    function lock(){clear();unlock.hidden=false;status.textContent=t('ui_038');}
    function mount(data){
        if(!data||data.schema!==1||!Array.isArray(data.messages)||data.messages.length>100000||!data.meta)throw Error('DATA_INVALID');
        const ids=new Set();for(const m of data.messages){if(!m||typeof m.id!=='string'||ids.has(m.id)||!m.author||typeof m.content!=='string'||!Array.isArray(m.attachments)||!Array.isArray(m.embeds))throw Error('MESSAGE_INVALID');ids.add(m.id);}
        host.replaceChildren(layout.content.cloneNode(true));unlock.hidden=true;
        dispose=udceViewerContent(data,{language,version:initial.viewerVersion,protected:!!initial.protected,archive,onLock:lock});
    }
    document.getElementById('unlock-button').onclick=async()=>{
        const input=document.getElementById('archive-file'),file=input.files[0],button=document.getElementById('unlock-button');
        if(!file){status.textContent=t('ui_034');return;}
        if(file.size>210000000){status.textContent=t('ui_035');return;}
        const owner=++generation;button.disabled=true;status.textContent=t('ui_036');
        let password=document.getElementById('password').value;document.getElementById('password').value='';
        try{const candidate=await codec.openArchive(new Uint8Array(await file.arrayBuffer()),password);password='';await candidate.verify();const data=JSON.parse(codec.text(await candidate.read('messages.json')));if(owner!==generation)return;archive=candidate;mount(data);input.value='';}
        catch{if(owner===generation){clear();unlock.hidden=false;status.textContent=t('ui_037');}}
        finally{password='';document.getElementById('password').value='';button.disabled=false;}
    };
    window.addEventListener('pagehide',clear);
    if(initial.protected)lock();else mount(initial.data);
}

function udceViewerHTML(data, protectedMode = false, language = udceResolveLocale()) {
language=language==='ja'?'ja':'en';const t=(key,values)=>udceTranslate(language,key,values);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const labels=["カレンダー", "日付解除", "日", "月", "火", "水", "木", "金", "土", "日付目次", "保存データの状態", "会話", "添付", "ダウンロード", "リセット", "添付あり", "画像あり", "返信", "オンライン画像", "再ロック", "前へ", "次へ", "選択・検索結果をコピー", "TXT保存", "範囲解除", "前の表示へ", "添付フィルター解除", "画像", "動画", "音声", "その他", "表示中を全選択", "選択解除", "選択反転", "選択をダウンロード", "選択URLをコピー", "添付ダウンロード", "Windowsのフォルダと同じ感覚で選択できます。選択しただけではダウンロードされません。", "表示中を一括ダウンロード", "全添付を一括ダウンロード", "全添付", "表示中", "選択中", "保存元あり", "フィルター解除", "ダウンロードを中止", "取得上限: 1ファイル256 MiB。保存先と複数ダウンロードの許可はブラウザの設定に従います。", "クリック", "選択 / 解除", "Ctrl + クリック", "追加・解除", "Shift + クリック", "範囲選択", "名前", "種類", "サイズ", "日付", "投稿者", "状態", "操作", "日付を検索 例: 05/26", "本文・添付・話者・Message IDを検索", "開始日", "終了日", "コピー用テキスト", "ファイル名・拡張子を検索", "拡張子 例: zip dat lua", "添付ファイル一覧"];
const markup="\n<div class=\"app\">\n<aside class=\"sidebar\">\n<div class=\"brand\">\n<div class=\"eyebrow\">ULTIMATE DISCORD CONVERSATION EXPORTER</div>\n<h1 id=\"sideChannel\"></h1>\n<p id=\"sideRange\"></p>\n</div>\n<div class=\"side-card\">\n<div class=\"side-title\"><span>{{v0}}</span><button class=\"small-btn\" id=\"clearDay\">{{v1}}</button></div>\n<div class=\"calendar-wrap\">\n<div class=\"calendar-head\"><button class=\"icon-btn\" id=\"calPrev\">‹</button><strong id=\"calTitle\"></strong><button class=\"icon-btn\" id=\"calNext\">›</button></div>\n<div class=\"weekdays\"><span>{{v2}}</span><span>{{v3}}</span><span>{{v4}}</span><span>{{v5}}</span><span>{{v6}}</span><span>{{v7}}</span><span>{{v8}}</span></div>\n<div class=\"calendar-grid\" id=\"calendar\"></div>\n</div>\n</div>\n<div class=\"side-card\">\n<div class=\"side-title\"><span>{{v9}}</span><span id=\"dayCount\"></span></div>\n<input class=\"toc-search\" id=\"tocSearch\" placeholder=\"{{v60}}\" type=\"search\"/>\n<div class=\"date-toc\" id=\"dateToc\"></div>\n</div>\n<div class=\"side-card side-summary\">\n<div class=\"metric\"><b id=\"metricMessages\"></b><span>Messages</span></div>\n<div class=\"metric\"><b id=\"metricDays\"></b><span>Days</span></div>\n<div class=\"metric\"><b id=\"metricAttachments\"></b><span>Attachments</span></div>\n<div class=\"metric\"><b id=\"metricImages\"></b><span>Images</span></div>\n</div>\n<div class=\"side-card side-footer\"><b>UDCE 0.0.1</b><br/>MASTER: 𓆩†𓆪 𝕷𝖚𝖈𝖎𝖊𝖑 𓆩†𓆪<br/>DESIGNER: 𓆩✦𓆪 ASTER 𓆩✦𓆪<br/><a href=\"https://github.com/Lu-ci-el/UltimateDiscordConversationExporter\" rel=\"noopener noreferrer\" target=\"_blank\">GitHub</a> · <a href=\"https://ofuse.me/lost\" rel=\"noopener noreferrer\" target=\"_blank\">OFUSE</a> · <a href=\"https://ko-fi.com/lost2\" rel=\"noopener noreferrer\" target=\"_blank\">Ko-fi</a><details class=\"source-details\"><summary>{{v10}}</summary><div id=\"sourceNotice\"></div></details></div></aside>\n<div class=\"main\">\n<header class=\"topbar\">\n<div class=\"topline\">\n<div>\n<h2 id=\"mainTitle\"></h2>\n<div class=\"status-row\" id=\"statusRow\"></div>\n</div>\n<div class=\"tabs\">\n<button class=\"tab active\" id=\"tabConversation\">{{v11}}</button>\n<button class=\"tab\" id=\"tabAttachments\">{{v12}} <span id=\"attachmentTabCount\"></span></button>\n<button class=\"tab\" id=\"tabDownload\">{{v13}}</button>\n</div>\n</div>\n<div class=\"controls\">\n<input id=\"query\" maxlength=\"512\" placeholder=\"{{v61}}\" type=\"search\"/>\n<select id=\"author\"></select>\n<input aria-label=\"{{v62}}\" id=\"from\" type=\"date\"/>\n<input aria-label=\"{{v63}}\" id=\"to\" type=\"date\"/>\n<button class=\"action-btn resetbtn\" id=\"reset\">{{v14}}</button>\n</div>\n<div class=\"checks\">\n<label><input id=\"hasAttachment\" type=\"checkbox\"/> {{v15}}</label>\n<label><input id=\"hasImage\" type=\"checkbox\"/> {{v16}}</label>\n<label><input id=\"hasReply\" type=\"checkbox\"/> {{v17}}</label>\n<label><input id=\"isBot\" type=\"checkbox\"/> Bot</label>\n<span id=\"activeDayLabel\"></span>\n</div>\n<div class=\"viewer-utility\"><label><input id=\"onlineImages\" type=\"checkbox\"/>{{v18}}</label><button class=\"small-btn\" hidden=\"\" id=\"lockViewer\">{{v19}}</button></div><p class=\"viewer-note\" id=\"viewerNotice\"></p></header>\n<main class=\"content-wrap\">\n<section class=\"conversation-panel\" id=\"conversationPanel\">\n<div class=\"result-head\"><span id=\"resultInfo\"></span><div class=\"pager\"><button id=\"prevPage\">{{v20}}</button><span id=\"pageInfo\"></span><button id=\"nextPage\">{{v21}}</button></div></div>\n<div class=\"text-toolbar\"><button class=\"action-btn\" id=\"textCopy\">{{v22}}</button><button class=\"action-btn\" id=\"textDownload\">{{v23}}</button><button class=\"action-btn\" id=\"clearRange\">{{v24}}</button><button class=\"action-btn\" id=\"backView\">{{v25}}</button><span class=\"viewer-note\" id=\"rangeInfo\"></span></div><textarea aria-label=\"{{v64}}\" class=\"copy-area\" hidden=\"\" id=\"copyArea\"></textarea><div id=\"conversationList\"></div>\n<div class=\"result-head result-foot\"><span id=\"resultInfoBottom\"></span><div class=\"pager\"><button id=\"prevPageBottom\">{{v20}}</button><span id=\"pageInfoBottom\"></span><button id=\"nextPageBottom\">{{v21}}</button></div></div>\n</section>\n<section class=\"attach-panel\" id=\"attachPanel\">\n<div class=\"attach-controls\">\n<input id=\"attachQuery\" placeholder=\"{{v65}}\" type=\"search\"/>\n<input id=\"attachExt\" placeholder=\"{{v66}}\" type=\"text\"/>\n<select id=\"attachAuthor\"></select>\n<button class=\"action-btn\" id=\"attachReset\">{{v26}}</button>\n</div>\n<div class=\"attach-types\">\n<button class=\"filter-chip active\" data-kind=\"\">ALL</button>\n<button class=\"filter-chip\" data-kind=\"image\">{{v27}}</button>\n<button class=\"filter-chip\" data-kind=\"video\">{{v28}}</button>\n<button class=\"filter-chip\" data-kind=\"audio\">{{v29}}</button>\n<button class=\"filter-chip\" data-kind=\"file\">{{v30}}</button>\n</div>\n<div class=\"attach-toolbar\">\n<button class=\"action-btn\" id=\"selectVisible\">{{v31}}</button>\n<button class=\"action-btn\" id=\"clearSelected\">{{v32}}</button>\n<button class=\"action-btn\" id=\"invertSelected\">{{v33}}</button>\n<button class=\"action-btn\" id=\"downloadSelected\">{{v34}}</button>\n<button class=\"action-btn\" id=\"copyUrls\">{{v35}}</button>\n<span class=\"count\" id=\"attachResultInfo\"></span>\n</div>\n<div class=\"attach-grid\" id=\"attachmentList\"></div>\n</section>\n<section class=\"download-panel\" id=\"downloadPanel\">\n<div class=\"download-head\">\n<div>\n<h3>{{v36}}</h3>\n<p>{{v37}}</p>\n</div>\n<div class=\"download-actions\">\n<button class=\"primary\" id=\"downloadChecked\">{{v34}}</button>\n<button id=\"downloadFiltered\">{{v38}}</button>\n<button class=\"warn\" id=\"downloadAll\">{{v39}}</button>\n</div>\n</div>\n<div class=\"download-summary\">\n<div class=\"metric\"><b id=\"dlTotal\">0</b><span>{{v40}}</span></div>\n<div class=\"metric\"><b id=\"dlFiltered\">0</b><span>{{v41}}</span></div>\n<div class=\"metric\"><b id=\"dlSelected\">0</b><span>{{v42}}</span></div>\n<div class=\"metric\"><b id=\"dlAvailable\">0</b><span>{{v43}}</span></div>\n</div>\n<div class=\"attach-controls\">\n<input id=\"dlQuery\" placeholder=\"{{v65}}\" type=\"search\"/>\n<input id=\"dlExt\" placeholder=\"{{v66}}\" type=\"text\"/>\n<select id=\"dlAuthor\"></select>\n<button class=\"action-btn\" id=\"dlReset\">{{v44}}</button>\n</div>\n<div class=\"attach-types\" id=\"dlTypes\">\n<button class=\"filter-chip active\" data-dl-kind=\"\">ALL</button>\n<button class=\"filter-chip\" data-dl-kind=\"image\">{{v27}}</button>\n<button class=\"filter-chip\" data-dl-kind=\"video\">{{v28}}</button>\n<button class=\"filter-chip\" data-dl-kind=\"audio\">{{v29}}</button>\n<button class=\"filter-chip\" data-dl-kind=\"file\">{{v30}}</button>\n</div>\n<div class=\"attach-toolbar\">\n<button class=\"action-btn\" id=\"dlSelectVisible\">{{v31}}</button>\n<button class=\"action-btn\" id=\"dlClearSelected\">{{v32}}</button>\n<button class=\"action-btn\" id=\"dlInvertSelected\">{{v33}}</button>\n<span class=\"count\" id=\"dlResultInfo\"></span>\n</div>\n<div aria-live=\"polite\" class=\"download-status\" hidden=\"\" id=\"downloadStatus\" role=\"status\"></div><button class=\"action-btn\" hidden=\"\" id=\"downloadCancel\">{{v45}}</button><p class=\"viewer-note\">{{v46}}</p><div class=\"explorer-hint\"><span><b>{{v47}}</b> {{v48}}</span><span><b>{{v49}}</b> {{v50}}</span><span><b>{{v51}}</b> {{v52}}</span><span><b>Ctrl + A</b> {{v31}}</span><span><b>Esc</b> {{v32}}</span></div>\n<div class=\"explorer-shell\">\n<div class=\"explorer-head\">\n<div></div><div>{{v53}}</div><div>{{v54}}</div><div>{{v55}}</div><div>{{v56}}</div><div>{{v57}}</div><div>{{v58}}</div><div>{{v59}}</div>\n</div>\n<div aria-label=\"{{v67}}\" aria-multiselectable=\"true\" class=\"explorer-body\" id=\"downloadList\" role=\"grid\" tabindex=\"0\"></div>\n</div>\n</section>\n</main>\n</div>\n<div class=\"toast\" id=\"toast\"></div>\n<a class=\"backtop\" href=\"#top\">↑ TOP</a>\n</div>".replace(/\{\{v(\d+)\}\}/g,(_,i)=>escape(udceViewerTranslate(language,labels[Number(i)])));
const css="\n:root{\n  color-scheme:dark;\n  --bg:#0d1117;--panel:#121822;--panel2:#171f2c;--card:#151d29;--line:#2a3545;\n  --line2:#36465d;--text:#e9eef7;--muted:#94a3b8;--muted2:#708098;\n  --accent:#77b5ff;--accent2:#3e86e6;--accentSoft:#162a44;--green:#70d7a1;\n  --warn:#eac36d;--danger:#ef8e8e;--shadow:0 10px 30px #0005;\n}\n*{box-sizing:border-box}\nhtml{scroll-behavior:smooth}\nbody{margin:0;background:var(--bg);color:var(--text);font:14px/1.62 \"Yu Gothic UI\",\"Hiragino Sans\",\"Noto Sans JP\",Meiryo,system-ui,sans-serif}\nbutton,input,select{font:inherit}\nbutton{cursor:pointer}button:disabled{cursor:default;opacity:.42}\na{color:#9ac7ff;text-underline-offset:3px}\n.app{display:grid;grid-template-columns:300px minmax(0,1fr);min-height:100vh}\n.sidebar{position:sticky;top:0;height:100vh;overflow:auto;border-right:1px solid var(--line);background:#0f151e;padding:18px 16px}\n.brand{padding:2px 4px 14px}\n.brand .eyebrow{font-size:10px;letter-spacing:.14em;color:#7fa3c9}\n.brand h1{font-size:19px;margin:4px 0 2px}\n.brand p{margin:0;color:var(--muted);font-size:12px;overflow-wrap:anywhere}\n.side-card{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:12px;margin:0 0 12px}\n.side-title{display:flex;justify-content:space-between;align-items:center;font-weight:700;margin-bottom:9px}\n.icon-btn,.small-btn,.tab,.filter-chip,.action-btn{\n  border:1px solid var(--line2);background:#1a2331;color:var(--text);border-radius:7px;padding:6px 9px\n}\n.icon-btn:hover,.small-btn:hover,.tab:hover,.filter-chip:hover,.action-btn:hover{border-color:#5e7ca3;background:#202c3d}\n.calendar-head{display:grid;grid-template-columns:34px 1fr 34px;align-items:center;text-align:center;margin-bottom:8px}\n.calendar-head strong{font-size:13px}\n.weekdays,.calendar-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:3px}\n.weekdays{margin-bottom:4px}\n.weekdays span{font-size:9px;color:var(--muted2);text-align:center;padding:0}\n.calendar-grid{grid-template-rows:repeat(6,30px);grid-auto-rows:30px;align-content:start}\n.day-cell{position:relative;height:30px;min-height:30px;border:1px solid transparent;background:transparent;color:#4f5f73;border-radius:6px;padding:0;font-size:10px;line-height:28px;text-align:center}\n.day-cell.has{color:#dce8f6;background:#151e2a;border-color:#26344a;font-weight:600}\n.day-cell.has:hover{background:#1d3047;border-color:#4d739f}\n.day-cell.active{background:#1e4e85;border-color:#78b8ff;color:white;font-weight:800}\n.day-cell.has::after{content:\"\";position:absolute;width:3px;height:3px;border-radius:50%;background:#69adf8;bottom:2px;left:50%;transform:translateX(-50%)}\n.day-cell.active::after{background:white}\n.day-cell.empty{visibility:hidden}\n.toc-search{width:100%;border:1px solid var(--line2);background:#0f151e;color:var(--text);border-radius:7px;padding:7px 9px;margin-bottom:8px}\n.month-group{margin:8px 0}\n.month-label{font-size:11px;color:#88a1bd;text-transform:uppercase;letter-spacing:.06em;margin:8px 5px 4px}\n.date-link{width:100%;display:flex;justify-content:space-between;gap:8px;border:0;background:transparent;color:#aab8ca;padding:6px 7px;border-radius:6px;text-align:left}\n.date-link:hover{background:#1a2636;color:white}\n.date-link.active{background:var(--accentSoft);color:#bdddff}\n.date-link b{font-size:10px;color:#7089a8;font-weight:600}\n.side-summary{display:grid;grid-template-columns:1fr 1fr;gap:7px}\n.metric{background:#0e141d;border:1px solid #253143;border-radius:8px;padding:8px}\n.metric b{display:block;font-size:17px}.metric span{display:block;color:var(--muted);font-size:10px}\n.main{min-width:0}\n.topbar{position:sticky;top:0;z-index:20;background:#0d1117ee;backdrop-filter:blur(12px);border-bottom:1px solid var(--line);padding:14px 22px}\n.topline{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:10px}\n.topline h2{margin:0;font-size:18px}\n.status-row{display:flex;gap:6px;flex-wrap:wrap}\n.badge{font-size:11px;padding:3px 7px;border:1px solid #344761;border-radius:999px;background:#152132;color:#b9cbe2}\n.badge.ok{border-color:#285a47;color:#a3e6c2;background:#12261e}\n.tabs{display:flex;gap:7px}\n.tab.active{background:#1c4f84;border-color:#69a9ec}\n.controls{display:grid;grid-template-columns:minmax(220px,1fr) 170px 142px 142px auto;gap:8px;align-items:center}\n.controls input,.controls select,.attach-controls input,.attach-controls select{\n  width:100%;min-width:0;border:1px solid var(--line2);background:#121a25;color:var(--text);border-radius:7px;padding:8px 10px\n}\n.checks{display:flex;gap:9px;flex-wrap:wrap;align-items:center;margin-top:9px;color:#bcc8d8}\n.checks label{display:flex;gap:5px;align-items:center}\n.content-wrap{max-width:1120px;margin:0 auto;padding:18px 24px 80px}\n.result-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:13px;color:var(--muted);font-size:12px}\n.result-foot{margin-top:18px;margin-bottom:0;padding-top:12px;border-top:1px solid var(--line)}\n.conversation-panel{scroll-margin-top:calc(var(--udce-top-height,150px) + 10px)}\n.pager{display:flex;align-items:center;gap:7px}\n.pager button{border:1px solid var(--line2);background:#182231;color:var(--text);border-radius:6px;padding:5px 9px}\n.pager button:disabled{opacity:.35;cursor:default}\n.day-section{margin:0 0 28px}\n.day-heading{position:sticky;top:131px;z-index:8;display:flex;justify-content:space-between;align-items:center;gap:10px;padding:7px 11px;margin:8px 0 9px;background:#101722eF;border:1px solid var(--line);border-radius:8px;backdrop-filter:blur(10px)}\n.day-heading strong{font-size:13px}.day-heading span{font-size:11px;color:var(--muted)}\n.message{position:relative;border:1px solid var(--line);background:var(--card);border-radius:10px;padding:12px 14px 12px 52px;margin:7px 0;box-shadow:0 1px 0 #ffffff05}\n.message:hover{border-color:#3b4c64}\n.avatar{position:absolute;left:13px;top:13px;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:#263750;color:#d9e8fb;font-size:12px;font-weight:700}\n.msg-head{display:flex;align-items:baseline;gap:9px;flex-wrap:wrap;margin-bottom:4px}\n.author{font-weight:700}.time{font-size:11px;color:var(--muted)}\n.msg-actions{margin-left:auto;display:flex;gap:6px;opacity:.35;transition:opacity .12s}.message:hover .msg-actions{opacity:1}\n.msg-actions button{font-size:10px;padding:3px 6px;border:1px solid #34465e;background:#111a25;color:#a9b8cb;border-radius:5px}\n.content{white-space:pre-wrap;overflow-wrap:anywhere;font-size:14px;line-height:1.68}\n.reply{display:inline-flex;align-items:center;gap:5px;background:#111923;border-left:3px solid #598ed0;padding:4px 8px;margin:3px 0 7px;color:#a9bed8;border-radius:0 5px 5px 0;font-size:11px;cursor:pointer}\n.embed{border-left:3px solid #576f91;background:#111923;padding:8px 10px;margin:8px 0;border-radius:0 6px 6px 0;color:#bdc8d8}\n.reactions{display:flex;gap:5px;flex-wrap:wrap;margin-top:7px}.reaction{background:#111b29;border:1px solid #2f4058;border-radius:999px;padding:2px 7px;font-size:11px}\n.attachments{display:flex;gap:9px;flex-wrap:wrap;margin-top:8px}\n.file-card{min-width:230px;max-width:460px;border:1px solid #324258;background:#101822;border-radius:8px;padding:8px 10px}\n.file-line{display:flex;align-items:center;gap:8px;min-width:0}\n.file-icon{width:34px;height:34px;border-radius:7px;background:#1a2b41;display:grid;place-items:center;font-size:9px;font-weight:800;color:#9dc9ff;flex:none;text-transform:uppercase}\n.file-meta{min-width:0;flex:1}.file-name{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#dce8f7}.file-sub{font-size:10px;color:var(--muted)}\n.file-actions{display:flex;gap:6px;margin-top:7px}.file-actions a,.file-actions button{font-size:10px;padding:3px 6px;border:1px solid #384b65;background:#152131;color:#afd0f7;border-radius:5px;text-decoration:none}\n.image-card{display:block;max-width:min(620px,100%);border:1px solid #324258;background:#0f161f;border-radius:9px;overflow:hidden}\n.image-card img{display:block;max-width:100%;width:auto;max-height:520px;object-fit:contain;background:#0a0e13}\n.image-card figcaption{display:flex;justify-content:space-between;gap:12px;padding:7px 9px;font-size:10px;color:var(--muted)}\n.image-error{display:none;padding:16px;color:#c7a96f}\n.empty{padding:70px 20px;text-align:center;color:var(--muted)}\n.attach-panel{display:none}.attach-panel.active{display:block}.conversation-panel.hidden{display:none}\n.attach-controls{display:grid;grid-template-columns:minmax(180px,1fr) 150px 180px auto;gap:8px;margin-bottom:10px}\n.attach-types{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}.filter-chip.active{background:#204d7a;border-color:#659bd0}\n.attach-toolbar{display:flex;gap:7px;flex-wrap:wrap;align-items:center;padding:9px 10px;background:var(--panel);border:1px solid var(--line);border-radius:9px;margin-bottom:11px}\n.attach-toolbar .count{margin-left:auto;color:var(--muted);font-size:11px}\n.attach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(285px,1fr));gap:9px}\n.attach-item{border:1px solid var(--line);background:var(--card);border-radius:9px;padding:10px}\n.attach-select-row{display:flex;gap:8px;align-items:flex-start}\n.attach-thumb{width:100%;max-height:190px;object-fit:contain;background:#0a0e13;border:1px solid #28364a;border-radius:7px;margin:8px 0}\n.attach-info{font-size:11px;color:var(--muted);overflow-wrap:anywhere}\n.attach-actions{display:flex;gap:6px;flex-wrap:wrap;margin-top:7px}.attach-actions a,.attach-actions button{font-size:10px;padding:4px 7px;border:1px solid #384b65;background:#152131;color:#afd0f7;border-radius:5px;text-decoration:none}\n.toast{position:fixed;right:18px;bottom:18px;z-index:40;background:#172334;border:1px solid #49627f;border-radius:8px;padding:9px 12px;box-shadow:var(--shadow);max-width:360px;font-size:12px;display:none}\n.backtop{position:fixed;right:18px;bottom:18px;border:1px solid #3d536f;background:#162131;color:#dbe9fa;border-radius:999px;text-decoration:none;padding:7px 11px;font-size:11px}\n@media(max-width:1050px){.app{grid-template-columns:250px minmax(0,1fr)}.controls{grid-template-columns:1fr 145px 130px 130px}.controls .resetbtn{grid-column:1/-1}.attach-controls{grid-template-columns:1fr 130px 150px}}\n@media(max-width:780px){.app{display:block}.sidebar{position:static;height:auto;border-right:0;border-bottom:1px solid var(--line)}.calendar-wrap{max-width:360px}.date-toc{max-height:220px;overflow:auto}.topbar{position:sticky;top:0}.controls,.attach-controls{grid-template-columns:1fr 1fr}.controls #query,.attach-controls #attachQuery{grid-column:1/-1}.content-wrap{padding:14px 10px 70px}.message{padding-left:45px}.avatar{left:9px}.day-heading{top:188px}.msg-actions{opacity:1}}\n\n.download-panel{display:none}.download-panel.active{display:block}\n.download-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;margin-bottom:12px}\n.download-head h3{margin:0;font-size:16px}\n.download-head p{margin:2px 0 0;color:var(--muted);font-size:11px}\n.download-actions{display:flex;gap:7px;flex-wrap:wrap}\n.download-actions button{border:1px solid #3d536f;background:#172334;color:#d9e7f7;border-radius:7px;padding:7px 10px}\n.download-actions button.primary{background:#1f568f;border-color:#6ca8e8}\n.download-actions button.warn{background:#4a371a;border-color:#8b6a2d;color:#f2d79d}\n.download-summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:0 0 12px}\n.download-summary .metric{background:#101823}\n.explorer-shell{border:1px solid var(--line);border-radius:9px;overflow:auto;background:#0f151e;max-height:calc(100vh - 330px);min-height:230px;position:relative}\n.explorer-head,.explorer-row{display:grid;grid-template-columns:32px minmax(260px,2.2fr) 82px 90px 116px minmax(100px,1fr) 116px 92px;align-items:center;min-width:940px}\n.explorer-head{position:sticky;top:0;z-index:12;background:#151e2a;border-bottom:1px solid #34445b;color:#a9b8cb;font-size:10px;font-weight:700;letter-spacing:.02em;text-transform:none;box-shadow:0 2px 6px #0007}\n.explorer-head>div{padding:7px 8px;border-right:1px solid #26364a;white-space:nowrap}\n.explorer-head>div:last-child{border-right:0}\n.explorer-body{overflow:visible;max-height:none;min-height:0;outline:none}\n.explorer-row{position:relative;border-bottom:1px solid #1f2b3a;background:#111822;color:#d8e2ef;cursor:pointer;user-select:none;-webkit-user-select:none;font-size:11px}\n.explorer-row:last-child{border-bottom:0}\n.explorer-row:hover{background:#172231}\n.explorer-row.selected{background:#173b63;box-shadow:inset 3px 0 #7dbaff}\n.explorer-row.focused{outline:1px solid #78a9df;outline-offset:-1px}\n.explorer-cell{padding:7px 8px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.explorer-check{display:grid;place-items:center;padding:0}.explorer-check input{margin:0}\n.explorer-name{display:flex;align-items:center;gap:8px;font-weight:650}\n.explorer-file-icon{width:28px;height:28px;flex:none;border:1px solid #38506d;background:#1a2a3e;border-radius:5px;display:grid;place-items:center;color:#9ecbff;font-size:8px;font-weight:800;text-transform:uppercase;overflow:hidden}\n.explorer-file-icon img{width:100%;height:100%;object-fit:cover;display:block}\n.explorer-name-text{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.explorer-status.ok{color:#76d9a7}.explorer-status.ng{color:#e58f8f}.explorer-status.local{color:#94bfff}\n.explorer-actions{display:flex;gap:4px;align-items:center}.explorer-actions a,.explorer-actions button{font-size:9px;padding:3px 5px;border:1px solid #3a506d;background:#172538;color:#acd0fb;border-radius:4px;text-decoration:none;white-space:nowrap}\n.explorer-hint{display:flex;gap:14px;flex-wrap:wrap;color:#8fa0b5;font-size:10px;margin:7px 1px 10px}.explorer-hint b{color:#d7e3f2}\n.download-empty{padding:60px 20px;text-align:center;color:var(--muted)}\n@media(max-width:1100px){.explorer-head,.explorer-row{grid-template-columns:32px minmax(220px,2fr) 70px 82px 106px minmax(90px,1fr) 108px 84px}}\n@media(max-width:780px){.download-summary{grid-template-columns:1fr 1fr}.explorer-shell{max-height:65vh}.explorer-head{position:sticky;top:0}}\n\n#clearDay.active-filter{background:#633c22;border-color:#a86f36;color:#ffd7a3}\n\n\n[hidden]{display:none!important}.day-cell.empty{padding:0!important;min-width:0!important}.image-card{margin:0}.image-card details{font-size:11px;padding:0 10px 7px}.image-card img[hidden]{display:none}.file-card details{font-size:11px}.attach-thumb[hidden]{display:none}.topbar{position:sticky;top:0}.day-heading{top:calc(var(--udce-top-height,150px) + 5px)}.explorer-head{top:0!important;position:sticky!important;z-index:12}.explorer-shell{max-height:clamp(230px,calc(100vh - var(--udce-top-height,150px) - 315px),750px)}.explorer-name-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.explorer-status{white-space:normal!important;font-size:10px;line-height:1.3}.image-error{font-size:12px}.viewer-utility{display:flex;gap:12px;flex-wrap:wrap;font-size:12px;margin-top:8px;align-items:center}.viewer-utility label{display:flex;align-items:center;gap:5px}.viewer-note{color:var(--muted);font-size:11px;line-height:1.5;margin:6px 0}.text-toolbar{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}.text-toolbar button{font-size:11px}.range-selected{outline:2px solid #6fa7df}.message:focus-within .msg-actions{opacity:1}.explorer-hint{user-select:none}.download-status{white-space:pre-wrap;font-size:12px;padding:8px;border-left:3px solid var(--accent);margin:8px 0}.unlock-box{max-width:600px;margin:8vh auto;padding:24px;background:var(--panel);border:1px solid var(--line);border-radius:12px}.unlock-box input{display:block;max-width:100%;margin:14px 0;padding:9px;border:1px solid var(--line2);background:var(--bg);color:var(--text)}.source-details{font-size:11px;color:var(--muted);margin-top:10px;white-space:pre-wrap}.side-footer{font-size:11px;line-height:1.8;overflow-wrap:anywhere}.copy-area{width:100%;height:130px;white-space:pre;background:var(--panel);color:var(--text)}.download-head{scroll-margin-top:calc(var(--udce-top-height,150px) + 8px)}.sidebar .side-card{min-width:0}.controls{grid-template-columns:minmax(140px,1fr) minmax(105px,150px) 132px 132px auto}.download-actions{align-items:center}button:focus-visible,a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}.explorer-body:focus-visible{outline:0}.explorer-row{min-height:42px}.explorer-file-icon img{object-fit:contain}.day-cell{min-width:0!important}figure.image-card{flex:0 1 auto}#downloadList{user-select:none}.explorer-shell{scrollbar-gutter:stable}.sidebar{scrollbar-gutter:stable}@media(max-width:1200px){.controls{grid-template-columns:minmax(140px,1fr) minmax(100px,140px)}.controls input[type=date]{width:100%}.download-summary{grid-template-columns:repeat(4,minmax(0,1fr))}}@media(max-width:780px){.controls,.attach-controls{grid-template-columns:1fr 1fr}.explorer-shell{max-height:60vh}.main .content-wrap{max-width:100%}.day-heading{top:var(--udce-top-height,180px)}.sidebar{position:static}.date-toc{max-height:170px}.download-summary{grid-template-columns:1fr 1fr}.topbar{padding:12px}.controls .resetbtn{grid-column:1/-1}.msg-actions{opacity:1}}\n";
// Public metadata describes this generator; do not rewrite the input or resume state.
const exportData=protectedMode||!data?null:{...data,meta:{...data.meta,version:UDCE_VERSION}};
if(exportData)delete exportData.meta.jobSourceVersion;
const payload=JSON.stringify({protected:protectedMode,language,viewerVersion:UDCE_VERSION,data:exportData}).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
const script=udceCodec.toString()+'\nconst UDCE_I18N='+JSON.stringify(UDCE_I18N).replace(/</g,'\\u003c')+';\n'+udceTranslate.toString()+'\nconst UDCE_VIEWER_I18N='+JSON.stringify(UDCE_VIEWER_I18N).replace(/</g,'\\u003c')+';\n'+udceViewerTranslate.toString()+'\n'+udceViewerContent.toString()+'\n'+udceViewerMain.toString()+'\nudceViewerMain().catch(()=>{document.getElementById("unlock").hidden=false;document.getElementById("unlockStatus").textContent="Cannot display this archive. Check file integrity and browser support.";});';
return `<!doctype html><html lang="${language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'self' file: blob: https://cdn.discordapp.com https://media.discordapp.net; media-src 'self' file: blob: https://cdn.discordapp.com https://media.discordapp.net; connect-src https://cdn.discordapp.com https://media.discordapp.net; font-src 'none'; object-src 'none'; frame-src 'none'; base-uri 'none'; form-action 'none'">
<title>UDCE — Conversation Browser</title><style>${css}</style></head><body id="top"><section id="unlock" class="unlock-box" hidden><h2>${t('ui_045')}</h2><p>${t('ui_046')}</p><input id="archive-file" type="file" accept=".udce"><input id="password" type="password" autocomplete="off" placeholder="Password"><button id="unlock-button" class="action-btn">${t('ui_047')}</button><p id="unlockStatus" role="status"></p></section><div id="udce-app"></div><template id="udce-layout">${markup}</template><script id="udce-data" type="application/json">${payload}</script><script>${script}</script></body></html>`;
}

module.exports = class UltimateDiscordConversationExporter {
    constructor() {
        this.name = "UltimateDiscordConversationExporter";
        this.version = UDCE_VERSION;
        this.masterSignature = "𓆩†𓆪 𝕷𝖚𝖈𝖎𝖊𝖑 𓆩†𓆪";
        this.designerSignature = "𓆩✦𓆪 ASTER 𓆩✦𓆪";
        this.supportJP = "https://ofuse.me/lost";
        this.supportGlobal = "https://ko-fi.com/lost2";
        this.github = "https://github.com/Lu-ci-el/UltimateDiscordConversationExporter";
        this.enabled = false;
        this.generation = 0;
        this.activeJob = null;
        this.Dispatcher = null;
        this.api = null;
        this.stores = {};
        this.MessageActions = null;
        this.exportButton = null;
        this.overlay = null;
        this.cancelRequested = false;
        this.running = false;
        this.currentExport = null;
        this.styleId = "aster-discord-exporter-style";
        this.defaultSettings = {
            outputDir: "",
            pageDelayMs: 1000,
            maxFetchRetries: 4,
            includeEmbeds: true,
            includeAttachments: true,
            includeReactions: true,
            outputMode: "both",
            images: false,
            redact: true,
            anonymize: false,
            protected: false,
            videos: false,
            files: false,
            embedImages: false,
            maxFileMiB: 16,
            maxTotalMiB: 64
        };
        this.settings = {...this.defaultSettings,uiLanguage:"auto",privacySchema:2,privacy:udcePrivacyPreset()};
        // BetterDiscord 1.13+ only polyfills a limited Node surface in renderer.
        // `fs` is supported; `path`, `os`, `zlib`, `electron`, and `child_process` are not.
        this.fs = require("fs");
    }

    start() {
        this.api = new BdApi(this.name);
        const current = this.api.Data.load('settings');
        const typoLegacy = !current && BdApi.Data?.load ? BdApi.Data.load('UltimateDiscordConversationExporte', 'settings') : null;
        const legacy = !current && !typoLegacy && BdApi.Data?.load ? BdApi.Data.load('DiscordConversationExporter', 'settings') : null;
        const saved = current || typoLegacy || legacy || null;
        this.settings = {...this.defaultSettings, ...(saved || {}), privacySchema:2, privacy:udcePrivacySettings(saved)};
        this.settings.uiLanguage = ['auto','ja','en'].includes(saved?.uiLanguage) ? saved.uiLanguage : 'auto';
        this.settings.anonymize = UDCE_IDENTITY_KEYS.some(k=>this.settings.privacy[k]);
        this.settings.redact = UDCE_SECRET_KEYS.some(k=>this.settings.privacy[k]);
        // Retain migration of the previously persisted 650ms value to the documented 1000ms default.
        if (Number(this.settings.pageDelayMs) === 650) this.settings.pageDelayMs = 1000;
        this.settings.pageDelayMs = Math.max(500, Math.min(10000, Number(this.settings.pageDelayMs) || 1000));
        this.settings.outputMode = ['txt','html','both'].includes(this.settings.outputMode) ? this.settings.outputMode : 'both';
        this.settings.maxFetchRetries = Math.max(0, Math.min(6, Number(this.settings.maxFetchRetries) || 4));
        // New 0.0.1 jobs keep attachment metadata/URLs for the browser but do not save image bodies during export.
        // A resumable job keeps the policy already stored inside its own state.
        this.settings.images = false;
        this.settings.outputDir ||= this.getDefaultOutputDir();
        // Do not persist passwords, custom secret strings or raw conversation data in BdApi.Data.
        this.api.Data.save('settings', this.settings);
        this.enabled = true; this.generation = (this.generation || 0) + 1;
        const key = Symbol.for('UDCE.runtime.owner');
        if (globalThis[key] && globalThis[key] !== this && globalThis[key].enabled) {
            this.enabled = false; BdApi.UI.alert('UDCE', this.t("ui_063")); return;
        }
        if (BdApi.Plugins?.isEnabled?.('DiscordConversationExporter') || BdApi.Plugins?.isEnabled?.('UltimateDiscordConversationExporte')) {
            this.enabled = false; BdApi.UI.alert('UDCE', this.t("ui_064")); return;
        }
        globalThis[key] = this;
        try {this.resolveDiscordModules(); this.installStyles(); this.installFloatingButton(); BdApi.UI.showToast(this.t("ui_065"), {type: 'success'});}
        catch (_) {BdApi.UI.alert('UDCE', this.t("ui_066")); this.enabled = false; if (globalThis[key] === this) delete globalThis[key];}
    }

    stop() {
        this.enabled = false; this.generation = (this.generation || 0) + 1;
        this.cancelRequested = true;
        if (this.activeJob) {this.activeJob.mode = 'terminated'; this.activeJob.abort?.abort();}
        // Never mark an old async writer as idle while it can still return.
        this.removeOverlay(); this.exportButton?.remove(); this.exportButton = null;
        const key = Symbol.for('UDCE.runtime.owner'); if (globalThis[key] === this) delete globalThis[key];
        try {BdApi.DOM.removeStyle(this.styleId);} catch (_) {}
    }

    onSwitch() {
        if (this.exportButton) this.refreshButtonTitle();
        if (this.overlay?.isConnected) this.refreshChannelLabel();
    }

    uiLocale() {return udceResolveLocale(this.settings?.uiLanguage || 'auto',true);}
    t(key, values) {return udceTranslate(this.uiLocale(),key,values);}
    getDescription() {return this.t('intro');}
    privacyCountsText(counts) {
        const aliases={privateKey:'privateKeys',webhook:'webhooks',labelledSecret:'legacyLabelled',bearer:'authorization',tokenCandidate:'tokens',email:'emails',cardCandidate:'cards',customLiteral:'customLiterals',customRegex:'customRegex'};
        return Object.entries(counts||{}).map(([key,value])=>`${this.t('privacy_'+(aliases[key]||key))}: ${value}`).join('\n') || this.t('noReplacements');
    }
    errorText(error) {const code=udceCode(error);const key='error_'+code;return (UDCE_I18N[key]?this.t(key):this.t('errorGeneric'))+' ['+code+']';}

    // All labels below come from the same local dictionary. No message is machine-translated.
    buildPrivacyEditor(initial, onChange = () => {}) {
        const root=document.createElement('section');root.className='udce-privacy';
        const heading=document.createElement('h4');heading.textContent=this.t('privacyTitle');root.append(heading);
        const note=document.createElement('p');note.className='udce-note';note.textContent=this.t('privacyNote');root.append(note);
        const summary=document.createElement('div');summary.className='udce-privacy-summary';summary.setAttribute('aria-live','polite');root.append(summary);
        const fields=new Map();root.privacyValue=udcePrivacySettings({privacySchema:2,privacy:initial});
        const update=()=>{root.privacyValue=Object.fromEntries([...fields].map(([k,b])=>[k,b.checked]));summary.textContent=this.t('privacyCount',{count:[...fields.values()].filter(b=>b.checked).length,total:UDCE_PRIVACY_KEYS.length});onChange({...root.privacyValue});};
        for(const [group,keys] of [['identity',UDCE_IDENTITY_KEYS],['secrets',UDCE_SECRET_KEYS],['custom',UDCE_PRIVACY_KEYS.slice(14)]]) {
            const section=document.createElement('fieldset');section.className='udce-privacy-group';const legend=document.createElement('legend');legend.textContent=this.t('group_'+group);section.append(legend);
            const grid=document.createElement('div');grid.className='udce-privacy-grid';
            for(const key of keys) {
                const box=this.makeCheckbox(this.t('privacy_'+key),!!root.privacyValue[key]);box.row.title=this.t('help_'+key);box.input.dataset.privacy=key;
                box.input.setAttribute('aria-label',this.t('privacy_'+key));box.input.onchange=update;fields.set(key,box.input);grid.append(box.row);
            }
            section.append(grid);root.append(section);
        }
        root.setPrivacy=value=>{for(const [key,box] of fields)box.checked=value[key]===true;update();};
        const details=document.createElement('details'),title=document.createElement('summary');title.textContent=this.t('privacyScope');details.append(title);
        for(const key of ['names','userIds','messageIds','mentions','attachmentNames','urls','passwords','apiKeys','tokens','authorization','privateKeys','webhooks','emails','cards','customLiterals','customRegex']) {
            const line=document.createElement('p');line.className='udce-note';const strong=document.createElement('strong');strong.textContent=this.t('privacy_'+key)+': ';line.append(strong,document.createTextNode(this.t('help_'+key)));details.append(line);
        }
        const warning=document.createElement('p');warning.className='udce-note';warning.textContent=this.t('privacyLimit');details.append(warning);root.append(details);update();return root;
    }

    getSettingsPanel() {
        const root=document.createElement('div');root.className='udce-settings';root.style.cssText='padding:18px;background:#181a20!important;color:#eceef3!important;box-sizing:border-box;border-radius:10px;font:14px/1.6 system-ui,sans-serif';
        const title=document.createElement('h3');title.textContent=`UDCE ${this.version}`;root.append(title);
        const note=document.createElement('p');note.className='udce-intro';note.textContent=this.t('intro');root.append(note);
        const languageRow=document.createElement('label');languageRow.className='udce-language';const caption=document.createElement('span');caption.textContent=this.t('uiLanguage');
        const language=document.createElement('select');language.className='aster-exp-input';
        for(const [value,label] of [['auto',this.t('languageAuto')],['ja','日本語'],['en','English']]) {const option=document.createElement('option');option.value=value;option.textContent=label;language.append(option);}
        language.value=this.settings.uiLanguage||'auto';language.onchange=()=>{this.settings.uiLanguage=language.value;this.saveSettings();root.replaceWith(this.getSettingsPanel());};languageRow.append(caption,language);root.append(languageRow);
        const output=this.makeSettingRow(this.t('outputFolder'),this.t('stateFolderNote'),'text',this.settings.outputDir);
        const outputPathRow=document.createElement('div');outputPathRow.className='aster-exp-path-row';
        const outputBrowse=document.createElement('button');outputBrowse.type='button';outputBrowse.className='aster-exp-secondary';outputBrowse.textContent=this.t('browseFolder');
        output.input.style.flex='1 1 auto';output.input.style.minWidth='0';output.row.removeChild(output.input);outputPathRow.append(output.input,outputBrowse);output.row.append(outputPathRow);
        output.input.onchange=()=>{this.settings.outputDir=output.input.value.trim()||this.getDefaultOutputDir();output.input.value=this.settings.outputDir;this.saveSettings();};
        outputBrowse.onclick=async()=>{const selected=await this.chooseOutputFolder(output.input.value);if(!selected)return;output.input.value=selected;this.settings.outputDir=selected;this.saveSettings();};root.append(output.row);
        const delay=this.makeSettingRow(this.t('requestInterval'),this.t('intervalNote'),'number',this.settings.pageDelayMs);
        delay.input.min='500';delay.input.max='10000';delay.input.onchange=()=>{this.settings.pageDelayMs=Math.max(500,Math.min(10000,Number(delay.input.value)||1000));delay.input.value=String(this.settings.pageDelayMs);this.saveSettings();};root.append(delay.row);
        const formatRow=document.createElement('label');formatRow.className='udce-language';const formatLabel=document.createElement('span');formatLabel.textContent=this.t('outputFormat');
        const format=document.createElement('select');format.className='aster-exp-input';
        for(const [value,key] of [['both','formatBoth'],['html','formatHTML'],['txt','formatTXT']]) {const option=document.createElement('option');option.value=value;option.textContent=this.t(key);format.append(option);}
        format.value=this.settings.outputMode||'both';format.onchange=()=>{this.settings.outputMode=format.value;this.saveSettings();};formatRow.append(formatLabel,format);root.append(formatRow);
        for(const [key,label] of [['includeAttachments','attachments'],['includeEmbeds','embeds'],['includeReactions','reactions']]) {
            const box=this.makeCheckbox(this.t(label),!!this.settings[key]);box.input.onchange=()=>{this.settings[key]=box.input.checked;this.saveSettings();};root.append(box.row);
        }
        const preset=document.createElement('div');preset.className='aster-exp-quick';
        const editor=this.buildPrivacyEditor(udcePrivacySettings(this.settings),value=>{this.settings.privacySchema=2;this.settings.privacy=value;this.settings.anonymize=UDCE_IDENTITY_KEYS.some(k=>value[k]);this.settings.redact=UDCE_SECRET_KEYS.some(k=>value[k]);});
        for(const [key,profile] of [['presetArchive','archive'],['presetShare','share'],['privacyOff','off']]) {const button=document.createElement('button');button.className='aster-exp-chip';button.textContent=this.t(key);button.onclick=()=>{editor.setPrivacy(profile==='off'?Object.fromEntries(UDCE_PRIVACY_KEYS.map(k=>[k,false])):udcePrivacyPreset(profile));if(profile==='share'){this.settings.images=false;this.settings.videos=false;this.settings.files=false;this.settings.embedImages=false;}this.saveSettings();root.replaceWith(this.getSettingsPanel());};preset.append(button);}
        root.append(preset,editor);editor.addEventListener('change',()=>this.saveSettings());
        const actions=document.createElement('div');actions.className='aster-exp-quick';
        for(const [key,fn] of [['copyOutput',()=>this.openPath(this.settings.outputDir)],['savedResume',()=>this.openSavedJobs(this.settings.outputDir)]]) {const button=document.createElement('button');button.className='aster-exp-secondary';button.textContent=this.t(key);button.onclick=fn;actions.append(button);}
        root.append(actions,this.supportLinks());return root;
    }

    makeSettingRow(title, note, type, value) {
        const row = document.createElement("div");
        row.style.margin = "14px 0";
        const label = document.createElement("div");
        label.textContent = title;
        label.style.fontWeight = "700";
        const noteEl = document.createElement("div");
        noteEl.textContent = note;
        noteEl.style.color = "#b5bac1";
        noteEl.style.fontSize = "12px";
        noteEl.style.margin = "3px 0 7px";
        const input = document.createElement("input");
        input.type = type;
        input.value = value;
        input.className = "aster-exp-input";
        row.append(label, noteEl, input);
        return {row, input};
    }

    makeCheckbox(label, checked) {
        const row = document.createElement("label");
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.gap = "8px";
        row.style.margin = "10px 0";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = checked;
        const text = document.createElement("span");
        text.textContent = label;
        row.append(input, text);
        return {row, input};
    }

    saveSettings() {
        this.api?.Data.save("settings", this.settings);
    }

    resolveDiscordModules() {
        const W = BdApi.Webpack;
        this.Dispatcher = W.getModule(m => m && typeof m.subscribe === "function" && typeof m.unsubscribe === "function" && typeof m.dispatch === "function", {searchExports: true});

        const getStore = (name) => {
            const s = W.getStore?.(name);
            if (!s) throw new Error(this.t("ui_067", {0:name}));
            return s;
        };

        this.stores.SelectedChannelStore = getStore("SelectedChannelStore");
        this.stores.ChannelStore = getStore("ChannelStore");
        this.stores.MessageStore = getStore("MessageStore");
        this.stores.UserStore = getStore("UserStore");
        try { this.stores.GuildStore = getStore("GuildStore"); } catch (_) { this.stores.GuildStore = null; }

        this.MessageActions = W.getModule(
            W.Filters.byKeys("fetchMessages", "jumpToMessage"),
            {searchExports: true}
        ) || W.getModule(
            m => m && typeof m.fetchMessages === "function",
            {searchExports: true}
        );

        if (!this.MessageActions?.fetchMessages) {
            throw new Error(this.t("ui_068"));
        }
    }

    installStyles() {
        BdApi.DOM.addStyle(this.styleId, `
            .udce-settings {box-sizing:border-box;padding:18px!important;background:#181a20!important;color:#eceef3!important;border-radius:10px;font:14px/1.6 system-ui,sans-serif;max-width:100%}
            .udce-settings h3 {font-size:18px;margin:0 0 10px}
            .udce-intro {white-space:pre-line!important;line-height:1.8;margin:10px 0 18px;font-size:13px}
            .udce-language {display:flex;flex-direction:column;gap:6px;margin:14px 0}
            .udce-settings .aster-exp-input {box-sizing:border-box;width:100%;min-width:0}
            .udce-privacy {color:#eceef3!important;background:#20232b!important;border:1px solid #444854;border-radius:8px;padding:14px;margin:16px 0}
            .udce-privacy h4 {font-size:15px;margin:0 0 8px;color:inherit}
            .udce-note {font-size:12px;color:#bec4d0!important;line-height:1.65;margin:6px 0}
            .udce-privacy-summary {font-size:12px;color:#c7d9ff!important;margin-bottom:12px}
            .udce-privacy-group {min-inline-size:0;border:0;padding:8px 0;margin:0}
            .udce-privacy-group legend {font-size:13px;font-weight:700;color:#cbd2e0;padding:0}
            .udce-privacy-grid {display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0 14px}
            .udce-privacy-grid label {margin:6px 0!important;font-size:13px;align-items:flex-start!important}
            .udce-privacy-grid input {flex:0 0 auto;margin-top:5px}
            .udce-privacy details {margin-top:10px;font-size:12px}
            .udce-privacy summary {cursor:pointer;color:#c7d9ff}

            #aster-discord-export-button {
                position: fixed;
                right: 18px;
                bottom: 90px;
                z-index: 1001;
                border: 0;
                border-radius: 999px;
                padding: 10px 14px;
                background: var(--brand-500, #5865f2);
                color: white;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 4px 18px rgba(0,0,0,.28);
                user-select: none;
            }
            #aster-discord-export-button:hover { filter: brightness(1.08); }
            #aster-discord-export-button[data-running="true"] {
                background: var(--status-warning-background, #f0b232);
                color: #111;
            }
            .aster-exp-overlay {
                font-family: var(--font-primary, system-ui, sans-serif);
                position: fixed !important;
                inset: 0 !important;
                z-index: 2147483000 !important;
                background: rgba(0, 0, 0, 0.88) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 18px !important;
                box-sizing: border-box !important;
                isolation: isolate !important;
            }
            .aster-exp-card {
                width: min(720px, calc(100vw - 36px)) !important;
                max-height: min(840px, calc(100vh - 36px)) !important;
                overflow: auto !important;
                border-radius: 14px !important;
                border: 1px solid #404249 !important;
                background: #111214 !important;
                background-color: #111214 !important;
                color: #f2f3f5 !important;
                box-shadow: 0 24px 90px rgba(0,0,0,.85) !important;
                padding: 20px !important;
                box-sizing: border-box !important;
                opacity: 1 !important;
                filter: none !important;
                backdrop-filter: none !important;
                font-family: var(--font-primary, Whitney, "Helvetica Neue", Helvetica, Arial, sans-serif) !important;
            }
            .aster-exp-card, .aster-exp-card * {
                text-shadow: none !important;
            }
            .aster-exp-title {
                color: #ffffff !important;
                font-size: 20px !important;
                font-weight: 800 !important;
                margin-bottom: 4px !important;
            }
            .aster-exp-muted { color: #b5bac1 !important; font-size: 12px !important; }
            .aster-exp-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                margin: 16px 0;
            }
            @media (max-width: 620px) {
                .aster-exp-grid { grid-template-columns: 1fr; }
            }
            .aster-exp-field label {
                display: block !important;
                color: #f2f3f5 !important;
                font-size: 12px !important;
                font-weight: 700 !important;
                margin-bottom: 5px !important;
            }
            .aster-exp-card > div > label,
            .aster-exp-card label {
                color: #f2f3f5 !important;
            }
            .aster-exp-input {
                width: 100% !important;
                box-sizing: border-box !important;
                border: 1px solid #4e5058 !important;
                background: #1e1f22 !important;
                background-color: #1e1f22 !important;
                color: #ffffff !important;
                -webkit-text-fill-color: #ffffff !important;
                caret-color: #ffffff !important;
                border-radius: 7px !important;
                padding: 9px 10px !important;
                outline: none !important;
                opacity: 1 !important;
            }
            .aster-exp-input::placeholder { color: #80848e !important; opacity: 1 !important; }
            .aster-exp-input:focus { border-color: #5865f2 !important; box-shadow: 0 0 0 1px #5865f2 !important; }
            .aster-exp-input::-webkit-calendar-picker-indicator { filter: invert(1); opacity: .9; }
            .aster-exp-path-row { display:flex !important; gap:8px !important; align-items:center !important; width:100% !important; }
            .aster-exp-path-row > .aster-exp-input { flex:1 1 auto !important; min-width:0 !important; }
            .aster-exp-path-row > button { flex:0 0 auto !important; white-space:nowrap !important; }
            .aster-exp-help {
                font-size: 11px !important;
                color: #b5bac1 !important;
                margin-top: 5px !important;
                line-height: 1.4 !important;
            }
            .aster-exp-actions {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                justify-content: flex-end;
                margin-top: 16px;
            }
            .aster-exp-primary, .aster-exp-secondary, .aster-exp-danger {
                border: 1px solid transparent !important;
                border-radius: 7px !important;
                padding: 9px 13px !important;
                font-weight: 700 !important;
                cursor: pointer !important;
                opacity: 1 !important;
            }
            .aster-exp-primary { background: #5865f2 !important; color: #ffffff !important; }
            .aster-exp-primary:hover { background: #4752c4 !important; }
            .aster-exp-secondary { background: #2b2d31 !important; color: #f2f3f5 !important; border-color: #4e5058 !important; }
            .aster-exp-secondary:hover { background: #35373c !important; }
            .aster-exp-danger { background: #da373c !important; color: #ffffff !important; }
            .aster-exp-progress {
                margin-top: 14px !important;
                border: 1px solid #35373c !important;
                border-radius: 8px !important;
                padding: 12px !important;
                background: #0b0c0e !important;
                background-color: #0b0c0e !important;
                color: #e3e5e8 !important;
                font-family: ui-monospace, SFMono-Regular, Consolas, monospace !important;
                white-space: pre-wrap !important;
                line-height: 1.45 !important;
                min-height: 60px !important;
                opacity: 1 !important;
            }
            .aster-exp-quick {
                display:flex;
                flex-wrap:wrap;
                gap:6px;
                margin-top:6px;
            }
            .aster-exp-chip {
                border:1px solid #4e5058 !important;
                border-radius:999px !important;
                padding:5px 9px !important;
                background:#2b2d31 !important;
                color:#f2f3f5 !important;
                cursor:pointer !important;
                font-size:11px !important;
                opacity:1 !important;
            }
            .aster-exp-chip:hover { background:#35373c !important; }
            .aster-exp-support {
                margin-top: 14px !important;
                padding: 10px 12px !important;
                border: 1px solid #35373c !important;
                border-radius: 8px !important;
                background: #17181b !important;
                color: #f2f3f5 !important;
            }
            .aster-exp-signature {
                font-size: 12px !important;
                font-weight: 700 !important;
                line-height: 1.45 !important;
                color: #f2f3f5 !important;
                margin-bottom: 7px !important;
            }
            .aster-exp-support-links {
                display: flex !important;
                gap: 8px !important;
                flex-wrap: wrap !important;
            }
            .aster-exp-support-link {
                display: inline-flex !important;
                align-items: center !important;
                border: 1px solid #4e5058 !important;
                border-radius: 7px !important;
                padding: 6px 9px !important;
                background: #2b2d31 !important;
                color: #ffffff !important;
                text-decoration: none !important;
                font-size: 12px !important;
                font-weight: 700 !important;
                cursor: pointer !important;
            }
            .aster-exp-support-link:hover {
                background: #35373c !important;
                border-color: #6d6f78 !important;
                color: #ffffff !important;
            }
            .aster-exp-card input[type="checkbox"] {
                accent-color: #5865f2 !important;
            }
        `);
    }

    installFloatingButton() {
        const old = document.getElementById("aster-discord-export-button");
        if (old) old.remove();

        const btn = document.createElement("button");
        btn.id = "aster-discord-export-button";
        btn.textContent = "📦 Export";
        btn.addEventListener("click", () => {
            if (this.running) {
                this.openProgressOnly();
            } else {
                this.openExportDialog();
            }
        });
        document.body.appendChild(btn);
        this.exportButton = btn;
        this.refreshButtonTitle();
    }

    refreshButtonTitle() {
        if (!this.exportButton) return;
        const ctx = this.getChannelContext();
        this.exportButton.title = ctx ? this.t("ui_069", {0:ctx.displayName}) : this.t("ui_070");
        this.exportButton.dataset.running = this.running ? "true" : "false";
        this.exportButton.textContent = this.running ? this.t("ui_071") : "📦 Export";
    }

    getChannelContext() {
        const channelId = this.stores.SelectedChannelStore?.getChannelId?.();
        if (!channelId) return null;
        const channel = this.stores.ChannelStore?.getChannel?.(channelId);
        if (!channel) return null;

        let guild = null;
        if (channel.guild_id && this.stores.GuildStore?.getGuild) {
            guild = this.stores.GuildStore.getGuild(channel.guild_id);
        }

        let displayName = channel.name || "";
        let recipients = [];

        const recipientIds = Array.isArray(channel.recipients)
            ? channel.recipients
            : (channel.recipients?.toArray?.() || []);

        if (recipientIds.length && this.stores.UserStore?.getUser) {
            recipients = recipientIds
                .map(id => this.stores.UserStore.getUser(id))
                .filter(Boolean)
                .map(u => u.globalName || u.displayName || u.username || String(u.id));
        }

        if (!displayName) {
            if (recipients.length) displayName = recipients.join(", ");
            else displayName = `DM_${channelId}`;
        }

        return {
            channelId,
            guildId: channel.guild_id || null,
            guildName: guild?.name || null,
            displayName,
            channel
        };
    }

    refreshChannelLabel() {
        const label=this.overlay?.querySelector?.('[data-role="channel-label"]');if (!label) return;
        const ctx=this.dialogContext || this.getChannelContext();label.textContent=ctx ? this.t("ui_072", {0:ctx.guildName ? ctx.guildName+' / ':'',1:ctx.displayName,2:ctx.channelId}) : this.t("ui_073");
    }

    openExportDialog() {
        if (this.running) {this.openProgressOnly();return;}
        this.removeOverlay();const ctx=this.getChannelContext();if (!ctx) {BdApi.UI.showToast(this.t("ui_074"),{type:'error'});return;}
        this.dialogContext={channelId:String(ctx.channelId),guildId:ctx.guildId,displayName:ctx.displayName,guildName:ctx.guildName};
        const overlay=document.createElement('div');overlay.className='aster-exp-overlay';
        overlay.innerHTML=`<div class="aster-exp-card"><div class="aster-exp-title">UDCE ${this.version}${this.t("ui_075")}</div><div class="aster-exp-muted" data-role="channel-label"></div>
<details open><summary>${this.t("ui_076")}</summary><div class="aster-exp-grid">
<div class="aster-exp-field"><label>${this.t("ui_077")}</label><input class="aster-exp-input" data-role="start-date" type="datetime-local" step="1"><div class="aster-exp-quick"><button class="aster-exp-chip" data-quick="24h">${this.t("ui_078")}</button><button class="aster-exp-chip" data-quick="7d">${this.t("ui_079")}</button><button class="aster-exp-chip" data-quick="30d">${this.t("ui_080")}</button><button class="aster-exp-chip" data-quick="start-midnight">00:00:00</button><button class="aster-exp-chip" data-quick="empty-start">${this.t("ui_081")}</button></div></div>
<div class="aster-exp-field"><label>${this.t("ui_082")}</label><input class="aster-exp-input" data-role="end-date" type="datetime-local" step="1"><div class="aster-exp-quick"><button class="aster-exp-chip" data-quick="now">${this.t("ui_083")}</button><button class="aster-exp-chip" data-quick="empty-end">${this.t("ui_084")}</button></div></div>
<div class="aster-exp-field"><label>${this.t("ui_085")}</label><input class="aster-exp-input" data-role="start-id" type="text"></div><div class="aster-exp-field"><label>${this.t("ui_086")}</label><input class="aster-exp-input" data-role="end-id" type="text"></div></div></details>
<details open><summary>${this.t("ui_087")}</summary><div class="aster-exp-field"><label>${this.t("ui_088")}</label><div class="aster-exp-path-row"><input class="aster-exp-input" data-role="output-dir" type="text"><button class="aster-exp-secondary" type="button" data-action="browse-output">${this.t("browseFolder")}</button></div></div>
<div class="aster-exp-field"><label>${this.t("ui_089")}</label><select class="aster-exp-input" data-role="output-mode"><option value="both">${this.t("ui_090")}</option><option value="html">${this.t("ui_091")}</option><option value="txt">${this.t("ui_092")}</option></select><div class="aster-exp-help">${this.t("ui_093")}</div></div>
<div class="aster-exp-quick"><label><input type="checkbox" data-role="attachments">${this.t("ui_094")}</label><label><input type="checkbox" data-role="embeds">${this.t("ui_095")}</label><label><input type="checkbox" data-role="reactions">${this.t("ui_096")}</label></div>
<div class="aster-exp-help">${this.t("ui_097")}</div>
<div class="aster-exp-quick"><label><input type="checkbox" data-role="videos">${this.t("ui_099")}</label><label><input type="checkbox" data-role="files">${this.t("ui_100")}</label><label><input type="checkbox" data-role="embed-images">${this.t("ui_101")}</label></div>
<div class="aster-exp-help">${this.t("ui_102")}</div></details>
<details open><summary>${this.t("ui_103")}</summary><div class="aster-exp-field"><label>${this.t("ui_104")}</label><select class="aster-exp-input" data-role="profile"><option value="custom">${this.t("currentChoices")}</option><option value="archive">${this.t("ui_105")}</option><option value="share">${this.t("ui_106")}</option></select></div>
<div data-role="privacy-editor"></div><div class="aster-exp-quick"><label><input type="checkbox" data-role="protected"> ${this.t("protectArchive")}</label></div><div class="aster-exp-help" data-role="protected-note">${this.t("protectedNote")}</div>
<div class="aster-exp-grid"><input class="aster-exp-input" data-role="password" type="password" autocomplete="new-password" placeholder="${this.t("ui_107")}"><input class="aster-exp-input" data-role="password-confirm" type="password" autocomplete="new-password" placeholder="${this.t("ui_108")}"></div>
<div class="aster-exp-help">${this.t("ui_109")}</div></details>
<details><summary>${this.t("ui_110")}</summary><div class="aster-exp-grid"><div class="aster-exp-field"><label>${this.t("ui_111")}</label><select class="aster-exp-input" data-role="preset"><option value="1000">${this.t("ui_112")}</option><option value="2000">${this.t("ui_113")}</option><option value="custom">${this.t("ui_114")}</option></select></div><div class="aster-exp-field"><label>${this.t("ui_115")}</label><input class="aster-exp-input" data-role="delay" type="number" min="500" max="10000"></div><div class="aster-exp-field"><label>${this.t("ui_116")}</label><input class="aster-exp-input" data-role="file-limit" type="number" min="1" max="16" value="16"></div><div class="aster-exp-field"><label>${this.t("ui_117")}</label><input class="aster-exp-input" data-role="total-limit" type="number" min="1" max="128" value="64"></div></div>
<label><input type="checkbox" data-role="jitter">${this.t("ui_118")}</label>
<div class="aster-exp-field"><label>${this.t("ui_119")}</label><textarea class="aster-exp-input" data-role="literals" rows="3"></textarea></div><div class="aster-exp-field"><label>${this.t("ui_120")}</label><textarea class="aster-exp-input" data-role="regex" rows="2" placeholder='[{"pattern":"example","flags":"i"}]'></textarea></div>
<div class="aster-exp-help">${this.t("ui_121")}</div></details>
<p class="aster-exp-help">${this.t("ui_122")}</p>
<div data-role="links"></div><div class="aster-exp-progress" data-role="progress">${this.t("ui_123")}</div><div class="aster-exp-actions"><button class="aster-exp-secondary" data-action="saved">${this.t("ui_124")}</button><button class="aster-exp-secondary" data-action="open-folder">${this.t("ui_125")}</button><button class="aster-exp-secondary" data-action="close">${this.t("ui_062")}</button><button class="aster-exp-primary" data-action="start">${this.t("ui_126")}</button></div></div>`;
        document.body.append(overlay);this.overlay=overlay;this.refreshChannelLabel();const q=r=>overlay.querySelector(`[data-role="${r}"]`);
        q('output-dir').value=this.settings.outputDir;q('delay').value=this.settings.pageDelayMs;q('output-mode').value=this.settings.outputMode || 'both';
        q('preset').value=[1000,2000].includes(this.settings.pageDelayMs)?String(this.settings.pageDelayMs):'custom';
        for (const [role,key] of [['attachments','includeAttachments'],['embeds','includeEmbeds'],['reactions','includeReactions'],['videos','videos'],['files','files'],['embed-images','embedImages'],['protected','protected']]) q(role).checked=!!this.settings[key];
        const privacyEditor=this.buildPrivacyEditor(udcePrivacySettings(this.settings));q('privacy-editor').append(privacyEditor);
        q('links').append(this.supportLinks());
        const updateProtection=()=>{q('output-mode').disabled=q('protected').checked;q('password').disabled=!q('protected').checked;q('password-confirm').disabled=!q('protected').checked;q('protected-note').hidden=!q('protected').checked;};
        q('protected').onchange=updateProtection;updateProtection();
        privacyEditor.addEventListener('change',()=>{q('profile').value='custom';});
        q('profile').onchange=()=>{if(q('profile').value==='custom')return;const share=q('profile').value==='share';privacyEditor.setPrivacy(udcePrivacyPreset(share?'share':'archive'));if(share){q('videos').checked=false;q('files').checked=false;q('embed-images').checked=false;}};
        q('preset').onchange=()=>{if(q('preset').value!=='custom')q('delay').value=q('preset').value;};q('delay').oninput=()=>q('preset').value='custom';
        q('output-dir').onchange=()=>{const value=q('output-dir').value.trim()||this.getDefaultOutputDir();q('output-dir').value=value;this.settings.outputDir=value;this.saveSettings();};
        overlay.querySelector('[data-action="browse-output"]').onclick=async()=>{const selected=await this.chooseOutputFolder(q('output-dir').value);if(!selected)return;q('output-dir').value=selected;this.settings.outputDir=selected;this.saveSettings();};
        overlay.querySelector('[data-action="start"]').onclick=()=>this.beginFromDialog(overlay);
        overlay.querySelector('[data-action="close"]').onclick=()=>{if(!this.running)this.removeOverlay();};
        overlay.querySelector('[data-action="open-folder"]').onclick=()=>this.openPath(q('output-dir').value.trim());
        overlay.querySelector('[data-action="saved"]').onclick=()=>this.openSavedJobs(q('output-dir').value.trim());
        for (const chip of overlay.querySelectorAll('[data-quick]')) chip.onclick=()=>{const key=chip.dataset.quick,now=new Date();const span={'24h':1,'7d':7,'30d':30}[key];if(span)q('start-date').value=this.toLocalInput(new Date(now.getTime()-span*86400000));if(key==='start-midnight'){const input=q('start-date'),base=input.value?new Date(input.value):now;const zero=new Date(base.getFullYear(),base.getMonth(),base.getDate(),0,0,0,0);input.value=this.toLocalInput(zero);}if(key==='empty-start')q('start-date').value='';if(key==='now')q('end-date').value=this.toLocalInput(now);if(key==='empty-end')q('end-date').value='';};
    }

    openProgressOnly() {
        this.removeOverlay();const overlay=document.createElement('div');overlay.className='aster-exp-overlay';
        overlay.innerHTML=`<div class="aster-exp-card"><div class="aster-exp-title">${this.t("ui_127")}</div><div class="aster-exp-progress" data-role="progress"></div><div class="aster-exp-actions"><button class="aster-exp-secondary" style="margin-inline-end:auto" data-action="open-output">${this.t("openOutputFolder")}</button><button class="aster-exp-secondary" data-action="pause">${this.t("ui_128")}</button><button class="aster-exp-danger" data-action="partial">${this.t("ui_129")}</button><button class="aster-exp-secondary" data-action="saved">${this.t("ui_124")}</button><button class="aster-exp-secondary" data-action="hide">${this.t("ui_130")}</button></div></div>`;
        document.body.append(overlay);this.overlay=overlay;
        overlay.querySelector('[data-action="open-output"]').onclick=()=>this.openOutputFolder();
        overlay.querySelector('[data-action="pause"]').onclick=()=>this.requestPause('pause');overlay.querySelector('[data-action="partial"]').onclick=()=>this.requestPause('stop');
        overlay.querySelector('[data-action="hide"]').onclick=()=>this.removeOverlay();overlay.querySelector('[data-action="saved"]').onclick=()=>{if(this.running){this.setProgress(this.t("ui_131"));return;}this.openSavedJobs(this.settings.outputDir);};this.renderCurrentProgress();
    }

    async beginFromDialog(overlay) {
        if (this.running || this._dialogBusy) return; this._dialogBusy=true;
        const q=r=>overlay.querySelector(`[data-role="${r}"]`), start=overlay.querySelector('[data-action="start"]');start.disabled=true;
        let options;
        try {
            const ctx=this.dialogContext;if(!ctx)throw udceError('CHANNEL_UNAVAILABLE');
            const startId=this.parseMessageId(q('start-id').value,ctx),endId=this.parseMessageId(q('end-id').value,ctx);
            const startMs=startId?this.snowflakeToMs(startId):q('start-date').value?new Date(q('start-date').value).getTime():null;
            const endMs=endId?this.snowflakeToMs(endId):q('end-date').value?new Date(q('end-date').value).getTime():null;
            let regexRules=[];if(q('privacy-editor').firstElementChild.privacyValue.customRegex && q('regex').value.trim()){try{regexRules=JSON.parse(q('regex').value);}catch(_){throw udceError('CUSTOM_REGEX_JSON_INVALID');}if(!Array.isArray(regexRules))throw udceError('CUSTOM_REGEX_JSON_INVALID');}
            const policy=this.getPolicy({outputMode:q('output-mode').value,includeAttachments:q('attachments').checked,includeEmbeds:q('embeds').checked,includeReactions:q('reactions').checked,
                images:false,videos:q('videos').checked,files:q('files').checked,embedImages:q('embed-images').checked,privacySchema:2,privacy:{...q('privacy-editor').firstElementChild.privacyValue},protected:q('protected').checked,
                pageDelayMs:Number(q('delay').value),maxFileMiB:Number(q('file-limit').value),maxTotalMiB:Number(q('total-limit').value),jitter:q('jitter').checked,literals:q('literals').value.split(/\r?\n/).filter(Boolean),regexRules});
            if(policy.protected && q('password').value!==q('password-confirm').value)throw udceError('PASSWORD_CONFIRM_MISMATCH');
            options={ctx:udceClone(ctx),startId,endId,startMs,endMs,outputDir:q('output-dir').value.trim(),policy,password:q('password').value};
            const job=await this.createJob(options); options.password='';q('password').value='';q('password-confirm').value='';
            Object.assign(this.settings,{outputDir:job.outputDir,outputMode:policy.outputMode,includeAttachments:policy.includeAttachments,includeEmbeds:policy.includeEmbeds,includeReactions:policy.includeReactions,images:false,videos:policy.videos,files:policy.files,embedImages:policy.embedImages,privacySchema:2,privacy:{...policy.privacy},anonymize:policy.anonymize,redact:policy.redact,protected:policy.protected,pageDelayMs:policy.pageDelayMs,maxFileMiB:Math.round(policy.maxFileBytes/1048576),maxTotalMiB:Math.round(policy.maxMediaBytes/1048576)});this.saveSettings();this.removeOverlay();this.openProgressOnly();await this.runJob(job);
        }catch(e){this.setProgress(this.t("ui_132")+this.errorText(e));}
        finally{if(options)options.password='';q('password').value='';q('password-confirm').value='';this._dialogBusy=false;start.disabled=false;}
    }

    async exportConversation(opts) {
        const job = await this.createJob(opts); opts.password = '';
        return this.runJob(job);
    }

    retryDelayMs(error, attempt = 1) {
        const seconds = [error?.retry_after, error?.body?.retry_after, error?.response?.retry_after, error?.response?.data?.retry_after, error?.response?.body?.retry_after];
        for (const raw of seconds) if (raw !== null && raw !== undefined && raw !== '') {const n = Number(raw); if (Number.isFinite(n) && n >= 0) return Math.ceil(n * 1000) + 100;}
        // retryAfter has no universal unit: intentionally not guessed.
        const headers = error?.headers || error?.response?.headers;
        let raw; try {raw = headers?.get?.('retry-after') ?? headers?.['retry-after'];} catch (_) {}
        if (raw != null) {
            const n = Number(raw); if (Number.isFinite(n) && n >= 0) return Math.ceil(n * 1000) + 100;
            const date = Date.parse(raw); if (Number.isFinite(date)) return Math.max(0, date - Date.now()) + 100;
        }
        return Math.min(30000, 1500 * 2 ** Math.max(0, Math.min(8, Number(attempt) - 1)));
    }

    dateKeyFromMessage(n) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(n?.day || '')) return n.day;
        const date=new Date(n?.timestamp);if(!Number.isFinite(date.getTime()))return 'unknown-date';
        const pad=v=>String(v).padStart(2,'0');return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
    }
    dateLabelFromKey(key) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(String(key))) return String(key);
        const [y, m, d] = key.split("-").map(Number);
        const date = new Date(y, m - 1, d);
        const jp = ["日", "月", "火", "水", "木", "金", "土"];
        return `${y}/${String(m).padStart(2,"0")}/${String(d).padStart(2,"0")} (${jp[date.getDay()]})`;
    }

    groupMessagesByDate(messages) {
        const map = new Map();
        for (const n of messages || []) {
            const key = this.dateKeyFromMessage(n);
            if (!map.has(key)) map.set(key, []);
            map.get(key).push(n);
        }
        return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    }

    formatTxtNormalized(n) {
        let s = `[${n.timestampLocal || n.timestamp}] ${n.author.globalName || n.author.username || n.author.id} [MSG:${n.id}]\n`;
        if (n.replyToMessageId) s += `↳ ReplyTo: ${n.replyToMessageId}\n`;
        s += (n.content || '') + '\n';
        for (const a of n.attachments || []) s += `[Attachment] ${a.filename} [${a.status || 'NOT_REQUESTED'}] ${a.localPath || a.url || ''}\n`;
        for (const e of n.embeds || []) s += `[Embed] ${[e.title,e.description,e.url,...(e.fields || []).map(f=>f.name+': '+f.value)].filter(Boolean).join(' | ')}\n`;
        if (n.reactions?.length) s += '[Reactions] ' + n.reactions.map(r=>`${r.emoji}×${r.count}`).join(' ') + '\n';
        return s;
    }

    makeDatedTxt(opts, messages, meta = {}) {
        const lines = ['UltimateDiscordConversationExporter ' + this.version, `Channel: ${opts.ctx?.displayName || meta.channel || 'Conversation'}`, `Conversation: ${meta.messageCoverage || 'UNVERIFIED'} / Media: ${meta.mediaCoverage || 'NOT_REQUESTED'}`, `Anonymized: ${!!meta.anonymized} / Redacted: ${!!meta.redacted}`, ''];
        for (const [day, records] of this.groupMessagesByDate(messages)) {lines.push('='.repeat(64),this.dateLabelFromKey(day),'='.repeat(64)); for (const n of records) lines.push(this.formatTxtNormalized(n));}
        return lines.join('\n');
    }

    escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    messageUrl(ctx, messageId) {
        if (!ctx?.channelId || !messageId) return "";
        const root = ctx.guildId || "@me";
        return `https://discord.com/channels/${root}/${ctx.channelId}/${messageId}`;
    }

    makeHtmlExport(opts, messages, meta = {}) {
        return udceViewerHTML({schema:1,meta:{channel:opts.ctx?.displayName || 'Conversation',channelId:opts.ctx?.channelId,...meta,version:this.version},messages});
    }

    initialBeforeId(opts) {
        if (opts.endId) {
            // Include the specified message by asking for messages before id+1 where possible.
            try { return (BigInt(opts.endId) + 1n).toString(); } catch (_) { return opts.endId; }
        }
        if (opts.endMs != null) {
            return this.msToSnowflake(opts.endMs + 1, true);
        }
        return undefined;
    }

    getCachedMessages(channelId) {
        const messages = this.stores.MessageStore?.getMessages?.(channelId);
        if (!messages) return [];
        if (typeof messages.toArray === "function") return messages.toArray();
        if (Array.isArray(messages._array)) return [...messages._array];
        if (Array.isArray(messages)) return [...messages];
        try { return Array.from(messages); } catch (_) { return []; }
    }

    messageMs(message) {
        if (!message) return NaN;
        const ts = message.timestamp;
        if (ts instanceof Date) return ts.getTime();
        if (typeof ts === "number") return ts;
        if (ts && typeof ts.toDate === "function") return ts.toDate().getTime();
        if (ts && typeof ts.valueOf === "function") {
            const v = ts.valueOf();
            if (typeof v === "number" && Number.isFinite(v)) return v;
        }
        if (typeof ts === "string") {
            const v = Date.parse(ts);
            if (Number.isFinite(v)) return v;
        }
        if (message.id) return this.snowflakeToMs(message.id);
        return NaN;
    }

    normalizeMessage(message, ms, policy = this.getPolicy()) {
        const author = message.author || {}, raw = String(message.content ?? '');
        if (raw.length > 262144) throw udceError('MESSAGE_TEXT_LIMIT');
        const attachments = policy.includeAttachments ? this.toArray(message.attachments).map(a => ({
            id: String(a?.id ?? ''), filename: this.sanitizeFileName(String(a?.filename ?? a?.name ?? 'attachment')).slice(0, 120),
            url: udceSafeURL(a?.url || a?.proxy_url || a?.proxyURL || ''),
            size: Number.isSafeInteger(Number(a?.size)) && Number(a?.size) > 0 ? Number(a.size) : null,
            contentType: String(a?.content_type ?? a?.contentType ?? ''), isEmbed: false
        })) : [];
        const embeds = policy.includeEmbeds ? this.toArray(message.embeds).map(e => {
            const image = e?.image || e?.thumbnail;
            if (policy.embedImages && image) attachments.push({id:'', filename: 'embed_image', url: udceSafeURL(image.proxyURL || image.proxy_url || image.url || ''), size: null, contentType: 'image/*', isEmbed: true});
            return {type:String(e?.type || ''), title:String(e?.title || ''), description:String(e?.description || ''), url:udceSafeURL(e?.url || ''), provider:String(e?.provider?.name || ''), author:String(e?.author?.name || ''), fields: this.toArray(e?.fields).map(f => ({name:String(f?.name || ''),value:String(f?.value || '')}))};
        }) : [];
        if (attachments.length > 100 || embeds.length > 100) throw udceError('MESSAGE_ATTACHMENT_LIMIT');
        const ref = message.messageReference || message.message_reference || {}, referenced = message.referencedMessage || message.referenced_message;
        return {
            id:String(message.id), timestamp:new Date(ms).toISOString(), timestampLocal:this.formatDate(new Date(ms)), day:this.dateKeyFromMessage({timestamp:new Date(ms).toISOString()}),
            edited:!!(message.editedTimestamp || message.edited_timestamp), editedTimestamp:this.normalizeTimestamp(message.editedTimestamp || message.edited_timestamp),
            author:{id:String(author.id || 'unknown'), username:String(author.username || ''), globalName:String(author.globalName || author.global_name || author.displayName || ''), bot:!!author.bot},
            content:raw, replyToMessageId:String(ref.message_id || ref.messageId || referenced?.id || '') || null, pinned:!!message.pinned,
            attachments, embeds, reactions:policy.includeReactions ? this.toArray(message.reactions).map(r => ({emoji:String(r?.emoji?.name || r?.emoji?.id || '?'), count:Number(r?.count) || 0})) : []
        };
    }

    formatTxtMessage(message, ms) {
        const n = this.normalizeMessage(message, ms);
        const name = n.author.globalName || n.author.username || n.author.id || "Unknown";
        let s = `[${n.timestampLocal}] ${name} [MSG:${n.id}]\n`;

        if (n.replyToMessageId) s += `↳ ReplyTo: ${n.replyToMessageId}\n`;
        if (n.content) s += `${n.content}\n`;

        if (this.settings.includeAttachments) {
            for (const a of n.attachments) {
                s += `[Attachment] ${a.filename || ""}${a.url ? ` ${a.url}` : ""}\n`;
            }
        }

        if (this.settings.includeEmbeds) {
            for (const e of n.embeds) {
                const parts = [e.title, e.description, e.url].filter(Boolean);
                if (parts.length) s += `[Embed] ${parts.join(" | ")}\n`;
            }
        }

        if (this.settings.includeReactions && n.reactions.length) {
            s += `[Reactions] ${n.reactions.map(r => `${r.emoji || "?"}×${r.count}`).join(" ")}\n`;
        }

        return s + "\n";
    }

    makeTxtHeader(opts) {
        const c = opts.ctx;
        const line = "=".repeat(70);
        return [
            line,
            "Discord Conversation Export",
            `Guild: ${c.guildName || "Direct Messages"}`,
            `Channel: ${c.displayName}`,
            `Channel ID: ${c.channelId}`,
            `Requested start: ${opts.startId || (opts.startMs == null ? "OLDEST" : this.formatDate(new Date(opts.startMs)))}`,
            `Requested end: ${opts.endId || (opts.endMs == null ? "LATEST" : this.formatDate(new Date(opts.endMs)))}`,
            `Exported: ${this.formatDate(new Date())}`,
            line,
            ""
        ].join("\n");
    }

    parseMessageId(value, ctx = null) {
        const v = String(value || '').trim(); if (!v) return null;
        if (/^\d{15,22}$/.test(v)) {if (BigInt(v) > (1n << 64n) - 1n) throw udceError('INVALID_MESSAGE_ID'); return v;}
        let u; try {u = new URL(v);} catch (_) {throw udceError('INVALID_MESSAGE_ID');}
        if (u.protocol !== 'https:' || u.username || u.password || u.port || !['discord.com', 'canary.discord.com', 'ptb.discord.com', 'discordapp.com'].includes(u.hostname)) throw udceError('INVALID_MESSAGE_URL');
        const m = u.pathname.match(/^\/channels\/(@me|\d{15,22})\/(\d{15,22})\/(\d{15,22})\/?$/);
        if (!m || (ctx && (m[2] !== String(ctx.channelId) || m[1] !== String(ctx.guildId || '@me')))) throw udceError('MESSAGE_URL_TARGET_MISMATCH');
        return this.parseMessageId(m[3]);
    }

    compareSnowflakes(a, b) {
        try {
            const A = BigInt(String(a));
            const B = BigInt(String(b));
            return A < B ? -1 : A > B ? 1 : 0;
        }
        catch (_) {
            return String(a).localeCompare(String(b));
        }
    }

    snowflakeToMs(id) {
        try {
            return Number((BigInt(String(id)) >> 22n) + 1420070400000n);
        }
        catch (_) {
            return NaN;
        }
    }

    msToSnowflake(ms, high = false) {
        const epoch = 1420070400000n;
        const t = BigInt(Math.max(1420070400000, Math.floor(ms)));
        let value = (t - epoch) << 22n;
        if (high) value += (1n << 22n) - 1n;
        return value.toString();
    }

    normalizeTimestamp(ts) {
        if (!ts) return null;
        if (ts instanceof Date) return ts.toISOString();
        if (typeof ts === "string") {
            const d = new Date(ts);
            return Number.isFinite(d.getTime()) ? d.toISOString() : ts;
        }
        if (typeof ts === "number") return new Date(ts).toISOString();
        if (typeof ts?.toDate === "function") return ts.toDate().toISOString();
        return null;
    }

    toArray(value) {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        if (typeof value.toArray === "function") return value.toArray();
        if (typeof value.values === "function") {
            try { return Array.from(value.values()); } catch (_) {}
        }
        try { return Array.from(value); } catch (_) { return []; }
    }

    renderCurrentProgress() {
        if (!this.currentExport) return;
        const p = this.currentExport;
        const reachedMs = Number.isFinite(p.currentCursorMs) ? p.currentCursorMs : p.oldestSeenMs;
        const reached = reachedMs == null ? "-" : this.formatDate(new Date(reachedMs));
        const requestedStartMs = Number.isFinite(p.requestedStartMs) ? p.requestedStartMs : null;
        const channelCreatedMs = Number.isFinite(p.channelCreatedMs) ? p.channelCreatedMs : null;
        const startAdjustedToChannel = requestedStartMs != null && channelCreatedMs != null && requestedStartMs < channelCreatedMs;
        const effectiveStartMs = requestedStartMs == null ? null : (startAdjustedToChannel ? channelCreatedMs : requestedStartMs);
        const target = effectiveStartMs != null ? this.formatDate(new Date(effectiveStartMs)) : this.t("ui_133");
        const historyStartReached = p.messageCoverage === 'COMPLETE' && p.reason === 'VERIFIED_EMPTY_RESPONSE';
        const adjustedStartLine = startAdjustedToChannel
            ? this.t("ui_134", {0:this.formatDate(new Date(requestedStartMs))})
            : "";
        const completionLine = historyStartReached ? this.t(p.scanDirection==='forward'?"forwardResponseEnd":"ui_135") : "";

        let timeProgress = "";
        if (effectiveStartMs != null && Number.isFinite(p.requestedEndMs) && Number.isFinite(reachedMs)) {
            const startDay=this.localDayNumber(effectiveStartMs),endDay=this.localDayNumber(p.requestedEndMs),reachedDay=this.localDayNumber(reachedMs);
            const complete=p.messageCoverage==='COMPLETE';
            if (Number.isFinite(startDay) && Number.isFinite(endDay) && Number.isFinite(reachedDay) && endDay >= startDay) {
                const totalDays=Math.max(1,endDay-startDay);
                let doneDays;
                if (complete) doneDays=totalDays;
                else if (p.scanDirection==='forward') doneDays=Math.max(0,Math.min(totalDays,reachedDay-startDay));
                else doneDays=Math.max(0,Math.min(totalDays,endDay-reachedDay));
                const pct=complete?100:Math.max(0,Math.min(100,doneDays/totalDays*100));
                timeProgress=`\n${this.t("ui_178")}: ${this.progressBar(pct)} ${pct.toFixed(1)}%`+this.t("ui_179",{0:doneDays.toLocaleString(),1:totalDays.toLocaleString()});
            }
        }
        const retryLine = (p.retries || 0) > 0
            ? `\nRetries: ${(p.retries || 0).toLocaleString()}${p.retryWaitMs ? ` / last wait ${Math.ceil(p.retryWaitMs/1000)}s` : ""}`
            : "";
        const errLine = p.lastError ? `\nLast error: ${String(p.lastError).slice(0, 180)}` : "";

        this.setProgress(
            `${p.status || this.t("ui_137")}\n` +
            `Channel: ${p.channel || "-"}\n` +
            this.t("ui_138", {0:reached}) +
            this.t("ui_139", {0:target}) +
            adjustedStartLine + completionLine +
            timeProgress +
            `\nMessages: ${(p.total || 0).toLocaleString()}\n` +
            `Pages: ${(p.pages || 0).toLocaleString()}` +
            retryLine + errLine +
            (p.finalPath ? `\nSaved: ${p.finalPath}` : "")
        );
    }

    progressBar(pct) {
        const width = 20;
        const filled = Math.max(0, Math.min(width, Math.round((Number(pct) || 0) / 100 * width)));
        return "█".repeat(filled) + "░".repeat(width - filled);
    }

    localDayNumber(ms) {
        const d=new Date(Number(ms));
        if (!Number.isFinite(d.getTime())) return NaN;
        return Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000);
    }

    formatSpan(ms) {
        let sec = Math.max(0, Math.floor((Number(ms) || 0) / 1000));
        const days = Math.floor(sec / 86400); sec %= 86400;
        const hours = Math.floor(sec / 3600); sec %= 3600;
        const mins = Math.floor(sec / 60);
        if (days) return this.t("ui_140", {0:days,1:hours,2:mins});
        if (hours) return this.t("ui_141", {0:hours,1:mins});
        return this.t("ui_142", {0:mins});
    }

    setProgress(text) {
        const el = this.overlay?.querySelector?.("[data-role='progress']");
        if (el) el.textContent = text;
    }

    removeOverlay() {
        if (this.overlay?.isConnected) this.overlay.remove();
        this.overlay = null;
    }

    getDefaultOutputDir() {
        const pluginFolder = String(BdApi.Plugins?.folder || "");
        if (/^[A-Za-z]:[\\/]/.test(pluginFolder)) return "C:\\Discord_Exports";
        const home = this.detectHomeDir(pluginFolder);
        if (home) return this.joinPath(home, "Downloads", "Discord_Exports");
        if (pluginFolder) return this.joinPath(this.dirnamePath(pluginFolder), "Discord_Exports");
        return "Discord_Exports";
    }

    async chooseOutputFolder(currentPath = "") {
        if (typeof BdApi.UI?.openDialog !== 'function') {BdApi.UI.showToast(this.t('folderPickerUnavailable'), {type:'warning',timeout:6000});return null;}
        const current=String(currentPath||this.settings.outputDir||this.getDefaultOutputDir()).trim();
        let defaultPath=current;
        try {
            if (!this.fs.existsSync(defaultPath)) {
                const parent=this.dirnamePath(defaultPath);
                if (parent && this.fs.existsSync(parent)) defaultPath=parent;
                else if (/^[A-Za-z]:[\\/]/.test(defaultPath)) defaultPath=defaultPath.slice(0,3);
            }
        } catch (_) {}
        try {
            const result=await BdApi.UI.openDialog({mode:'open',openDirectory:true,openFile:false,multiSelections:false,promptToCreate:true,defaultPath,title:this.t('chooseOutputFolder'),modal:true});
            if (!result || result.canceled === true || result.cancelled === true) return null;
            const selected=Array.isArray(result.filePaths)?result.filePaths[0]:result.filePath;
            if (!selected) return null;
            const path=String(selected).trim();
            if (!path || !/^(?:[A-Za-z]:[\\/]|\/|\\\\)/.test(path)) {BdApi.UI.showToast(this.t('folderPickerFailed'),{type:'error',timeout:6000});return null;}
            return path;
        } catch (_) {BdApi.UI.showToast(this.t('folderPickerFailed'),{type:'error',timeout:6000});return null;}
    }

    detectHomeDir(sourcePath) {
        const p = String(sourcePath || "");
        let m = p.match(/^([A-Za-z]:\\Users\\[^\\/]+)/i);
        if (m) return m[1];
        m = p.match(/^(\/Users\/[^\/]+)/);
        if (m) return m[1];
        m = p.match(/^(\/home\/[^\/]+)/);
        if (m) return m[1];
        return null;
    }

    joinPath(...parts) {
        const raw = parts.filter(v => v !== null && v !== undefined && String(v).length).map(String);
        if (!raw.length) return "";
        const sep = raw[0].includes("\\") ? "\\" : "/";
        let out = raw.shift().replace(/[\\/]+$/g, "");
        for (const part of raw) out += sep + part.replace(/^[\\/]+|[\\/]+$/g, "");
        return out;
    }

    basenamePath(value) {
        const p = String(value || "").replace(/[\\/]+$/g, "");
        const i = Math.max(p.lastIndexOf("/"), p.lastIndexOf("\\"));
        return i >= 0 ? p.slice(i + 1) : p;
    }

    dirnamePath(value) {
        const p = String(value || "").replace(/[\\/]+$/g, "");
        const i = Math.max(p.lastIndexOf("/"), p.lastIndexOf("\\"));
        return i > 0 ? p.slice(0, i) : p;
    }

    async openOutputFolder() {
        const target = this.currentExport?.finalPath || this.activeJob?.outputDir || this.settings.outputDir;
        if (!target || !this.fs.existsSync(target)) {BdApi.UI.showToast(this.t('folderMissing'), {type:'warning'}); return false;}
        // Discord's native reveal API is optional. It is invoked only by this explicit button.
        const manager=globalThis.DiscordNative?.fileManager;
        if (typeof manager?.showItemInFolder === 'function') {
            try {
                const first=['01_BROWSER_BY_DATE.html','00_ALL_MESSAGES_BY_DATE.txt','export_info.json','.udce_state'].find(n=>this.fs.existsSync(this.joinPath(target,n)));
                if(first){await manager.showItemInFolder(this.joinPath(target,first));return true;}
            } catch (_) { /* A path-copy fallback is reported as a fallback, never as an opened folder. */ }
        }
        try {await navigator.clipboard.writeText(String(target));BdApi.UI.showToast(this.t('folderUnavailable'),{type:'warning',timeout:6000});}
        catch (_) {BdApi.UI.showToast(this.t('folderCopyFailed',{0:target}),{type:'error',timeout:9000});}
        return false;
    }

    async openPath(target) {
        try {
            this.fs.mkdirSync(target, {recursive: true});
        } catch (e) {
            BdApi.UI.showToast(this.t("ui_143", {0:target}), {type: "error", timeout: 6000});
            return;
        }

        // Modern BetterDiscord no longer exposes Electron/child_process to plugins.
        // Copying the path is deterministic and works without unsupported Node modules.
        try {
            await navigator.clipboard.writeText(String(target));
            BdApi.UI.showToast(this.t("ui_144", {0:target}), {type: "success", timeout: 5000});
        }
        catch (_) {
            try {
                if (typeof globalThis.copy === "function") {
                    globalThis.copy(String(target));
                    BdApi.UI.showToast(this.t("ui_144", {0:target}), {type: "success", timeout: 5000});
                    return;
                }
            } catch (_) {}
            BdApi.UI.alert("Discord Exporter", this.t("ui_145", {0:target}));
        }
    }

    sanitizeFileName(s) {
        return String(s || "Discord")
            .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
            .replace(/\s+/g, " ")
            .trim()
            .replace(/[. ]+$/g, "") || "Discord";
    }

    fileStamp(d) {
        const p = n => String(n).padStart(2, "0");
        return `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
    }

    formatDate(d) {
        const p = n => String(n).padStart(2, "0");
        return `${d.getFullYear()}/${p(d.getMonth()+1)}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    }

    toLocalInput(d) {
        const p = n => String(n).padStart(2, "0");
        return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    assertJob(job, allowPause = false) {
        if (!job || job.owner !== this.generation || !this.enabled || this.activeJob !== job || job.mode === 'terminated') throw udceError('STALE_JOB');
        const account = this.stores.UserStore?.getCurrentUser?.()?.id;
        if (String(account || '') !== job.state.accountId) throw udceError('ACCOUNT_CHANGED');
        if (BdApi.Plugins?.isEnabled?.('DiscordConversationExporter') || BdApi.Plugins?.isEnabled?.('UltimateDiscordConversationExporte')) throw udceError('LEGACY_PLUGIN_ENABLED');
        if (!allowPause && (job.mode === 'pause' || job.mode === 'stop' || this.cancelRequested)) throw udceError('JOB_PAUSED');
    }

    async waitForJob(job, ms) {
        const end = Date.now() + Math.max(0, ms);
        while (Date.now() < end) {this.assertJob(job); await this.sleep(Math.min(100, end - Date.now()));}
        this.assertJob(job);
    }

    requestPause(mode = 'pause') {
        if (!this.activeJob) return;
        this.activeJob.mode = mode;
        this.setProgress(mode === 'stop' ? this.t("ui_146") : this.t("ui_147"));
    }

    async writeVerified(job, path, data) {
        this.assertJob(job, true); const b = UDCE.bytes(data), expected = await UDCE.hash(b); this.assertJob(job, true);
        this.fs.writeFileSync(path, Buffer.from(b));
        const actual = await UDCE.hash(this.fs.readFileSync(path)); this.assertJob(job, true);
        if (actual !== expected) throw udceError('WRITE_READBACK_MISMATCH'); return expected;
    }

    async encodeStateObject(job, value, label) {
        const data = UDCE.bytes(UDCE.canonical(value));
        if (data.length > 32 * 1024 * 1024) throw udceError('STATE_SIZE_LIMIT');
        if (job.crypto) return UDCE.seal(data, job.crypto, label);
        return UDCE.bytes(JSON.stringify({v: 1, label, sha256: await UDCE.hash(data), body: value}));
    }

    async decodeStateObject(job, raw, label) {
        raw = UDCE.bytes(raw); if (raw.length > 40 * 1024 * 1024) throw udceError('STATE_SIZE_LIMIT');
        if (job.crypto) return JSON.parse(UDCE.text(await UDCE.unseal(raw, job.crypto, label)));
        const envelope = JSON.parse(UDCE.text(raw));
        if (envelope.v !== 1 || envelope.label !== label || !envelope.body || envelope.sha256 !== await UDCE.hash(UDCE.canonical(envelope.body))) throw udceError('STATE_HASH_MISMATCH');
        return envelope.body;
    }

    async commitState(job, next) {
        this.assertJob(job, true);
        next = udceClone(next); next.previousGeneration = job.state.generation; next.generation = job.state.generation + 1;
        const slot = next.generation % 2, name = `state_${slot}.dat`;
        const data = await this.encodeStateObject(job, next, job.id + '/' + name); this.assertJob(job, true);
        await this.writeVerified(job, this.joinPath(job.dir, name), data); this.assertJob(job, true);
        job.state = next;
    }

    getPolicy(overrides = {}) {
        const s = {...this.settings, ...overrides};
        const explicitLegacy = !Object.hasOwn(overrides,'privacy') && (Object.hasOwn(overrides,'anonymize') || Object.hasOwn(overrides,'redact'));
        const privacy = udcePrivacySettings(explicitLegacy ? {anonymize:!!s.anonymize,redact:!!s.redact} : s);
        const policy = {privacySchema:2, privacy,
            includeAttachments: s.includeAttachments !== false, includeEmbeds: s.includeEmbeds !== false, includeReactions: s.includeReactions !== false,
            outputMode: ['txt','html','both'].includes(s.outputMode) ? s.outputMode : 'both',
            anonymize: UDCE_IDENTITY_KEYS.some(k=>privacy[k]), redact: UDCE_SECRET_KEYS.some(k=>privacy[k]), protected: !!s.protected,
            images: false, videos: !!s.videos, files: !!s.files, embedImages: !!s.embedImages,
            pageDelayMs: Math.max(500, Math.min(10000, Number(s.pageDelayMs) || 1000)), jitterMs: s.jitterMs != null ? Math.max(0, Math.min(250, Number(s.jitterMs) || 0)) : s.jitter ? 250 : 0,
            maxFetchRetries: Math.max(0, Math.min(6, Number(s.maxFetchRetries ?? 4))),
            maxFileBytes: Math.max(1024, Math.min(UDCE_LIMITS.maxFileBytes, Number(s.maxFileBytes ?? (Number(s.maxFileMiB || 16) * 1048576)))),
            maxMediaBytes: Math.max(1048576, Math.min(UDCE_LIMITS.maxMediaBytes, Number(s.maxMediaBytes ?? (Number(s.maxTotalMiB || 64) * 1048576)))),
            literals: Array.isArray(s.literals) ? s.literals.filter(Boolean).map(String) : [], regexRules: Array.isArray(s.regexRules) ? s.regexRules : []
        };
        for (const key of ['pageDelayMs','jitterMs','maxFetchRetries','maxFileBytes','maxMediaBytes']) if (!Number.isFinite(policy[key])) throw udceError('POLICY_VALUE_INVALID');
        if (policy.literals.length > 100 || policy.literals.some(x => x.length > 2048) || policy.regexRules.length > 16) throw udceError('CUSTOM_RULE_LIMIT');
        if (!policy.includeAttachments) {policy.images = false; policy.videos = false; policy.files = false;}
        if (!policy.includeEmbeds) policy.embedImages = false;
        return udceFreeze(policy);
    }

    validateRange(opts) {
        const now = Date.now(), epoch = 1420070400000;
        for (const key of ['startMs', 'endMs']) if (opts[key] != null && (!Number.isFinite(opts[key]) || opts[key] < epoch)) throw udceError('INVALID_DATE');
        for (const key of ['startId', 'endId']) if (opts[key] != null && !/^\d{15,22}$/.test(opts[key])) throw udceError('INVALID_MESSAGE_ID');
        const lower = opts.startId || (opts.startMs == null ? null : this.msToSnowflake(opts.startMs, false));
        const snapshot = BigInt(this.msToSnowflake(now + 1, false));
        const requested = opts.endId ? BigInt(opts.endId) + 1n : opts.endMs == null ? snapshot : BigInt(this.msToSnowflake(opts.endMs + 1, false));
        const upper = (requested < snapshot ? requested : snapshot).toString();
        if (lower && BigInt(lower) >= BigInt(upper)) throw udceError('RANGE_REVERSED_OR_FUTURE');
        return {lower, upper, capturedAt: now};
    }

    async createJob(opts) {
        if (this._preflightBusy) throw udceError('JOB_PREFLIGHT_BUSY');
        this._preflightBusy = true;
        try {return await this.createJobCore(opts);} finally {this._preflightBusy = false;}
    }

    async createJobCore(opts) {
        if (this.running) throw udceError('JOB_ALREADY_RUNNING');
        if (!this.enabled) throw udceError('PLUGIN_NOT_STARTED');
        for (const key of ['readFileSync','writeFileSync','readdirSync','mkdirSync','existsSync','unlinkSync']) if (typeof this.fs[key] !== 'function') throw udceError('FILESYSTEM_UNAVAILABLE');
        if (!globalThis.crypto?.subtle) throw udceError('WEBCRYPTO_UNAVAILABLE');
        const accountId = String(this.stores.UserStore?.getCurrentUser?.()?.id || '');
        if (!/^\d{15,22}$/.test(accountId) || !/^\d{15,22}$/.test(String(opts.ctx?.channelId || ''))) throw udceError('ACCOUNT_OR_CHANNEL_UNAVAILABLE');
        const policy = this.getPolicy(opts.policy || {}), range = this.validateRange(opts);
        if (udcePolicyRegex(policy).length) await udceApplyRegex([{content:'preflight'}], udcePolicyRegex(policy));
        const outputDir = String(opts.outputDir || this.settings.outputDir).trim();
        if (!outputDir || (!/^(?:[A-Za-z]:[\\/]|\/|\\\\)/.test(outputDir))) throw udceError('ABSOLUTE_OUTPUT_PATH_REQUIRED');
        const id = UDCE.hex(UDCE.random(16)), dir = this.joinPath(outputDir, '.udce_state', id);
        const channelFloor = String(opts.ctx.channelId);
        const liveForward = !opts.localOnly;
        const requestedFloor = range.lower && BigInt(range.lower) > BigInt(channelFloor) ? range.lower : channelFloor;
        const startAfterId = liveForward ? (BigInt(requestedFloor) > 0n ? BigInt(requestedFloor) - 1n : 0n).toString() : null;
        const state = {schema: 1, version: this.version, jobId: id, generation: 0, previousGeneration: null, accountId,
            ctx: {channelId: String(opts.ctx.channelId), guildId: opts.ctx.guildId ? String(opts.ctx.guildId) : null, displayName: (udcePrivacyEnabled(policy,'names') || udcePrivacyEnabled(policy,'mentions')) ? 'Channel_000001' : udceRedact(opts.ctx.displayName || 'Conversation', policy, {}), guildName: udcePrivacyEnabled(policy,'mentions') ? 'Guild_000001' : udceRedact(opts.ctx.guildName || '', policy, {})},
            policy, policyHash: await UDCE.hash(UDCE.canonical(policy)), lowerInclusive: range.lower, upperExclusive: range.upper, nextBeforeId: range.upper,
            scanDirection: liveForward ? 'forward' : 'backward', startAfterId, nextAfterId: startAfterId,
            startedAt: range.capturedAt, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'local', pages: [], aliases: {}, aliasCounters: {}, redactions: {},
            tasks: {}, taskKeys: {}, mediaBytes: 0, total: 0, textBytes: 0, retries: 0, nextRequestAt: 0, messageCoverage: 'UNVERIFIED', mediaCoverage: 'NOT_REQUESTED', outputStatus: 'PENDING', reason: 'NEW', outputs: [], localOnly: !!opts.localOnly};
        let crypto = null;
        if (policy.protected) {
            if (typeof opts.password !== 'string' || opts.password.length < 8) throw udceError('PASSWORD_MINIMUM_8');
            const config = UDCE.newConfig(); crypto = {config, key: await UDCE.derive(opts.password, config)};
        }
        // No password is attached to the job or persisted. Only a nonextractable key is retained.
        const job = {id, dir, outputDir, state, crypto, owner: this.generation, mode: 'run', seen: new Set()};
        this.activeJob = job; this.running = true; this.cancelRequested = false;
        try {
            this.assertJob(job); this.fs.mkdirSync(dir, {recursive: true});
            await this.writeVerified(job, this.joinPath(dir, 'header.json'), UDCE.canonical({schema: 1, jobId: id, protected: policy.protected, config: crypto?.config || null}));
            await this.commitState(job, state); this.refreshButtonTitle(); return job;
        } catch (e) {this.running = false; this.activeJob = null; throw e;}
    }

    async loadJob(root, id, password = '', inspectOnly = false) {
        if (inspectOnly) return this.loadJobCore(root, id, password, true);
        if (this._preflightBusy) throw udceError('JOB_PREFLIGHT_BUSY');
        this._preflightBusy = true;
        try {return await this.loadJobCore(root, id, password, false);} finally {this._preflightBusy = false;}
    }

    async loadJobCore(root, id, password, inspectOnly) {
        if (this.running && !inspectOnly) throw udceError('JOB_ALREADY_RUNNING');
        if (!/^[a-f0-9]{32}$/.test(id)) throw udceError('JOB_ID_INVALID');
        const dir = this.joinPath(root, '.udce_state', id), header = JSON.parse(String(this.fs.readFileSync(this.joinPath(dir, 'header.json'), 'utf8')));
        if (header.schema !== 1 || header.jobId !== id || typeof header.protected !== 'boolean') throw udceError('JOB_HEADER_INVALID');
        const crypto = header.protected ? {config: UDCE.config(header.config), key: await UDCE.derive(password, header.config)} : null;
        const job = {id, dir, outputDir: root, crypto, state: null, owner: this.generation, mode: 'run', seen: new Set()};
        const candidates = [], invalidSlots = [];
        for (const slot of [0,1]) {
            const name = `state_${slot}.dat`;
            if (!this.fs.existsSync(this.joinPath(dir, name))) continue;
            try {const state = await this.decodeStateObject(job, this.fs.readFileSync(this.joinPath(dir, name)), id + '/' + name); if (Number.isSafeInteger(state.generation) && state.generation > 0 && state.generation % 2 === slot) candidates.push(state); else invalidSlots.push(slot);} catch (_) {invalidSlots.push(slot);}
        }
        candidates.sort((a,b) => b.generation - a.generation);
        const accountId = String(this.stores.UserStore?.getCurrentUser?.()?.id || '');
        let found = false;
        for (const s of candidates) {
            if (s.schema !== 1 || !['0.1.8','0.1.9',this.version].includes(s.version) || s.jobId !== id || s.accountId !== accountId) continue;
            if (!s.policy || s.policy.protected !== header.protected || s.policyHash !== await UDCE.hash(UDCE.canonical(s.policy))) continue;
            try {job.state = s; await this.readCommitted(job, true); found = true; break;} catch (_) {}
        }
        if (!found) throw udceError('RESUME_IDENTITY_OR_INTEGRITY_FAILED');
        job.recoveredPrevious = !!(invalidSlots.length || (candidates.length && candidates[0].generation !== job.state.generation));
        if (!this.stores.ChannelStore?.getChannel?.(job.state.ctx.channelId)) throw udceError('SAVED_CHANNEL_UNAVAILABLE');
        if (inspectOnly) return job;
        this.activeJob = job; this.running = true; this.cancelRequested = false;
        this.assertJob(job); this.refreshButtonTitle(); return job;
    }

    async readCommitted(job, verifyAssets = false) {
        const state = job.state; if (!Array.isArray(state.pages) || state.pages.length > UDCE_LIMITS.maxPages) throw udceError('PAGE_LIST_INVALID');
        const forward = !state.localOnly && state.scanDirection === 'forward';
        const messages = [], sourceIds = [], seen = new Set(), fileNames = new Set(); let bytes = 0;
        let cursor = forward ? state.startAfterId : state.upperExclusive;
        if (forward && (!/^\d{1,22}$/.test(String(cursor || '')) || !/^\d{15,22}$/.test(String(state.upperExclusive || '')))) throw udceError('PAGE_RANGE_MISMATCH');
        for (const d of state.pages) {
            if (!/^p_[a-f0-9]{32}\.dat$/.test(d.file) || fileNames.has(d.file) || !Number.isSafeInteger(d.count)) throw udceError('PAGE_DESCRIPTOR_INVALID'); fileNames.add(d.file);
            const raw = this.fs.readFileSync(this.joinPath(job.dir, d.file)); if (await UDCE.hash(raw) !== d.sha256) throw udceError('PAGE_HASH_MISMATCH');
            const page = await this.decodeStateObject(job, raw, job.id + '/' + d.file);
            const cursorMatches = forward ? page.after === cursor : page.before === cursor;
            if (page.jobId !== job.id || page.policyHash !== state.policyHash || !cursorMatches || !Array.isArray(page.records) || page.records.length !== d.count || !Array.isArray(page.sourceIds) || page.sourceIds.length !== d.count) throw udceError('PAGE_CONTRACT_MISMATCH');
            if (page.next !== null && !state.localOnly) {
                if (forward ? BigInt(page.next) <= BigInt(cursor) : BigInt(page.next) >= BigInt(cursor)) throw udceError('CURSOR_NOT_PROGRESSING');
            }
            for (let i = 0; i < page.records.length; i++) {
                const rawId = page.sourceIds[i], n = page.records[i];
                if (seen.has(rawId) || !n || typeof n.id !== 'string' || !n.author || typeof n.content !== 'string' || !Array.isArray(n.attachments)) throw udceError('PAGE_RECORD_INVALID');
                if (!state.localOnly) {
                    if (!/^\d{15,22}$/.test(rawId)) throw udceError('PAGE_RANGE_MISMATCH');
                    if (forward) {
                        if (BigInt(rawId) <= BigInt(cursor) || BigInt(rawId) >= BigInt(state.upperExclusive) || (state.lowerInclusive && BigInt(rawId) < BigInt(state.lowerInclusive))) throw udceError('PAGE_RANGE_MISMATCH');
                    } else if (BigInt(rawId) >= BigInt(cursor) || (state.lowerInclusive && BigInt(rawId) < BigInt(state.lowerInclusive))) throw udceError('PAGE_RANGE_MISMATCH');
                }
                seen.add(rawId); sourceIds.push(rawId); messages.push(n);
            }
            bytes += UDCE.bytes(JSON.stringify(page.records)).length; cursor = page.next || cursor;
        }
        const expectedCursor = forward ? state.nextAfterId : state.nextBeforeId;
        if (messages.length !== state.total || messages.length > UDCE_LIMITS.maxMessages || bytes > UDCE_LIMITS.maxTextBytes || bytes !== state.textBytes || cursor !== expectedCursor) throw udceError('CHECKPOINT_TOTAL_MISMATCH');
        const publicIds = new Set(messages.map(n => n.id)); if (publicIds.size !== messages.length) throw udceError('PUBLIC_ID_DUPLICATE');
        if (verifyAssets) {
            for (const task of Object.values(state.tasks || {})) if (task.status === 'SAVED') await this.readAsset(job, task);
        }
        job.seen = seen;
        return {messages, sourceIds};
    }

    async commitPage(job, raw, nextCursor) {
        this.assertJob(job, true); const candidate = udceClone(job.state), records = [], ids = [], onPage = new Set();
        for (const message of raw) {
            const id = String(message.id);
            if (onPage.has(id) || job.seen.has(id)) continue; onPage.add(id);
            if (candidate.lowerInclusive && BigInt(id) < BigInt(candidate.lowerInclusive)) continue;
            const n = this.normalizeMessage(message, this.messageMs(message), candidate.policy);
            this.localizeMessage(n, candidate.timezone);
            this.registerMedia(n, candidate);
            records.push(udceTransform(n, candidate)); ids.push(id);
        }
        candidate.redactions.customRegex = (candidate.redactions.customRegex || 0) + await udceApplyRegex(records, udcePolicyRegex(candidate.policy));
        udceFinalizePrivacyLinks(records,candidate.policy);
        candidate.total += records.length; candidate.textBytes += UDCE.bytes(JSON.stringify(records)).length;
        if (candidate.total > UDCE_LIMITS.maxMessages || candidate.textBytes > UDCE_LIMITS.maxTextBytes) throw udceError('ARCHIVE_TEXT_LIMIT');
        if (candidate.pages.length >= UDCE_LIMITS.maxPages) throw udceError('PAGE_LIMIT');
        const name = 'p_' + UDCE.hex(UDCE.random(16)) + '.dat';
        const page = {jobId: job.id, policyHash: candidate.policyHash, before: candidate.nextBeforeId, next: nextCursor, records, sourceIds: ids};
        const data = await this.encodeStateObject(job, page, job.id + '/' + name);
        const sha256 = await this.writeVerified(job, this.joinPath(job.dir, name), data);
        candidate.pages.push({file: name, sha256, count: records.length}); candidate.nextBeforeId = nextCursor;
        await this.commitState(job, candidate);
        for (const id of ids) job.seen.add(id);
    }

    async commitPageForward(job, raw, nextCursor) {
        this.assertJob(job, true); const candidate = udceClone(job.state), records = [], ids = [], onPage = new Set();
        const after = String(candidate.nextAfterId);
        for (const message of raw) {
            const id = String(message.id);
            if (onPage.has(id) || job.seen.has(id)) continue; onPage.add(id);
            if (BigInt(id) <= BigInt(after)) continue;
            if (candidate.lowerInclusive && BigInt(id) < BigInt(candidate.lowerInclusive)) continue;
            if (BigInt(id) >= BigInt(candidate.upperExclusive)) continue;
            const n = this.normalizeMessage(message, this.messageMs(message), candidate.policy);
            this.localizeMessage(n, candidate.timezone);
            this.registerMedia(n, candidate);
            records.push(udceTransform(n, candidate)); ids.push(id);
        }
        if (!records.length) return false;
        candidate.redactions.customRegex = (candidate.redactions.customRegex || 0) + await udceApplyRegex(records, udcePolicyRegex(candidate.policy));
        udceFinalizePrivacyLinks(records,candidate.policy);
        candidate.total += records.length; candidate.textBytes += UDCE.bytes(JSON.stringify(records)).length;
        if (candidate.total > UDCE_LIMITS.maxMessages || candidate.textBytes > UDCE_LIMITS.maxTextBytes) throw udceError('ARCHIVE_TEXT_LIMIT');
        if (candidate.pages.length >= UDCE_LIMITS.maxPages) throw udceError('PAGE_LIMIT');
        const name = 'p_' + UDCE.hex(UDCE.random(16)) + '.dat';
        const page = {jobId: job.id, policyHash: candidate.policyHash, direction:'forward', after, next:nextCursor, records, sourceIds:ids};
        const data = await this.encodeStateObject(job, page, job.id + '/' + name);
        const sha256 = await this.writeVerified(job, this.joinPath(job.dir, name), data);
        candidate.pages.push({file:name,sha256,count:records.length}); candidate.nextAfterId = nextCursor;
        await this.commitState(job, candidate);
        for (const id of ids) job.seen.add(id);
        return true;
    }

    async rateRequest(job, operation) {
        let attempt = 0;
        for (;;) {
            this.assertJob(job);
            await this.waitForJob(job, Math.max(0, job.state.nextRequestAt - Date.now())); this.assertJob(job);
            const slotKey = Symbol.for('UDCE.network.inflight');
            if (globalThis[slotKey]) throw udceError('PREVIOUS_REQUEST_STILL_RUNNING');
            const candidate = udceClone(job.state);
            const jitter = candidate.policy.jitterMs ? UDCE.random(1)[0] / 255 * candidate.policy.jitterMs : 0;
            candidate.nextRequestAt = Date.now() + candidate.policy.pageDelayMs + Math.ceil(jitter);
            await this.commitState(job, candidate); this.assertJob(job);
            let promise;
            // A timed-out user task must not release a still-running network request.
            try {promise = Promise.resolve().then(() => {this.assertJob(job); return operation();});}
            catch (e) {throw e;}
            globalThis[slotKey] = promise;
            promise.then(() => {if (globalThis[slotKey] === promise) delete globalThis[slotKey];}, () => {if (globalThis[slotKey] === promise) delete globalThis[slotKey];});
            let timer;
            try {
                const response = await Promise.race([promise, new Promise((_, reject) => {timer = setTimeout(() => reject(udceError('REQUEST_TIMEOUT_UNVERIFIED')), 45000);})]);
                clearTimeout(timer); this.assertJob(job, true); return response;
            } catch (e) {
                clearTimeout(timer); this.assertJob(job, true);
                const status = Number(e?.status ?? e?.statusCode ?? e?.response?.status);
                if (status === 401 || status === 403) throw udceError(status === 401 ? 'AUTHORIZATION_STOP' : 'PERMISSION_STOP');
                if (e?.code && !['HTTP_RETRY', 'NETWORK_ERROR'].includes(e.code)) throw e;
                const next = udceClone(job.state), wait = this.retryDelayMs(e, attempt + 1);
                if (!Number.isSafeInteger(wait) || wait > Number.MAX_SAFE_INTEGER - Date.now()) throw udceError('RETRY_TIME_INVALID');
                next.nextRequestAt = Math.max(next.nextRequestAt, Date.now() + wait); next.retries++;
                await this.commitState(job, next); this.assertJob(job);
                if (attempt++ >= job.state.policy.maxFetchRetries) throw udceError('RETRY_LIMIT_PAUSED');
                this.reportJob(job, this.t("ui_148", {0:Math.ceil(wait / 1000),1:attempt}));
            }
        }
    }

    extractResponsePage(response) {
        if (Array.isArray(response)) return response;
        for (const candidate of [response?.body, response?.messages, response?.body?.messages, response?.data, response?.data?.messages]) if (Array.isArray(candidate)) return candidate;
        return null;
    }

    async readHistoryPage(job) {
        const before = job.state.nextBeforeId, channelId = job.state.ctx.channelId;
        return this.rateRequest(job, async () => {
            this.assertJob(job); let eventPage = null, eventFailure = null;
            const dispatcher = this.Dispatcher;
            const eventChannelMatches = e => String(e?.channelId ?? e?.channel_id ?? '') === channelId;
            const eventBefore = e => e?.before ?? e?.beforeId ?? e?.request?.before;
            const receiptMatches = e => {
                if (!eventChannelMatches(e)) return false;
                const cursor = eventBefore(e);
                if (cursor != null && String(cursor) !== '') return String(cursor) === before;
                // Current Discord LOAD_MESSAGES_SUCCESS payloads may omit the requested `before`.
                // In that case keep the original fetch path, but verify that this is a backward load
                // and that every returned record belongs to the requested channel and is older than
                // our active cursor. This avoids accepting an unrelated current-page load.
                if (e?.isBefore === false || e?.isAfter === true) return false;
                const candidate = this.extractResponsePage(e);
                if (!Array.isArray(candidate)) return false;
                if (!candidate.length) return e?.isBefore === true || e?.hasMoreBefore === false;
                return candidate.every(message => {
                    const id = String(message?.id || ''), channel = String(message?.channel_id ?? message?.channelId ?? '');
                    return /^\d{15,22}$/.test(id) && channel === channelId && BigInt(id) < BigInt(before) && Number.isFinite(this.messageMs(message));
                });
            };
            const failureMatches = e => {
                if (!eventChannelMatches(e)) return false;
                const cursor = eventBefore(e);
                if (cursor != null && String(cursor) !== '') return String(cursor) === before;
                return e?.isBefore !== false && e?.isAfter !== true;
            };
            const receive = e => {if (receiptMatches(e)) eventPage = this.extractResponsePage(e);};
            const failed = e => {if (failureMatches(e)) eventFailure = udceError('HISTORY_RECEIVE_FAILED');};
            if (dispatcher?.subscribe && dispatcher?.unsubscribe) {dispatcher.subscribe('LOAD_MESSAGES_SUCCESS', receive); dispatcher.subscribe('LOAD_MESSAGES_FAILURE', failed);}
            try {
                const response = await this.MessageActions.fetchMessages({channelId, limit: 100, before});
                this.assertJob(job, true);
                const status = Number(response?.status);
                if (status >= 400) {const e = udceError('HTTP_RETRY'); e.status = status; e.body = response.body; e.headers = response.headers; throw e;}
                let page = this.extractResponsePage(response);
                if (response && !Array.isArray(response)) {
                    const responseChannel = response.channelId ?? response.channel_id; const responseBefore = response.before ?? response.beforeId;
                    if ((responseChannel != null && String(responseChannel) !== channelId) || (responseBefore != null && String(responseBefore) !== before)) throw udceError('HISTORY_RESPONSE_MISMATCH');
                }
                if (page === null) {
                    // Accept only a verified receipt for this channel/request. Current Discord may omit
                    // the requested cursor from LOAD_MESSAGES_SUCCESS, so cursor-less receipts are checked
                    // by backward-load metadata and message range. Never infer completion from MessageStore cache.
                    if (!dispatcher?.subscribe || !dispatcher?.unsubscribe) throw udceError('HISTORY_RECEIPT_UNVERIFIED');
                    const deadline = Date.now() + 5000;
                    while (page === null && Date.now() < deadline) {this.assertJob(job); if (eventFailure) throw eventFailure; page = eventPage; if (page === null) await this.sleep(50);}
                }
                if (page === null) throw udceError('HISTORY_RECEIPT_UNVERIFIED');
                if (page.length > 1000) throw udceError('HISTORY_PAGE_TOO_LARGE');
                for (const message of page) {
                    const id = String(message?.id || ''), channel = String(message?.channel_id ?? message?.channelId ?? '');
                    if (!/^\d{15,22}$/.test(id) || channel !== channelId || BigInt(id) >= BigInt(before) || !Number.isFinite(this.messageMs(message))) throw udceError('HISTORY_RECORD_MISMATCH');
                }
                return [...page].sort((a,b) => this.compareSnowflakes(b.id, a.id));
            } finally {
                if (dispatcher?.unsubscribe) {try {dispatcher.unsubscribe('LOAD_MESSAGES_SUCCESS', receive); dispatcher.unsubscribe('LOAD_MESSAGES_FAILURE', failed);} catch (_) {}}
            }
        });
    }

    async readHistoryPageForward(job) {
        const after = String(job.state.nextAfterId), channelId = job.state.ctx.channelId;
        return this.rateRequest(job, async () => {
            this.assertJob(job); let eventPage = null, eventFailure = null;
            const dispatcher = this.Dispatcher;
            const eventChannelMatches = e => String(e?.channelId ?? e?.channel_id ?? '') === channelId;
            const eventAfter = e => e?.after ?? e?.afterId ?? e?.request?.after;
            const receiptMatches = e => {
                if (!eventChannelMatches(e)) return false;
                const cursor = eventAfter(e);
                if (cursor != null && String(cursor) !== '') return String(cursor) === after;
                if (e?.isAfter === false || e?.isBefore === true) return false;
                const candidate = this.extractResponsePage(e);
                if (!Array.isArray(candidate)) return false;
                if (!candidate.length) return e?.isAfter === true || e?.hasMoreAfter === false;
                return candidate.every(message => {
                    const id = String(message?.id || ''), channel = String(message?.channel_id ?? message?.channelId ?? '');
                    return /^\d{15,22}$/.test(id) && channel === channelId && BigInt(id) > BigInt(after) && Number.isFinite(this.messageMs(message));
                });
            };
            const failureMatches = e => {
                if (!eventChannelMatches(e)) return false;
                const cursor = eventAfter(e);
                if (cursor != null && String(cursor) !== '') return String(cursor) === after;
                return e?.isAfter !== false && e?.isBefore !== true;
            };
            const receive = e => {if (receiptMatches(e)) eventPage = this.extractResponsePage(e);};
            const failed = e => {if (failureMatches(e)) eventFailure = udceError('HISTORY_RECEIVE_FAILED');};
            if (dispatcher?.subscribe && dispatcher?.unsubscribe) {dispatcher.subscribe('LOAD_MESSAGES_SUCCESS', receive); dispatcher.subscribe('LOAD_MESSAGES_FAILURE', failed);}
            try {
                const response = await this.MessageActions.fetchMessages({channelId, limit:100, after});
                this.assertJob(job, true);
                const status = Number(response?.status);
                if (status >= 400) {const e = udceError('HTTP_RETRY'); e.status=status; e.body=response.body; e.headers=response.headers; throw e;}
                let page = this.extractResponsePage(response);
                if (response && !Array.isArray(response) && typeof response === 'object') {
                    const responseChannel = response.channelId ?? response.channel_id, responseAfter = response.after ?? response.afterId;
                    if ((responseChannel != null && String(responseChannel) !== channelId) || (responseAfter != null && String(responseAfter) !== after)) throw udceError('HISTORY_RESPONSE_MISMATCH');
                }
                if (page === null) {
                    if (!dispatcher?.subscribe || !dispatcher?.unsubscribe) throw udceError('HISTORY_RECEIPT_UNVERIFIED');
                    const deadline = Date.now() + 5000;
                    while (page === null && Date.now() < deadline) {this.assertJob(job); if (eventFailure) throw eventFailure; page=eventPage; if(page===null) await this.sleep(50);}
                }
                if (page === null) throw udceError('HISTORY_RECEIPT_UNVERIFIED');
                if (page.length > 1000) throw udceError('HISTORY_PAGE_TOO_LARGE');
                for (const message of page) {
                    const id=String(message?.id||''), channel=String(message?.channel_id ?? message?.channelId ?? '');
                    if (!/^\d{15,22}$/.test(id) || channel !== channelId || BigInt(id) <= BigInt(after) || !Number.isFinite(this.messageMs(message))) throw udceError('HISTORY_RECORD_MISMATCH');
                }
                return [...page].sort((a,b)=>this.compareSnowflakes(a.id,b.id));
            } finally {
                if (dispatcher?.unsubscribe) {try {dispatcher.unsubscribe('LOAD_MESSAGES_SUCCESS',receive);dispatcher.unsubscribe('LOAD_MESSAGES_FAILURE',failed);} catch (_) {}}
            }
        });
    }

    async runJob(job, mode = 'resume', password = '') {
        try {
            this.assertJob(job);
            if (mode === 'media') {await this.processMedia(job, true); return await this.finalizeJob(job);}
            if (mode === 'partial') {return await this.finalizeJob(job);}
            if (job.state.localOnly) {if (!job.state.localCopyComplete) await this.continueLocalCopy(job, password); return await this.finalizeJob(job);}
            if (job.state.messageCoverage === 'COMPLETE') return await this.finalizeJob(job);
            await this.processMedia(job, false);
            if (job.state.scanDirection === 'forward') {
                while (true) {
                    this.assertJob(job); this.reportJob(job, this.t("ui_149"));
                    const page = await this.readHistoryPageForward(job);
                    this.assertJob(job);
                    if (!page.length) {const next=udceClone(job.state);next.messageCoverage='COMPLETE';next.reason='VERIFIED_EMPTY_RESPONSE';await this.commitState(job,next);break;}
                    const upper = BigInt(job.state.upperExclusive);
                    const inRange = page.filter(m => BigInt(String(m.id)) < upper);
                    const crossedUpper = page.some(m => BigInt(String(m.id)) >= upper);
                    if (inRange.length) {
                        const nextCursor=String(inRange[inRange.length-1].id);
                        if (BigInt(nextCursor) <= BigInt(job.state.nextAfterId)) throw udceError('CURSOR_NOT_PROGRESSING');
                        await this.commitPageForward(job,inRange,nextCursor);
                    }
                    await this.processMedia(job,false);
                    if (crossedUpper) {const next=udceClone(job.state);next.messageCoverage='COMPLETE';next.reason='REQUESTED_BOUND_REACHED';await this.commitState(job,next);break;}
                    if (!inRange.length) throw udceError('CURSOR_NOT_PROGRESSING');
                }
            } else {
                // Existing backward-scan jobs keep their original cursor contract.
                while (true) {
                    this.assertJob(job); this.reportJob(job, this.t("ui_149"));
                    const page = await this.readHistoryPage(job);
                    this.assertJob(job);
                    if (!page.length) {const next=udceClone(job.state);next.messageCoverage='COMPLETE';next.reason='VERIFIED_EMPTY_RESPONSE';await this.commitState(job,next);break;}
                    const nextCursor=String(page[page.length-1].id);
                    if (BigInt(nextCursor) >= BigInt(job.state.nextBeforeId)) throw udceError('CURSOR_NOT_PROGRESSING');
                    await this.commitPage(job,page,nextCursor);
                    const reached=job.state.lowerInclusive && BigInt(nextCursor) <= BigInt(job.state.lowerInclusive);
                    if (reached) {const next=udceClone(job.state);next.messageCoverage='COMPLETE';next.reason='REQUESTED_BOUND_REACHED';await this.commitState(job,next);}
                    await this.processMedia(job,false);
                    if (reached) break;
                }
            }
            return await this.finalizeJob(job);
        } catch (e) {
            const code = udceCode(e);
            if (code === 'STALE_JOB' || !this.enabled || this.activeJob !== job) return {partial: true, reason: 'PLUGIN_STOPPED', jobId: job.id};
            if (code === 'ACCOUNT_CHANGED') {this.reportJob(job, this.t("ui_150")); return {partial:true, reason:code, jobId:job.id};}
            try {
                const state = udceClone(job.state); state.reason = code; if (state.messageCoverage !== 'COMPLETE') state.messageCoverage = code === 'HISTORY_RECEIPT_UNVERIFIED' ? 'UNVERIFIED' : 'PARTIAL';
                await this.commitState(job, state);
                if (job.mode === 'stop') return await this.finalizeJob(job);
            } catch (_) { /* Preserve both generations and all chunks on storage failure. */ }
            this.reportJob(job, this.t("ui_151", {0:code,1:job.state.total}));
            return {partial:true, reason:code, jobId:job.id, messages:job.state.total};
        } finally {
            if (this.activeJob === job) {this.running = false; this.activeJob = null; job.crypto = null; job.abort?.abort(); this.refreshButtonTitle();}
        }
    }

    reportJob(job, status) {
        const forward = job.state.scanDirection === 'forward';
        this.currentExport = {total: job.state.total, pages: job.state.pages.length, channel: job.state.ctx.displayName, status, scanDirection:job.state.scanDirection || 'backward',
            requestedStartMs: job.state.lowerInclusive ? this.snowflakeToMs(job.state.lowerInclusive) : null,
            requestedEndMs: this.snowflakeToMs(job.state.upperExclusive), currentCursorMs: this.snowflakeToMs(forward ? job.state.nextAfterId : job.state.nextBeforeId), retries: job.state.retries,
            channelCreatedMs: this.snowflakeToMs(job.state.ctx.channelId), messageCoverage: job.state.messageCoverage, reason: job.state.reason,
            finalPath: job.state.outputs.at(-1)?.path || null};
        this.renderCurrentProgress();
    }

    mediaKind(mime, filename) {
        const m = String(mime).toLowerCase().split(';')[0], ext = String(filename).toLowerCase().split('.').pop();
        if (/^image\/(png|jpeg|gif|webp|avif|\*)$/.test(m) || ['png','jpg','jpeg','gif','webp','avif'].includes(ext)) return 'image';
        if (/^video\/(mp4|webm|ogg)$/.test(m) || ['mp4','webm','ogv'].includes(ext)) return 'video';
        if (/^audio\//.test(m) || ['mp3','ogg','wav','m4a','flac'].includes(ext)) return 'audio';
        return 'file';
    }

    registerMedia(n, state) {
        for (const a of n.attachments) {
            const url = udceSafeURL(a.url, true), kind = this.mediaKind(a.contentType, a.filename);
            const enabled = a.isEmbed ? state.policy.embedImages : kind === 'image' ? state.policy.images : (kind === 'video' || kind === 'audio') ? state.policy.videos : state.policy.files;
            let identity = 'invalid:' + String(a.id || a.url || a.filename);
            if (url) {const u = new URL(url); identity = /^\d{15,22}$/.test(a.id) ? 'attachment:' + a.id : 'url:' + u.hostname + u.pathname;}
            let assetId = state.taskKeys[identity];
            if (!assetId) {
                state.aliasCounters.Asset = (state.aliasCounters.Asset || 0) + 1; assetId = 'Asset_' + String(state.aliasCounters.Asset).padStart(6, '0'); state.taskKeys[identity] = assetId;
                state.tasks[assetId] = {assetId, url, size:a.size, declaredMime:a.contentType, kind, status:!enabled ? 'NOT_REQUESTED' : !url ? 'EXTERNAL_OR_UNSUPPORTED_URL' : 'PENDING', requested:enabled};
            } else if (url && state.tasks[assetId].status !== 'SAVED') state.tasks[assetId].url = url;
            a.assetId = assetId; a.kind = kind; a.status = state.tasks[assetId].status; a.safeExt = '.bin'; a.mime = a.contentType || 'application/octet-stream';
            delete a.contentType; delete a.isEmbed;
        }
    }

    sniffMedia(data) {
        const b = UDCE.bytes(data), prefix = String.fromCharCode(...b.slice(0, 16));
        if (b.length >= 8 && UDCE.hex(b.slice(0,8)) === '89504e470d0a1a0a') return {kind:'image', mime:'image/png', safeExt:'.png'};
        if (b.length >= 3 && b[0] === 255 && b[1] === 216 && b[2] === 255) return {kind:'image', mime:'image/jpeg', safeExt:'.jpg'};
        if (/^GIF8[79]a/.test(prefix)) return {kind:'image', mime:'image/gif', safeExt:'.gif'};
        if (prefix.startsWith('RIFF') && prefix.slice(8,12) === 'WEBP') return {kind:'image', mime:'image/webp', safeExt:'.webp'};
        if (prefix.slice(4,8) === 'ftyp') {
            if (['avif','avis'].includes(prefix.slice(8,12))) return {kind:'image',mime:'image/avif',safeExt:'.avif'};
            return {kind:'video',mime:'video/mp4',safeExt:'.mp4'};
        }
        if (b.length >= 4 && UDCE.hex(b.slice(0,4)) === '1a45dfa3') return {kind:'video',mime:'video/webm',safeExt:'.webm'};
        if (prefix.startsWith('OggS')) return {kind:'audio',mime:'audio/ogg',safeExt:'.ogg'};
        if (prefix.startsWith('RIFF') && prefix.slice(8,12) === 'WAVE') return {kind:'audio',mime:'audio/wav',safeExt:'.wav'};
        if (prefix.startsWith('ID3') || (b.length >= 2 && b[0] === 255 && (b[1] & 0xe0) === 0xe0)) return {kind:'audio',mime:'audio/mpeg',safeExt:'.mp3'};
        return {kind:'file',mime:'application/octet-stream',safeExt:'.bin'};
    }

    async cdnRequest(job, url, method = 'GET', expectedSize = null) {
        url = udceSafeURL(url, true); if (!url) throw udceError('MEDIA_URL_REJECTED');
        if (typeof BdApi.Net?.fetch !== 'function') throw udceError('MEDIA_TRANSPORT_UNAVAILABLE');
        return this.rateRequest(job, async () => {
            this.assertJob(job); const controller = new AbortController(); job.abort = controller;
            try {
                const headers = {}; if (method === 'GET' && expectedSize) headers.Range = `bytes=0-${expectedSize - 1}`;
                const response = await BdApi.Net.fetch(url, {method, headers, redirect:'error', maxRedirects:0, rejectUnauthorized:true, timeout:20000, signal:controller.signal});
                this.assertJob(job, true);
                if (response.redirected || (response.url && udceSafeURL(response.url, true) !== url)) throw udceError('MEDIA_REDIRECT_REJECTED');
                const status = Number(response.status);
                if (status === 403 || status === 404 || status === 410) throw udceError('MEDIA_EXPIRED_OR_UNAVAILABLE');
                if (status === 429 || status >= 500) {
                    const e = udceError('HTTP_RETRY'); e.status = status; e.headers = response.headers;
                    try {const body = await response.json(); if (Number.isFinite(Number(body?.retry_after))) e.body = {retry_after:body.retry_after};} catch (_) {}
                    throw e;
                }
                if (status !== 200 && status !== 206) throw udceError('MEDIA_HTTP_REJECTED');
                const rawLength = response.headers?.get?.('content-length'), length = rawLength == null ? null : Number(rawLength);
                if (method === 'HEAD') {
                    if (!Number.isSafeInteger(length) || length <= 0) throw udceError('MEDIA_SIZE_UNKNOWN'); return {size:length};
                }
                if (!Number.isSafeInteger(expectedSize) || expectedSize < 1 || expectedSize > job.state.policy.maxFileBytes || (Number.isFinite(length) && length !== expectedSize)) throw udceError('MEDIA_LENGTH_MISMATCH');
                if (status === 206) {
                    const range = response.headers?.get?.('content-range');
                    if (range !== `bytes 0-${expectedSize - 1}/${expectedSize}`) throw udceError('MEDIA_RANGE_MISMATCH');
                }
                // BdApi.Net hydrates responses; unknown/unbounded content is never requested.
                const data = new Uint8Array(await response.arrayBuffer());
                if (data.length !== expectedSize || data.length > job.state.policy.maxFileBytes || !data.length) throw udceError('MEDIA_LENGTH_MISMATCH');
                return data;
            } finally {if (job.abort === controller) job.abort = null;}
        });
    }

    async saveAsset(job, assetId, data) {
        this.assertJob(job, true); const candidate = udceClone(job.state), task = candidate.tasks[assetId], sha256 = await UDCE.hash(data), actual = this.sniffMedia(data);
        if (task.kind === 'image' && actual.kind !== 'image') throw udceError('MEDIA_TYPE_MISMATCH');
        if ((task.kind === 'video' || task.kind === 'audio') && !['video','audio'].includes(actual.kind)) throw udceError('MEDIA_TYPE_MISMATCH');
        const duplicate = Object.values(candidate.tasks).find(t => t.status === 'SAVED' && t.sha256 === sha256);
        if (!duplicate && candidate.mediaBytes + data.length > candidate.policy.maxMediaBytes) throw udceError('MEDIA_TOTAL_LIMIT');
        let storageFile, storageSHA;
        if (duplicate) {await this.readAsset(job, duplicate); storageFile = duplicate.storageFile; storageSHA = duplicate.storageSHA;}
        else {
            storageFile = 'm_' + UDCE.hex(UDCE.random(16)) + '.dat';
            const stored = job.crypto ? await UDCE.seal(data, job.crypto, job.id + '/' + storageFile) : data;
            storageSHA = await this.writeVerified(job, this.joinPath(job.dir, storageFile), stored); candidate.mediaBytes += data.length;
        }
        Object.assign(task, actual, {status:'SAVED', sizeActual:data.length, sha256, storageFile, storageSHA, localPath:`media/${sha256}${actual.safeExt}`});
        await this.commitState(job, candidate);
    }

    async readAsset(job, task) {
        if (!/^m_[a-f0-9]{32}\.dat$/.test(task.storageFile) || !/^media\/[a-f0-9]{64}\.[a-z0-9]+$/.test(task.localPath)) throw udceError('MEDIA_PATH_INVALID');
        const stored = this.fs.readFileSync(this.joinPath(job.dir, task.storageFile));
        if (await UDCE.hash(stored) !== task.storageSHA) throw udceError('MEDIA_STORAGE_HASH_MISMATCH');
        const data = job.crypto ? await UDCE.unseal(stored, job.crypto, job.id + '/' + task.storageFile) : UDCE.bytes(stored);
        if (data.length !== task.sizeActual || await UDCE.hash(data) !== task.sha256) throw udceError('MEDIA_CONTENT_HASH_MISMATCH');
        return data;
    }

    async processMedia(job, retryFailed = false) {
        const selected = Object.keys(job.state.tasks).filter(id => job.state.tasks[id].status === 'PENDING' || (retryFailed && job.state.tasks[id].requested && !['SAVED','NOT_REQUESTED','EXTERNAL_OR_UNSUPPORTED_URL'].includes(job.state.tasks[id].status)));
        for (const id of selected) {
            this.assertJob(job); const task = job.state.tasks[id]; this.reportJob(job, this.t("ui_152", {0:id}));
            try {
                let size = task.size;
                if (!Number.isSafeInteger(size) || size <= 0) size = (await this.cdnRequest(job, task.url, 'HEAD')).size;
                if (size > job.state.policy.maxFileBytes) throw udceError('MEDIA_FILE_LIMIT');
                if (job.state.mediaBytes + size > job.state.policy.maxMediaBytes) throw udceError('MEDIA_TOTAL_LIMIT');
                const bytes = await this.cdnRequest(job, task.url, 'GET', size); this.assertJob(job); await this.saveAsset(job, id, bytes);
            } catch (e) {
                const code = udceCode(e);
                if (['STALE_JOB','ACCOUNT_CHANGED','JOB_PAUSED'].includes(code)) throw e;
                const next = udceClone(job.state); next.tasks[id].status = code; await this.commitState(job, next);
                if (['RETRY_LIMIT_PAUSED','REQUEST_TIMEOUT_UNVERIFIED','PREVIOUS_REQUEST_STILL_RUNNING','MEDIA_TRANSPORT_UNAVAILABLE'].includes(code)) throw e;
            }
        }
        const next = udceClone(job.state), requested = Object.values(next.tasks).filter(t => t.requested);
        next.mediaCoverage = !requested.length ? 'NOT_REQUESTED' : requested.every(t => t.status === 'SAVED') ? 'COMPLETE' : 'PARTIAL';
        await this.commitState(job, next);
    }

    async collectData(job, verifyAssets = true) {
        const {messages, sourceIds} = await this.readCommitted(job, verifyAssets);
        const pairs = messages.map((message, i) => ({message, sourceId:sourceIds[i]}));
        pairs.sort((a,b) => Date.parse(a.message.timestamp) - Date.parse(b.message.timestamp) || this.compareSnowflakes(a.sourceId,b.sourceId));
        for (const {message:n} of pairs) for (const a of n.attachments) {
            const task = job.state.tasks[a.assetId]; if (!task) throw udceError('MEDIA_TASK_MISSING');
            a.status = task.status;
            if (task.status === 'SAVED') Object.assign(a, {localPath:task.localPath, sha256:task.sha256, mime:task.mime, kind:task.kind, safeExt:task.safeExt, size:task.sizeActual});
            if (job.state.policy.privacySchema !== 2 && job.state.policy.anonymize) a.url = '';
            if (udcePrivacyEnabled(job.state.policy,'attachmentNames')) a.filename = a.assetId + (task.safeExt || '.bin');
        }
        const s = job.state, requested = Object.values(s.tasks).filter(t => t.requested);
        const meta = {exporter:this.name, version:this.version, channel:s.ctx.displayName, channelId:udcePrivacyEnabled(s.policy,'mentions') ? null : s.ctx.channelId, guildId:udcePrivacyEnabled(s.policy,'mentions') ? null : s.ctx.guildId,
            anonymized:udceHasIdentity(s.policy), redacted:udceHasRedaction(s.policy), privacySchema:s.policy.privacySchema===2?2:1, privacy:s.policy.privacySchema===2 ? udceClone(s.policy.privacy) : null, sourceLinksAllowed:!['urls','messageIds','mentions'].some(k=>udcePrivacyEnabled(s.policy,k)), protected:s.policy.protected, timezone:s.timezone,
            messageCoverage:s.messageCoverage, mediaCoverage:requested.length ? (requested.every(t=>t.status === 'SAVED') ? 'COMPLETE' : 'PARTIAL') : 'NOT_REQUESTED',
            reason:s.reason, messages:s.total, pages:s.pages.length, retries:s.retries, redactions:udceClone(s.redactions), capturedAt:new Date(s.startedAt).toISOString()};
        return {schema:1, meta, messages:pairs.map(p=>p.message)};
    }

    async finalizeJob(job) {
        this.assertJob(job, true); this.reportJob(job, this.t("ui_153"));
        const data = await this.collectData(job); this.assertJob(job, true);
        const json = UDCE.bytes(JSON.stringify(data)); if (json.length > 32 * 1024 * 1024) throw udceError('ARCHIVE_TEXT_LIMIT');
        const safeChannel = job.state.policy.protected ? 'UDCE_Archive' : this.sanitizeFileName(job.state.ctx.displayName).slice(0,60);
        const base = `${safeChannel}_${this.fileStamp(new Date())}_${job.id.slice(0,8)}_${UDCE.hex(UDCE.random(4))}`;
        const workDir = this.joinPath(job.outputDir, base + '_files'); this.fs.mkdirSync(workDir, {recursive:true});
        const entries = [], files = [];
        if (job.crypto) {
            const records = [{name:'messages.json',mime:'application/json',data:json}], names = new Set();
            for (const t of Object.values(job.state.tasks)) if (t.status === 'SAVED' && !names.has(t.localPath)) {names.add(t.localPath); records.push({name:t.localPath,mime:t.mime,data:await this.readAsset(job,t)});}
            const protectedBytes = await UDCE.archive(records, job.crypto);
            const reopened = await UDCE.openArchive(protectedBytes, null, job.crypto.key); await reopened.verify();
            entries.push({name:'02_ARCHIVE.udce',data:protectedBytes}, {name:'01_BROWSER_BY_DATE.html',data:UDCE.bytes(udceViewerHTML(null,true,this.uiLocale()))});
        } else {
            const outputMode = ['txt','html','both'].includes(job.state.policy.outputMode) ? job.state.policy.outputMode : 'both';
            if (outputMode === 'txt' || outputMode === 'both') entries.push({name:'00_ALL_MESSAGES_BY_DATE.txt',data:UDCE.bytes(this.makeDatedTxt({ctx:job.state.ctx},data.messages,data.meta))});
            if (outputMode === 'html' || outputMode === 'both') entries.push({name:'01_BROWSER_BY_DATE.html',data:UDCE.bytes(udceViewerHTML(data,false,this.uiLocale()))});
            const names = new Set();
            for (const t of Object.values(job.state.tasks)) if (t.status === 'SAVED' && !names.has(t.localPath)) {names.add(t.localPath); entries.push({name:t.localPath,data:await this.readAsset(job,t)});}
        }
        this.assertJob(job, true);
        for (const e of entries) {
            if (!UDCE.safeName(e.name)) throw udceError('OUTPUT_NAME_INVALID');
            if (e.name.startsWith('media/')) this.fs.mkdirSync(this.joinPath(workDir,'media'), {recursive:true});
            const path = this.joinPath(workDir,e.name); files.push({path:e.name, bytes:e.data.length, sha256:await this.writeVerified(job,path,e.data)});
        }
        const info = {schema:1, exporter:this.name, version:this.version, protected:!!job.crypto,
            messageCoverage:data.meta.messageCoverage, mediaCoverage:data.meta.mediaCoverage, outputStatus:'VERIFIED', files};
        if (!job.crypto) Object.assign(info,{messages:data.messages.length,redactions:data.meta.redactions,anonymized:data.meta.anonymized});
        const infoData = UDCE.bytes(JSON.stringify(info,null,2)); await this.writeVerified(job,this.joinPath(workDir,'export_info.json'),infoData);
        entries.push({name:'export_info.json',data:infoData});
        const next = udceClone(job.state); next.outputStatus = 'VERIFIED'; next.mediaCoverage = data.meta.mediaCoverage;
        next.outputs = [{path:workDir}]; await this.commitState(job,next);
        const modeLabel = job.state.policy.protected ? this.t("ui_154") : ({txt:this.t("ui_092"),html:this.t("ui_091"),both:this.t("ui_155")}[job.state.policy.outputMode] || this.t("ui_155"));
        const localMediaRequested = Object.values(job.state.tasks || {}).some(t => t.requested);
        const doneText = localMediaRequested
            ? this.t("ui_156_media", {0:data.meta.messageCoverage,1:data.meta.mediaCoverage,2:modeLabel,3:workDir})
            : this.t("ui_156", {0:data.meta.messageCoverage,1:modeLabel,2:workDir});
        this.reportJob(job, doneText);
        const toastText = localMediaRequested
            ? this.t("ui_157_media", {0:data.messages.length,1:data.meta.messageCoverage,2:data.meta.mediaCoverage})
            : this.t("ui_157", {0:data.messages.length,1:data.meta.messageCoverage});
        BdApi.UI.showToast(toastText, {type:data.meta.messageCoverage === 'COMPLETE' && (!localMediaRequested || data.meta.mediaCoverage !== 'PARTIAL') ? 'success':'warning',timeout:9000});
        return {jobId:job.id,messages:data.messages.length,partial:data.meta.messageCoverage !== 'COMPLETE',mediaCoverage:data.meta.mediaCoverage,workDir};
    }

    supportLinks() {
        const box=document.createElement('div');box.className='aster-exp-support';
        const signature=document.createElement('div');signature.className='aster-exp-signature';signature.textContent=this.masterSignature+' / '+this.designerSignature;box.append(signature);
        const links=document.createElement('div');links.className='aster-exp-support-links';
        for (const [label,url] of [['GitHub',this.github],[this.t("ui_158"),this.supportJP],['Support / Ko-fi',this.supportGlobal]]) {const a=document.createElement('a');a.className='aster-exp-support-link';a.textContent=label;a.href=url;a.target='_blank';a.rel='noopener noreferrer';links.append(a);}box.append(links);return box;
    }

    openSavedJobs(root) {
        if(this.running){this.openProgressOnly();return;}this.removeOverlay();
        const overlay=document.createElement('div');overlay.className='aster-exp-overlay';
        overlay.innerHTML=`<div class="aster-exp-card"><div class="aster-exp-title">${this.t("ui_159")}</div><div class="aster-exp-muted" data-role="root"></div><p class="aster-exp-help">${this.t("ui_160")}</p><div class="aster-exp-field"><label>${this.t("ui_161")}</label><input class="aster-exp-input" type="password" autocomplete="off" data-role="password"></div><div data-role="jobs"></div><div class="aster-exp-progress" data-role="progress">${this.t("ui_162")}</div><div class="aster-exp-actions"><button class="aster-exp-secondary" data-action="close">${this.t("ui_062")}</button></div></div>`;
        document.body.append(overlay);this.overlay=overlay;overlay.querySelector('[data-role="root"]').textContent=root;
        overlay.querySelector('[data-action="close"]').onclick=()=>this.removeOverlay();
        const container=overlay.querySelector('[data-role="jobs"]');let names=[];
        try{names=this.fs.readdirSync(this.joinPath(root,'.udce_state')).filter(n=>/^[a-f0-9]{32}$/.test(n));}catch(_){}
        for(const id of names){
            let header;try{header=JSON.parse(String(this.fs.readFileSync(this.joinPath(root,'.udce_state',id,'header.json'),'utf8')));}catch(_){continue;}
            const row=document.createElement('div');row.style.cssText='border:1px solid #53566a;border-radius:6px;padding:12px;margin:10px 0';
            const title=document.createElement('div');title.textContent=`${header.protected?this.t("ui_163"):this.t("ui_164")} Job ${id}`;row.append(title);
            for(const [label,action] of [[this.t("ui_165"),'resume'],[this.t("ui_166"),'partial'],[this.t("ui_167"),'media'],[this.t("ui_168"),'delta'],[this.t("ui_169"),'share'],[this.t("ui_170"),'scan'],[this.t("ui_171"),'discard']]){
                const button=document.createElement('button');button.className='aster-exp-chip';button.textContent=label;
                button.onclick=async()=>{
                    if(this._managerBusy||this.running)return;this._managerBusy=true;let password=overlay.querySelector('[data-role="password"]').value;overlay.querySelector('[data-role="password"]').value='';
                    try{await this.performSavedAction(root,id,action,password);}catch(e){this.setProgress(this.t("ui_172")+this.errorText(e));}finally{password='';this._managerBusy=false;}
                };row.append(button);
            }container.append(row);
        }
        if(!container.children.length)container.textContent=this.t("ui_173");
    }

    async performSavedAction(root,id,action,password) {
        if(action==='discard'){
            const dir=this.joinPath(root,'.udce_state',id);
            if(!confirm(this.t("ui_174", {0:dir})))return;
            const names=this.fs.readdirSync(dir);
            if(names.some(n=>!(/^(header\.json|state_[01]\.dat|[pm]_[a-f0-9]{32}\.dat)$/.test(n))))throw udceError('UNKNOWN_FILE_PRESERVED');
            for(const n of names)this.fs.unlinkSync(this.joinPath(dir,n));
            if(typeof this.fs.rmdirSync==='function')try{this.fs.rmdirSync(dir);}catch(_){}
            this.openSavedJobs(root);return;
        }
        let job=await this.loadJob(root,id,password);
        try{
            if(action==='scan'){
                const data=await this.collectData(job);
                const preview=(udceHasIdentity(job.state.policy) || udceHasRedaction(job.state.policy)) ? data.messages.slice(0,3).map(n=>String(n.content).slice(0,200)).join('\n---\n') : this.t("ui_175");
                this.setProgress(this.t("ui_176", {0:data.meta.messageCoverage,1:data.meta.mediaCoverage,2:data.messages.length,3:this.privacyCountsText(job.state.redactions),4:job.recoveredPrevious?this.t("ui_177"):'',5:preview}));return;
            }
            if(action==='delta'){
                if(job.state.messageCoverage!=='COMPLETE'||job.state.localOnly)throw udceError('DELTA_REQUIRES_COMPLETE_LIVE_JOB');
                const opts={ctx:udceClone(job.state.ctx),startId:job.state.upperExclusive,endId:null,startMs:null,endMs:null,outputDir:root,policy:udceClone(job.state.policy),password};
                this.activeJob=null;this.running=false;job.crypto=null;job=await this.createJob(opts);opts.password='';this.openProgressOnly();await this.runJob(job);return;
            }
            if(action==='share'){
                const origin={jobId:job.id,pagesHash:await UDCE.hash(UDCE.canonical(job.state.pages)),total:job.state.total,coverage:job.state.messageCoverage,nextIndex:0};
                const ctx=udceClone(job.state.ctx),policy={...job.state.policy,privacySchema:2,privacy:udcePrivacyPreset('share'),anonymize:true,redact:true,images:false,videos:false,files:false,embedImages:false};
                this.activeJob=null;this.running=false;job.crypto=null;
                job=await this.createJob({ctx,outputDir:root,policy,password,localOnly:true});
                const candidate=udceClone(job.state);candidate.localSource=origin;await this.commitState(job,candidate);
                this.openProgressOnly();await this.continueLocalCopy(job,password);await this.finalizeJob(job);return;
            }
            this.openProgressOnly();await this.runJob(job,action,password);
        }finally{if(this.activeJob===job){this.activeJob=null;this.running=false;job.crypto=null;this.refreshButtonTitle();}}
    }


    async continueLocalCopy(job,password) {
        const origin=job.state.localSource;
        if (!origin || !/^[a-f0-9]{32}$/.test(origin.jobId)) throw udceError('LOCAL_COPY_SOURCE_REQUIRED');
        const source=await this.loadJob(job.outputDir,origin.jobId,password,true);
        try {
            if (await UDCE.hash(UDCE.canonical(source.state.pages))!==origin.pagesHash || source.state.total!==origin.total) throw udceError('LOCAL_SOURCE_CHANGED');
            const data=await this.collectData(source,false);
            for(let i=origin.nextIndex;i<data.messages.length;i+=200){
                this.assertJob(job);const batch=data.messages.slice(i,i+200).map(udceClone),candidate=udceClone(job.state),sourceIds=batch.map(n=>n.id);
                for(const n of batch){for(const a of n.attachments){delete a.localPath;delete a.sha256;a.url='';a.contentType=a.mime;a.isEmbed=false;}this.registerMedia(n,candidate);udceTransform(n,candidate);}
                candidate.redactions.customRegex=(candidate.redactions.customRegex||0)+await udceApplyRegex(batch,udcePolicyRegex(candidate.policy));
                udceFinalizePrivacyLinks(batch,candidate.policy);
                const nextCursor='LOCAL_'+i,name='p_'+UDCE.hex(UDCE.random(16))+'.dat';
                const page={jobId:job.id,policyHash:candidate.policyHash,before:candidate.nextBeforeId,next:nextCursor,records:batch,sourceIds};
                const encoded=await this.encodeStateObject(job,page,job.id+'/'+name),sha256=await this.writeVerified(job,this.joinPath(job.dir,name),encoded);
                candidate.pages.push({file:name,sha256,count:batch.length});candidate.total+=batch.length;candidate.textBytes+=UDCE.bytes(JSON.stringify(batch)).length;candidate.nextBeforeId=nextCursor;candidate.localSource.nextIndex=i+batch.length;
                if(candidate.total>UDCE_LIMITS.maxMessages || candidate.textBytes>UDCE_LIMITS.maxTextBytes)throw udceError('ARCHIVE_TEXT_LIMIT');
                await this.commitState(job,candidate);
            }
            const candidate=udceClone(job.state);candidate.messageCoverage=origin.coverage;candidate.reason='LOCAL_REDACTED_COPY';candidate.localCopyComplete=true;await this.commitState(job,candidate);
        } finally {source.crypto=null;}
    }


    localizeMessage(message, timezone) {
        const parts=new Intl.DateTimeFormat('en-CA',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(new Date(message.timestamp));
        const fields=Object.fromEntries(parts.map(p=>[p.type,p.value]));
        message.day=`${fields.year}-${fields.month}-${fields.day}`;
        message.timestampLocal=`${fields.year}/${fields.month}/${fields.day} ${fields.hour}:${fields.minute}:${fields.second}`;
    }


};
