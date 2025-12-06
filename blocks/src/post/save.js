import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save(props) {
	const { attributes } = props;

	return (
		<div {...useBlockProps.save()}>
			<div className="dmg-post-wrapper">
				<p className="dmg-read-more">{__("Read More:", "dmg")} <a href={attributes.postData.url}>{attributes.postData.title}</a></p>
			</div>
		</div>
	);
}
