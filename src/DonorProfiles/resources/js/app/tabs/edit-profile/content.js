import Heading from '../../components/heading';
import Divider from '../../components/divider';
import AvatarControl from '../../components/avatar-control';
import FieldRow from '../../components/field-row';
import SelectControl from '../../components/select-control';
import TextControl from '../../components/text-control';
import RadioControl from '../../components/radio-control';
import Button from '../../components/button';

import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
const { __ } = wp.i18n;

import './style.scss';

const Content = () => {
	const storedProfile = useSelector( state => state.profile );
	storedProfile.address = storedProfile.addresses ? storedProfile.addresses.billing[ 0 ] : null;

	const [ prefix, setPrefix ] = useState( storedProfile.titlePrefix );
	const prefixOptions = [
		{
			value: 'Mr.',
			label: 'Mr.',
		},
		{
			value: 'Ms.',
			label: 'Ms.',
		},		{
			value: 'Mrs.',
			label: 'Mrs.',
		},
	];

	const [ avatarUrl, setAvatarUrl ] = useState( storedProfile.avatarUrl );

	const [ firstName, setFirstName ] = useState( storedProfile.firstName );
	const [ lastName, setLastName ] = useState( storedProfile.lastName );

	const [ primaryEmail, setPrimaryEmail ] = useState( storedProfile.emails.primary );
	const [ additionalEmail, setAdditionalEmail ] = useState( 'give2th3p00r@sherwood.net' );

	const [ country, setCountry ] = useState( storedProfile.address.country );
	const countryOptions = [
		{
			value: 'US',
			label: 'United States',
		},
		{
			value: 'UK',
			label: 'United Kingdom',
		},		{
			value: 'CA',
			label: 'Canada',
		},
	];
	const [ addressOne, setAddressOne ] = useState( storedProfile.address.line1 );
	const [ addressTwo, setAddressTwo ] = useState( storedProfile.address.line2 );
	const [ city, setCity ] = useState( storedProfile.address.city );
	const [ state, setState ] = useState( storedProfile.address.state );
	const stateOptions = [
		{
			value: 'NY',
			label: 'New York',
		},
		{
			value: 'MI',
			label: 'Michigan',
		},		{
			value: 'TX',
			label: 'Texas',
		},
	];
	const [ zip, setZip ] = useState( storedProfile.address.zip );

	const [ anonymous, setAnonymous ] = useState( storedProfile.isAnonymous );
	const anonymousOptions = [
		{
			value: 'public',
			label: __( 'Public - show my donations publicly', 'give' ),
		},
		{
			value: 'private',
			label: __( 'Private - only organization admins can view my info' ),
		},
	];

	return (
		<Fragment>
			<Heading>
				{ __( 'Profile Information', 'give' ) }
			</Heading>
			<Divider />
			<AvatarControl value={ avatarUrl } onChange={ ( value ) => setAvatarUrl( value ) } />
			<FieldRow>
				<SelectControl
					label={ __( 'Prefix', 'give' ) }
					value={ prefix }
					onChange={ ( value ) => setPrefix( value ) }
					options={ prefixOptions }
					placeholder="--"
					width="80px"
				/>
				<TextControl
					label={ __( 'First Name', 'give' ) }
					value={ firstName }
					onChange={ ( value ) => setFirstName( value ) }
					icon="user"
				/>
				<TextControl
					label={ __( 'Last Name', 'give' ) }
					value={ lastName }
					onChange={ ( value ) => setLastName( value ) }
				/>
			</FieldRow>
			<TextControl
				label={ __( 'Primary Email', 'give' ) }
				value={ primaryEmail }
				onChange={ ( value ) => setPrimaryEmail( value ) }
				icon="envelope"
			/>
			<FieldRow>
				<TextControl
					label={ __( 'Additional Emails', 'give' ) }
					value={ additionalEmail }
					onChange={ ( value ) => setAdditionalEmail( value ) }
					icon="envelope"
				/>
				<div className="give-donor-profile__email-controls">
					<div className="give-donor-profile__make-primary-email">
						{ __( 'Make Primary', 'give' ) }
					</div>
					|
					<div className="give-donor-profile__delete-email">
						{ __( 'Delete', 'give' ) }
					</div>
				</div>
			</FieldRow>
			<Heading>
				{ __( 'Address', 'give' ) }
			</Heading>
			<Divider />
			<SelectControl
				label={ __( 'Country', 'give' ) }
				value={ country }
				onChange={ ( value ) => setCountry( value ) }
				options={ countryOptions }
				width={ null }
			/>
			<TextControl
				label={ __( 'Address 1', 'give' ) }
				value={ addressOne }
				onChange={ ( value ) => setAddressOne( value ) }
			/>
			<TextControl
				label={ __( 'Address 2', 'give' ) }
				value={ addressTwo }
				onChange={ ( value ) => setAddressTwo( value ) }
			/>
			<TextControl
				label={ __( 'City', 'give' ) }
				value={ city }
				onChange={ ( value ) => setCity( value ) }
			/>
			<FieldRow>
				<SelectControl
					label={ __( 'State', 'give' ) }
					value={ state }
					onChange={ ( value ) => setState( value ) }
					options={ stateOptions }
				/>
				<TextControl
					label={ __( 'Zip', 'give' ) }
					value={ zip }
					onChange={ ( value ) => setZip( value ) }
				/>
			</FieldRow>
			<Heading>
				{ __( 'Additional Info', 'give' ) }
			</Heading>
			<Divider />
			<RadioControl
				label={ __( 'Anonymous Giving' ) }
				description={ __( 'This will prevent your avatar, first name, and donation comments and other information from appearing publicly on this orgization’s website.', 'give' ) }
				options={ anonymousOptions }
				onChange={ ( value ) => setAnonymous( value ) }
				value={ anonymous }
			/>
			<Button icon="save">
				Update Profile
			</Button>
		</Fragment>
	);
};
export default Content;
