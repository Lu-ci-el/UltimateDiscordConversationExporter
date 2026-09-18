# UltimateDiscordConversationExporter — UDCE 0.0.1

**A Discord conversation archiving plugin for BetterDiscord.**

No additional login or token entry.  
Conversations are saved locally. Images remain viewable in the HTML, and needed attachments can be selected and downloaded from the browser.

One exported HTML contains **Conversation, Attachments and Downloads**. Read messages, pick a date on the calendar, inspect attachments, then select the files you need. There is no separate attachment-browser HTML to manage.

[日本語説明書](README_JP.md) · [GitHub](https://github.com/Lu-ci-el/UltimateDiscordConversationExporter) · [Changelog](CHANGELOG.md) · [Testing](tests/README.md)

> Final verification of this integrated build on an actual Windows / Discord / BetterDiscord installation is still pending. Test results and limitations are documented below.

## 1. Installation and replacement

1. Use the Discord desktop client with BetterDiscord installed. This is not an extension for the ordinary Discord website.
2. Open **Discord Settings → BetterDiscord → Plugins → Open Plugins Folder**.
3. Place `UltimateDiscordConversationExporter.plugin.js` in that folder.
4. Enable **UltimateDiscordConversationExporter** in the Plugins list.
5. Open the DM, group DM or text channel to archive, then press **Export**.

**Only the plugin JS belongs in Plugins.** No extra library, README, tests or launcher CMD is required for normal use. See the [BetterDiscord Quick Start](https://docs.betterdiscord.app/plugins/introduction/quick-start) for BetterDiscord's own installation workflow.

When replacing an earlier build, pause the active job, disable the old plugin, replace the same-named JS, then enable it again. Disable duplicate Exporter plugins, including old names. **Keep existing export folders and `.udce_state`.** Install this release by replacing the plugin file manually.

## 2. Your first export

Choose the date range, output folder and format. Start with a short range to check the resulting text, dates and images.

| Setting | Meaning |
| --- | --- |
| Start date/time | Beginning of the requested range. Leave blank for the available oldest side. |
| `00:00:00` | Keeps the selected **start date** and resets only its time to midnight. It does not switch to today. |
| End date/time | End of the requested range. An open end is still captured at export start; the job does not endlessly chase new messages. |
| Message URL / ID | Takes priority over the corresponding date field. The supplied boundary message is included. |
| Output folder | The first-run default on Windows is `C:\Discord_Exports`. Enter a path manually or press **📁 Browse...** to use the native Windows folder picker. The selected location is remembered. Resumable-job state is stored under the same destination. |
| Output format | TXT + browser HTML, HTML only, or TXT only. Both is the default. |
| Page request interval | Initially 1000 ms. This is not a guarantee of fast retrieval or account safety. |

For example, set the start date to January 1, then press **00:00:00** to start at midnight on that date. Clear the Message ID field when using a date rather than a message boundary.

Press **📁 Browse...** to open the native Windows folder-selection dialog. It selects directories, not files. Cancelling leaves the current path unchanged. If an earlier installation already remembers a `D:\...`, `G:\...` or other destination, upgrading this same 0.0.1 build preserves that saved choice instead of forcing it back to `C:\Discord_Exports`.

New jobs seek from the start boundary and read toward newer messages. Existing jobs retain their original direction. You do not need to keep scrolling the Discord UI manually.

### Progress and controls

**Date-range progress** is measured in calendar days, not estimated processing time. Message density affects how long a day takes to retrieve.

**Pause** keeps the resumable state. **Stop and export partial results** writes the retrieved portion. **Saved / Resume** opens job management. Partial or unverified results are not equivalent to a complete retrieval.

The bottom-left **Open folder** button uses Discord's optional native reveal capability. If unavailable, the plugin copies the destination and explicitly reports the fallback. It never opens a folder automatically.

## 3. Output files

Normal exports use the selected formats:

```text
channel_timestamp_identifiers_files/
  00_ALL_MESSAGES_BY_DATE.txt   Full UTF-8 conversation, divided by date
  01_BROWSER_BY_DATE.html       Integrated conversation/attachment/download UI
  media/                       Only explicitly requested non-image/legacy local attachments that were saved successfully
  export_info.json             Status and integrity metadata
```

TXT and HTML are the reading formats; `export_info.json` is supporting verification metadata. The conversation output is not automatically ZIP-compressed. The plugin's distribution ZIP is a separate thing.

Keep HTML and `media/` in the same relative positions when local media exists. New jobs do not automatically save image bodies during export; `media/` is mainly for explicitly requested non-image media or legacy jobs.

Password-protected output uses the HTML and **02_ARCHIVE.udce**. It does not simultaneously generate an unprotected TXT. After unlocking, you may explicitly save the desired text selection as plain TXT.

## 4. Calendar and date index

The left sidebar contains a compact monthly calendar and a month-grouped date index. Days containing messages are marked and show counts.

Choosing a date filters the **currently open mode**: conversation, attachment previews or the download list. Click the same selected date again to remove the day filter. **Clear date** removes the selected day and the common From/To range. **Reset** also clears the other filters. Reloading is unnecessary.

The date-index search accepts values such as `05/26`. Month arrows change the displayed calendar month without silently selecting a different date.

## 5. Conversation mode

Search message text, attachment names, authors or message IDs. Combine this with author, date range, has attachments, has images, replies or bot filters. Source messages are not translated; their stored text and line breaks are preserved.

The viewer displays date headings and at most 100 messages per page. Reply links jump to an archived message when available, and **Back to previous view** restores the previous view. **Discord ↗** appears only when the preserved privacy policy permits a source link.

Use **From here / To here** to select a conversation range, then copy it or save TXT. Without a range selection, the search results are the target. **Clear range** returns to the whole result set. TXT downloads also require confirmation.

## 6. Images and attachment previews

Images are displayed directly in conversation. Attachments mode offers preview cards and file metadata. Filter by **ALL / Images / Video / Audio / Other**, filename, extension or author. These combine with the common top-bar search, author and date filters.

Entering `zip dat xml lua` selects any of those extensions. Extension matching is case-insensitive, and a leading dot is optional.

| State | Meaning |
| --- | --- |
| Saved locally | The export records a successful save and local path. Moving or deleting the file can still break it. |
| URL present (not fetched) | A URL was preserved. This is not proof that it is currently reachable or downloadable. |
| No URL | A source URL is absent, including where privacy processing removed it. The viewer does not reconstruct it. |

New jobs do **not** automatically save image bodies during export. Recorded Discord CDN URLs provide online previews. Legacy jobs with an existing local image can still use it first. Turn **Online images** off to stop automatic remote previews. It is initially on for ordinary personal archives and off for protected or anonymized archives. Text searches remain local; online previews contact the CDN.

**Open** and **Original message** are explicit actions. Merely looking at a file does not start bulk downloads. Low-level export-time error codes remain available under **Save details** rather than dominating the preview.

## 7. Downloads mode

Downloads uses an Explorer-style list: **Name / Type / Size / Date / Author / Status / Actions**. Column headings stay at the top of the list's own scroll area.

| Input | Action |
| --- | --- |
| Click an unselected row | Select that item alone. |
| Click a selected row again | Deselect that row. |
| Ctrl + click | Add or remove an item while keeping other selections. |
| Shift + click | Select the contiguous range from the anchor to the clicked row. |
| Ctrl + Shift + click | Add a contiguous range to the existing selection. |
| Ctrl + A | Select the current filtered results. Inside a text input it retains normal text-selection behavior. |
| Esc | Clear the selection. |
| Checkbox | Add or remove that individual item. |

**Selection never starts a download or opens an image tab.** Choose one of the explicit download buttons, review the count and approximate total size, and confirm.

| Button | Scope |
| --- | --- |
| Download selected | All checked/selected items, including selections hidden by a later filter. Hidden-selection counts are displayed. |
| Download filtered items | The full current result set, including rows outside the visible scroll viewport. |
| Download all attachments | All attachments, ignoring date, extension and other filters. |

Items with neither a valid download source nor a saved local file are excluded and noted in the confirmation. Duplicate filenames may be renamed by the browser. The running operation can be cancelled. Failures are reported instead of opening a stream of unexpected tabs.

**The destination follows your browser's download settings**, not the plugin's export-folder setting. Your browser may request permission for multiple automatic downloads. Review and decide whether to permit them.

**Handed to the browser** means that a save was requested, not that a filesystem write was independently verified. Check the browser's download list for completion. Remote fetches have a 256 MiB per-file cap and report failures such as CORS, expired links, communication errors or oversized data. See the browser behavior documented for [the download attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#download) and [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS).

## 8. Privacy and password protection

Privacy controls are independent rather than one broad hide-everything switch:

| Category | Independent controls |
| --- | --- |
| Identity | Names/display names; user IDs; message/reply IDs; mentions/channel/role IDs; attachment names; URLs |
| Potential secrets | Passwords; API keys/secrets; tokens; Authorization/Bearer values; private keys; Discord webhooks; email addresses; potential payment-card numbers |
| Custom rules | Literal strings; regular expressions |

Aliases are consistent so identities and reply relationships can remain understandable. Related links are suppressed when they would expose an identifier chosen for hiding. Name privacy does not detect every personal name written in free text, and unlabeled passwords are not universally recognizable. Use custom rules where needed and inspect the result before sharing.

This does not censor faces, text inside images or arbitrary file contents. Attachment sharing requires a separate review even when text privacy settings are enabled.

**Redacting password-like text** and **encrypting an export with a password** are different features. For protected output, open the HTML, select the matching `.udce`, then enter the password. **Lock** removes the mounted content and decrypted references. TXT and attachment saves after unlocking are plaintext and show a warning. There is no forgotten-password recovery feature.

## 9. Resume and older exports

Supported saved jobs retain their original date boundaries, scan direction and privacy policy. New settings do not silently reinterpret old jobs. Previously redacted information cannot be recovered from the export.

**Saved / Resume** includes resuming, exporting the retrieved portion, retrying failed requested attachments and inspecting the job. To generate the new viewer from an existing job, use **export retrieved/partial results**. This only regenerates the output; it does not retrieve missing messages. Previously generated HTML files do not update themselves.

`.udce_state` is recovery data and can retain internal matching IDs even when the readable export is anonymized. **Do not include it in a shared archive.**

## 10. Image display and saving

New jobs no longer expose or use an **export-time local image-body save** option. With attachment information enabled, UDCE keeps the filename/type/size and permitted Discord CDN URL, and the generated HTML uses that URL for image display.

Use **Attachments / Downloads** to select only the images or files you want, then start an explicit browser download after reviewing the confirmation dialog. The browser controls the final download destination.

Discord attachment CDN URLs expire. URL-only records are not permanent offline copies. Expired URLs, CORS restrictions, connectivity or browser download permissions can prevent preview or download. Static HTML does not sign in to Discord to renew URLs.

Video/audio/other local-save options and media state already stored in older resumable jobs remain for compatibility. Older jobs may still report legacy media errors, but new jobs do not create export-time image-body save tasks.

| Symptom | What to check |
| --- | --- |
| A date appears stuck | Click it again or choose Clear date. Reset also clears other filters. |
| An image does not display | Online images, CDN URL expiry and connectivity. |
| Opening a URL works but browser download fails | CORS, expiry, size and browser multi-download permission. |
| `NOT_REQUESTED` | Export-time local saving was not requested for that attachment; this is separate from HTML image display. |
| `HISTORY_RECEIPT_UNVERIFIED` | History receipt was not verified, so the job paused rather than declaring completion. |

## 11. Verification and distribution

For this delta, we checked Node syntax, the 0.0.1 product version, forced image-local-save-off policy for new jobs, attachment URL retention, and generated HTML hooks for top/bottom pagination, online image display and browser downloads. Previous 0.0.1 verification records are retained as historical parent evidence; this build does not claim that the complete older harness was re-run in the current environment.

Actual Windows/Discord/BetterDiscord behavior, live CDN/CORS, multiple-download permissions and the protected viewer opened through native local-file navigation are separate checks. This execution environment blocked `file://` navigation by policy, so that native viewer test remains unverified. The crypto implementation and encrypted-job resumption were tested in Node. See [tests/RESULTS.json](tests/RESULTS.json).

This is an unofficial BetterDiscord plugin, not endorsed by Discord or BetterDiscord. It does not guarantee account safety, uninterrupted operation or lossless retrieval. Use it for conversations you are authorized to access; review rights and privacy before redistributing messages or attachments. The distribution ZIP contains no private conversation logs.

No existing LICENSE was present in the supplied package/repository root, so no new software license has been invented or added. This documentation does not treat public repository visibility as an unrestricted redistribution or modification license.

Creator: 𓆩†𓆪 𝕷𝖚𝖈𝖎𝖊𝖑 𓆩†𓆪 / Designer: 𓆩✦𓆪 ASTER 𓆩✦𓆪  
Optional support: [OFUSE](https://ofuse.me/lost) · [Ko-fi](https://ko-fi.com/lost2)
