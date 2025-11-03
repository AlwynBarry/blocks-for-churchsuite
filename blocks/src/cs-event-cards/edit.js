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
	SelectControl,
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
					title={ __( "Event Cards Configuration", "blocks-for-churchsuite" ) }
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
							label={ __( "Start date", "blocks-for-churchsuite" ) }
							onChange={ ( new_date ) => setAttributes( { date_start : new_date } ) }
							value={ attributes.date_start }
							help={ __( "The start date of the events in the Event List (Format: yyyy-mm-dd; Default: today)", "blocks-for-churchsuite" ) }
						/>
					</PanelRow>
					<PanelRow>
						<NumberControl
							label={ __( "Days Ahead", "blocks-for-churchsuite" ) }
							min={ 0 }
							max={ 365 }
							onChange={ ( new_days_ahead ) => setAttributes( { days_ahead : isNaN( parseInt( new_days_ahead ) ) ? 0 : ( parseInt( new_days_ahead ) > 0 ? parseInt( new_days_ahead ) : 0 ) } ) }
							value={ attributes.days_ahead }
							help={ ( attributes.days_ahead > 0 ) ? __( "Look", "blocks-for-churchsuite" ) + " " + attributes.days_ahead + " " + __( "days ahead for events", "blocks-for-churchsuite" )
																 : ( attributes.days_ahead == 0 ) ? __( "Look for events happening today", "blocks-for-churchsuite" ) : __( "Look for any events", "blocks-for-churchsuite" ) }
						/>
					</PanelRow>
					<PanelRow>
						<NumberControl
							label={ __( "Number of Results", "blocks-for-churchsuite" ) }
							min={ 0 }
							max={ 1000 }
							onChange={ ( new_num_results ) => setAttributes( { num_results : isNaN( parseInt( new_num_results ) ) ? 0 : ( parseInt( new_num_results ) > 0 ? parseInt( new_num_results ) : 0 ) } ) }
							value={ attributes.num_results }
							help={ ( attributes.num_results ) ? __( "Return the first", "blocks-for-churchsuite" ) + " " + attributes.num_results + " " + __( "events", "blocks-for-churchsuite" ) : __( "All events", "blocks-for-churchsuite" ) }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( "Featured Events Only", "blocks-for-churchsuite" ) }
							checked={ attributes.featured }
							onChange={ ( new_featured ) => setAttributes( { featured : new_featured } ) }
							value={ attributes.featured }
							help={ attributes.featured ? __( "Only featured events", "blocks-for-churchsuite" ) : __( "All events", "blocks-for-churchsuite" ) }
						/>
					</PanelRow>
				</PanelBody>

				<PanelBody
					title={ __("Event Cards Advanced Controls", "blocks-for-churchsuite" ) }
					initialOpen={false}
				>
					<PanelRow>
						<TextControl
							label={ __( "Calendar Categories", "blocks-for-churchsuite" ) }
							onChange={ ( new_categories ) => setAttributes( { categories : new_categories } ) }
							value={ attributes.categories }
							help={ __( "Comma separated category numbers", "blocks-for-churchsuite" ) + ( attributes.categories ? " - " + __( "only category(s)", "blocks-for-churchsuite" ) + ": " + attributes.categories : " - " + __( "all categories", "blocks-for-churchsuite" ) ) }
						/>
					</PanelRow>	
					<PanelRow>
						<TextControl
							label={ __( "Event name filter", "blocks-for-churchsuite" ) }
							onChange={ ( new_query ) => setAttributes( { q : new_query } ) }
							value={ attributes.q }
							help={ ( attributes.q == "" ) ? __( "All events", "blocks-for-churchsuite" ) : __( "Return only events with", "blocks-for-churchsuite" ) +  " '" + attributes.q + "' " + __( "in the event name", "blocks-for-churchsuite" ) }
						/>
					</PanelRow>	
					<PanelRow>
						<TextControl
							label={ __( "Event Ids", "blocks-for-churchsuite" ) }
							onChange={ ( new_event_ids ) => setAttributes( { event_ids : new_event_ids } ) }
							value={ attributes.event_ids }
							help={ __( "Comma separated Event Ids", "blocks-for-churchsuite" ) + ( attributes.event_ids !== "" ? " - " +  __( "Show events with Id(s)", "blocks-for-churchsuite" ) + ": " + attributes.event_ids : " - " + __( "all events", "blocks-for-churchsuite" ) ) }
						/>
					</PanelRow>	
					<PanelRow>
						<SelectControl
							label={ __( "Merge", "blocks-for-churchsuite" ) }
							options={ [
										{ label:  __( "None", "blocks-for-churchsuite" ), value: "" },
										{ label:  __( "Sequence", "blocks-for-churchsuite" ), value: "sequence" },
										{ label:  __( "Sequence Name", "blocks-for-churchsuite" ), value: "sequence_name" },
										{ label:  __( "Signup to Sequence", "blocks-for-churchsuite" ), value: "signup_to_sequence" },
										{ label:  __( "Show all", "blocks-for-churchsuite" ), value: "show_all" },
									] }
							onChange={ ( new_merge ) => setAttributes( { merge : new_merge } ) }
							value={ attributes.merge }
							help={ __( "Whether to merge events in a sequence or show all events", "blocks-for-churchsuite" ) }
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
					block="b4cs/cs-event-cards"
					attributes={ attributes }
				/>
			</div>

		</>
	);
}
