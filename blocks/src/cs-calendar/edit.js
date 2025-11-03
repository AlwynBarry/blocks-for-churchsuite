/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import ServerSideRender from '@wordpress/server-side-render';

import {
	TextControl,
	ToggleControl,
	PanelBody,
	PanelRow
} from '@wordpress/components';

import { __experimentalNumberControl as NumberControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( "Calendar Configuration", "blocks-for-churchsuite" ) }
					initialOpen={true}
				>
					<PanelRow>
						<TextControl
							label={ __( "ChurchSuite Church Name", "blocks-for-churchsuite" ) }
							onChange={ ( church_name ) => setAttributes( { church_name : church_name } ) }
							value={ attributes.church_name }
							help={ __( "The church name from the start of the ChurchSuite URL", "blocks-for-churchsuite" ) }
						/>
					</PanelRow>	
					<PanelRow>
						<TextControl
							label={ __( "Calendar Categories", "blocks-for-churchsuite" ) }
							onChange={ ( new_categories ) => setAttributes( { categories : new_categories } ) }
							value={ attributes.categories }
							help={ __( "Comma separated category numbers", "blocks-for-churchsuite" ) + ( attributes.categories ? " - " + __( "only category(s)", "blocks-for-churchsuite" ) + ": " + attributes.categories : " - " + __( "all categories", "blocks-for-churchsuite" ) ) }
						/>
					</PanelRow>	
				</PanelBody>

				<PanelBody
					title={ __( "Calendar Advanced Controls", "blocks-for-churchsuite" ) }
					initialOpen={false}
				>
					<PanelRow>
						<TextControl
							label={ __( "Event name filter", "blocks-for-churchsuite" ) }
							onChange={ ( new_query ) => setAttributes( { q : new_query } ) }
							value={ attributes.q }
							help={ ( attributes.q == "" ) ? __( "All events", "blocks-for-churchsuite" ) : __( "Return only events with", "blocks-for-churchsuite" ) +  " '" + attributes.q + "' " + __( "in the event name", "blocks-for-churchsuite" ) }
						/>
					</PanelRow>	
					<PanelRow>
						<NumberControl
							label={ __( "Sequence", "blocks-for-churchsuite" ) }
							min={ 0 }
							max={ 1000 }
							onChange={ ( new_sequence ) => setAttributes( { sequence : isNaN( parseInt( new_sequence ) ) ? 0 : ( parseInt( new_sequence ) >= 0 ? parseInt( new_sequence ) : 0 ) } ) }
							value={ attributes.sequence }
							help={ __( "Filter by sequence Id", "blocks-for-churchsuite" ) + ": " + ( attributes.sequence ? __( "Events from Sequence ID", "blocks-for-churchsuite" ) + ": " + attributes.sequence : __( "All events", "blocks-for-churchsuite" ) ) }
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={ __( "Sites", "blocks-for-churchsuite" ) }
							onChange={ ( new_sites ) => setAttributes( { sites : new_sites } ) }
							value={ attributes.sites }
							help={ __( "Comma separated site numbers", "blocks-for-churchsuite" ) + " - " + ( attributes.sites ? __( "Only events from site(s)", "blocks-for-churchsuite" ) + ": " + attributes.sites : __( "Events from all sites", "blocks-for-churchsuite" ) ) }
						/>
					</PanelRow>	
				</PanelBody>

			</InspectorControls>
			<div { ...useBlockProps() }>
				<ServerSideRender
					block="b4cs/cs-calendar"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
