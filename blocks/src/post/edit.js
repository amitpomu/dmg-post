import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from "@wordpress/block-editor";
import { Panel, PanelBody, TextControl } from "@wordpress/components";
import { Fragment, useState, useEffect } from "@wordpress/element";
import { getSearchPosts } from "../utils/get-posts";

import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [paged, setPaged] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [pagination, setPagination] = useState([]);
	const [postList, setPostList] = useState("");
	const [isVisible, setIsVisible] = useState(false);

	const Prev = (event) => {
		event.preventDefault();
		setPaged(paged - 1);
	};

	const Next = (event) => {
		event.preventDefault();
		setPaged(paged + 1);
	};

	useEffect(() => {
		setError(null);

		getSearchPosts(searchTerm, 4, paged)
			.then((data) => {
				setPostList(data.data);
				setTotalPages(data.pages);
			})
			.catch((error) => {
				console.log(error);
				setError(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [searchTerm, paged]);

	return (
		<div {...useBlockProps()}>
			<InspectorControls key="setting">
				<Panel>
					<PanelBody title={__("DMG Post Settings", "dmg")} initialOpen={true}>
						<fieldset className="st-search-icons">
							<TextControl
								__nextHasNoMarginBottom={true}
								label={__("Select Post", "dmg")}
								autocomplete="off"
								value={searchTerm}
								onChange={(newValue) => {
									setSearchTerm(newValue);
									setPaged(1)
									if (newValue) {
										setIsVisible(true);
									} else {
										setIsVisible(false);
									}
								}}
								placeholder={__("Search Post", "dmg")}
							/>
						</fieldset>

						{isVisible && !isLoading && (
							<div className="dmg-post-list">
								<h5>{__("Search Results", "dmg")}</h5>
								{!error &&
									postList &&
									postList.map((post) => (
										<a
											href={post.url}
											onClick={(event) => {
												event.preventDefault();
												setAttributes({
													postData: {
														...attributes.postData,
														title: post.title,
														url: post.url,
													},
												});
											}}
										>
											{post.title}
										</a>
									))}

								<div className="dmg-pagination">
									{paged > 1 && (
										<a href="#" onClick={Prev}>
											{__("Prev", "dmg")}
										</a>
									)}

									{totalPages > 1 && (() => {
										let pages = [];

										// previous page (only if valid)
										if (paged - 1 >= 1) {
											pages.push(paged - 1);
										}

										// current page
										pages.push(paged);

										// next page (only if valid)
										if (paged + 1 <= totalPages) {
											pages.push(paged + 1);
										}

										return pages.map((page) => (
											<a
												key={page}
												href="#"
												onClick={() => setPaged(page)}
												style={{
													fontWeight: page === paged ? "bold" : "normal",
													textDecoration: page === paged ? "none" : "underline",
												}}
											>
												{`${page < paged && page > 1 ? "..." : ""}${page}${
													page > paged && page < totalPages ? "..." : ""
												}`}
											</a>
										));
									})(searchTerm)}

									{paged < totalPages && (
										<a href="#" onClick={Next}>
											{__("Next", "dmg")}
										</a>
									)}
								</div>
							</div>
						)}
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div className="dmg-post-wrapper">
				<p className="dmg-read-more">
					{__("Read More:", "dmg")}{" "}
					<a href={attributes.postData.url}>{attributes.postData.title}</a>
				</p>
			</div>
		</div>
	);
}
