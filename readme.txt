=== DMG Post ===
Contributors:      amitpomu
Tags:              block
Tested up to:      6.9
Stable tag:        1.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

This block allows you to add block with searchable posts. Adds custom cli command to search posts that has the dmg block.

== Description ==

DMG Full-Stack Dev Test

== Copyright ==
DMG Post WordPress Plugin, Copyright 2025, amitpomu

== Installation ==
= Using The WordPress Dashboard =
* Navigate to the 'Add New' in the plugins dashboard
* Search for DMG Post
* Click Install Now
* Activate the plugin on the Plugin dashboard

= Uploading in WordPress Dashboard =
* Navigate to the 'Add New' in the plugins dashboard
* Navigate to the 'Upload' area
* Select dmg-post.zip from your computer
* Click 'Install Now'
* Activate the plugin in the Plugin dashboard

= Using FTP =
* Download dmg-post.zip
* Extract the dmg-post directory to your computer
* Upload the dmg-post directory to the /wp-content/plugins/ directory.
* Activate the plugin in the Plugin dashboard

== Frequently Asked Questions ==

= A question that someone might have =

An answer to that question.

= Custom Command for CLI =

Search posts/pages for a specific Gutenberg block within a date range.

## OPTIONS

[--block=<block_name>]
: Gutenberg block name to search for. Example: dmg/post

[--date-after=<YYYY-MM-DD>]
: Start date. Defaults to 30 days ago if omitted.

[--date-before=<YYYY-MM-DD>]
: End date. Defaults to today if omitted.

## EXAMPLES

wp dmg-read-more search --block=dmg/post
wp dmg-read-more search --block=dmg/post --date-after=2025-11-01 --date-before=2025-11-30
    

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is taken from
the /assets directory or the directory that contains the stable readme.txt (tags or trunk). Screenshots in the /assets
directory take precedence. For example, `/assets/screenshot-1.png` would win over `/tags/4.3/screenshot-1.png`
(or jpg, jpeg, gif).
2. This is the second screen shot

== Changelog ==

= 1.0.0 =
* Release

== Arbitrary section ==

You may provide arbitrary sections, in the same format as the ones above. This may be of use for extremely complicated
plugins where more information needs to be conveyed that doesn't fit into the categories of "description" or
"installation." Arbitrary sections will be shown below the built-in sections outlined above.
